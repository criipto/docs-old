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
    "dk.mitid.assurancelevel": {
      "loa": "LOW",
      "ial": "HIGH",
      "aal": "LOW",
      "fal": "HIGH"
    },
    "sub": "d4bc4ade-cec2-4bc2-a28e-91c18a28b207",
    "dk.mitid.brokersecurityctx": "Test Broker 1 security context description",
    "dk.mitid.transactionid": "e85490b1-e27c-4c9d-bc89-cf02fc82a452",
    "dk.mitid.riskdata": {
      "riskData": [ ... ]
    },
    "dk.mitid.serviceproviderref": "Nets DanID A/S",
    "dk.mitid.ctx": "...==",
    "amr": [
      "pwd"
    ],
    "kid": "jwt-sign-2019-11-04",
    "iss": "MitID",
    "aud": "1fb35fab-d795-4dfe-a6eb-9cafb186ed46",
    "dk.mitid.attributes": {
      "mitid.dk.cpr_address": "Sidevej 81 1 MF",
      "mitid.dk.date_of_birth": "1990-08-01",
      "mitid.dk.identity_name": "Frida749",
      "mitid.dk.ial_identity_assurance_level": "HIGH",
      "mitid.dk.access_to_self_service": "false",
      "mitid.dk.uuid": "d4bc4ade-cec2-4bc2-a28e-91c18a28b207",
      "mitid.dk.identity_address": "Sidevej 81 1 MF\n2200 København N\nDenmark",
      "mitid.dk.age": "30",
      "mitid.dk.cpr_name": "Gorm Von Testesen"
    },
    "name": "Gorm Von Testesen",
    "dk.mitid.consenttxt": "Test Broker 1 consent text",
    "dk.mitid.brokerref": "Log på Test Service Provider 1 reference text",
    "dk.mitid.referencetxt": "Log på Test Service Provider 1 reference text",
    "exp": 1602008375,
    "iat": 1601990375,
    "jti": "c625e346-6fa1-4ae0-ac71-920f06687f36"
  }
```

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

### innish Trust Network - Mobillivarmenne
Same as BankID, except the `satu` property will have a value as well.