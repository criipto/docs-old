---
title: Criipto Verify Integration Troubleshooting
description: Learn more about how to troubleshoot your integration to Criipto Verify
layout: article
---
# Criipto Verify Integration Troubleshooting

## Typical error messages
The most common source of problems is caused by incomplete and/or incorrect requests for authentication.
For example, if the request for authentication lacks an `acr_values` (OpenID Connect) / `wauth` (WS-Federation) parameter:
These are optional parameters in the specifications, and most client-side frameworks/libraries must be explicitly configured to add them to the request for authentication. Criipto Verify needs the value to be able to start any particular login flow.

{% iconnote note %}

Criipto Verify has several workarounds in place for how you can pass these values, to cater for both more advanced architectures and for very restrictive platforms - see either [work with metadata](/how-to/work-with-metadata) or [choose e-ID method](/how-to/choose-eid-method) for more details.

{% endiconnote %}

Other common examples are wrong `client_id` / `wtrealm` values, or `redirect_uri` / `wreply` parameter values that have not been pre-registered for your application in our management UI.

These error cases will typically result in an error message you can see in the browser directly (sometimes in the disguise of a fallback error message with the following wording: `Internal error - WS-Federation sign-in request dispatch cannot be handled`).

## Browser Developer Tools
Digging a bit deeper using the developer tools that ships with most modern browsers is possible in some other cases.
You will be able to see more details there, as all interactions with Criipto Verify are HTTP-based.
Errors and warnings in the Console tab can sometimes point you in the right direction.

## Logs
Should you run into issues on backchannel requests (such as when using the `code` flow in OpenID Connect), you can see more details on the [subscriptions site](https://subscription.criipto.com) - go to the `Logs` tab and select the relevant domain in the dropdown.
We expose a lot of details for test domains, which can hopefully help you find the source of the problem (such as a wrong client secret).

For production domains, the logs are very limited. We only log failing requests there, do not display secrets, and most payloads are redacted.
