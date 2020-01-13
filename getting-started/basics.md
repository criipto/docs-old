---
layout: article
title: Learn the Basics
description: Learn the basics of Criipto and familiarize yourself with the terminology.
---
# Learn the Basics

This document explains some of the basic terminology we use at Criipto, and we try to relate these terms to concepts you are already familiar with. 

This article introduces some of the core concepts of Criipto: **Tenants**, **Domains**, **Applications**, and **Identity Sources**. Each is explained in the following.

{% iconnote note %}
One important distinction in Criipto Verify is the separation of **Test** and **Production**. Inside each tenant, you may toggle the setup between Test and Production to configure each environment separately.

To set up a production domain you must first upgrade your free subscription to a paid subscription.  
{% endiconnote %}

For illustration purposes, we will use a fictitious company named `Secure Insurance` that wants to use Criipto for authentication. They have a web application, and they want their users to be able to log in with Swedish BankID and Danish NemID.

## Tenants

If you haven't done so already [signed up](https://Criipto.com/) for a Criipto account, feel free - it's free. 

When you signup for the first time you will be asked to create your first tenant and your first _domain_ along with it. In Criipto, a tenant is the **logical isolation unit** that isolates you and your data from other Criipto tenants. The term describes a software architecture where a single instance of the software serves multiple tenants. No tenant can access the instance of another tenant, even though the software may be running on the same machine.

Tenant characteristics:

- The tenant name has to be unique. It is used primarily for your reference and communication purposes and carries no formal significance.
- The tenant name cannot be changed after creation.
- You can create more than one tenant. Typically you may manage both your test and production setup inside a single tenant, but please create multiple tenants as it suits you, for example, one for each environment you have (such as Development, Staging, or Production) if you have separate teams working in each tenant.

You can create additional tenants at any time. To do so, go to the upper-right corner of the Dashboard and click on your own name/email to display the pulldown menu. Click **Create new...**.

## Domains

As discussed in the previous section, when you create a new account with Criipto, you also create your first domain. Typically, your first domain would be something like `secure-insurance-test.criipto.id`.

A domain in Criipto Verify is the domain on which you call our service to perform authentication. 

{% iconnote info %}
Domains are registered for either test or production and as such determines whether you can use test e-ID accounts or real, live e-ID accounts. 

As such, **the domain is the key separator between test and production.**
{% endiconnote %}

### Bring your own domain

For development and testing it is usually sufficient to just use the preconfigured `criipto.id` domain, but for production you may wish to map your own domain, such as `login.secure-insurance.com`, to point to Criipto Verify. In some secnarios this is required for technical security reasons, but you should also keep in mind the perception of your users. The may feel uncomfortable being taken to a third party domain to login. If instead you have mapped your own domain, your users may feel safer as they are being keept in the realm of your company and application.

If you choose to set up your own domain for production you must have access to your company's _DNS setup_ and be able to aquire a socalled _SSL certificate_ which must be uploaded to the Criipto Verify service along with the setting of your DNS record.

## Applications

Once you've set up a tenant including the first test domain, you are ready to register your application to enable its use of our service for authentiation.  To that end, you must register each application. We use the term **application** to refer to an application (like [OAuth 2.0 does](https://tools.ietf.org/html/rfc6749#page-6)).

When you create an application in the **Applications** section of the management UI, we ask you to fill out a few required fields.

Each application is assigned a **Client ID** upon creation. This ID is used as the key to identify authentication requests made from your application. This is an alphanumeric string and it's the unique identifier for your application (such as `urn:my:application:identifier:6765`).

{% iconnote warning %}
Note that although you may change the client ID later, you should be very careful not to do so with out careful consideration of the fact that the application(s) using this client ID will have to be re-configured at the same time or they will stop working.
{% endiconnote %}

If you choose to use the _OAuth2 code flow_ - a flow where senstive information is exchanged through a back channel between servers -  another important piece of information is the **Client Secret**. Think of it as your application's password which **must be kept confidential at all times**. If anyone gains access to your Client Secret they can impersonate your application and access protected resources.

In our example, `Secure Insurance` has two apps: a web app (running on a server) and a mobile app. Hence, they would create two applications: one of type using the code flwo, and one using the `implicit flow`which requires no client secret.

## Identity Sources

Now that you have set up your **Applications**, you are ready to configure how your users will login. 

Criipto sits between your app and the Identity Srouces that authenticate your users (such as Norwegian BankID or Dutch DigiD). Through this level of abstraction, Criipto keeps your app isolated from any changes of the provider's implementation.

Each Identity Source can be shared among multiple applications. You may configure all the available Idenity Sources and then choose which of them to enable for each application.

{% iconnote info %}
Identity sources are already configured for test when you create a tenant. But to be able to use an Identity Source in production you will have to enter into some sort of formal agreement with the the provider of the particular type of e-ID.

In most cases this is handled through the intermediary of Criipto, although you may also have to set up direct agreements in countries such as Denmark and the Netherlands.

More detail on the formalities and process can be found in the section about [getting ready for real e-ID](/eid-specifics/order-eid).
{% endiconnote %}

## Where to go from here

In this article you familiarized yourself with several core concepts of Criipto. If you wish to learn more about the next steps in setting up Criipto, you can read more in the rest of the documentation.