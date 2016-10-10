DotVVM = HTML + C#
==================

## .NET-based Dev Stack for Modern Web Apps

[![Join the chat at https://gitter.im/riganti/dotvvm](https://badges.gitter.im/riganti/dotvvm.svg)](https://gitter.im/riganti/dotvvm?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

**DotVVM** is an ASP.NET framework that can build **line-of-business applications** and **SPAs** without writing tons of Javascript code. You only have to write a viewmodel in C# and a view in HTML and DotVVM will generate the rest for you.

**DotVVM** brings full **MVVM** experience and it uses **KnockoutJS** on the client side. It handles the client-server communication, validation, localization, date & time formatting on the client side, SPAs and much more.

It is open source, it supports both OWIN and ASP.NET Core, and has a free extension for Visual Studio 2015 with IntelliSense and other interesting features.  

<br />

How to Start
------------

1. Install the **[DotVVM for Visual Studio 2015](https://www.dotvvm.com/landing/dotvvm-for-visual-studio-extension)** extension.

2. Read the **[documentation](http://www.dotvvm.com/docs)**. 

<br />

Simple Sample
-------------
DotHTML markup: 
```html
<div class="form-control">
  <dot:TextBox Text="{value: Name}" />
</div>
<div class="form-control">
  <dot:TextBox Text="{value: Email}" />
</div>
<div class="button-bar">
  <dot:Button Text="Submit" Click="{command: Submit()}" />
</div>
```

ViewModel in C#:
```C#
public class ContactFormViewModel
{
  public string Name { get; set; }
  public string Email { get; set; }
  public void Submit()
  {
    ContactService.Submit(Name, Email);
  }
}
```


More Info
---------

You'll find more information on our website [DotVVM.com](https://www.dotvvm.com).
