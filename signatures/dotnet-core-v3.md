---
layout: article
---

# Criipto Signing

This tutorial demonstrates how to implement digital signature for PDF or plain text using Criipto Verify signing feature.

* [Register application in Criipto Verify](#register)
* [PDF signature](#pdf)
* [Plain text signature](#text)

This explains how to set up your application and test with test users. To use real e-IDs for signing, the setup is the same, but you must be [set up for Production](#production)

And note that you need test e-ID users to see your code in action. How to get those is [described further down](#testusers).

You may get a completed and ready to run [sample from GitHub](https://github.com/criipto/signatures-demo) showing the below recipe in the simplest of .NET Core and React.js applications, but similar principals can be applied to any technology, as it mainly relays on making properly structured HTTP requests to Criipto service.


<a name="register"></a>

## Register Your Application in Criipto Verify
After you signed up for Criipto Verify, you must register an application before you can actually try requesting a signature.

Once you register your application you will also need some of the information for communicating with Criipto Verify. You get these details from the settings of the application in the dashboard.

Specifically you need the following information to configure you application

- _Client ID_ to identify your application to Criipto Verify. In the case below we chose `urn:criipto:samples:no1`
- _Domain_ on which you will be communicating with Criipto Verify. Could be for example `samples.criipto.id`

![Register App](/images/register-app.png)

### Register callback URLs

Before you can start sending requests to Criipto Verify you need to register URLs on which you want to receive returned JSON Web Token, JWT.

A Callback URL of your application is a URL where Criipto Verify will post returned JWT after the user has signed the text/pdf. You will need to add this URL to the list of allowed URLs for your application. Callback URLs for the sample project are: `http://localhost:5000/sign/callback` and `https://localhost:5001/sign/callback`

Make sure to add these to the Callback URLs section of your application. Put each URL on a new line.

If you deploy your application to a different URL you will also need to ensure to add that URL to Callback URLs. 


<a name="pdf"></a>

## PDF signature

PDF signature is currently supported by Bank ID only.

There are three important steps in obtaining a signature:
1. [Upload a PDF to Criipto Verify and retrieve a redirect URI](#pdfUpload)
2. [Redirect a user to the redirect URI](#pdfRedirect)
3. [Handle a callback from Criipto Verify](#pdfCallback)

<a name="pdfUpload"></a>

### 1. Upload a PDF to Criipto Verify and retrieve a redirect URI

A first step in obtaining a signature is to upload a PDF document to Criipto Verify, which will responde with a redirect URI where you have to redirect a user to complete the signature process.

Endpoint: `/sign/pdfv1`

Query parameters:
  * `wa` - constant value: `wsignin1.0`
  * `wtrealm` - Your Criipto Verify Client ID
  * `wreply` - a signature callback URL for your application
  * `wauth` - `acr_value` of the authentication method you want to use - currently only Bank ID is supported: `urn:grn:authn:no:bankid`
  * `ui_locales` - specify the UI language to use by authentication provider

Body parameters:
  * signProperties: Object\<SignProperties\>
  * documents: List\<PdfDocument\>

SignProperties class:
  * `orderName` - string displayed to a user as an instruction when starting a signature process by authentication provider
  * `showConfirmation` and `showUnderstanding` - booleans which control respective UI aspects of authentication provider
```c#
public class SignProperties {
  public string orderName {get; set;}
  public bool showConfirmation {get; set;}
  public bool showUnderstanding {get; set;}
}
```

PdfDocument class:
  * `description` - string, document description,
  * `pdf` - string, base64 encoded PDF document
  * `seal` - Object\<PdfSeal\>, specify an absolute position of the seal in the signed document 
```c#
public class PdfDocument {        
  public string description {get; set;}
  public string pdf {get; set;}
  public PdfSeal seal {get; set;}
}
```

PdfSeal class:
  * `x` and `y` - integer, absolute position of the seal
  * `page` - number of the page where the seal will be applied to
```c#
public class PdfSeal {
  public Int64 x {get; set;}
  public Int64 y {get; set;}
  public Int64 page {get; set;}
}
```

Full URI example: `{your_criipto_domain}/sign/pdfv1?wa=wsignin1.0&wtrealm={your_criipto_id}&wreply=https://localhost:5001/sign/callback&wauth=urn:grn:authn:no:bankid&ui_locales=en`

Body example:
```c#
var body = new PdfSignRequest {
  signProperties = new SignProperties {
    orderName = "Demo signing",
    showConfirmation = true,
    showUnderstanding = true
  },
  documents = new List<PdfDocument> {
    new PdfDocument {
      description = "Demo document",
      pdf = input.pdfBase64,
      seal = new PdfSeal {
        x = 10,
        y = 10,
        page = 1
      }
    }
  }
};
```

If successful, Criipto Verify will respond with a `redirectUri`.

<a name="pdfRedirect"></a>

### 2. Redirect a user to the redirect URI

After you have successfully retrieved a redirect URI from Criipto Verify, you have to redirect a user to the redirect URI. Here a user will have a chance to review the document once again and proceed with signing.

<a name="pdfCallback"></a>

### 3. Handle a callback from Criipto Verify

If signing was successful, a `signature` property will be posted to the callback route you specified in the first step, and it will contain a JWT.

It's recommended to validate a JWT before consuming it.

```c#
var validationParams = new TokenValidationParameters{
  ValidIssuer = discoveryDoc.Issuer,
  ValidAudience = _configuration["CriiptoVerify:ClientId"],
  IssuerSigningKeys = discoveryDoc.SigningKeys,
};

var tokenHandler = new JwtSecurityTokenHandler{
  InboundClaimTypeMap = new Dictionary<string, string>(),
  MaximumTokenSizeInBytes = int.MaxValue
};

SecurityToken validatedToken = null;
var claimsPrincipal = tokenHandler.ValidateToken(response.signature, validationParams, out validatedToken);
var jwtToken = validatedToken as JwtSecurityToken;

if (jwtToken != null) {
  ViewData["payload"] = jwtToken.RawPayload;
}
```

In the example above, `jwtToken.RawPayload` will contain information about a user who signed the document, and a base64-encoded PDF with the seal. Below is an example of a `jwtToken.RawPayload` retrieved from one of the test users.

```
{
  "iss": "https://easyid.www.prove.id",
  "aud": "urn:grn:app:easyid-signing-demo",
  "sub": "{df8a73f0-8e54-472d-987d-0d218ae6a62e}",
  "bankid_sub": "24ac2c8a-afe3-4e1e-ae49-87022adfccf2",
  "birthdate": "1960-07-24",
  "name": "Marko Bura",
  "bankid_altsub": "9578-6000-4-454370",
  "ssn": "24071462532",
  "uniqueuserid": "9578-6000-4-454370",
  "certissuer": "CN=BankID - TestBank1 - Bank CA 3,OU=123456789,O=TestBank1 AS,C=NO;OrginatorId=9980;OriginatorName=BINAS;OriginatorId=9980",
  "certsubject": "CN=Bura\\, Marko,O=TestBank1 AS,C=NO,SERIALNUMBER=9578-6000-4-454370",
  "evidence": [
    {
      "signedDocumentSha256": "pOIZryPECQB1nAtIfiw4Di7CFS5koXxrzDbbAMVKUKc=",
      "padesSignedPdf": "{base64_encoded_signed_pdf}"
      "description": "Demo document",
      "unsignedDocumentSha256": "Avhz9KkWRKzVZ9iRC9lGk5hWiFjk6hMHvBH5/uS9hbs="
    }
  ],
  "iat": 1600524372,
  "nbf": 1600524372,
  "exp": 1600524372
}
```

A base64-encoded signed PDF can be retrieved from `jwtToken.RawPayload.evidence[0].padesSignedPdf`.


<a name="text"></a>

## Text signature

Text signature is currently supported by Nem ID, NO Bank ID and SE Bank ID.

There are two important steps in obtaining a signature:
1. [Redirect a user to the signature endpoint](#textRedirect)
2. [Handle a callback from Criipto Verify](#textCallback)

<a name="textRedirect"></a>

### 1. Redirect a user to the signature endpoint

A first step is to construct a valid signature URL, and redirect a user to the Criipto Verify text signing endpoint: `/sign/text`

Query parameters:
  * `wa` - constant value: `wsignin1.0`
  * `wtrealm` - ˇYour Criipto Verify client ID
  * `wreply` - a signature callback URL for your application
  * `wauth` - `acr_value` of the authentication method you want to use - currently only Nem ID, NO Bank ID and SE Bank ID are supported
  * `signtext` - base64-encoded text to be signed
  * `orderName` - string displayed to a user as an instruction when starting a signature process by authentication provider
  * `showUnderstanding` and `showConfirmation` - booleans which control respective UI aspects of authentication provider
  * `ui_locales` - specify the UI language to use by authentication provider

Full signature URL example: `{your_criipto_domain}/sign/pdfv1?wa=wsignin1.0&wtrealm={your_criipto_id}&wreply=https://localhost:5001/sign/callback&wauth=urn:grn:authn:no:bankid&signtext=VGhpcyBpcyBhbiBleGFtcGxlLg%3D%3D&orderName=Signing%20demo&showUnderstanding=true&showConfirmation=true&ui_locales=en`

If a valid signature URL has been constructed, Criipto Verify will redirect a user to the authentication provider and handle signing, after which a user will be redirected to the callback URL, and a JWT will be posted to the callback route.

<a name="textCallback"></a>

### 3. Handle a callback from Criipto Verify

If signing was successful, a `signature` property will be posted to the callback route you specified in the first step, and it will contain a JWT.

It's recommended to validate a JWT before consuming it.

```c#
var validationParams = new TokenValidationParameters{
  ValidIssuer = discoveryDoc.Issuer,
  ValidAudience = _configuration["CriiptoVerify:ClientId"],
  IssuerSigningKeys = discoveryDoc.SigningKeys,
};

var tokenHandler = new JwtSecurityTokenHandler{
  InboundClaimTypeMap = new Dictionary<string, string>(),
  MaximumTokenSizeInBytes = int.MaxValue
};

SecurityToken validatedToken = null;
var claimsPrincipal = tokenHandler.ValidateToken(response.signature, validationParams, out validatedToken);
var jwtToken = validatedToken as JwtSecurityToken;

if (jwtToken != null) {
  ViewData["payload"] = jwtToken.RawPayload;
}
```

In the example above, `jwtToken.RawPayload` will contain information about a user who signed the text. Below is an example of a `jwtToken.RawPayload` retrieved from one of the test users.

```
{
  "iss": "https://easyid.www.prove.id",
  "aud": "urn:grn:app:easyid-signing-demo",
  "signtext": "VGhpcyBpcyBleGFtcGxlLg==",
  "sub": "{df8a73f0-8e54-472d-987d-0d218ae6a62e}",
  "bankid_sub": "24ac2c8a-afe3-4e1e-ae49-87022adfccf2",
  "birthdate": "1960-07-24",
  "name": "Marko Bura",
  "bankid_altsub": "9578-6000-4-454370",
  "ssn": "24071462532",
  "ocspResponse": "{ocsp_response}",
  "uniqueuserid": "9578-6000-4-454370",
  "certissuer": "CN=BankID - TestBank1 - Bank CA 3,OU=123456789,O=TestBank1 AS,C=NO;OrginatorId=9980;OriginatorName=BINAS;OriginatorId=9980",
  "certsubject": "CN=Bura\\, Marko,O=TestBank1 AS,C=NO,SERIALNUMBER=9578-6000-4-454370",
  "evidence": "{evidence}",
  "iat": 1600528255,
  "nbf": 1600528255,
  "exp": 1600528255
}
```

<a name="testusers"></a>

## Test users

{% include snippets/test-users.md %}

<a name="production"></a>

## Setting up for Production

{% include snippets/set-up-production.md %}