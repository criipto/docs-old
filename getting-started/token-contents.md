---
title: Criipto Verify JSON Web Tokens
description: Examples of JWT payloads for select e-ID's
layout: article
---

# JWT contents for each e-ID type

Below you will find the the structure and example content for the JSON Web Tokens, the ID tokens, returned when signing in with each of the supported e-ID types.

The examples below illustrate only the fields that are user-specific. The actual JWTs issued contain other more technical, OIDC conformant, fields as well, which are mostly relevant for validation and session maintenance purposes.

### Sweden
- [BankID](#sebankid)

### Norway
- [BankID](#nobankid)
- [Vipps](#novipps)

### Denmark
- [NemID for citizens (POCES)](#poces)
- [NemID for company signatories (POCES-with-CVR)](#poces-cvr)
- [NemID for employees (MOCES)](#moces)
- [MitID](#dkmitid)

### Finland
- [Finnish Trust Network - BankID](#fibankid)
- [Finnish Trust Network - Mobillivarmenne](#mobillivarmenne)

### Belgium
- [Itsme](#itsme)
- [eID](#beeid)

### Germany
- [Sofort](#sofort)

## Sweden

<a name="sebankid"></a>

### BankID
```json
{
  "identityscheme": "sebankid",
  "nameidentifier": "1373c272b61a4cb588b29c44883fe62f",
  "sub": "{1373c272-b61a-4cb5-88b2-9c44883fe62f}",
  "ssn": "196802020575",
  "name": "Terne Paulsen",
  "given_name": "Terne",
  "family_name": "Paulsen",
  "ipaddress": "77.241.128.160",
  "country": "SE"
}
```
The `ssn` field is the social security number.

## Norway

<a name="nobankid"></a>

### BankID
```json
{
  "identityscheme": "nobankid-oidc",
  "nameidentifier": "ee9b1bb905a6458e9f3b9d068f1a3765",
  "sub": "{ee9b1bb9-05a6-458e-9f3b-9d068f1a3765}",
  "uniqueuserid": "9578-6000-4-351726",
  "certissuer": "CN=BankID - TestBank1 - Bank CA 3,OU=123456789,O=TestBank1 AS,C=NO;OrginatorId=9980;OriginatorName=BINAS;OriginatorId=9980",
  "certsubject": "CN=CriiptoTest\\, Mikkel,O=TestBank1 AS,C=NO,SERIALNUMBER=9578-6000-4-351726",
  "birthdate": "1946-03-27",
  "socialno": "27034698436",
  "family_name": "CriiptoTest",
  "given_name": "Mikkel",
  "name": "Mikkel CriiptoTest",
  "country": "NO"
}
```
The `socialno` field is the social security number. The `uniqueUserId` identifies the legal person corresponding to the login, and is not considered sensitive.

<a name="novipps"></a>

### Vipps
```json
{
  "identityscheme": "novippslogin",
  "nameidentifier": "75dca5991ad74a0981c092d424b82fbc",
  "sub": "{75dca599-1ad7-4a09-81c0-92d424b82fbc}",
  "address": {
    "street_address": "BOKS 6300, ETTERSTAD",
    "postal_code": "0603",
    "region": "OSLO",
    "country": "NO",
    "formatted": "BOKS 6300, ETTERSTAD\n0603\nOSLO\nNO"
  },
  "birthdate": "1955-09-82",
  "emailaddress": "mikkel@criipto.com",
  "mobilephone": "4748059940",
  "socialno": "10098235846",
  "family_name": "Ggacbs",
  "given_name": "Mlihgw",
  "name": "Mlihgw Ggacbs",
  "country": "NO"
}
```
The `socialno` field is the social security number.


## Denmark

<a name="poces"></a>

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

Also, you may additionally opt-in to having and `address` lookup enabled. This will add the following property to the payload:
```json
  "address": {
    "formatted": "Terne Paulsen\nDuevej 11\n2000 Frederiksberg",
    "common_name": "Terne Paulsen",
    "street_address": "Duevej 11",
    "postal_code": "2000",
    "city": "Frederiksberg",
    "locality": null,
    "region": null,
    "country": "Danmark"
  }
```
Existence of this field is not guaranteed, even if the you have opted in to lookup.

<a name="poces-cvr"></a>

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

<a name="moces"></a>

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

<a name="dkmitid"></a>

### MitID
```json
{
  "identityscheme": "dkmitid",
  "nameidentifier": "0f9960a0d28d4353a3e2ea07f8ffa185",
  "sub": "{0f9960a0-d28d-4353-a3e2-ea07f8ffa185}",
  "streetaddress": "Ny testvej 15 7\n2200 København N\nDenmark",
  "uuid": "74ffcd31-fbaf-4c33-bdac-169f25c1e416",
  "cprNumberIdentifier": "2101270087",
  "birthdate": "1927-01-21",
  "age": "93",
  "name": "Ditlev Von Testesen",
  "country": "DK"
}
```
The `cprNumberIdentifier` field is the social security number.


## Finland

<a name="fibankid"></a>

### Finnish Trust Network - BankID
```json
{
  "identityscheme": "fitupas",
  "nameidentifier": "788eb5abb2f84c0994a4d359f416f7ca",
  "sub": "{788eb5ab-b2f8-4c09-94a4-d359f416f7ca}",
  "name": "_19cfbd642c4a82b08613b841caf0e153c5956c14",
  "country": "FI",
  "given_name": "Väinö",
  "family_name": "Tunnistus",
  "birthdate": "1970-07-07",
  "satu": "",
  "hetu": "070770-905D"
}
```
The `hetu` field is the personal identity code.

<a name="mobillivarmenne"></a>

### Finnish Trust Network - Mobillivarmenne
Same as BankID, except the `satu` property will have a value as well.

## Belgium

<a name="itsme"></a>

### Itsme - Basic level, with Extra ID Data and Security Data enabled
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
  "birthdate": "1980-01-01",
  "phone_number_verified": "true",
  "phone_number": "+32 425010937",
  "email_verified": "false",
  "email": "alexandre@dierckx.com",
  "nationalnumber": "42501093792",
  "gender": "male",
  "family_name": "Dierckx",
  "given_name": "Alexandre",
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

<a name="beeid"></a>

### eID - verified, with national number, personal info, photo and address enabled

 ```json
 {
    "identityscheme": "beeid",
    "nameidentifier": "fb293a1749ea44e2831f51388450628f",
    "sub": "{fb293a17-49ea-44e2-831f-51388450628f}",
    "address": {
        "street_address": "Specimenstraat 12",
        "postal_code": "1000",
        "locality": "Brussel"
    },
    "personalinformation": {
        "card_number": "000000803177",
        "card_validity_date_from": "2020-08-03",
        "card_validity_date_to": "2030-08-03",
        "card_delivered_in_town": "Brussel",
        "name": "Specimen",
        "two_given_first_names": "Nora Angèle",
        "first_letter_of_3rd_given_name": "",
        "nationality": "BELG",
        "birth_location": "Leuven",
        "birth_date": "2001-05-03",
        "gender": "F",
        "noble_condition": "",
        "document_type": "1",
        "special_status": "0"
    },
    "pinverified": "true",
    "name": "Nora Angèle Specimen",
    "family_name": "Specimen",
    "surname": "Specimen",
    "given_name": "Nora Angèle",
    "givenname": "Nora Angèle",
    "nationalnumber": "01050399864",
    "picture": "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"
}
 ```

## Germany

<a name="sofort"></a>

### Sofort - Schufa age-check is always included
```json
{
  "identityscheme": "germansofort",
  "nameidentifier": "e59be66bf048495f97aca1db8e597fe2",
  "sub": "{e59be66b-f048-495f-97ac-a1db8e597fe2}",
  "given_name": "HANS-GERD",
  "family_name": "WARNECKE",
  "age": "67",
  "birthdate": "1953-01-16",
  "agecheck_result": "valid",
  "address": {
    "street_address": "ALTENBURGER STR. 10",
    "postal_code": "38444",
    "city": "WOLFSBURG",
    "country": "DE"
  }
}
```

{% iconnote note %}
Contrary to other login methods, the `sub` value is not persistent across logins from the same natural person.
{% endiconnote %}