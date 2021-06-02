### Complete the onboarding process
1. Once you receieve a confirmation from Criipto (via email), go back to the `DK MitID` section and click the `Complete` button. 
2. Configure the various options that appear after the onboarding completes.
    - If you use our service for NemID as well, select a `NemID fallback domain`
    - If you need access to the end-users CPR number, make sure the `Add CPR for MitID logins` toggle is enabled.
    - In contrast to NemID, not all MitID users have a CPR number. If your service can handle that case, you can enable the `CPR Optional` toggle. This will let MitID users without a CPR number log in to your service.
    - If you want to use our side-by-side feature for showing both MitID and NemID login options to users, make sure the `Also offer MitID login when NemID is requested` toggle is enabled.

 ### Set up an application on your MitID domain
 1. Register your application, just as you would for all other integrations. 
    - If you want to use our side-by-side feature, you must create a "shadow" application with exactly the same `Client ID/Realm` and `Callback URLs` as the application you currently use for NemID. You can register other applications as well, but there must be 1 that matches the NemID application. If you use one of the OAuth2 flows that require a client secret, you can keep using the one for the NemID while in side-by-side mode.