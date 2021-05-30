---
layout: article
title: Setting up a JWT viewer, jwt.io
description: Set up a simple JWT viewer
---

# See inside the JWT

Suppose you want to quickly check out what kind of data you get from one of the login methods provided by Criipto. 
You can do this by inspecting the contents of the _JSON Web Token_, JWT, issued when you log in.

A quick option is to do a login and send the result to a preexisting JWT viewer, in this case **[jwt.io](https://jwt.io)**.  The site is developed and maintained by our friends at Auth0.

The JWT viewer will serve as a substitute for your app, so you don't have to stand one up just for getting a feel of the login.

The steps to set it up in your Criipto tenant are:

1. [Register jwt.io as an application](#register)
2. [Piece together the request that will trigger the login](#url)
3. [Perform the login and inspect the result](#login)

<a name="register"></a>

## Register jwt.io as an application

To use [jwt.io](https://jwt.io) to view your tokens, you must first register it as an application in Criipto Verify.  Go to the Applications section and create a new application:
1. Choose a domain, probably the one already there if you a just starting to use Criipto Verify
1. As _Client ID_ change the prefilled value with `urn:debugger:jwt` to make it easier to set up the URL below
2. As _Callback URL_ enter `https://jwt.io`
3. Enable all the identity sources you like to try out.

That's it for configuring Criipto Verify.


![Register App](/images/register-jwt-io.png)


<a name="url"></a>

## Piece together the login request 

Next, you need the following two pieces of information from Criipto Verify for  putting together the URL for the login request:

- _Domain_ on which you will be communicating with Criipto Verify. This could be, for example, `yourdomain.criipto.id`
- _Client ID_ to identify your application to Criipto Verify. We chose `urn:debugger:jwt`

A login request uses a standard protocol, OAuth2. For this example it will be 

`https://YOUR-DOMAIN/oauth2/authorize?scope=openid&client_id=urn:debugger:jwt&redirect_uri=https://jwt.io&response_type=id_token&response_mode=fragment&acr_values=urn:grn:authn:se:bankid:another-device`


<a name="login"></a>

## Log in and inspect the result

Just copy the URL from above and change two values:

- Replace _YOUR-DOMAIN_ with the value you selected when registering jwt.io as an application
- Replace the value of the query parameter `acr_values` with your choice of e-ID [from the list](/how-to/acr-values/). 

Copy this modified URL and put it in your browser to complete a login.

_Note_ that you will need a test user account, some of which are easier to come by than others. You can see how in the [article on test users](/how-to/test-users/).







