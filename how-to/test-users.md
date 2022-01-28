---
layout: article
title: Criipto Documentation - Test users
description: How to create and/or obtain test user accounts for the various e-ID types
---

# Create or get e-ID test users

Almost all e-ID types have a notion of _test_ and _real_ users.

_Real users_ are real people logging in to a web site, thus voluntering their real name and typically also a social security number, SSN.

_Test users_ are either created by you for the occasion, or we provide you with access to already created users. 

You may refer to the sections below for test users for your choice of e-ID:

- [Swedish BankID](#sebankid)
- [Norwegian BankID](#nobankid)
- [Norwegian Vipps Login](#novipps)
- [Danish MitID](#dkmitid)
- [Danish NemID](#dknemid)
- [Finnish BankID](#fibankid)
- [Itsme](#beitsme)
- [Belgian eID](#beeid)
- [German Sofort](#desofort)

<br/>

<a name="sebankid"></a>

## Swedish BankID

Swedish BankID test users are created at the <a href="https://demo.bankid.com/" target="_blank">demo web site</a>.   

Even if the demo site is where you will actually create your test users, it does link to the <a href="https://www.bankid.com/rp/info" target="_blank">general BankID technical page</a>. As a Criipto Verify customer you don't have worry about most of what's this site, but on the page is also a link to the document describing in detail how to create and use test user accounts. The document is called something like "How to get a test BankID" and links to a PDF.

_Note_ that, as is also described in the document, using test BankID users does require a reconfiguration of the BankID application. This means it cannot be used for real BankID. So if you are Swedish and already have BankID on your phone, you may want to use a spare phone for testing.

<br/>

<a name="nobankid"></a>

## Norwegian BankID

Two types of Norwegian BankID are available:

1. _Web based BankID with a hardware token_. Also called _Netcentric_ accounts, test users from this type of BankID may be created and used on the fly
2. _Mobile BankID_. Norwegian mobile BankID is based on a socalled _SIM card application_ which means you need a special SIM card issued by one of the Norwegian carriers. 

### Creating netcentric test users

Test users are created through the web page at [https://ra-preprod.bankidnorge.no/#/search/endUser](https://ra-preprod.bankidnorge.no/#/search/endUser).

1. Go to the "TEST NUMBER GENERATOR" to generate a random, valid SSN
2. It now says "Could not find any bankIDs for ..."
3. Fill out the first name, last name, and BankID friendly name.
4. Click "Order" to initiate the process
5. Once the process complete you now have a test user. User name is the generated SSN, one time password (OTP) is always "otp", and password is always "qwer1234"  

You can test it out at [our authentication demo site](https://verify-login.azurewebsites.net), which is a small sample hosted by Criipto.

### Testing Mobile BankID 

For testing you may order up to three test SIM cards through Criipto once you have signed up for Norwegian BankID.

<br/>

<a name="novipps"></a>

## Norwegian Vipps Login

In order to test Vipps Login you need to install the Vipps app in a special test version on your device. Follow the Vipps [guide with instructions](https://github.com/vippsas/vipps-developers/blob/master/vipps-test-environment.md#vipps-test-apps) on how to set up test apps.

In order to test you also need a test phone number. Write to [support@criipto.com](mailto:support@criipto.com) and put something like "Vipps Login test number" in the subject line.

<br/>

<a name="dkmitid"></a>

## Danish MitID

You create personal MitID tet users at [https://pp.mitid.dk/test-tool/frontend](https://pp.mitid.dk/test-tool/frontend):

1. Just use the autofill button and then change the details to you liking
2. If you haven't done so already install the test app from [https://pp.mitid.dk/mitid-app/index.html](https://pp.mitid.dk/mitid-app/index.html)
3. You can test your new users by using the "Flows" menu at the top of the screen.

![MitID test tool](/images/mitid-testtool.png)

<a name="dknemid"></a>

## Danish NemID

For personal NemID test users, you may create them at [https://appletk.danid.dk/testtools](https://appletk.danid.dk/testtools/). Login in with username `oces` and password `nemid4all`.  Don't worry about the message about not being supported. 

_First_, note that you can search out already created test users by filling out the search field at the top of that page. This may be convenient if you've lost the link to the user page.

If you just need to do a quick login test, you may use this test user instead of going throught the steps below: [https://appletk.danid.dk/testtools/viewstatus.jsp?userid=TOMINE317](https://appletk.danid.dk/testtools/viewstatus.jsp?userid=TOMINE317). (If all the OTP codes have been used, just issue a new OTP card, but click the link for that.)

That said the steps to create a test user are fairly simple:

1. Scroll to the bottom and click the "Autofill" button
2. _Important_. Remember to check the checkbox that says "Activate". If you don't you can't use the test user
3. Take note of the password - or set your own.
3. Click "Submit"
4. Don't worry if you see the same form again. At the bottom you have a Java exception: `java.lang.NullPointerException` in red
5. Copy the "Alias" or the "CPR" and search for it using the "View existing idenity" search field at the top
6. Now you will see the page with all the details for the user.

![NemID personal test user](/images/nemid_test_user.png)

### NemID test users for employees (medarbejder-signatur)

The current OTP card(s) can be accessed on the same testtools-site as above.

Unfortunately, it is not possible to use the testtools-site to create your own test-employee users.
If you need to have your own test-MOCES accounts created, you must contact NETS directly.

<a name="fibankid"></a>

## Finnish BankID

A set list of test users for the different banks are given below. Sometimes the test credentials will be shown also on the actual login page at the bank.
 
### Aktia

Käyttäjätunnus: `12345678`<br/>
Salasana: `123456`<br/>
Turvaluku: `1234`<br/>
Turvaluku 2: `1234`<br/>

### Danske Bank

Must use your own customer credentials. No real cash is withdrawn from your bank account.
 
### Handelsbanken

Käyttäjätunnus: `11111111`<br/>
Salasana: `123456`<br/>
Turvaluku: `123456`<br/>
Turvaluku 2: `123456`<br/>
 
### LähiTapiola

Käyttäjätunnus: `12345678`<br/>
Salasana: any numbers<br/>
Tunnusluku: any four numbers<br/>
Tunnusluku 2: any four numbers<br/>
 
### Nordea

Tunnus: `123456`<br/>
Salasana: `1234`<br/>
Vahvistustunnus: any four numbers<br/>
 
### OP / Osuuspankki

Käyttäjätunnus: `123456`<br/>
Salasana: `7890`<br/>
Avainluku: any four numbers<br/>
 
POP Bank
Käyttäjätunnus: `11111111`<br/>
Salasana: `123456`<br/>
Turvaluku: `123456`<br/>
Turvaluku 2: `123456`<br/>
 
### S-Bank

Käyttäjätunnus: `12345678`<br/>
Salasana: any numbers<br/>
Tunnusluku: any four numbers<br/>
Tunnusluku 2: any four numbers<br/>
 
### Savings bank

Käyttäjätunnus: `11111111`<br/>
Salasana: `123456`<br/>
Turvaluku: `123456`<br/>
Turvaluku 2: `123456`<br/>
 
### Ålandsbanken

Käyttäjätunnus: `12345678`<br/>
Salasana: any numbers<br/>
Tunnusluku: any four numbers<br/>
Tunnusluku 2: any four numbers<br/>
 
### Oma Säästöpankki

Käyttäjätunnus: `11111111` / `22222222`<br/>
Salasana: `123456`<br/>
Turvaluku: `123456`<br/>
Turvaluku 2: `123456`<br/>

<br/>

<a name="beitsme"></a>

## Itsme

You will need to enroll with the Itsme organization to get access to test accounts, which can be used in the `Itsme Sandbox` environment.

The process is [described here](https://brand.belgianmobileid.be/d/CX5YsAKEmVI7/let-s-get-started#/step-by-step-guide/4-test-itsme-in-your-application) - just note that the integration guidelines of that documentation is not relevant for you, as you are integrating via Criipto's pre-built Itsme integration. It is all just a matter of configuring your project settings in our management UI.

<br/>

<a name="beeid"></a>

## Belgian eID

This login method is smartcard based, so you will need both a smartcard reader and accompanying cards.

For test domains, you can use both test-specific cards and also "live" cards. The only difference is that on test domains, the data from the card will not be verified after being read.


For production domains, you cannot use test cards, as the data on these cannot be verified.

<br/>

<a name="desofort"></a>

## German Sofort

3 pre-created test accounts exist - 1 can be used for a succesful login, the other 2 will return errors.

You will be prompted for an `account number` and a `PIN` during login. You can use pretty much any values you like, as long as you specify 4 characters for the `account number` and 3 characters for the `PIN`.

| **Test account** | **Valid** | **Account Number** | **PIN** |
| --- | --- | --- | --- |
| Hans-Gerd Warnecke | yes | 4+ characters | 3+ characters |
| Petra Mustermann | no | 4+ characters | 3+ characters |
| Max Mustermann | no | 4+ characters | 3+ characters |

Full account details are available [in the Sofort documentation](https://integration.sofort.com/integrationCenter-eng-DE/content/view/full/2867/#h5)