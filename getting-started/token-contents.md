---
title: Criipto Verify Json Web Tokens
description: Examples of JWT payloads for select e-ID's
layout: article
---

The examples below contain only fields that are user-specific. The actual tokens issued by Criipto Verify also contain some other fields as well, which are mostly relevant for validation and session maintenance purposes.

# Sweden
## BankID
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

# Norway
## BankID
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

## Vipps
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

# Denmark
## NemID for citizens (POCES)
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

## NemID for company signatories (POCES-with-CVR)
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

## NemID for employees (MOCES)
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

# Finland
## TUPAS
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

## Mobillivarmenne
Similar to what you get from TUPAS, but `satu` will have a value as well.