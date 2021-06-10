---
layout: article
title: Get set up for testing with Danish MitID
description: Get onboarded and set up for testing with Danish MitID
---

# Setting up MitID for test

First of all, you may test MitID, without any further setup or onboarding needed. You will, however, not be able to use the styling capabilities that are available for MitID.

Instead, we suggest that you get explicitly onboarded to the MitID test environment to fully test your integration including customizability of styling.

## Register for test access
1. Go to the [management dashboard](https://manage.criipto.id) and set the environment toggle at the top center to "TEST"
2. In the "Identity sources" section, expand the "DK MitID" section
3. Submit the details for your company. Note the following:
  - The name to show in the MitID login box is the name entered in the "Company alias" box
  - The "Domain prefix" is typically your company or brand name, e.g. `acme-corp`. Once this registration is completed, this is used to set up your MitID domain, in this case `acme-corp.pp.mitid.dk`.
4. Criipto sends the information to Nets where the domain is set up as explained in the previous step. Once the domain has been set up, it will appear in the "Domains" section.

Expect this process to take 2-5 workdays.

{% include snippets/mitid-onboard-complete.md %}
