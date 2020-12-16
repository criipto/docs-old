---
layout: article
title: Criipto Documentation - Add Criipto Verify to PingFederate
description: Add Criipto Verify as an OIDC Connection to your PingFederate tenant
---

# PingFederate

This tutorial demonstrates how to integrate Criipto Verify with PingFederate. The following steps are required to complete your first login:

1. [Prepare an application in Criipto Verify that represents your PingFederate tenant](#prepare-verify-app-config)
2. [Create an authentication source in your PingFederate tenant which connects to the Criipto Verify application](#create-auth-source)
3. [Complete the application configuration in Criipto Verify](#complete-verify-app-config)
4. [Integrate your own application with PingFederate](#integrate)

In the following you will be configuring first Criipto Verify, then PingFederate, and then back to finalizing the configuration in Criipto Verify.

The final step in this excercise is needed because of a catch-22 between the requirements of the configuration steps on the two platforms, respectively:
 - Creating an application in Criipto Verify requires you to specify a callback URL to PingFederate before you can save the application configuration and get your hands on the generated client secret.
 - Getting the callback URL to PingFederate requires that you create an authentication source, which in turn requires the client secret from Criipto Verify, but you don't have the secret yet because you need the callback URL `[deadlock detected]`

which _is_ a bit of a chicken-and-egg-problem, unfortunately. We suggest that you break the deadlock by configuring a temporary (bogus) callback URL in the first step in Criipto Verify, and then replace it with the actual value available after the authentication source is created.

As the setup requires some switching back-and-forth between Criipto and PingFederate's respective management dashboards, we recommend that you have them open simultaneously to make the process fairly smooth.

Once configured you may test that everything works from PingFederate's `OAuth Playground`.

<a name="prepare-verify-app-config"></a>

## Prepare Criipto Verify application

First, you must register your PingFederate tenant as an application in Criipto Verify.

Once you register your PingFederate tenant, you will also need some of the information for configuring PingFederate to communicate with Criipto Verify. You get these details from the settings of the application in the dashboard.

Specifically you need the following information to integrate with PingFederate:

- _Client ID_ to identify your PingFederate tenant to Criipto Verify. In the case below we chose `urn:criipto:verify`
- _Domain_ on which you will be communicating with Criipto Verify. Could be for example `samples.criipto.id`
- _Client secret_ which PingFederate needs to fetch actual user information from Criipto Verify during login.
The secret is generated when you save the new application.

![Prepare App](/images/pingfederate-prepare-application.png)

Click the **Save** button - and a popup will appear after a little while with your client secret.
Make a copy of it (preferably by pasting it directly into your PingFederate authentication source configuration).

The application details pane will be hidden automatically - you can expand it again by clicking anywhere on the line item with the name of your new application (in this article, that would be `PingFederate`).

<a name="create-auth-source"></a>

## Create PingFederate authentication source

On the dashboard of your PingFederate tenant, go to the `Authentication` tab and click on the `IdP Connections` tile.
- Click **Create Connection**
- Enable `BROWSER SSO PROFILES` in `Connection Type`
  - Choose `OpenID Connect` in the `PROTOCOL` dropdown
- Choose `BROWSER SSO` in `Connection Options`
- Assuming your actual Criipto Verify _Domain_ is `acme-corp.criipto.id`, type `https://acme-corp.criipto.id/` in the `ISSUER` field and click the **Load Metadata** button
- Give the connection a recognizable name
- Copy and paste the `client id` and `client secret` values from your Criipto Verify application
- Click the **Next** button
- Click the **Configure Browser SSO** button
  - Select **NO MAPPING** and click **Save**
- Set up an `Attribute Contract` to map the claims you want to consume. You can find the available claim types [here](/getting-started/token-contents).
- Click the **Save** button and the callback URL becomes available.

<a name="complete-verify-app-config"></a>

## Complete the application configuration in Criipto Verify

Expand the details of the application configuration if you haven't already done so in the first step.

Replace the temporary callback URL (from step 1, `https://example.com` in this article) in your Criipto Verify application with the actual value now available from your PingFederate authentication source configuration and click the **Save** button.

{% iconnote note %}

If you plan on using single-signon, you must also register your PingFederate `post_logout_redirect_url` here so you can run single-logouts.

{% endiconnote %}

<a name="integrate"></a>

## Integrate your own application with PingFederate

How to integrate your application with PingFederate depends on the technology you are working with. Refer to the [PingFederate developer documentation](https://developer.pingidentity.com/en/cloud-software/pingfederate.html) for more details.

{% iconnote note %}

Note that PingFederate supports relaying of `login_hint` query parameter values to Criipto Verify. This is very useful for a variety of reasons, such as sending us [acr_values](/how-to/choose-eid-method#login-hint-embedded) or [prefilled fields](/how-to/specify-prefilled-fields) on a per-authorize-request basis.

It also makes you authentication source setup in PingFederate very smooth - you just need to register one, and reuse it for all the e-ID methods you need to consume.

{% endiconnote %}
