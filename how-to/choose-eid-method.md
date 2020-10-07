---
layout: article
title: Criipto Documentation - e-ID method
description: How to specify which e-ID method to use for a login flow
---

# Choosing the e-ID method used for a login
Criipto Verify expects client applications to explicitly specify which e-ID method to use in each request for authentication. There is no built-in "method selector" page.

## The standards-based approach
The recommended way of specifying the e-ID method is to send either an `acr_values` (OIDC) or `wauth` (WS-Federation) query parameter with one of the supported values. This is a straightforward excercise in most clients technologies when you integrate directly with Criipto Verify. You can see the list of [supported values here](/how-to/acr_values).

In some cases, however, you don't have an option to control how (or if) this parameter is set at runtime. That can be the case when you are working in a less flexible setup, such as
 - Connecting your client application to Criipto Verify via an intermediary identity provider
 - Connecting SaaS-based solutions with Criipto Verify

To cater for such scenarios, Criipto Verify supports a few workarounds.

## Workaround #1: Embedded in the URL-path
You can embed the targeted e-ID method in the URL path that your client application uses to request authentication on [as described in detail here](/how-to/work-with-metadata). This approach works for both OIDC and WS-Federation, but is typically something you set up during configuration time, so it is not terribly flexible, and you may end up with quite a few connections to Criipto Verify if you need to offer more than one type of e-ID.

# OpenID Connect
We have found that the support for getting the standardized `acr_values` query parameter through to Criipto Verify via intermediaries or SaaS offerings is shaky, so we have added a few more options specific to this protocol.

## Workaround #2: Embedded in the login_hint query parameter (OIDC only)
We have found that many intermediaries _will_ relay the `login_hint` to external identity providers, so we have a workaround based on that query parameter.

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

## Workaround #3: In a HTTP header (OIDC only)
You can also send the targeted e-ID method in an `acr_values` HTTP request header:
```
acr_values: <e-ID method>
```

## Order of precedence for values sent via workarounds
1. `login_hint` embedded
2. HTTP header value
3. URL-path embedded

# WS-Federation
We have found that intermediaries tend to pass the `wauth` parameter value on to external identity providers, so we don't have any other workarounds for this protocol in place at the moment.

# Existing workarounds not usable in your case?
Drop us a message on support@criipto.com with a description of your scenario. We may be able to come up with yet another workaround to suit your needs.
