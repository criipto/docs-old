---
layout: article
title: Criipto Documentation - e-ID method
description: How to specify which e-ID method to use for a login flow
---

# Choosing the e-ID method used for a login
Criipto Verify expects client applications to explicitly specify which e-ID method to use in each request for authentication. There is no built-in "method selector" page.

The recommended way of choosing the e-ID method is by specifying either an `acr_values` (OIDC) or `wauth` (WS-Federation) query parameter with one of the supported values. This is a straightforward excercise in most clients technologies when you integrate directly with Criipto Verify. You can see the list of [supported values here](/how-to/acr_values).

In some cases, however, you don't have an option to control how (or if) this parameter is set at runtime. That is known to be the case when you are working with a more advanced setup, where your client application connects to Criipto Verify via an intermediary identity provider, or if you use certain SaaS offerings that do not provide you with much flexibility with respect to connecting to external identity providers such as Criipto Verify.
To cater for such scenarios, Criipto Verify supports a few other "sources" of the value of the desired e-ID method.

The first option is to embed it in the URL path that your client application uses to request authentication on [as described in detail here](/how-to/work-with-metadata). This approach works for both OIDC and WS-Federation, but is typically something you set up during configuration time, so it is not terribly flexible, and you may end up with quite a few connections to Criipto Verify if you need to offer more than one type of e-ID.

The second option (currently only supported for OIDC) is to embed it in the `login_hint` query parameter. Some intermediaries will take any value in the `login_hint` parameter that your client application sends to them, and pass them on to "upstream" systems such as Criipto Verify. This let's your client application have full control over the flow, and also typically requires the minimum amount of configuration between your intermediary and Criipto Verify.

You must use the following generic format for the value you put into the `login_hint` query parameter:
```
login_hint=acr_values:<desired acr_value>

```
***Note*** The separator between the `acr_values` token and the actual value is a colon (`:`).

As an example, when you want same-device Swedish BankID, send the following:
```
login_hint=acr_values:urn:grn:authn:se:bankid:same-device
```
