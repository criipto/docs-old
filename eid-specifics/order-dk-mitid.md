---
layout: article
title: Get ready for production with Danish MitID
Description: Get ready for production with Danish MitID
---

# Order MitID for production

{% iconnote info %}

**Prerequisites for ordering**

In order to apply for MitID in production on behalf of a company you must meet the basic requirements:

- Your company must be registered in the EU and have an EU VAT Id.
- The person applying must have a NemID/MitID employee signature from the company in question, a socalled "medarbejdersignatur"
- You must have completed step 5 in the [Getting ready for production](/how-to/get-ready-for-production) guide. You will need the production domain to complete the order for your client credentials.

{% endiconnote %}

**MitID went live on October 6, 2021**

All the holders of NemID are being migrated gradually to MitID until the summer of 2022, when NemID will be sunset altogether.
During the transition, all users will keep their NemID and will be able to use both options.

### MitID terms of service

In addition to the general [Criipto terms of service](https://criipto.com/legal/tos/) you must also accept the [MitID specific terms](https://criipto.com/legal/mitid/tos)

### UX requirements

With MitID you will be using a hosted MitID page at Criipto. The page may be styled to your liking, but some requirements must be
observed.

Please [see the UX reqirements](/eid-specifics/mitid-ux-reqs) to make sure you comply.

## Apply for production access - companies registered in Denmark
If your company is registered in Denmark please follow these steps: 

1. Go to the [management dashboard](https://manage.criipto.id) and set the environment toggle at the top center to "PRODUCTION".
2. In the "Identity sources" section, expand the "DK MitID" section
3. A user with a NemID/MitID employee signature, a socalled "medarbejdersignatur" must click the button and sign in.
3. Submit the details for your company. Note the following:
  - The name to show in the MitID login box is the name entered in the "Company alias" box
  - The "Domain prefix" is typically your company or brand name, e.g. `acme-corp`. Once this registration is completed this will be used to set up your MitID domain, in this case `acme-corp.mitid.dk`.
4. The information is to Nets. Once your domain has been set up, it will appear in the "Domains" section.

Expect this process to take 5-7 workdays.

## Apply for production access - companies *not* registered in Denmark

If you company is not registered in Denmark, menaing you don't have NemID/MitID employee signatures ("medarbejdersignatur"), please send a request for MitID onboarding to [support@criipto.com](mailto:support@criipto.com).

{% include snippets/mitid-onboard-complete.md %}
