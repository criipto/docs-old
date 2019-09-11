---
layout: article
---

# ASP.NET Core v2.x

This tutorial demonstrates how to add user login to an ASP.NET Core 2.x application. 

Four steps are required to complete your first test login:

1. [Register your application in Criipto Verify](#register)
2. [Configure your OAuth2 flow](#flow)
3. [Configure your application to use Criipto Verify](#application)
4. [Trigger authentication in your application](#trigger)

This explains how to set up your application and test with test users. To use real e-IDs for login the setup is the same, but you must be [set up for Production](#production)

And note that you need test e-ID users to see your code in action. How to get those is [described further down](#testusers).

You may get a completed and ready to run [sample from GitHub](https://github.com/criipto/aspnetcore-oidc-sample) showing the below recipe in the simplest of ASP.NET Core MVC applications.

To modify your existing application to work with Criipto Verify follow the steps below.

<a name="register"></a>

## Register Your Application in Criipto Verify

{% include snippets/register-app.md callback-urls-img="/images/callback-urls-aspnet.png" %}

<a name="flow"></a>

## Configure the OAuth2 code flow

{% include snippets/oauth2-code-flow.md %}

<a name="application"></a>

## Configure Your Application to Use Criipto Verify

Most of the e-ID services supported by Criipto are suited for _iframe_ integration into your web pages. The approach described here does not make any assumptions about that, but simply shows how to enable Criipto Verify authentication in a web application.

<!--
For more on how to make it work in an iframe using the _postMessage()_ functionality please check our guide to [iframed authentication](/authentication/iframe.md). 
-->

# Install dependencies

To integrate Criipto Verify with ASP.NET Core you will use the Cookie and OpenID Connect (OIDC) authentication handlers. The seed project already references the ASP.NET Core meta package (Microsoft.AspNetCore.App) which includes all NuGet packages shipped by Microsoft as part of ASP.NET Core 2.2, including the packages for the Cookie and OIDC authentication handlers.

If you are adding this to your own existing project, and you have not referenced the meta package, then please make sure that you add the Microsoft.AspNetCore.Authentication.Cookies and Microsoft.AspNetCore.Authentication.OpenIdConnect packages to your application.

``` powershell
Install-Package Microsoft.AspNetCore.Authentication.Cookies
Install-Package Microsoft.AspNetCore.Authentication.OpenIdConnect
```

### Configure OpenID Connect Middleware

To enable authentication in your ASP.NET Core application, use the OpenID Connect (OIDC) middleware.
Go to the `ConfigureServices` method of your `Startup` class. To add the authentication services, call the `AddAuthentication` method. To enable cookie authentication, call the `AddCookie` method.

Next, configure the OIDC authentication handler. Add a call to `AddOpenIdConnect`. Configure the necessary parameters, such as `ClientId`, `ClientSecret`, `ResponseType`, and not least the `Authority`. The latter is used by the middleware to get the metadata describing the relevant endpoints, the signing keys etc.

The OIDC middleware requests both the `openid` and `profile` scopes by default, but note that Criipto Verify by nature returns only the information derived from the underlying e-ID service. Changing the scopes does not affect the amount and nature of information delivered from the user information endpoint.

```cs
// Startup.cs

public void ConfigureServices(IServiceCollection services)
{
    services.Configure<CookiePolicyOptions>(options =>
    {
        // This lambda determines whether user consent for non-essential cookies is needed for a given request.
        options.CheckConsentNeeded = context => true;
        options.MinimumSameSitePolicy = SameSiteMode.None;
    });

    services.AddAuthentication(options => {
        options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
    })
    .AddCookie()
    .AddOpenIdConnect(options => {
        options.ClientId = Configuration["Criipto:ClientId"]; // ClientID from application registration
        options.ClientSecret = Configuration["Criipto:ClientSecret"]; // Client from application registration
        options.Authority = $"https://{Configuration["Criipto:Domain"]}/"; // Domain from application registration
        options.ResponseType = "code";

        // The next to settings must match the Callback URLs in Criipto Verify
        options.CallbackPath = new PathString("/callback"); 
        options.SignedOutCallbackPath = new PathString("/signout");

        // Hook up an event handler to set the acr_value of the authorize request
        // In a real world implementation this is probably a bit more flexible
        options.Events = new OpenIdConnectEvents() {
            OnRedirectToIdentityProvider = context => {
                context.ProtocolMessage.AcrValues = context.Request.Query["loginmethod"];
                return Task.FromResult(0);
            }
        };
    });

    services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
}
```

_Note_ that the above code dynamically sets the `AcrValues` by picking it from the query string. In the general case, this may, of course, be set in other ways. Just note that it is dynamically set at the time of the actual login.

<a name="loginmethod"></a>
### Choosing the specific login method

{% include snippets/login-methods.md %}

### Enable the OpenID Connect middleware

Next, add the authentication middleware. In the `Configure` method of the `Startup` class, call the `UseAuthentication` method.

```csharp
// Startup.cs

public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }
    else
    {
        app.UseExceptionHandler("/Home/Error");
        app.UseHsts();
    }

    app.UseHttpsRedirection();
    app.UseStaticFiles();
    app.UseCookiePolicy();

    app.UseAuthentication();

    app.UseMvc(routes =>
    {
        routes.MapRoute(
            name: "default",
            template: "{controller=Home}/{action=Index}/{id?}");
    });
}
```

<a name="trigger"></a>
## Trigger Login and Logout in Your Application

After the middleware for performing the authentication is wired up, the next step is to perform the actual authentication.

### Protected resources trigger login

One way to trigger the authentication flow is to tag routes in ASP.NET MVC with the `Authorize`. This is a way of telling the framework to only allow requests from authenticated users.

```csharp
[Authorize] // If not already authenticated, this kicks off the process
public IActionResult Protected()
{
    return View();
}
```

Note that you may plug in your own Authorization handlers derived from `Microsoft.AspNetCore.Authorization.AuthorizationHandler<TRequirement>` to add additional guards beyond just authentication.

### Explicit logout

Logout requires both terminating the local session by removing the cookies as well as telling Criipto Verify that the session is over.

```csharp
public async Task Logout()
{
    // Call the server to terminate the session
    await HttpContext.SignOutAsync(OpenIdConnectDefaults.AuthenticationScheme);

    // Remove authnetication cookies
    await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
}
``` 

<a name="testusers"></a>

### Test users

{% include snippets/test-users.md %}

<a name="production"></a>

## The runtime flow

In summary, the steps above will lead to a runtime flow looks like this:

1. The web server starts the application which configures and initializes the OpenID Connect middleware. The middleware is configured with a URL from which it retrieves the metadata describing the various endpoints and encryption keys, such as the token and userinfo endpoints as well the token signing certificates
2. The user picks the login method, or the application is hardcoded to one of the [authentication options](#loginmethod)
2. A request for a resource protected by the `[Authorization]` kicks off the OIDC middleware login flow
3. The user's browser is redirected to the Criipto Verify service where actual login happens
4. A callback with an issued _authorization code_ is sent back to the application and intercepted by the OIDC middleware
5. The middleware calls the Criipto Verify service to exchange the code for an _access token_. Note that this is a direct server to server call which - unlike the other communication - does not pass through the browser
6. The access token is used by the OIDC middleware to retrieve the available user information which is set as claims on the user principal.

If you want to inspect what is actually going on you may see much of it if you use for example chrome and turn on the developer tools to inspect the network traffic.

## Setting up for Production

{% include snippets/set-up-production.md %}