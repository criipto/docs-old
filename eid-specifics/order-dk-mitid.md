---
layout: article
title: Get ready for Danish MitID
---

# Order MitID for production

{% iconnote info %}

**MitID is expected to go live in mid August 2021**

The first person to be issued a MitID is planned for mid August 2021. All the holders of NemID will then be migrated
gradually to MitID during the following 6-9 months.

You can start ordering MitID for production from June 2021.  More on the process will be provided here.

{% endiconnote %}

### Prerequisites for setting up an agreement

In order to use MitID in production, your company must registered in the the EU and have an EU VAT Id.

### MitID terms of service

In addition to the genral [Criipto terms of service](https://criipto.com/legal/tos/) you must also accept the [MitID specific terms](https://criipto.com/legal/mitid/tos)

### UX requirements

With MitID you will be using a hosted MitID page at Criipto. The page may be styled to you liking, but some requirements must be
observed.

Please [see the UX reqirements](/eid-specifics/mitid-ux-reqs) to make sure you comply.

### Next steps

*More to follow shortly*.

# Order MitID for test

If you haven't already done so, you can apply for access to the MitID test environment from the `Identity Sources` tab in Criipto Verify's management UI - in the `DK MitID` section.

Once Criipto has received your application, we will onboard your company to the MitID test environment and get back to you. It may take a few days for us to process your application.

When done, you can return to the management UI and complete your MitID configuration, such as selecting which NemID domain you want to use for side-by-side mode with MitID during the transition phase.

{% iconnote info %}

Custom styling is also available for user-facing MitID pages.

{% endiconnote %}

# Setting up MitID side-by-side with NemID
Your current NemID setup uses another DNS domain than what is required for MitID. For the NemID domain, you have registered the `Application(s)` that represents your  web site(s)/native app(s) (hereafter: `clients`). Each has a unique `realm/client_id` and a list of `Callback URLs`. In order for Criipto Verify to support a seamless introduction of the side-by-side feature, you have to register identically configured `Application(s)` under the new MitID domain. You can set this up from the `Applications` tab in the management dashboard on [manage.criipto.id](https://manage.criipto.id).

Before you complete these configuration tasks, clicking the `MitID` tab in the side-by-side will not work correctly (you'll see an error with a slightly technical wording).

You must configure these "shadowing" applications for both TEST and PRODUCTION modes.

Once the MitID rollout is complete and NemID has been sunset, you can change the configuration for your `clients` to point directly to the MitID domain, and also modify the accompanying `acr_values`.

# Validating token signatures for MitID
MitID comes with a new approach to how token signing keys must be handled. There will be a distinct token signing key in use for MitID, in parallel to the one you have today for NemID. Criipto Verify announces all of these signing keys in the metadata documents for your domains (see [work with metadata](/how-to/work-with-metadata) for a primer on this subject).

Most modern OIDC libraries have built-in support for dynamic metadata retrieval, so all this will normally be handled for you behind the scenes.

Dynamic metadata retrieval is also necessary to achieve minimal disruption for you `clients` in ordinary key rollover as well as disaster recovery scenarios.

# MitID configuration switches
You have the following options available to configure CPR and side-by-side mode in the management dashboard (`Identity Services` -> `DK MitID`): ![MitID toggles](/images/mitid-config-toggles.png)


 - If you need the users CPR number, enable the `Add CPR for personal logins` switch
 - In contrast to NemID, not all MitID users have a CPR number. If your service can deal with that case, you can leave the `CPR Optional` switch enabled. If not, disable this switch.
 - If you don't want to show NemID and MitID side-by-side, you can disable it via the `Show alongside NemID logins` switch.
