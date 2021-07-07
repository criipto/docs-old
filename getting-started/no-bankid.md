---
layout: article
title: Particulars of Norwegian BankID
description: Choose from available data and flows for Norwegian BankID
---

# Data and consent for Norwegian BankID

## Available data
Basic user information, full name, and date of birth are always made available. Additional data may be requested and is released with explicit user consent only.

| **Data type** | **Released** | **Verified** |
| --- | --- |
| Full name | Always | Yes |
| Date of birth | Always | Yes |
| SSN ("fødselsnummer" in Norwegian) | User consent | Yes |
| Address | With user consent | No |
| Email | With user consent | No |
| Phone number | With user consent | No |

Access to the SSN is governed by Norwegian law, as described in the [Ordering Norwegian BankID](/eid-specifics/order-no-bankid) guide.

The unverified data are supplied by end-users and not verified by Vipps or the Norwegian banks.

## Consent model

End-users must explicitly grant consent to releasing the data to you.

The consent model is enforced by Vipps (operator of BankID), and they also provide the consent and data collection dialogs.

### Forced and optional consent

If you request SSN, it will be treated as a required value. End users will not be allowed to complete a login until they have explicitly given their consent to release SSN.

All other additional data are treated as optional values. A login may complete even if the user does not consent to release the requested data.

## Configuration

You can use the Criipto Verify management dashboard [manage.criipto.id](https://manage.criipto.id) to configure access to the SSN, in the **Identity Sources** -> **NO BankID** section.

If you need access to the unverified data, get in touch, and we will enable it for you.
