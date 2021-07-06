---
layout: article
title: Particulars of Norwegian BankID
description: Understand the available data and flows for Norwegian BankID
---

# End-user data and consent for Norwegian BankID

## Available data
Apart from the basic fields such as user name and date of birth, you can opt-in to requesting additional user data:

| **Data type** | **Data has been verified** |
| --- | --- |
| Fødselsnummer (aka _SSN_, _NIN_ or _NNIN_) | Yes |
| Address | No |
| Email | No |
| Phone number | No |

Access to the SSN is governed by Norwegian law, as described in the [Ordering Norwegian BankID](/eid-specifics/order-no-bankid) guide.

The unverified data are self-supplied by end users.

## Consent model
The end user must expliticly grant consent to releasing the data to you.

The consent model is enforced by Vipps (owners and operators of both _Norwegian BankID_ and _Norwegian Vipps Login_), and they also provide the consent and data collection dialogs.

### Required vs optional consent
Criipto treats the fødselsnummer as a required value if you request access to it. We will not allow end users to complete the login unless they have given their consent to releasing it to you.

All other additional data are treated as optional values, and we will complete the login even if the user does not  consent to releasing it to you.

## Configuration
You can use the Criipto Verify management dashboard [manage.criipto.id](https://manage.criipto.id) to configure access to the fødselsnummer, in the **Identity Sources** -> **NO BankID** section.

If you need access to the unverified data, get in touch, and we will enable it for you.
We will make this available in the ordinary self-service style soon.