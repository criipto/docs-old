---
title: Criipto Verify Integration Troubleshooting
description: Troubleshoot your integration to Criipto Verify
layout: article
---
# Troubleshooting you integration to Criipto Verify

You may from time to time run into various issues when setting up the connection from you application to Criipto Verify. 
Quite ofen any problems you run into may for example boil down to errors in configuring the OIDC module of your platform.


## Typical error scenarios
The most common source of problems is caused by incomplete or incorrect requests for authentication.
For example, if your request for authentication may be missing the `acr_values` parameter in OpenID Connect or 
you may have specified an urecognized value.

Parameters like this are optional parameters in the specifications, and most client-side frameworks/libraries must be explicitly configured to add them to the request for authentication. With Criipto Verify you must supply this value to be able to start any specific login flow.

{% iconnote note %}

Particularly for transfering the `acr_values` parameter Criipto Verify has a few workarounds to support more advanced architectures as well as some of the more restrictive platform. Check out how to [specify the e-ID method](/how-to/choose-eid-method) for more detail.

{% endiconnote %}

Other common examples are wrong `client_id` or `redirect_uri` parameter values that have not been pre-registered for your application in our management UI.

Most of these scenarios will typically result in an error message directly in the browser (sometimes disguised as a fallback error message with the following wording: `Internal error - WS-Federation sign-in request dispatch cannot be handled`).

## Browser Developer Tools
Also be sure to use the developer tools in your browser for digging a bit deeper, such as the network tracing available in Chrome.
You will be able to see more details there, as all interactions with Criipto Verify are HTTP-based, and errors and warnings in the Console tab can sometimes point you in the right direction.


![Developer tools](/images/chrome-devtools.png)


## Logs

Should you run into issues on backchannel requests (such as when using the `code` flow in OpenID Connect), you can see more details on the logs on the [subscriptions site](https://subscription.criipto.com): Go to the `Logs` tab and select the relevant domain in the dropdown.

We expose a lot of details for test domains, which can hopefully help you find the source of the problem (such as a wrong client secret). Logs for production domains are currently not available.
