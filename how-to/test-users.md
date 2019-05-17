---
layout: article
---

# Create or Get e-ID Test Users

Almost all e-ID types have a notion of _test_ and _real_ users.

_Real users_ are real people logging in to a web site, thus voluntering their real name and typically also a social security number, SSN.

_Test users_ are either created by you for the occasion, or we provide you with access to already created test users. 

You may refer to the sections below for test users for your choice of e-ID:

<a name="sebankid"></a>

- [Swedish BankID](#sebankid)
- [Norwegian BankID](#nobankid)
- [Danish NemID](#dknemid)
- [Finnish BankID](#fibankid)

<br/>

## Swedish BankID

Swedish BankID test users are created at the <a href="https://demo.bankid.com/" target="_blank">demo web site</a>.   

Even if the demo site is where you will actually create your test users, it does link to the <a href="https://www.bankid.com/bankid-i-dina-tjanster/rp-info" target="_blank">general BankID technical page</a>. As a Criipto Verify customer you don't have worry about most of what's this site, but on the page is also a link to the document describing in detail how to create and use test user accounts. The document is called something like "How to get a test BankID" and links to a PDF.

<a name="nobankid"></a>

_Note_ that, as is also described in the document, using test BankID users does require a reconfiguration of the BankID application. This means it cannot be used for real BankID. So if you are Swedish and already have BankID on your phone, you may want to use a spare phone for testing.

<br/>

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

You can test it out at [www.grean.id](https://www.grean.id) which is a small sample run by Criipto. 

<a name="dknemid"></a>

### Testing Mobile BankID 

For testing you may order up to three test SIM cards through Criipto once you have signed up for Norwegian BankID.

<br/>

## Danish NemID

For personal NemID test users, you may create them at https://appletk.danid.dk/testtools/. Login in with username `oces` and password `nemid4all`.  Don't worry about the message about not being supported. 

_First_, note that you can search out already created test users by filling out the search field at the top of that page. This may be convenient if you've lost the link to the user page.

If you just need to do a quick login test, you may use this test user instead of going throught the steps below: https://appletk.danid.dk/testtools/viewstatus.jsp?userid=TOMINE317. (If all the OTP codes have been used, just issue a new OTP card, but click the link for that.)

That said the steps to create a test user are fairly simple:

1. Scroll to the bottom and click the "Autofill" button
2. _Important_. Remember to check the checkbox that says "Activate". If you don't you can't use the test user
3. Take note of the password - or set your own.
3. Click "Submit"
4. Don't worry if you see the same form again. At the bottom you have a Java exception: `java.lang.NullPointerException` in red
5. Copy the "Alias" or the "CPR" and search for it using the "View existing idenity" search field at the top
6. Now you will see the page with all the details for the user.

![NemID personal test user](/images/nemid_test_user.png)

<a name="fibankid"></a>

### NemID test users for employees (medarbejdersignatur)

Creating test users for the socalled "medarbejdersigantur" is quite a bit more complicated. Send us an email at <support@criipto.com> if this is something you need, and we will guide you through the process.

<br/>

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