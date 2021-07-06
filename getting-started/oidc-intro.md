---
layout: article
title: Introduction to OpenID Connect
description: Learn the how Criipto supports the OpenID Connect protocol
---

# Using OpenID Connect to integrate vith Criipto Verify

Criipto Verify is integrated through the authentcation API which follows the OpenID Connect and OAuth2 specifications. 

{% iconnote note %}

Criipto Verify supports the OAuth2 *authorization code flow*, the *PKCE flow* and the (obsolete) *implicit flow* as described below. The code flow is used for traditional, server based, web applications which can keep a secret and are able to make back-channel calls to the Criipto Verify service. The PKCE (pronounced _pixy_) flow can be used by _public clients_ such as single page applications, SPAs, and native applications that cannot keep a secret. Support for the traditional implicit flow is being discontinued, although
it will continue to function on test domains for the foreseable future for simpler debugging during development.

{% endiconnote %}


The following describes the two flows and introduces the parameters to configure the authentication and subsequent user information retrieval.

{% iconnote info %}

Please beware that you don't have to go through the below motions manually. Most often it will be handled by configuring an OpenID Connect package on your platform of choice.

{% endiconnote %}


## Authenticate the User

To begin the login flow, you will need to authenticate the user at the identity source indicated in your request.

To authenticate the user, your app must send the user to the *OAuth2 authorization endpoint* with the appropriate set of parameters.

You can find the URL for the *OAuth2 authorization endpoint* in the OpenID Connect Discovery Document exposed on your Criipto Verify Domain:

```
GET https://YOUR_SUBDOMAIN.criipto.id/.well-known/openid-configuration
```

The response from this endpoint is a JSON document, with an `authorization_endpoint` property. The corresponding property value is the URL of the *OAuth2 authorization endpoint*.

### Example authentication URL

The following initiates the authentication through an OAuth2 authorization request:

```
GET https://YOUR_SUBDOMAIN.criipto.id/oauth2/authorize?
    response_type=code|id_token&
    client_id=CLIENT_ID&
    redirect_uri=YOUR_RETURN_URL&
    acr_values=CHOSEN_IDENTITY_SERVICE&
    scope=openid&
    state=YOUR_STATE
```

Note that providing `response_type=code` specifies that you want either the traditional back-channel *authorization code* flow or the *PKCE* flow. If you specify `response_type=id_token` you indicate that you want the *implicit flow*. In the implicit flow you receive the issued token in a query parameter on the return URL.

If you want to receive the response in another way you must specify the `response_mode` parameter, see below.

#### Parameters

