﻿using System;
using System.Collections.Generic;
using System.Globalization;
using DotVVM.Samples.Tests.New;
using DotVVM.Testing.Abstractions;
using OpenQA.Selenium;
using OpenQA.Selenium.Interactions;
using Riganti.Selenium.Core;
using Riganti.Selenium.Core.Abstractions;
using Xunit;
using Xunit.Abstractions;
using Assert = Microsoft.VisualStudio.TestTools.UnitTesting.Assert;

namespace DotVVM.Samples.Tests.Control
{
    public class TextBoxTests : AppSeleniumTest
    {
        [Fact]
        public void Control_TextBox_TextBox_FormatDoubleProperty()
        {
            RunInAllBrowsers(browser => {
                browser.NavigateToUrl(SamplesRouteUrls.ControlSamples_TextBox_TextBox_FormatDoubleProperty);

                AssertUI.TextEquals(browser.Single("[data-ui='textBox']"), "0.00");
                browser.Single("[data-ui='button']").Click();
                browser.Wait(500);

                AssertUI.TextEquals(browser.Single("[data-ui='textBox']"), "10.50");
            });
        }

        [Fact]
        public void Control_TextBox_IntBoundTextBox()
        {
            RunInAllBrowsers(browser => {
                browser.NavigateToUrl(SamplesRouteUrls.ControlSamples_TextBox_IntBoundTextBox);

                browser.ElementAt("input", 0).SendKeys("hello");
                browser.ElementAt("input[type=button]", 0).Click();
                browser.Wait();

                AssertUI.InnerTextEquals(browser.ElementAt("input", 0), "0");
                AssertUI.InnerTextEquals(browser.ElementAt("span", 0), "0");
            });
        }

        [Fact]
        public void Control_TextBox_SimpleDateBox()
        {
            RunInAllBrowsers(browser => {
                browser.NavigateToUrl(SamplesRouteUrls.ControlSamples_TextBox_SimpleDateBox);

                var now = DateTime.Now;

                var typeText = browser.Single("[data-ui='type-text']").GetText();
                var typeTextDateTime = DateTime.Parse(typeText, DateTimeFormatInfo.InvariantInfo);
                Assert.AreEqual(now.ToShortDateString(), typeTextDateTime.ToShortDateString());

                var customFormat = browser.Single("[data-ui='custom-format']").GetText();
                Assert.AreEqual(customFormat, now.ToString("dd-MM-yy"));

                browser.Single("[data-ui='fill-name-button']").Click();
                AssertUI.TextEquals(browser.Single("[data-ui='name-of-day']"), now.DayOfWeek.ToString());
            });
        }

        [Fact]
        public void Control_TextBox_TextBox()
        {
            RunInAllBrowsers(browser => {
                browser.NavigateToUrl(SamplesRouteUrls.ControlSamples_TextBox_TextBox);

                AssertUI.TagName(browser.First("#TextBox1"), "input");
                AssertUI.TagName(browser.First("#TextBox2"), "input");
                AssertUI.TagName(browser.First("#TextArea1"), "textarea");
                AssertUI.TagName(browser.First("#TextArea2"), "textarea");
            });
        }

        [Fact]
        public void Control_TextBox_SelectAllOnFocus()
        {
            RunInAllBrowsers(browser => {
                browser.NavigateToUrl(SamplesRouteUrls.ControlSamples_TextBox_SelectAllOnFocus);

                CheckSelectAllOnFocus(browser, "hardcoded");
                CheckSelectAllOnFocus(browser, "bound", false);
                browser.Single("button", this.SelectByDataUi).Click();
                CheckSelectAllOnFocus(browser, "bound", true);
            });
        }

        private void CheckSelectAllOnFocus(IBrowserWrapper browser, string textBoxDataUi, bool isSelectAllOnFocusTrue = true)
        {
            var textBox = browser.Single(textBoxDataUi, SelectByDataUi);
            textBox.Click();
            var selectedText = (string)browser.GetJavaScriptExecutor().ExecuteScript("return window.getSelection().toString();");
            var expectedText = isSelectAllOnFocusTrue ? "Testing text" : "";
            Assert.AreEqual(expectedText, selectedText);
        }

        public static IEnumerable<object[]> TextBoxStringFormatChangedCommandData =>
            new object[][]
            {
                new object[] { "cs-CZ", SamplesRouteUrls.ControlSamples_TextBox_TextBox_Format_Binding, "#czech"},
                new object[] { "en-US", SamplesRouteUrls.ControlSamples_TextBox_TextBox_Format_Binding, "#english" },
                new object[] { "cs-CZ", SamplesRouteUrls.ControlSamples_TextBox_TextBox_Format, "#czech"},
                new object[] { "en-US", SamplesRouteUrls.ControlSamples_TextBox_TextBox_Format, "#english"},
            };

