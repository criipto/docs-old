---
title: Criipto Verify JSON Web Tokens
description: Examples of JWT payloads for select e-ID's
layout: article
---

# JWT contents for each e-ID type

Below you will find the the structure and example content for the JSON Web Tokens, the ID tokens, returned when signing in with each of the supported e-ID types.

The examples below illustrate only the fields that are user-specific. The actual JWTs issued contain other more technical, OIDC conformant, fields as well, which are mostly relevant for validation and session maintenance purposes.

## Sweden
### BankID
```json
{
  "identityscheme": "sebankid",
  "nameidentifier": "1373c272b61a4cb588b29c44883fe62f",
  "sub": "{1373c272-b61a-4cb5-88b2-9c44883fe62f}",
  "ssn": "196802020575",
  "name": "Terne Paulsen",
  "givenname": "Terne",
  "surname": "Paulsen",
  "ipaddress": "77.241.128.160",
  "country": "SE"
}
```
The `ssn` field is the social security number.

## Norway
### BankID
```json
{
  "identityscheme": "nobankid-oidc",
  "nameidentifier": "ee9b1bb905a6458e9f3b9d068f1a3765",
  "sub": "{ee9b1bb9-05a6-458e-9f3b-9d068f1a3765}",
  "uniqueuserid": "9578-6000-4-351726",
  "certissuer": "CN=BankID - TestBank1 - Bank CA 3,OU=123456789,O=TestBank1 AS,C=NO;OrginatorId=9980;OriginatorName=BINAS;OriginatorId=9980",
  "certsubject": "CN=CriiptoTest\\, Mikkel,O=TestBank1 AS,C=NO,SERIALNUMBER=9578-6000-4-351726",
  "dateofbirth": "1946-03-27",
  "socialno": "27034698436",
  "surname": "CriiptoTest",
  "givenname": "Mikkel",
  "name": "Mikkel CriiptoTest",
  "country": "NO"
}
```
The `socialno` field is the social security number. The `uniqueUserId` identifies the legal person corresponding to the login, and is not considered sensitive.

### Vipps
```json
{
  "identityscheme": "novippslogin",
  "nameidentifier": "75dca5991ad74a0981c092d424b82fbc",
  "sub": "{75dca599-1ad7-4a09-81c0-92d424b82fbc}",
  "streetaddress": "{\"street_address\":\"BOKS 6300, ETTERSTAD\",\"postal_code\":\"0603\",\"region\":\"OSLO\",\"country\":\"NO\",\"formatted\":\"BOKS 6300, ETTERSTAD\\n0603\\nOSLO\\nNO\",\"address_type\":\"home\"}",
  "dateofbirth": "10.09.1955",
  "emailaddress": "mikkel@criipto.com",
  "mobilephone": "4748059940",
  "socialno": "10098235846",
  "surname": "Ggacbs",
  "givenname": "Mlihgw",
  "name": "Mlihgw Ggacbs",
  "country": "NO"
}
```
The `socialno` field is the social security number.

## Denmark
### NemID for citizens (POCES)
```json
{
  "identityscheme": "dknemid",
  "nameidentifier": "fc9b7dedfe674fdda97d8dc9079c6403",
  "sub": "{fc9b7ded-fe67-4fdd-a97d-8dc9079c6403}",
  "pidNumberIdentifier": "9208-2002-2-294247448400",
  "isYouthCert": "false",
  "companySignatory": "false",
  "cprNumberIdentifier": "0707490071",
  "name": "Terne Paulsen",
  "country": "DK",
  "2.5.4.5.1": "PID:9208-2002-2-294247448400",
  "2.5.4.5": "5CE82384",
  "2.5.29.29": "CN=TRUST2408 Systemtest XXXIV CA, O=TRUST2408, C=DK"
}
```
The `cprNumberIdentifier` field is the social security number. The `pidNumberIdentifier` identifies the legal person corresponding to the login, and is not considered sensitive.

### NemID for company signatories (POCES-with-CVR)
```json
{
  "identityscheme": "dknemid",
  "nameidentifier": "fc9b7dedfe674fdda97d8dc9079c6403",
  "sub": "{fc9b7ded-fe67-4fdd-a97d-8dc9079c6403}",
  "pidNumberIdentifier": "9208-2002-2-294247448400",
  "isYouthCert": "false",
  "companySignatory": "true",
  "cprNumberIdentifier": "0707490071",
  "cvrNumberIdentifier": "35389253 ",
  "2.5.4.10": "Hillemann Hessel Holding ApS",
  "name": "Terne Paulsen",
  "country": "DK",
  "2.5.4.5.1": "PID:9208-2002-2-294247448400",
  "2.5.4.5": "5CE82384",
  "2.5.29.29": "CN=TRUST2408 Systemtest XXXIV CA, O=TRUST2408, C=DK"
}
```
The `cprNumberIdentifier` field is the social security number.

