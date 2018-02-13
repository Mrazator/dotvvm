﻿using DotVVM.Framework.Compilation;
using DotVVM.Framework.Compilation.Binding;
using DotVVM.Framework.Compilation.ControlTree;
using DotVVM.Framework.Compilation.ControlTree.Resolved;
using DotVVM.Framework.Compilation.Parser.Dothtml.Parser;
using DotVVM.Framework.Compilation.Parser.Dothtml.Tokenizer;
using DotVVM.Framework.Compilation.Styles;
using DotVVM.Framework.Compilation.Validation;
using DotVVM.Framework.Configuration;
using DotVVM.Framework.Hosting;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Collections.Immutable;
using DotVVM.Framework.Utils;

namespace DotVVM.Compiler.Blazor
{
    internal class Dothtml2BlazorCompiler
    {
        static ConcurrentDictionary<string, Assembly> assemblyDictionary = new ConcurrentDictionary<string, Assembly>();
        static ConcurrentDictionary<string, DotvvmConfiguration> cachedConfig = new ConcurrentDictionary<string, DotvvmConfiguration>();

        public CompilerOptions Options { get; }
        readonly DotvvmConfiguration configuration;
        readonly IControlTreeResolver controlTreeResolver;
        readonly IViewCompiler compiler;
        readonly IMarkupFileLoader fileLoader;
        readonly CSharpCompilation compilation;
        readonly CompilationResult result = new CompilationResult();

        public Dothtml2BlazorCompiler(DotvvmConfiguration dotvvmConfiguration, CompilerOptions options)
        {
            this.configuration = dotvvmConfiguration;
            this.Options = options;

            controlTreeResolver = configuration.ServiceProvider.GetRequiredService<IControlTreeResolver>();
            fileLoader = configuration.ServiceProvider.GetRequiredService<IMarkupFileLoader>();
            compiler = configuration.ServiceProvider.GetRequiredService<IViewCompiler>();
            compilation = compiler.CreateCompilation(Options.AssemblyName);
        }

        // private void Init()
        // {
        //     if (Options.FullCompile)
        //     {
        //         // touch assembly
        //         SyntaxFactory.Token(SyntaxKind.NullKeyword);

        //         if (!Directory.Exists(Options.OutputPath))
        //         {
        //             Directory.CreateDirectory(Options.OutputPath);
        //         }
        //     }

        //     // var wsa = assemblyDictionary.GetOrAdd(Options.WebSiteAssembly, _ => Assembly.LoadFile(Options.WebSiteAssembly));
        //     // AssemblyResolver.LoadReferences(wsa);

        //     if (Options.SerializeConfig)
        //     {
        //         result.Configuration = configuration;
        //     }
        // }

        private void Save()
        {
            if (Options.FullCompile)
            {
                var bindingsAssemblyPath = bindingCompiler.OutputFileName;
                bindingCompiler.SaveAssembly();

                Program.WriteInfo($"Bindings saved to {bindingsAssemblyPath}.");

                compilation = compilation.AddReferences(MetadataReference.CreateFromFile(Path.GetFullPath(bindingsAssemblyPath)));
                var compiledViewsFileName = Path.Combine(Options.OutputPath, Options.AssemblyName + ".dll");

                var result = compilation.Emit(compiledViewsFileName);
                if (!result.Success)
                {
                    throw new Exception("The compilation failed!");
                }
                Program2.WriteInfo($"Compiled views saved to {compiledViewsFileName}.");
            }
        }

        public CompilationResult Execute()
        {
            Program.WriteInfo("Initializing...");
            // Init();

            Program.WriteInfo("Compiling views...");
            foreach (var file in Options.DothtmlFiles)
            {
                try
                {
                    CompileFile(file);
                }
                catch (DotvvmCompilationException exception)
                {
                    result.Files.Add(file, new FileCompilationResult
                    {
                        Errors = new List<Exception>() { exception }
                    });
                }
            }

            Program.WriteInfo("Emitting assemblies...");
            Save();

            Program.WriteInfo("Building compilation results...");
            return result;
        }

