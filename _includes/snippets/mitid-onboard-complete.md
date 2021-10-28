## Complete the onboarding process

Once you receive a confirmation from Criipto (via email), go back to the "Identity sources" section and open "DK MitID". Nets has now set up the `mitid.dk` domain, and the **Complete** button will be active for you to click.

1. Click the **Complete** button in the MitID section to finish the registration process
2. Configure the various options that appear after the onboarding completes.
    - If you use our service for NemID as well, select a `NemID fallback domain`. *Note* this is only relevant if you, for some reason, send requests directly to your `mitid.dk` domain. 
    - If you need access to the end-user's CPR number, make sure the `Add CPR for MitID logins` toggle is enabled.
    - In contrast to NemID, not all MitID users have a CPR number. If your application can handle the case of a missing CPR, you may enable the `CPR Optional` toggle. This will let MitID users without a CPR number log in to your service.
    - If you want to use our side-by-side feature for showing both MitID and NemID login options, make sure the `Also offer MitID login when NemID is requested`-toggle is enabled.

### Set up an application on your MitID domain
 1. Register your application, just as you would for all other integrations. 
 2. *IMPORTANT:* If you want to use NemID and MitID side-by-side, you *must* create a "shadow" application with the same `Client ID/Realm` and `Callback URLs` as the application you currently use for NemID. This is necessary to make the switching back and forth between MitID and NemID function.


### Validating token signatures for MitID
MitID comes with a new approach to storing and using token signing keys. There will be a distinct token signing key in use for MitID, in addition to the one you use for other types of e-ID, such as NemID. Criipto Verify announces all of these signing keys in the metadata documents for your domains (see [work with metadata](/how-to/work-with-metadata) for a primer on this subject).

Most modern OIDC libraries have built-in support for dynamic metadata retrieval, so all this should be handled for you behind the scenes.

Dynamic metadata retrieval is also necessary to achieve minimal disruption for your applications in an ordinary key rollover as well as disaster recovery scenarios.