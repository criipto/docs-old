---
layout: article
title: Get ready for production with Danish MitID
Description: Get ready for production with Danish MitID
---

# Order MitID for production

{% iconnote info %}

**MitID is expected to go live in October 2021**

The first person to be issued a MitID is planned for October 2021 and that's when MitID start appearing side-by-side with NemID
in production. All the holders of NemID will then be migrated gradually to MitID during the following 6-9 months.

{% endiconnote %}

### Prerequisites for setting up an agreement

To use MitID in production, your company must be registered in the EU and have an EU VAT Id.

### MitID terms of service

In addition to the general [Criipto terms of service](https://criipto.com/legal/tos/) you must also accept the [MitID specific terms](https://criipto.com/legal/mitid/tos)

### UX requirements

With MitID you will be using a hosted MitID page at Criipto. The page may be styled to your liking, but some requirements must be
observed.

Please [see the UX reqirements](/eid-specifics/mitid-ux-reqs) to make sure you comply.

## Steps to take in Criipto Verify

### Apply for production access
1. Go to the [management dashboard](https://manage.criipto.id) and set the environment toggle at the top center to "PRODUCTION".
2. In the "Identity sources" section, expand the "DK MitID" section
3. Submit the details for your company. Note the following:
  - The name to show in the MitID login box is the name entered in the "Company alias" box
  - The "Domain prefix" is typically your company or brand name, e.g. `acme-corp`. Once this registration is completed this will be used to set up your MitID domain, in this case `acme-corp.mitid.dk`.
4. Criipto will verify the identity of you and your organization. If successful, we then send the information to Nets where the domain is up as explained in the previous step. Once the domain has been set up, it will appear in the "Domains" section.

Expect this process to take 5-7 workdays.

{% include snippets/mitid-onboard-complete.md %}