### NemID for employees (MOCES)
```json
{
  "identityscheme": "dknemid",
  "nameidentifier": "c79c9cde000a4460b64ecb35730ee2bc",
  "sub": "{c79c9cde-000a-4460-b64e-cb35730ee2bc}",
  "ridNumberIdentifier": "72131748",
  "cvrNumberIdentifier": "31884357",
  "2.5.4.10": "HORSOSOFT ApS // CVR:31884357",
  "companySignatory": "false",
  "name": "PutandTrackTest",
  "country": "DK",
  "2.5.4.5.1": "CVR:31884357-RID:72131748",
  "2.5.4.5": "5BAD00A0",
  "2.5.29.29": "CN=TRUST2408 Systemtest XXII CA, O=TRUST2408, C=DK"
}
```
No social security number in this case, but the combination of `cvrNumberIdentifier` and `ridNumberIdentifier` identifies the legal person corresponding to the login.

### NemID for employees (MOCES)
```json
{
  "identityscheme": "dknemid",
  "nameidentifier": "c79c9cde000a4460b64ecb35730ee2bc",
  "sub": "{c79c9cde-000a-4460-b64e-cb35730ee2bc}",
  "ridNumberIdentifier": "72131748",
  "cvrNumberIdentifier": "31884357",
  "2.5.4.10": "HORSOSOFT ApS // CVR:31884357",
  "companySignatory": "false",
  "name": "PutandTrackTest",
  "country": "DK",
  "2.5.4.5.1": "CVR:31884357-RID:72131748",
  "2.5.4.5": "5BAD00A0",
  "2.5.29.29": "CN=TRUST2408 Systemtest XXII CA, O=TRUST2408, C=DK"
}
```
No social security number in this case, but the combination of `cvrNumberIdentifier` and `ridNumberIdentifier` identifies the legal person corresponding to the login.

### MitID
```json
{
  "identityscheme": "dkmitid",
  "nameidentifier": "0f9960a0d28d4353a3e2ea07f8ffa185",
  "sub": "{0f9960a0-d28d-4353-a3e2-ea07f8ffa185}",
  "streetaddress": "Ny testvej 15 7\n2200 København N\nDenmark",
  "uuid": "74ffcd31-fbaf-4c33-bdac-169f25c1e416",
  "cprNumberIdentifier": "2101270087",
  "dateofbirth": "1927-01-21",
  "age": "93",
  "name": "Ditlev Von Testesen",
  "country": "DK"
 ```
The `cprNumberIdentifier` field is the social security number.

## Finland
### Finnish Trust Network - BankID
```json
{
  "identityscheme": "fitupas",
  "nameidentifier": "788eb5abb2f84c0994a4d359f416f7ca",
  "sub": "{788eb5ab-b2f8-4c09-94a4-d359f416f7ca}",
  "name": "_19cfbd642c4a82b08613b841caf0e153c5956c14",
  "country": "FI",
  "givenname": "Väinö",
  "surname": "Tunnistus",
  "dateofbirth": "1970-07-07",
  "satu": "",
  "hetu": "070770-905D"
}
```
The `hetu` field is the personal identity code.

### Finnish Trust Network - Mobillivarmenne
Same as BankID, except the `satu` property will have a value as well.

## Itsme
### Basic level, with Extra ID Data and Security Data enabled
```json
{
  "identityscheme": "itsme",
  "authenticationtype": "urn:grn:authn:itsme:basic",
  "nameidentifier": "ba36dba1f5c6402ca3008d2abc1ac5b5",
  "sub": "{ba36dba1-f5c6-402c-a300-8d2abc1ac5b5}",
  "deviceinfo": {
    "os": "IOS",
    "appName": "ItsMe-E2E",
    "appRelease": "2.4.0",
    "deviceLabel": "iPhone12,1",
    "debugEnabled": "false",
    "deviceID": "9cae3bc120c14c9ab7cce80dc273e653a",
    "osRelease": "14.2",
    "manufacturer": "Apple",
    "hasSimEnabled": null,
    "deviceLockLevel": "FACE_ID",
    "smsEnabled": "true",
    "rooted": "false",
    "imei": null,
    "deviceModel": "iPhone",
    "sdkRelease": ""
  },
  "transactioninfo": {
    "info": null
  },
  "placeofbirth": {
    "city": "Uccle",
    "country": "BE",
    "formatted": "Uccle BE"
  },
  "dateofbirth": "1980-01-01",
  "phone_number_verified": "true",
  "phone_number": "+32 425010937",
  "email_verified": "false",
  "email": "alexandre@dierckx.com",
  "nationalnumber": "42501093792",
  "gender": "male",
  "surname": "Dierckx",
  "givenname": "Alexandre",
  "name": "Alexandre Dierckx",
  "address": {
    "formatted": "Havenlaan 1 1000 Brussel BE",
    "common_name": null,
    "street_address": "Havenlaan 1",
    "postal_code": "1000",
    "city": null,
    "locality": "Brussel",
    "region": null,
    "country": null
  }
 ```