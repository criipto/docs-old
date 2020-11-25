---
layout: article
title: Criipto Documentation - Add Criipto Verify to Okta
description: Add Criipto Verify as an OIDC Connection to your Okta tenant
---

# Okta

This tutorial demonstrates how to integrate Criipto Verify with Okta. The following steps are required to complete your first login:

1. [Register your Okta tenant in Criipto Verify](#register)
2. [Configure your OAuth2 flow](#enable)
3. [Create Criipto Verify identity provider in Okta](#okta-identityprovider)
4. [Integrate your application with Okta](#integrate)

In the following you will be configuring first Criipto Verify, then Okta.
Once configured you may test that everything works from Okta.


The setup requires a bit of switching back-and-forth between Criipto and Okta's respective management dashboards, so we recommend that you have them open simultaneously to make the process really smooth.

Before you get started, you will need the following information:
- The callback URL for your Okta tenant - this will depend on the DNS name you use in Okta for running your logins. The value will probably look something like `https://your-company-name.okta.com/oauth2/v1/authorize/callback`, but check your Okta settings to make sure. We have use `criipto-samples` as a replacement for `your-company-name` in this tutorial.
- _[Optional]_ The `post_logout_redirect_url` for your Okta tenant.

<a name="register"></a>

## Register your Okta tenant in Criipto Verify

First, you must register your Okta tenant as an application in Criipto Verify.

Once you register your Okta tenant, you will also need some of the information for configuring Okta to communicate with Criipto Verify. You get these details from the settings of the application in the dashboard.

Specifically you need the following information to integrate with Okta:

- _Client ID_ to identify your Okta tenant to Criipto Verify. In the case below we chose `urn:criipto:verify`
- _Domain_ on which you will be communicating with Criipto Verify. Could be for example `samples.criipto.id`
- _Client secret_ which Okta needs to fetch actual user information from Criipto Verify during login.
The secret is generated and copied as describe further down.

![Register App](/images/okta-register-application.png)

If you plan on using single-signon, you must also register your Okta `post_logout_redirect_url` here so you can run single-logouts.

<a name="enable"></a>

## Configure the OAuth2 code flow

{% include snippets/oauth2-code-flow.md %}

<a name="okta-identityprovider"></a>

## Create Okta identity provider
Make sure you are in `Classic UI` mode, and click on the `Security -> Identity Providers` item.

![Identity Providers](/images/okta-identity-providers.png)

and click on the `Add Identity Provider` button, select `OIDC` for protocol.

![Add identity provider](/images/okta-add-identity-provider.png)

Select `Add OpenID Connect IdP`

![OIDC](/images/okta-add-oidc-identityprovider.png)

Fill in the form with values for you Criipto Verify application, similar to the following example

![Example identity provider](/images/okta-add-criipto-verify-example-identityprovider.png)

Given the values above, you must add
1. _Client ID_: `urn:criipto:verify`
2. _Client Secret_: The secret generated for you by Criipto Verify during the `OAuth code flow` setup
3. _Scopes_: `openid` will suffice
4. _Issuer_: `https://samples.criipto.id`
5. _Authorization endpoint_: `https://samples.criipto.id/oauth2/authorize`
6. _Token endpoint_: `https://samples.criipto.id/oauth2/token`
7. _JWKS endpoint_: `https://samples.criipto.id/.well-known/jwks`

The _Name_ is entirely up to you, and you don't have to specify the optional _Userinfo endpoint_ if you at the same time ensure that you configure your Criipto Verify application to use `fromTokenEndpoint` in the `User info response strategy` dropdown.

{% include snippets/test-users.md %}

{% iconnote note %}
You can [find more details here](https://developer.okta.com/docs/guides/add-an-external-idp/openidconnect/configure-idp-in-okta/)
{% endiconnote %}

### Test users

{% include snippets/test-users.md %}

<a name="integrate"></a>

## Integrate your own application with Okta

How to integrate your application with Okta depends on the technology you are working with. Refer to the [Okta developer documentation](https://developer.okta.com/docs/) for more details.