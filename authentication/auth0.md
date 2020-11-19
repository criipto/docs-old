---
layout: article
---

# Auth0

This tutorial demonstrates how to integrate Criipto Verify with Auth0. Following steps are required to complete your first login:

1. [Register your Auth0 tenant in Criipto Verify](#register)
2. [Configure your OAuth2 flow](#enable)
3. [Create Auth0 connections](#auth0-connection)
4. [Integrate your application with Auth0](#integrate)

In the follwoing you will be configuring first Criipto Verify, then Auth0, and finally finishing the Criipto Verify configuration
with the information you get from Auth0. Once configured you may test that everything works from Auth0.


<a name="register"></a>

## Register your Auth0 tenant in Criipto Verify

First, you must register your Auth0 tenant as an application in Criipto Verify.

Once you register your Auth0 tenant, you will also need some of the information for configuring Auth0 to communicate with Criipto Verify. You get these details from the settings of the application in the dashboard.

Specifically you need the following information to integrate with Auth0:

- _Client ID_ to identify you application to Criipto Verify. In the case below we chose `urn:criipto:samples:no1`
- _Domain_ on which you will be communicating with Criipto Verify. Could be for example `samples.criipto.id`
- _Client secret_ is needed if you choose the *Back Channel* approach - which we do recommend. 
The secret is generated and copied as describe further down.

![Register App](/images/register-app.png)

<a name="enable"></a>

## Configure the OAuth2 code flow

{% include snippets/oauth2-code-flow.md %}


<a name="auth0-connection"></a>

## Create Auth0 connections

To integrate Criipto Verify with Auth0, you create an Auth0 OpenID Connect connection to communicate with Criipto Verify. Because Auth0 will not pass the `acr_values` to Criipto Verify, you will have to create a new connection for every e-ID option that you intend to use. (`acr_values` is a parameter in the `/authorize` request to Criipto Verify needed to specify which kind of e-ID is requested)

For those cases, you can leverage our login-method specific metadata endpoints. Each of these contain an embedded and base64-encoded variant of the ‘raw’ value normally supplied in the `acr_values`.

Syntax:

- `https://yourdomain.criipto.id/BASE64(acr_values)/.well-known/openid-configuration`

For example, the `acr_values` of Norwegian BankID login method is `urn:grn:authn:no:bankid`. This translates to `dXJuOmdybjphdXRobjpubzpiYW5raWQ=` in base64 (UTF-8 charset), so the metadata endpoint will be:

- `https://yourdomain.criipto.id/dXJuOmdybjphdXRobjpubzpiYW5raWQ=/.well-known/openid-configuration`

### Choose the specific login method

Below is a list of supported login methods with corresponding base64 encoded `acr_values`. Choose the once you intend to use.

| **Login method** | **acr_values** | **base64 encoded** |
| **Norwegian BankID** |
| &nbsp;&nbsp;Mobile or Web (user choice):&nbsp;         | `urn:grn:authn:no:bankid` | `dXJuOmdybjphdXRobjpubzpiYW5raWQ=` |
| **Norwegian Vipps Login** |
| &nbsp;&nbsp;Login with Vipps app:&nbsp;                | `urn:grn:authn:no:vipps` | `dXJuOmdybjphdXRobjpubzp2aXBwcw==` |
| **Swedish BankID** |
| &nbsp;&nbsp;Same device:                               | `urn:grn:authn:se:bankid:same-device` | `dXJuOmdybjphdXRobjpzZTpiYW5raWQ6c2FtZS1kZXZpY2U=` |
| &nbsp;&nbsp;Another device (aka mobile):&nbsp;         | `urn:grn:authn:se:bankid:another-device` | `dXJuOmdybjphdXRobjpzZTpiYW5raWQ6YW5vdGhlci1kZXZpY2U=` |
| **Danish NemID** |
| &nbsp;&nbsp;Personal with code card:&nbsp;             | `urn:grn:authn:dk:nemid:poces` | `dXJuOmdybjphdXRobjpkazpuZW1pZDpwb2Nlcw==` |
| &nbsp;&nbsp;Employee with code card:&nbsp;             | `urn:grn:authn:dk:nemid:moces` | `dXJuOmdybjphdXRobjpkazpuZW1pZDptb2Nlcw==` |
| &nbsp;&nbsp;Employee with code file:&nbsp;             | `urn:grn:authn:dk:nemid:moces:codefile` | `dXJuOmdybjphdXRobjpkazpuZW1pZDptb2Nlczpjb2RlZmlsZQ==` |
| **Finish e-ID** |
| &nbsp;&nbsp;BankID:                                    |`urn:grn:authn:fi:bankid` | `dXJuOmdybjphdXRobjpmaTpiYW5raWQ=` |
| &nbsp;&nbsp;Mobile certificate (Mobiilivarmenne):&nbsp;|`urn:grn:authn:fi:mobile-id` | `dXJuOmdybjphdXRobjpmaTptb2JpbGUtaWQ=` |
| &nbsp;&nbsp;Any of the two:                            |`urn:grn:authn:fi:all` | `dXJuOmdybjphdXRobjpmaTphbGw=` |

<hr />

### Create the OIDC connection(s)
You create an OIDC connection for every login method you intend to use.

1. Go to Auth0 dashboard for your tenant and under **Connections** chose **Enterprise**.
2. Select **OpenID Connect** and create a new connection.
3. Enter **Connection name** and **Display name**.
4. Under **Issuer URL** enter the login-method specific URL, as described above.
5. Choose _Front Channel_ or _Back Channel_ as a **Type**, depending on how you intend to integrate it with you application.
  -  you should choose _Front Channel_ only if you are developing pure SPA application. In that case, make sure to enable _Callback on location hash_ in Criipto application management, instead  of OAuth2 Code Flow. Otherwise choose _Back Channel_.
6. Under **Client ID** enter **Client ID/Realm** from your Criipto Verify application.
7. If you chose _Back Channel_ as a **Type**, enter **Client Secret** generated by Criipto Verify when you enabled the OAuth2 Code Flow.
8. Copy the **Callback URL** generated by Auth0 and enter it under **Callback URLs** in Criipto Verify application management.
9. Select **Save changes**.
10. Make sure to enable created connection for your Auth0 application.

{% iconnote note %}

After you save a connection, you may get an error: "Error! Something happened while trying to save your connection: Issuer metadata missing the following attributes: token_endpoint".

This is due to a bug in Auth0's frontend, nothing to worry about. In this case, under the **Issuer URL** select **Show Issuer Details** and under **Token Endpoint** enter `https://<YOUR COMPANY>.criipto.id/oauth2/token`

{% endiconnote %}

{% iconnote note %}

If you are creating multiple connections, you have to enter **Callback URL** only once. It will be the same for every OpenID Connect connection.

{% endiconnote %}

### Test the connection

To test your OpenID Connect connection, go back to the list of all OpenID Connect connections and select **Try** button on the right side of the connection you want to test.

### Test users

{% include snippets/test-users.md %}

<a name="integrate"></a>

## Integrate your application with Auth0

How to integrate your application with Auth0 depends on the technology you are working with. Refere to the [Auth0 quickstart guide](https://auth0.com/docs/quickstarts/) for more details.