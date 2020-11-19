If you are registering a new application - or integrating a downstream identity service like Auth0 or Okta -  you must first save the configuration.

Once you have a saved application registration you may configure the OAuth2 code flow. 

Open the application registration and configure it for the right OAuth2 flow:

1. Enable OAuth2 code flow
2. Copy the generated client secret. 
3. Set the user info response strategy to `plainJson` to enable retrieval of plain JSON user information from the `/oauth2/userinfo` endpoint.

![OAuth2 code flow](/images/oauth2-code-flow.png)

_Note that this is the only time you will be shown the actual value of the client secret_. Criipto only stores this as a hashed value, which means you cannot retieve the value once it has been generated and stored.

![OAuth2 code flow](/images/oauth2-client-secret.png)