---
layout: article
---


# Order NemID for production

To start accepting real users with Danish NemID, you must first enter into a service provider agreement (Danish: "Tjenestedudbyderaftale") with Nets, the operator of NemID.

### Prerequisites before setting up an agreements

In order to become a NemID service provider, your organisation must meet a few basic requirements:

- Your company must registered in the central Danish business registry and be issued a orgnisational id, a CVR number.
- There must be a NemID administrator already in your organisation, a socalled _LRA_. All Danish companies have one.

## Filling out the agreement

First of all [follow the guide](https://www.nets.eu/dk-da/kundeservice/nemid-tjenesteudbyder/bestilling) provided by Nets.  It takes you through the 4 steps and includes the relevant download links etc.:

1. Order a company certificate ("Virksomhedssignatur")
2. Fill out the online service provider agreement ("Tjenesteudbyderaftale"). This form includes a download link for the CPR agreement in the next step.
3. Download and fill out the CPR agreement form ("PID/RID cpr-tjenesterne"), sign it, and attach it to the service provider agreeement.
4. Attach the CPR agreement to the online service provider agreement and send it

As you fill out the forms please check the section below for a few details related to the Criipto Verify service.

## Criipto Verify related notes

When filling out the online sevice provider agreement keep this in mind:

- _Forbrugsafregning_ (consumption billing). You will be billed directly by Nets based on your choice in this section. Criipto _does not_ act as a NemID reseller and we cannot bill you you consumption of the raw NemID service.
- _Opsætning_ (setup). This section has a few important details:
    - _Friendly name_. As the form explains this is the name that will appear in the NemID client. _Immportant:_ Note that this name must also be entered in the Criipto Verify management UI for our integration with Nets to work!
    - _Virksomhedssignatur UID-nummer_ (part of company certificate subject name). This information is found in the [NemID administration](https://www.medarbejdersignatur.dk/produkter/nemid_medarbejdersignatur/log_paa_nemid_selvbetjening/). Look under "Øvrige signaturer -> Administrer virksmohedssignatur".
- _Aftale om brug af PID/RID cpr-tjenesten_ (CPR agreement). If you need social seurity numbers, CPR, you need to pick one or more of these options. Unless you are a goverment organisation you choices will be the _-match_ services. _PID_ is for personal NemID, _RID_ is for employee NemID.
    - This is where you download, fill out and sign the CPR agreement, and attach it
_​Opsætning af testsystem_ (setup of test system). Answer _yes_ here only if you need to be able to generate test users for NemID employee signatures, MOCES.
- _IP-adresser_. You may enter a set of IP addresses for access to the test and development environments. These must be the IP addresses you use to connect from (use for example [MyIP.com](https://www.myip.com/)). _Note that this is not necessary_ to use Criipto Verify, as we are already registered. But if you have a set of fixed IP adresses, you may enter them just to gain access to the tool needed to generate test users for employee signatures.

<a name="setup"></a>

That's basically it. Once you've filled out and submitted the service provider agreement form, you will, typcically after a week or so, receive an email with the details you need to start using production NemID. Use this information and the company certificated to configure Criipto Verify as described below.

## Setting up Criipto Verify for NemID for production

Keep and eye out for an email from Nets with the details of your NemID service provider agreement. It should be sent from `tu-support@nemid.nets.eu` with a subject "RE: Bestilling af NemID tjenesteudbyder". In that email you will need the production informtion listed _after_ the test details.

![Email from Nets](/images/TU-done.png)

Now fill matching fields in the Criipto Verify UI:

1. Switch the toggle in the UI to "Production environment"
2. Locate and upload the company certificate, the "Virksomhedssignatur", you ordered and received before starting the service provider process. The password is the one you picked when you downloaded the certificate from Nets.
3. Enter the SPID for PID/CPR as listed in the email from Nets. Make sure you use the one from the production section closer to the bottom of the email.
4. Enter tne friendly name exactly as listed in the email.

![Email from Nets](/images/nemid-prod.png)

That's - finally - it! You have ordered, received, and configured the necessary information and certificates to start accepting real NemID logins and signatures.

## Next steps

You are now ready to set up your application to use real NemID in production. Please refer to the [guide on how to move to production](/how-to/get-ready-for-production).