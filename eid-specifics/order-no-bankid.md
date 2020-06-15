---
layout: article
title: Ordering Norwegian BankID
---
# Ordering Norwegian BankID

To start accepting real users with Norwegian BankID, you must first request your _client credentials_ - a set of secret keys - from the Norwegian BankID organisation.

{% iconnote info %}

**Prerequisites for ordering**

In order to apply for the BankID client credentials for a company you must meet the basic requirements:

- Your company must be registered in the central Norwegian business registry, _Brønnøysundregistrene_
- Your company must be a customer of a Norwegian Bank. Most banks in Norway are part of the BankID network.
- The person that will sign the contract must be in possession of one of these personal e-IDs: Norwegian BankID, Swedish BankID, or Danish NemID
- You must have completed step 5 in the [Getting ready for production](/how-to/get-ready-for-production) guide. You will need the production domain to complete the order for your client credentials.

{% endiconnote %}

## Ordering the client credentials

To order the actual keys please send a request to 

<p style="text-indent: 50px"><a href="mailto:support@criipto.com?subject=NO BankID for ...">support@criipto.com</a></p>

with answers to these questions:

1. A short description of what your application does and why it needs BankID.
2. The URL of your production domain as setup in step 5 of the [Getting ready for production](/how-to/get-ready-for-production)
1. Your company: _Name, organisation number, and address_
2. Your company's Norwegian bank: _Name, organisation number, and address_
3. General contact person at your company for BankID related communication: _Name and email_
4. Contact person with authorization to receive the secret keys: _Name, mobile phone, and email_
5. Contact person with authorization to block/revoke the use of BankID: _Name, mobile phone, and email_
6. Person registered in the business registry with authorization to sign the agreement: _Name and email_
7. The display name to appear in the login app. E.g. the name of your company or your specific service. (See the image below)
8. Web address of your service to be listed on www.bankid.no
9. Contact persons who should be notified of BankID operations related issues: _Names and emails_
10. If you need access to social security numbers ("fødselsnummer") please provide brief explanation of why and reference the Norwegian law and paragraph that grant you the right
11. Finally, you must enclose a company certificate ("firmaattest") from the business registry, Brønnøysundregistrene.

![BankID login](/images/no-bankid-central.png)

## Next steps

After Criipto has received the above information, we order the client credntials from your bank by filling out an online agreement, which is then sent to the appointed persons at your company for signing. Criipto will also sign the agreement

When all signatures are in place the signed agreement is sent to your bank for further processing and eventual issuance of your client credentials. 

Once you have received credentials, they must be entered into the Criipto Verify management UI to configure your NO BankID integration.

