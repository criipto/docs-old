---
layout: article
title: Criipto Documentation - authentication sessions
description: How to control the session behavior of your Criipto Verify domain
---

# Overview
Enabling `Single Sign-On` (aka `SSO`) for a Criipto Verify domain will let your users get access to several of your systems with a minimum of effort. They will only be prompted for a login once per browsing session when you are using `SSO`. Subsequent authentication requests on the same domain (and for the same e-ID method) will be completed automatically by Criipto Verify, which can substantially reduce the percieved UX friction.

We will refer to your Verify domain as `VERIFY_DOMAIN` in the following.

The session information is maintained in `HTTP-only`, `Secure` cookies, created with `SameSite=None`, so the session can be established and maintained even if your users access your Criipto Verify domain in third-party context. The cookies are set on your `VERIFY_DOMAIN`.

## How to enable (and disable) SSO
You can enable and disable `SSO` per DNS domain in using the management dashboard for Criipto Verify. Go to the `Domains` tab on [manage.criipto.id](https://manage.criipto.id) and expand the details view for `VERIFY_DOMAIN`. The following options are available:

![Single Sign-On Settings](/images/sso-settings-for-domain.png)

## Per-request options
You can tweak this behavior on a per-authentication-request basis by specifying an additional query parameter in the request for authentication. There are 2 options: 
- `Silent check`: Check if the user has an existing session (Criipto Verify will never require any user interactions in this case)
- `Forced login`: Ignore an existing session and force a new login

Send the following query parameter to do this:
```text
- Silent check: prompt=none
- Forced login: prompt=login
```

***Note***_If you are using WS-Federation, and hawe to use a library that only supports standard parameters, you can achieve the same effect via the `wfresh` parameter. Specify `wfresh=-1` for a `Silent check` and `wfresh=0` for a `Forced login`_

If you send a `prompt=none` and the user has no session, an error response will be sent back to your `Callback URL` with an `error=login_required` value.

## Single LogOut (SLO)
If you are leveraging `SSO` to make it easier for your users to get access to your systems, offering them a simple way of terminating these sessions again is considered `Best Practice` (a frequently abused term in IT, but it is a reasonable assessment for this particular case). In some cases, it will be required by your IT-Security department, or perhaps even by regulatory standards for your business domain.

Depending on which authentication protocol, you can initiate a `Single LogOut` (aka `SLO`) flow by sending the users browser to one of the following URL's:

### OIDC
 `https://VERIFY_DOMAIN/oauth2/logout?post_logout_redirect_uri=a_pre-registered_callback_url`
### WS-Fed
 `https://VERIFY_DOMAIN/passive/federation?wa=wsignout1.0&wreply=a_pre-registered_callback_url`

