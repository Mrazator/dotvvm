using DotVVM.Framework.Configuration;
using DotVVM.Samples.Common;
using Microsoft.Extensions.DependencyInjection;

namespace DotVVM.Samples.BasicSamples
{
    public class DotvvmServiceConfigurator : IDotvvmServiceConfigurator
    {
        public void ConfigureServices(IDotvvmOptions options)
        {
            CommonConfiguration.ConfigureServices(options.Services);
            options.AddDefaultTempStorages("Temp");
        }
    }
}
