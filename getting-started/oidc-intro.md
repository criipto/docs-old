---
layout: article
title: Introduction to OpenID Connect
description: Learn the how Criipto supports the OpenID Connect protocol
---

# Using OpenID Connect to integrate vith Criipto Verify

Criipto Verify is integrated through the authentcation API which follows the OpenID Connect and OAuth2 specifications. 

{% iconnote note %}

Criipto Verify supports the OAuth2 *authorization code flow* and the *implicit flow* as described below. The code flow is used for traditional, server based, web applications which are able to make back channel calls to the Criipto Verify service. The implicit flow is used for single page applications and requires no backend server on your end, and thus is sometimes referred to as a front channel flow. 

{% endiconnote %}


The following describes the two flows and introduces the parameters to configure the authentication and subsequent user information retrieval.

The full specification of Criipto Verify OAuth2 and OpenID Connect options is provided the in [API reference]().

{% iconnote info %}

Please beware that you  don't have to go through the below motions manually. Most often it will be handled by configuring an OpenID Connect package on your platform of choice.

{% endiconnote %}


## Authenticate the User

To begin the login flow, you will need to authenticate the user at the identity source indicated in your request.

To authenticate the user, your app must send the user to the *OAuth2 authorization endpoint* with the appropriate set of parameters.

### Example authentication URL

The following initiates the authentication through an OAuth2 authorization request:

```
GET https://YOUR_SUBDOMAIN.criipto.id/oauth2/authorize?
    response_type=code|id_token&
    client_id=CLIENT_ID&
    redirect_uri=YOUR_RETURN_URL&
    acr_values=CHOSEN_IDENTITY_SERVICE&
    scope=openid profile&
    state=YOUR_STATE
```

Note that providing `response_type=code` specifies that you want the back channel *authorization code* flow, where as specifying `response_type=id_token` indicates that you want the *implicit flow*. In the implicit flow you receive the issued token as a fragment - af the hash charcter - of the return URL.

If you want to receive the id_token in another way you must specify the `response_mode` parameter, see below.

#### Parameters

| Parameter name  | Description |
|-----------------|-------------|
| `response_type` | Denotes the kind of credential that Criipto will return (`code` or `id_token`). If you are integrating a traditional server based web application - back channel flow - use `code`. Use `id_token` for single page applications using a front channel flow |
| `client_id`     | Your application's Client ID. You can find this value in the Criipto Verify UI in the settings for actual application |
| `redirect_uri`  | The URL to which Criipto will redirect the browser after authentication has been completed. The authorization code and the `id_token`will be available in the `code` and `id_token` URL parameter for the back channel flow and on a URL fragment for the front channel flow. This URL must be registered as a valid callback URL in your application settings.<br /> <br /> **Warning:** Per the [OAuth 2.0 Specification](https://tools.ietf.org/html/rfc6749#section-3.1.2), Criipto removes everything after the hash and does *not* honor any fragments. |
| `scope`         | Specifies the scopes for which you want to request authorization, which dictate which claims (or user attributes) you want returned. These must be separated by a space. To get an ID Token in the response, you need to specify a scope of at least `openid`. If you want to return the user's full profile as returned by the underlying e-ID identity service, you can request `openid profile`. |
| `acr_values`    | Identifies which e-ID identity service you want to use. You can only specify one value, and it must identify the exact type of identity service, as some countries have both e.g. a mobile and web based service. Possible values are [listed here](). |
| `response_mode` | (optional)Specifies how you want your result delivered via the `redirect_uri`: Use `query` to return the `code`/`id_token` as a query parameter, `fragment` to have it delivered on a URL fragment, and finally `form_post` to have it posted back to your `redirect_uri`.  <br />  <br /> Default values are `query` for `response_type=code` and `fragment` for `response_type=id_token`. |
| `state`         | (optional but recommended) An opaque arbitrary alphanumeric string your app adds to the initial request that Criipto includes when redirecting back to your application. |

As an example, your HTML snippet for your authorization URL when adding login to your app might look like:

```html
<a href="https://acme-corp.criipto.id/oauth2/authorize?
  response_type=id_token&
  client_id=urn:debug:jwt.io&
  acr_values=urn:grn:authn:no:bankid&
  redirect_uri=https://jwt.io&
  scope=openid%20profile&
  state=etats">
  Sign in with Norwegian BankID
</a>
```

You can <a href="https://acme-corp.criipto.id/oauth2/authorize?response_type=id_token&client_id=urn:debug:jwt.io&acr_values=urn:grn:authn:no:bankid&redirect_uri=https://jwt.io&scope=openid%20profile&state=etats" target="_blank">try the above URL</a> right now if you have a [test user for Norwegian BankID](/how-to/test-users/#nobankid).

For more about how to handle the implicit flow, scroll down. 

### Response for code flow

For the code flow, when you used `response_type=code`, you will receive an `HTTP 302` response which redirects your browser to your specified `redirect_uri` with the authorization code included at the end of the URL:

```text
HTTP/1.1 302 Found
Location: YOUR_RETURN_URL?code=AUTHORIZATION_CODE&state=YOUR_STATE
```

Note that depending your your `response_type` you may also receive an `id_token` as a query parameter instead of the authorization code.

#### Exchange the code for a token
For the code flow you will need to exchange the returned code for an actual token. This is done by posting the authorization code received from the previous step to the token endpoint.

```
HTTP POST
https://YOUR_SUBDOMAIN.criipto.id/oauth2/token
{ 
  "grant_type": "authorization_code",
  "client_id": CLIENT_ID,
  "client_secret": CLIENT_SECRET,
  "code": AUTHORIZATION_CODE,
  "redirect_uri": YOUR_RETURN_URL 
}
```

The client id and secret are retrieved from the Criipto Verify management UI and the `redirect_uri` must be exactly the same you used in the authorization request in the previous step.

{% iconnote warning %}

Note that the exchange of the authorization code requires the use of the client secret, basically a secret password, and therefore *must always* be made via a back channel - server to server - and never from a public client like a browser or native appliction. Never include the secret in the frontend code.

{% endiconnote %}


### Response for implicit flow

In the implicit flow, when you asked for `response_type=id_token`, the token is returned directly to the application on a URL fragment, that is after the `#` characer in the URL. This means it is only available to the client, typically your Javascript in the browser.

... TO BE COMPLETED ...