| Parameter name  | Description |
|-----------------|-------------|
| `response_type` | Denotes the kind of credential that Criipto will return (`code` or `id_token`). If you are integrating a traditional server based web application (back-channel flow) or a *PKCE-enabled* client, use `code`. Use `id_token` for legacy single page applications using a front-channel flow |
| `client_id`     | Your application's Client ID. You can find this value in the Criipto Verify UI in the settings for actual application |
| `redirect_uri`  | The URL to which Criipto will redirect the browser after authentication has been completed. The authorization code and the `id_token` will be available in the `code` and `id_token` URL parameter for the back-channel flow and on a URL query parameter for the front-channel flow. This URL must be pre-registered as a valid callback URL in your application settings.<br /> <br /> **Warning:** Per the [OAuth 2.0 Specification](https://tools.ietf.org/html/rfc6749#section-3.1.2), Criipto removes everything after the hash and does *not* honor any fragments. |
| `scope`         | Specify `openid` |
| `acr_values`    | Identifies which e-ID identity service you want to use. You can only specify one value, and it must identify the exact type of identity service, as some countries have both e.g. a mobile and web based service. Possible values are [listed here](/how-to/acr-values). |
| `response_mode` | (optional) Specifies how you want your result delivered via the `redirect_uri`: Use `query` to return the `code`/`id_token` as a query parameter, `fragment` to have it delivered on a URL fragment, and finally `form_post` to have it posted back to your `redirect_uri`.  <br />  <br /> Default values are `query` for `response_type=code` and `query` for `response_type=id_token`. |
| `state`         | (optional but recommended) An opaque arbitrary alphanumeric string your app adds to the initial request that Criipto includes when redirecting back to your application. |
| `login_hint` | (optional) Some e-ID types will prompt users for input such as phone number or SSN. To avoid this you may pass these data in the `login_hint` as described [here](/how-to/specify-prefilled-fields). |


As an example, your HTML snippet for your authorization URL when adding login to your app might look like:

```html
<a href="https://acme-corp.criipto.id/oauth2/authorize?
  response_type=id_token&
  client_id=urn:debug:jwt.io&
  acr_values=urn:grn:authn:no:bankid&
  redirect_uri=https://jwt.io&
  scope=openid&
  state=etats">
  Sign in with Norwegian BankID
</a>
```

You can <a href="https://acme-corp.criipto.id/oauth2/authorize?response_type=id_token&client_id=urn:debug:jwt.io&acr_values=urn:grn:authn:no:bankid&redirect_uri=https://jwt.io&scope=openid&state=etats" target="_blank">try the above URL</a> right now if you have a [test user for Norwegian BankID](/how-to/test-users/#nobankid).

For more about how to handle the implicit flow, see below. 

### Response for back-channel code flow

For the code flow, when you used `response_type=code`, you will receive an `HTTP 302` response which redirects your browser to your specified `redirect_uri` with the authorization code included at the end of the URL:

```text
HTTP/1.1 302 Found
Location: YOUR_RETURN_URL?code=AUTHORIZATION_CODE&state=YOUR_STATE
```

#### Exchange the code for a token
For the code flow you will need to exchange the returned code for an actual token. This is done by posting the authorization code received from the previous step to the token endpoint.

For PKCE-enabled clients, this exchange is based on a one-time secret created by the OIDC library you use to handle the flow, and the exchange will also be handled by the same library.

For traditional back-channel flows, note that you must use a HTML-form-style HTTP POST here, and preferably send the credentials in the `Authorization` HTTP header. You must also x-www-form-urlencode the values of the `CLIENT_ID` and `CLIENT_SECRET`, respectively, before constructing the `Authorization` header in `Basic` format.


```text
HTTP POST https://YOUR_SUBDOMAIN.criipto.id/oauth2/token
Content-Type: application/x-www-form-urlencoded
Authorization: Basic <BASE64(xWwwFormUrlEncode(CLIENT_ID):xWwwFormUrlEncode(CLIENT_SECRET))>

grant_type=authorization_code&code=AUTHORIZATION_CODE&redirect_uri=YOUR_RETURN_URL
```

***Note*** _We do also support receiving the client credentials in the payload, but this usage is discouraged by the OAuth2 specification, and we strongly recommend that you send the credentials in the `Authorization: Basic ...` HTTP header value as described above._

The client id and secret are retrieved from the Criipto Verify management UI and the `redirect_uri` must be exactly the same you used in the authorization request in the previous step.

{% iconnote warning %}

Note that the back-channel exchange of the authorization code requires the use of the client secret, which is basically just a password, and therefore *must always* be made via a back-channel - server to server - and never from a public client like a browser or native appliction. Never include the secret in the frontend code.

For PKCE-enabled clients, the secret is generated on-the-fly, and no special handling of it is required by you.

{% endiconnote %}


### Response for implicit flow

In the implicit flow, when you asked for `response_type=id_token`, the token is returned directly to the application on a URL query parameter. If you are building a Single-Page Application, you can specify `response_mode=fragment` to get the `id_token` returned on the `#` part of the URL. This will ensure that the `id_token` is only available to the client, typically your Javascript in the browser.

## Validate the response
You can now proceed with validating the returned `JWT` and access the contained end-user information. The validation step is required - if you do not validate the signature, you cannot trust the contained end-user information. We strongly recommend that you find a battle-hardened library for you specific platfrom to do this heavy lifting. The sample applications you can find [here](/authentication) all adhere to this recommendation. If we do not have a sample for your particular technology stack, you can find an extensive list of libraries on [jwt.io](https://jwt.io) (scroll down to the `Libraries for Token Signing/Verification` section).