        [Theory]
        [MemberData(nameof(TextBoxStringFormatChangedCommandData))]
        [SampleReference(nameof(SamplesRouteUrls.ControlSamples_TextBox_TextBox_Format))]
        [SampleReference(nameof(SamplesRouteUrls.ControlSamples_TextBox_TextBox_Format_Binding))]
        private void Control_TextBox_StringFormat(string cultureName, string url, string linkSelector)
        {
            RunInAllBrowsers(browser => {

                var culture = new CultureInfo(cultureName);
                browser.NavigateToUrl(url);
                browser.First(linkSelector).Click();

                var dateResult1 = browser.First("#date-result1").GetText();
                var dateResult2 = browser.First("#date-result2").GetText();
                var dateResult3 = browser.First("#date-result3").GetText();

                var dateTextBox = browser.First("#dateTextbox");
                AssertUI.Attribute(dateTextBox, "value", dateResult1);

                var dateText = browser.First("#DateValueText");
                AssertUI.InnerTextEquals(dateText, new DateTime(2015, 12, 27).ToString("G", culture));

                var nullableDateTextBox = browser.First("#nullableDateTextbox");
                AssertUI.Attribute(nullableDateTextBox, "value", new DateTime(2015, 12, 27).ToString("G", culture));

                var nullableDateText = browser.First("#nullableDateValueText");
                AssertUI.InnerTextEquals(nullableDateText, new DateTime(2015, 12, 27).ToString("G", culture));

                var numberTextbox = browser.First("#numberTextbox");
                AssertUI.Attribute(numberTextbox, "value", 123.1235.ToString(culture));

                var numberValueText = browser.First("#numberValueText");
                AssertUI.InnerTextEquals(numberValueText, 123.123456789.ToString(culture));

                var nullableNumberTextbox = browser.First("#nullableNumberTextbox");
                AssertUI.Attribute(nullableNumberTextbox, "value", 123.123456789.ToString(culture));

                var nullableNumberValueText = browser.First("#nullableNumberValueText");
                AssertUI.InnerTextEquals(nullableNumberValueText, 123.123456789.ToString(culture));

                //write new valid values
                dateTextBox.Clear().SendKeys(dateResult2);
                numberTextbox.Clear().SendKeys(2000.ToString("n0", culture));
                dateTextBox.Click().Wait();

                //check new values
                AssertUI.InnerTextEquals(dateText, new DateTime(2018, 12, 27).ToString("G", culture));
                AssertUI.InnerTextEquals(numberValueText, 2000.ToString(culture));

                AssertUI.Attribute(numberTextbox, "value", 2000.ToString("n4", culture));
                AssertUI.Attribute(dateTextBox, "value", dateResult2);

                //write invalid values
                dateTextBox.Clear().SendKeys("dsasdasd");
                numberTextbox.Clear().SendKeys("000//*a");
                dateTextBox.Click();

                //check invalid values
                AssertUI.InnerTextEquals(dateText, "");
                AssertUI.InnerTextEquals(numberValueText, "");

                AssertUI.Attribute(numberTextbox, "value", "000//*a");
                AssertUI.Attribute(dateTextBox, "value", "dsasdasd");

                //write new valid values
                dateTextBox.Clear().SendKeys(new DateTime(2018, 1, 1).ToString("d", culture));
                numberTextbox.Clear().SendKeys(1000.550277.ToString(culture));
                dateTextBox.Click().Wait();

                //check new values
                AssertUI.InnerTextEquals(dateText, new DateTime(2018, 1, 1).ToString("G", culture));
                AssertUI.InnerTextEquals(numberValueText, 1000.550277.ToString(culture));

                AssertUI.Attribute(numberTextbox, "value", 1000.550277.ToString("n4", culture));
                AssertUI.Attribute(dateTextBox, "value", dateResult3);
            });
        }

        [Theory]
        [MemberData(nameof(TextBoxStringFormatChangedCommandData))]
        private void Control_TextBox_StringFormat_ChangedCommandBinding(string cultureName, string url, string linkSelector)
        {
            RunInAllBrowsers(browser => {

                void ClearInput(IElementWrapper element)
                {
                    // There is special threatment for TextBox with Changed Command
                    // When Clear() method is used, changed command is invoked and default value '0.00' appear
                    new Actions(browser.Driver)
                        .DoubleClick(element.WebElement)
                        .SendKeys(Keys.Delete)
                        .Build()
                        .Perform();
                }

                var culture = new CultureInfo(cultureName);
                browser.NavigateToUrl(url);
                browser.First(linkSelector).Click();

                var numberTextbox = browser.First("#bindingNumberFormatTextbox");
                AssertUI.Attribute(numberTextbox, "value", 0.ToString("N", culture));

                var numberValueText = browser.First("#resultNumberValueText");
                AssertUI.InnerTextEquals(numberValueText, 0.ToString(culture));

                // send new values
                ClearInput(numberTextbox);
                numberTextbox.SendKeys("42")
                    .SendEnterKey()
                    .Wait();

                // check new values
                AssertUI.InnerTextEquals(numberValueText, 42.ToString(culture));
                AssertUI.Attribute(numberTextbox, "value", 42.ToString("N", culture));

                // send new values
                ClearInput(numberTextbox);
                numberTextbox.SendKeys(123.456789.ToString(culture))
                    .SendEnterKey()
                    .Wait();

                // check new values
                AssertUI.InnerTextEquals(numberValueText, 123.456789.ToString(culture));
                AssertUI.Attribute(numberTextbox, "value", 123.456789.ToString("N", culture));
            });
        }

        public TextBoxTests(ITestOutputHelper output) : base(output)
        {
        }
    }
}
