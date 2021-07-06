---
layout: article
title: Criipto Documentation - e-ID method
description: How to specify which e-ID method to use for a login flow
---

# How to request a specific e-ID

When requesting authentication through Criipto Verify, you must specify exactly which kind of e-ID you want your end-user to use.  This often means you have to pre-select one out of several options per e-ID. For example, Swedish BankID allows three different methods, one for same-device login and two for another-device logins.
 
{% iconnote info %}

You can see the list of [supported values for e-ID methods here](/how-to/acr-values/).

{% endiconnote %}

In the following, you can find a description of the options you have for communicating a particular choice of e-ID method to Criipto Verify.

<a name="standards-based"></a>
## Recommended Option: The standards-based approach

The simplest way of specifying the e-ID method is to use the OpenID Connect (aka OIDC) `acr_values` query parameter. We recommend you use this approach if possible, which is also how the standard describes it.

This approach is a straightforward exercise in most client technologies when you integrate directly with Criipto Verify.

{% iconnote info %}

If you use the WS-Federation protocol, the corresponding query parameter is called `wauth`, which works precisely the same as for OIDC.

{% endiconnote %}

However, there are cases where you do not have control over how/if this parameter is set at runtime. That can be the case when you are working in a less flexible setup, such as
 - Connecting your client application to Criipto Verify via an intermediary identity provider
 - Connecting SaaS-based solutions with Criipto Verify

{% iconnote info %}

Some intermediaries treat the OIDC and WS-Federation protocols differently when relaying the `acr_values` / `wauth` query parameters. We recommend that you test this explicitly before considering the alternatives below.

{% endiconnote %}

If you have such a non-standard case, we support the following alternatives:

<a name="path-embedded"></a>

## Alternative 1: Embed e-ID method in the URL-path

You can embed the chosen e-ID method in the _path_ part of the URL used by the client application to request authentication as [described in detail here](/how-to/work-with-metadata). 

It works by placing (an encoded variant of) the e-ID method value in a dedicated URL _path segment_, instead of sending it in the `acr_values` query parameter.

Basically, the anatomy of the authorize request changes from "/oauth2/authorize?...&**acr_values=urn:grn:authn:se:bankid**&..." to "/**dXJuOmdybjphdXRobjpzZTpiYW5raWQ=**/oauth2/authorize?...", where `dXJuOmdybjphdXRobjpzZTpiYW5raWQ=` is the base64-url encoded value of `urn:grn:authn:se:bankid`.

{% iconnote info %}

The same syntax applies to metadata endpoints, so you can fetch an e-ID method specific OIDC discovery document for SE BankID pick-device from, say:
```
https://yourdomain.criipto.id/dXJuOmdybjphdXRobjpzZTpiYW5raWQ=/.well-known/openid-configuration
```

{% endiconnote %}

This approach works for both OIDC and WS-Federation. It is typically set up as a static configuration which makes it less flexible.


<a name="login-hint-embedded"></a>

## Alternative 2: Embedded in the login_hint query parameter (OIDC only)
Specifically for OIDC, some intermediate services, for example, Auth0, will relay a provided `login_hint` to upstream identity providers such as Criipto. You can take advantage of that to communicate the choice of e-ID method.

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

<a name="http-header"></a>

## Alternative 3: In an HTTP header (OIDC only)
You can also send the targeted e-ID method in an `acr_values` HTTP request header:
```
acr_values: <e-ID method>
```

## Order of precedence 

Each of the above e-ID method options, in order of precedence:

1. `acr_values` query parameter
2. `login_hint` embedded
3. An HTTP header named `acr_values`
3. URL _path segment_ with encoded e-ID method value

## Can't make any of the options work for you?
Drop us a message on <a href="mailto:support@criipto.com">support@criipto.com</a> with a description of your scenario if you are not able to make the above work for you.
