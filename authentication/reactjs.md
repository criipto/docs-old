---
layout: article
---

# React.js

This tutorial demonstrates how to add a user login to a React.js application, but similar steps can be applied to other JavaScript frameworks such as Angular and Vue or even pure JavaScript applications.

Four steps are required to complete your first test login:

1. [Register your application in Criipto Verify](#register)
2. [Enable Callback on location hash](#enable)
3. [Configure oidc-client to use Criipto Verify](#oidc-client)
4. [Trigger authentication in your application](#trigger)

This explains how to set up your application and test with test users. To use real e-IDs for login the setup is the same, but you must be [set up for Production](#production)

And note that you need test e-ID users to see your code in action. How to get those is [described further down](#testusers).

You may get a completed and ready to run [sample from GitHub](https://github.com/goranlisak/criipto-react-demo) showing the below recipe in the simplest of React.js applications.

To modify your existing application to work with Criipto Verify follow the steps below.

<a name="register"></a>

## Register Your Application in Criipto Verify
After you signed up for Criipto Verify, you must register an application before you can actually try logging in with any e-ID.

Once you register your application you will also need some of the information for communicating with Criipto Verify. You get these details from the settings of the application in the dashboard.

Specifically you need the following information to configure you application

- _Client ID_ to identify you application to Criipto Verify. In the case below we chose `urn:criipto:samples:no1`
- _Domain_ on which you will be communicating with Criipto Verify. Could be for example `samples.criipto.id`

![Register App](/images/register-app.png)

### Register callback URLs

Before you can start sending authentication requests to Criipto Verify you need to register the URLs on which you want to receive the returned JSON Web Token, JWT.

The Callback URL of your application is the URL where Criipto Verify will redirect to after the user has authenticated in order for the oidc-client to complete the authentication process.

You will need to add this URL to the list of allowed URLs for your application. The Callback URLs for the sample project are:

- https://localhost:3000/RedirectCallback (for the redirect signin)
- https://localhost:3000/PopupCallback (for the popup or iframe signin)
- https://localhost:3000/logout

Make sure to add these to the Callback URLs section of your application. Put each URL on a new line.

![Callback URLs](/images/callback-urls-reactjs.PNG)

If you deploy your application to a different URL you will also need to ensure to add that URL to the Callback URLs. 


<a name="enable"></a>

## Enable Callback on location hash
If you are creating a new application you must first save the configuration.

Once you have a saved application registration you are ready to enable Callback on location hash. Open the application registration and enable Callback on location hash.

![Callback on location hash](/images/callback-on-location-hash.png)


<a name="enable"></a>

## Configure oidc-client to use Criipto Verify

### Install dependencies
In the example we use the OpenID Connect certified [oidc-client](https://github.com/IdentityModel/oidc-client-js) by Brock Allen.

``` console
npm install oidc-client --save
```

### Configure the oidc-client
To configure oidc-client you need to initialize the UserManager object and pass the settings object to it's constructor. The UserManager class provides a higher level API for logging in, signing out and managing the user's claims returned from Criipto Verify.

The settings object must include following properties:
- `authority`: Your Criipto Domain.
- `client_id`: Your Criipto Client ID.
- `redirect_uri`: The Callback URI where Criipto Verify will redirect to after the user has authenticated.
- `post_logout_redirect_uri`: The Callback URI where Criipto Verify will redirect to after the user has signed out.
- `acr_values`: Identifies which e-ID identity service you want to use. For example to use personal Danish NemID pass `urn:grn:authn:dk:nemid:poces`.

You may also provide following properties. If omitted, default values will apply.
- `responseType`: The requested response type. Default: `id_token`.
- `scope`: The requested scope. Default: `openid`.
- `userStore`: Storage object used to persist the User. Default: session storage.

{% iconnote note %}

Criipto Verify will return only the information derived from the underlying e-ID service. Changing the scope does not affect the amount and nature of information delivered from the user information endpoint.

{% endiconnote %}

``` javascript
new UserManager({
  authority: process.env.REACT_APP_IDENTITY_CONFIG_AUTHORITY,
  client_id: process.env.REACT_APP_IDENTITY_CONFIG_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_IDENTITY_CONFIG_REDIRECT_URI,
  responseType: process.env.REACT_APP_IDENTITY_CONFIG_RESPONSE_TYPE,
  post_logout_redirect_uri: process.env.REACT_APP_IDENTITY_CONFIG_POST_LOGOUT_REDIRECT_URI,
  acr_values: acr_values,
  userStore: new WebStorageStateStore({ store: window.sessionStorage })
});
```

### Choosing the specific login method

{% include snippets/login-methods.md %}


### Create a React Context
In the sample an additional class AuthService  initializes the UserManager and implements the necessary login and logout methods as well as the isAuthenticated method.

``` jsx
// scr\Authentication\AuthService.js
import { UserManager, WebStorageStateStore } from "oidc-client";

export default class AuthService {
  UserManager;

  constructor(acr_values) {
    this.UserManager = new UserManager({
      authority: process.env.REACT_APP_IDENTITY_CONFIG_AUTHORITY,
      client_id: process.env.REACT_APP_IDENTITY_CONFIG_CLIENT_ID,
      redirect_uri: process.env.REACT_APP_IDENTITY_CONFIG_REDIRECT_URI,
      responseType: process.env.REACT_APP_IDENTITY_CONFIG_RESPONSE_TYPE,
      post_logout_redirect_uri: process.env.REACT_APP_IDENTITY_CONFIG_POST_LOGOUT_REDIRECT_URI,
      acr_values: acr_values,
      userStore: new WebStorageStateStore({ store: window.sessionStorage })
    });
  }

  signinRedirect = () => {
    this.UserManager.signinRedirect();
  };

  signinRedirectCallback = () => {
    this.UserManager.signinRedirectCallback()
    // do something after successful authentication
    .then(() => {
      window.location.replace("/");
    })
    // do something if there was an error
    .catch(() => {
      window.location.replace("/");
    });
  };

  logout = () => {
    this.UserManager.signoutRedirect();
  };

  signoutRedirectCallback = () => {
    // UserManager will notify Criipto Verify about the logout
    this.UserManager.signoutRedirectCallback().then(() => {
      // Here we have to clear the persisted user
      localStorage.clear();
      window.location.replace("/");
    });
    this.UserManager.clearStaleState();
  };

  isAuthenticated = () => {
    const oidcStorage = JSON.parse(
      sessionStorage.getItem(
        `oidc.user:${ process.env.REACT_APP_IDENTITY_CONFIG_AUTHORITY }:${ process.env.REACT_APP_IDENTITY_CONFIG_CLIENT_ID }`
        )
      );
    return (!!oidcStorage && !!oidcStorage.id_token);
  };
}
```

To make the AuthService accessible across the app, you can create a React Context which will be exposed as AuthProvider component and used on callback routes.

``` jsx
// src\Authentication\AuthProvider.js
import React, { Component } from "react";
import AuthService from "./AuthService";

const AuthContext = React.createContext();

export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends Component {
  authService;
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }
  render() {
    return <AuthContext.Provider value={this.authService}>{this.props.children}</AuthContext.Provider>;
  }
}
```

<a name="trigger"></a>

## Trigger authentication in your application
Oidc-client offers two ways to do the authentication:
- By redirecting the user to the authentication page (signinRedirect) or
- By showing the authentication page in an iframe or a popup window (signinPopup)

### Trigger authentication with redirect
To start the authentication process you have to call the `signinRedirect()` method of the AuthService which will call the same method of the UserManager and automatically redirect the user to the authentication page associated with the chosen login option.

Now the only thing left is to set up a callback route where you will receive a response. Create a callback component where you will call the signinRedirectCallback() method which will finish the authentication process and persist the user in the local storage.

``` jsx
export const RedirectCallback = (url) => (
  <AuthConsumer>
    {({ signinRedirectCallback }) => {
      signinRedirectCallback();
      return url.location.search.includes("error") ? <p>There has been an error! Pleas try again.</p> : <CustomSpinner />;
    }}
  </AuthConsumer>
);
```

### Trigger authentication in an iframe or a popup window
The oidc-client module also provides a way to implement the authentication in a new window which can be opened as a new browser window or displayed inside of an iframe in the application. To enable popupSignin it is very important to set some additional properties in the UserManager settings object:
- `popup_redirect_uri`: A URL where you will receive the response from Criipto Verify. Don't forget to register it as one of the callback URLs in Criipto Verify as describe earlier.
- `popupWindowFeatures`: Provides a way to customise the look of a new window. For example, `location=no,toolbar=no,width=600,height=500,left=100,top=100`
- `popupWindowTarget`: Set this to `_blank` if you want a new browser window. Or set it to an the name of an iframe where you want it to show.

Also, make sure to implement following methods in the AuthService class:
``` jsx
signinPopup = () => {
  this.UserManager.signinPopup();
};

signinPopupCallback = () => {
  this.UserManager.signinPopupCallback();
};
``` 

{% iconnote warning %}

If you are displaying the login inside of an iframe, make sure that the iframe is generated in the DOM before you start the authentication process, otherwise a new browser window will be created.

{% endiconnote %}

To start the authentication process, you just have to call the `signinPopup()` method of the AuthService which will call the same method of the UserManager and start the authentication process.

Now we have to set up a callback route for the signinPopup just as we did for the signinRedirect, only this time we will be calling `signinPopupCallback()` method of the AuthService to finish the authentication process and persist the user.

``` jsx
export const PopupCallback = (url) => (
  <AuthConsumer>
    {({ signinPopupCallback }) => {
      signinPopupCallback();
      return url.location.search.includes("error") ? <p>There has been an error! Pleas try again.</p> : <CustomSpinner />;
    }}
  </AuthConsumer>
);
```

The UserManager will close the new browser window on it's own, but if you are implementing the authentication in an iframe, you must handle that part yourself. To make that easier, you can raise an event on the top window after the user successfully logs in  and register an event listener which will, for example, close the login modal or remove the iframe from the DOM.

### Trigger a user logout

Logout requires both terminating the local session by clearing the local storage as well as telling Criipto Verify that the session is over. To start the process of a user logout, just call the `logout()` method of the AuthService which will call the `signoutRedirect()` method of the UserManager and start the logout process.

You also need to set up a callback route where you will receive the response. Create a callback component where you will call a `signoutRedirectCallback()` method.

``` jsx
export const LogoutCallback = (url) => (
  <AuthConsumer>
    {({ signoutRedirectCallback }) => {
      signoutRedirectCallback();
      return url.location.search.includes("error") ? <p>There has been an error! Pleas try again.</p> : <CustomSpinner />;
    }}
  </AuthConsumer>
);
```

<a name="testusers"></a>

## Test users

{% include snippets/test-users.md %}

<a name="production"></a>

## Setting up for Production

{% include snippets/set-up-production.md %}