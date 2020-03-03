---
layout: article
---

# Migrate ASP.NET Core v2.x sample to v3.x

This tutorial demonstrates how to migrate ASP.NET Core v2.x [sample from GitHub](https://github.com/criipto/aspnetcore-oidc-sample) to ASP.NET Core v3.x

Before proceeding, make sure you have the appropriate ASP.NET Core 3.x SDK.

Following steps are required to complete your first test login:
1. [Modify aspnetcore-oidc project file](#project)
2. [Restore dependencies](#restore)
2. [Modify Startup.cs file](#startup)

<a name="project"></a>

## Modify aspnetcore-oidc project file

1. Change the `TargetFramework` from `netcoreapp2.2` to `netcoreapp3.1`.
2. Remove the following line from the `PropertyGroup`
  ``` xml
    <AspNetCoreHostingModel>InProcess</AspNetCoreHostingModel>
  ```

3. Remove following `PackageReference` entries from `ItemGroup`
  ``` xml
    <PackageReference Include="Microsoft.AspNetCore.App" />
    <PackageReference Include="Microsoft.AspNetCore.Razor.Design" Version="2.2.0" PrivateAssets="All" />
  ```

3. Add following `PackageReference` entries to the `ItemGroup`
  ``` xml
    <PackageReference Include="Microsoft.AspNetCore.Authentication.Cookies" Version="2.2.0" />
    <PackageReference Include="Microsoft.AspNetCore.Authentication.OpenIdConnect" Version="3.1.1" />
  ```


<a name="restore"></a>

## Restore dependencies

Restore dependencies to make sure they are compatible with a new version of .NET Core.

Run the following comand:

``` console
  dotnet restore
```

<a name="startup"></a>

## Modify Startup.cs file

1. In the `ConfigureServices` method, remove the `SetCompatibilityVersion` method. Change the line 
  ``` cs
    services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
  ```  
  into 
  ``` cs
    services.AddMvc();
  ```

2. In the `Configure` method, change the second argument's type from `IHostingEnvironment` to `IWebHostEnvironment`.
3. Add the following `using`
  ``` cs
    using Microsoft.Extensions.Hosting;
  ```
4. Add `app.UseRouting();` before `app.UseAuthentication();`.
5. Add `app.UseAuthorization();` after `app.UseAuthentication();`.
6. Replace the following code from the `Configure` method
  ``` cs
    app.UseMvc(routes =>
    {
        routes.MapRoute(
            name: "default",
            template: "{controller=Home}/{action=Index}/{id?}");
    });
  ```
  with
  ``` cs
    app.UseEndpoints(routes =>
    {
        routes.MapControllerRoute("default", "{controller=Home}/{action=Index}/{id?}");
    });
  ```