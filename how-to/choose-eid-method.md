---
layout: article
title: Criipto Documentation - e-ID method
description: How to specify which e-ID method to use for a login flow
---

# Which e-ID and specific e-ID method?

When requesting authentication through Criipto Verify you must specify exactly which kind of e-ID the user will use, often including 
a choice of one out of more options for each type. For example, Swedish BankID allows to different methods, either on the same device
or on another device.

The following descrribes you options for specifying which specific e-ID method you will request. 

You can see the list of [supported values for e-ID methods here](/how-to/acr-values/).

## Option 1: The standards-based approach

The recommended way of specifying the e-ID method is to send an `acr_values` as a query parameter when using OpenID Connect.  (If you  use WS-Federation, the choice is sent in the  `wauth` parameter). 

This is a straightforward excercise in most clients technologies when you integrate directly with Criipto Verify. 

In some cases, however, you don't have an option to control how (or if) this parameter is set at runtime. That can be the case when you are working in a less flexible setup, such as
 - Connecting your client application to Criipto Verify via an intermediary identity provider
 - Connecting SaaS-based solutions with Criipto Verify

In cases where you cannot specify the `acr_values` parameter please see below for ways to get around this.

## Option 2: Embed e-ID method in the URL-path

You can embed the chosen e-ID method in the URL path that your client application uses to request authentication on [as described in detail here](/how-to/work-with-metadata). This approach works for both OpenID Connect (OIDC) and WS-Federation, but is typically something you would set up during configuration time, so it is not very flexible.

Basially you encode the e-ID method, the value you would otherwise put in the `acr_values` query parameter. As an example consider the retrieval of the OIDC discovery document for Swedish BankID same device with a Base64 encoded `urn:grn:authn:se:bankid:same-device`:
```
https://yourdomain.criipto.id/dXJuOmdybjphdXRobjpzZTpiYW5raWQ6c2FtZS1kZXZpY2U=/.well-known/openid-configuration
```

## Option 3: Embedded in the login_hint query parameter (OIDC only)
Specifically for OpenID Connect some intermediate services, for example Auth0, will relay a provided `login_hint` to upstream  identity providers such as Criipto. Exploiting this option you may use this parameter to communicate the choice of e-ID method.

You must use the following format for the embedding:
```
login_hint=acr_values:<e-ID method>
```
***Note*** The separator between the `acr_values` token and the actual value is a colon (`:`).

As an example, when you want same-device Swedish BankID, send the following:
```
login_hint=acr_values:urn:grn:authn:se:bankid:same-device
```

You can also use this workaround in conjunction with sending other [prefilled fields](/how-to/specify-prefilled-fields) in the `login_hint`.

## Option 4: In a HTTP header (OIDC only)
You can also send the targeted e-ID method in an `acr_values` HTTP request header:
```
acr_values: <e-ID method>
```

## Order of precedence 

Each of the above e-ID method options in order of precedence:

1. `acr_values` specifies the chosen e-ID method
2. `login_hint` embeds the chosen e-ID method
3. An HTTP header named `acr_values` contains the chosen e-ID method
3. The URL-path contains an encoded e-ID method value 

## Can't make any of the options work for you?
Drop us a message on <a href="support@criipto.com">support@criipto.com</a> with a description of your scenario if you are not able to make the above work for you.