        private void BuildFileResult(string fileName, ViewCompilationResult view)
        {
            var r = new FileCompilationResult();
            var visitor = new ResolvedControlInfoVisitor();
            if (Options.CheckBindingErrors) visitor.BindingCompiler = bindingCompiler;
            visitor.Result = r;
            view.ResolvedTree?.Accept(visitor);
            result.Files.Add(fileName, r);
        }

        private Dictionary<string, ViewCompilationResult> compiledCache = new Dictionary<string, ViewCompilationResult>();

        public ViewCompilationResult CompileFile(string fileName)
        {
            if (compiledCache.ContainsKey(fileName)) return compiledCache[fileName];
            return compiledCache[fileName] = CompileView(fileName);
        }

        protected ViewCompilationResult CompileView(string fileName)
        {
            var file = fileLoader.GetMarkup(configuration, fileName);

            // parse the document
            var tokenizer = new DothtmlTokenizer();
            tokenizer.Tokenize(file.ContentsReaderFactory());
            var parser = new DothtmlParser();
            var node = parser.Parse(tokenizer.Tokens);

            var resolvedView = (ResolvedTreeRoot)controlTreeResolver.ResolveTree(node, fileName);

            var errorCheckingVisitor = new ErrorCheckingVisitor();
            resolvedView.Accept(errorCheckingVisitor);

            foreach (var n in node.EnumerateNodes())
            {
                if (n.HasNodeErrors)
                {
                    throw new DotvvmCompilationException(string.Join(", ", n.NodeErrors), n.Tokens);
                }
            }

            var styleVisitor = new StylingVisitor(configuration);
            resolvedView.Accept(styleVisitor);

            var validationVisitor = new ControlUsageValidationVisitor(new DefaultControlUsageValidator());
            resolvedView.Accept(validationVisitor);
            if (validationVisitor.Errors.Any())
            {
                var controlUsageError = validationVisitor.Errors.First();
                throw new DotvvmCompilationException(controlUsageError.ErrorMessage, controlUsageError.Nodes.SelectMany(n => n.Tokens));
            }

            new LifecycleRequirementsAssigningVisitor().ApplyAction(resolvedView.Accept);


            DefaultViewCompilerCodeEmitter emitter = null;
            string fullClassName = null;
            if (Options.FullCompile)
            {
                var namespaceName = DefaultControlBuilderFactory.GetNamespaceFromFileName(file.FileName, file.LastWriteDateTimeUtc);
                var className = DefaultControlBuilderFactory.GetClassFromFileName(file.FileName) + "ControlBuilder";
                fullClassName = namespaceName + "." + className;
                emitter = new DefaultViewCompilerCodeEmitter();
                var compilingVisitor = new ViewCompilingVisitor(emitter, configuration.ServiceProvider.GetRequiredService<IBindingCompiler>(), className);

                resolvedView.Accept(compilingVisitor);

                // compile master pages
                if (resolvedView.Directives.ContainsKey("masterPage"))
                    CompileFile(resolvedView.Directives["masterPage"].Single().Value);

                compilation = compilation
                    .AddSyntaxTrees(emitter.BuildTree(namespaceName, className, fileName)/*.Select(t => SyntaxFactory.ParseSyntaxTree(t.GetRoot().NormalizeWhitespace().ToString()))*/)
                    .AddReferences(emitter.UsedAssemblies
                        .Select(a => CompiledAssemblyCache.Instance.GetAssemblyMetadata(a.Key).WithAliases(ImmutableArray.Create(a.Value))));
            }

            Program2.WriteInfo($"The view { fileName } compiled successfully.");

            var res = new ViewCompilationResult
            {
                BuilderClassName = fullClassName,
                ControlType = resolvedView.Metadata.Type,
                DataContextType = emitter?.BuilderDataContextType,
                ResolvedTree = Options.OutputResolvedDothtmlMap ? resolvedView : null
            };
            BuildFileResult(fileName, res);
            return res;
        }
    }

    internal class ViewCompilationResult
    {
        public string BuilderClassName { get; set; }
        public Type ControlType { get; set; }
        public Type DataContextType { get; set; }
        public ResolvedTreeRoot ResolvedTree { get; set; }
    }
}