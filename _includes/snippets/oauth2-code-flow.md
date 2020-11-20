If you are registering a new application, you must first save the configuration.

Once you have a saved application registration you may configure the OAuth2 code flow. 

Open the application registration and configure it for the right OAuth2 flow:

1. Enable OAuth2 code flow
2. Copy the generated client secret. 
3. Set the user info response strategy to `plainJson` to enable retrieval of plain JSON user information from the `/oauth2/userinfo` endpoint.

![OAuth2 code flow](/images/oauth2-code-flow.png)

{% iconnote info %}

If your library does not support the final `userinfo` request, it is also possible to fetch the same data directly from the `token` endpoint. The configuration in Criipto Verify is almost the same, except you must choose `fromTokenEndpoint` in the user info response strategy instead:
![OAuth2 code flow](/images/userinfo-responsestrategy-fromtokenendpoint.png)

{% endiconnote %}

_Note that this is the only time you will be shown the actual value of the client secret_. Criipto only stores this as a hashed value, which means you cannot retieve the value once it has been generated and stored.

![OAuth2 code flow](/images/oauth2-client-secret.png)

