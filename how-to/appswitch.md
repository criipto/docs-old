---
layout: article
title: Criipto Documentation - using Criipto Verify app-switcing
description: Use Criipto Verify in app-switch mode
---

# App switching

If you are building a native app, and would like to get the smoothest possible UX, you can use Criipto Verify's app-switching capabilities (for e-ID's that support it).

This will require that you take on a bit more work to orchestrate the login process in comparison with just going with the browser-based flow, but the net result is a much better UX.

You should always start by detecting the presence of the native e-ID app on the users device.
The implementation of this check is OS dependent, so you need to consult the platform's documentation for guidance.

If the desired app is present on the users device, you must augment the authorize request you send to Criipto Verify with one of the following values (also OS dependent)

 - `login_hint=appswitch:ios`
 - `login_hint=appswitch:android`

Your app is responsible for sending the appropriate value for the platform it is deployed on.

## Swedish BankID
App switch is supported for the same-device login flow (`acr_values=urn:grn:authn:se:bankid:same-device`).

We recommend that you use `response_mode=query` for this flow.

For the `redirect_uri` in the authorize request, you can experiment with using either a universal link for your app, or a custom file handler. Which one is more robust depends on the version of the OS you are on. Newer OS versions typically work best with universal links.

The response to the authorize request will change to `200 OK` with a JSON payload of format along the lines of:
```json
{
  "launchLinks": {
    "universalLink": "https://app.bankid.com/?autostarttoken=...&redirect=...",
    "customFileHandlerUrl": "bankid:///?autostarttoken=...&redirect=..."
  },
  "cancelUrl": "...",
  "completeUrl": "..."
}
```

{% iconnote info %}

The value of the redirect parameter depends on the supplied platform in the `login_hint=appswitch:...` parameter.
If the app sends the wrong parameter, the flow cannot be expected to work correctly.

{% endiconnote %}

Your app must use one of the `launchLinks` values to open the native BankID app. 
The `universalLink` is recommended, but some older platforms may only support the `customFileHandlerUrl` syntax.
We provide both so you can target the widest possible range of OS versions.

The `cancelUrl` can be used to to stop an active authentication request.
This can be useful in case 
- You are pre-filling the SSN
- The user does not complete the authentication in the BankID application
- The user navigates manually back to your app
When that happens, the BankID login for the specified SSN is blocked for a few minutes, unless you cancel the login.

When control returns to your app, issue an HTTP GET to the `completeUrl` (without any modifications).
Expect an OAuth2-formatted response.
The response will be either a `302 Redirect` (with a `Location` HTTP response header value), or a `400 Bad Request`.

- `302 Redirect`: The Location response header value value will be a URL where the relevant response parameters are in the query section (if you used response_mode=query as recommended above). You should start by checking for errors (an "error" query parameter will be present in the response). If not an error, pick out the "code" and "state" parameters and use your OIDC library to exhange the code to an id_token.

- `400 Bad Request`: Can have several causes, we recommend that you invoke the `cancelUrl` and present the user with the option to login again.

## Danish MitID

You must (still) use a either a `Custom Tab` (on `Android`) or an `SFAuthenticationSession` (on `iOS`) to run the login flow in your app, but an app-switch button will show up in the MitID Core Client, allowing the user to launch the MitID app from the browser.

{% iconnote info %}

On `iOS`, you can also use an `SFSafariViewController` if the `SFAuthenticationSession` is unavailable.

{% endiconnote %}

Once the flow completes, the MitID app will perform an app-switch back to your app, which makes the `Custom Tab` / `SFAuthenticationSession` resume its operation, thus completing the login process by issuing an `OAuth2` formatted response to your native app.