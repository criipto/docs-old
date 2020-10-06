---
layout: article
---

#  Signing text or PDF documents - ASP.NET Core

This tutorial demonstrates how to you can easily add digital signature capabilities for PDF and plain text documents to your own application(s), by using Criipto Verify's signing features.

{% iconnote note %}

Signing operations are different from authentication in two ways: They are not goverend by standard protocols soch as OpenID Connect or SAML. And, secondly, they are transactional by nature, with no concept of a long running session like a typical authentication flow.

{% endiconnote %}

Three steps are required to complete your first test login:

* [Register application in Criipto Verify](#register)
* [Set up your application to request PDF signature](#pdf)
* [Set up your application to request plain text signature](#text)

The tutorial will walk you through the technical details of the integration process between your application and Criipto Verify, and will also explain how to use test e-ID's to validate your integration. To use real e-ID's for signing, the integration is the same, but you must be [set up for Production](#production).

{% iconnote info %}

You need test e-ID users to see your code in action. How to get those is [described further down](#testusers).

And also, you can download a ready-to-run [sample from GitHub](https://github.com/criipto/signatures-demo) showing the below recipe in a minimalistic application setup.

{% endiconnote %}

This sample uses a `.NET Core` backend and accompanying `React.js` frontend. If you are building your system on other platforms, you can do exactly the same in any system that supports `JSON` over `HTTP`.

<a name="register"></a>

## Register Your Application in Criipto Verify
After you signed up for Criipto Verify, you must register an application before you can try requesting a signature. If you gaven't already done this, go to our management dashboard on [manage.criipto.id](https://manage.criipto.id), and navigate to the `Applications` tab and create a new application.

The sample application for this tutorial uses the following settings. When you move outside the scope of the demo and start the integration from your own system, change the values accordingly so your system communicates with Criipto Verify using it's dedicated settings.

![Register App](/images/register-app2.png)

Specifically, you will need the following information:

- _Client ID_ to identify your application to Criipto Verify. In the case below we chose `urn:criipto:samples:no1`
- _Domain_ on which you will be communicating with Criipto Verify. Could be for example `samples.criipto.id`
- _Callback URL_ on which your application expects the result of the signing process from Criipto Verify

### Register Callback URLs

Before you can start sending requests to Criipto Verify, you need to pre-register the URL(s) on which you expect to receive the returned JSON Web Token (aka a `JWT`) on.

These URLs are known as `Callback URL`s, and they are links to your system. Criipto Verify will send the `JWT` containing the outcome of the document signing process only to a pre-registered `Callback URL`. 

Callback URLs for the sample project are: `http://localhost:5000/sign/callback` and `https://localhost:5001/sign/callback`:

![Callback URLs](/images/callback-urls-signatures.png)

Make sure to add your own `Callback URL`s. Put each URL on a new line.

If you deploy your application to a different URL you will also need to ensure to add that URL to Callback URLs. 

<a name="pdf"></a>

## PDF document signatures

PDF document signatures are currently supported for Norwegian BankID only.

There are three important steps in obtaining a signature:
1. [Upload a PDF to Criipto Verify and retrieve a redirect URI](#pdfUpload)
2. [Redirect the user to the redirect URI](#pdfRedirect)
3. [Handle a callback from Criipto Verify](#pdfCallback)

<a name="pdfUpload"></a>

### 1. Upload a PDF to Criipto Verify and retrieve a redirect URI

A first step in obtaining a signature is to upload one or more PDF documents to Criipto Verify, which will respond with a redirect URI where you have to redirect the users browser to, so they can complete the signature process.

Endpoint: `/sign/pdfv1`

Query parameters:
  * `wa` - constant value: `wsignin1.0`
  * `wtrealm` - Your Criipto Verify Client ID
  * `wreply` - a signature callback URL for your application
  * `wauth` - `acr_value` of the authentication method. Currently only the Norwegian BankID, `urn:grn:authn:no:bankid`, may be used for PDF signing.
  * `ui_locales` - specify the UI language to use by authentication provider

Body parameters:
  * signProperties: Object\<SignProperties\>
  * documents: List\<PdfDocument\>

SignProperties class:
  * `orderName` - string displayed to the user as an instruction when starting the signature process
  * `showConfirmation` and `showUnderstanding` - booleans that controls some aspect of the native provider's UX
```c#
public class SignProperties {
  public string orderName {get; set;}
  public bool showConfirmation {get; set;}
  public bool showUnderstanding {get; set;}
}
```

PdfDocument class:
  * `description` - string, per-document description displayed to the user
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
      pdf = "...base64-encoded PDF document contents (UTF8)...",
      seal = new PdfSeal {
        x = 10,
        y = 10,
        page = 1
      }
    }
  }
};
```

If successful, Criipto Verify will respond with a `JSON` literal with a `redirectUri` property:
```
{
  "redirectUri": "a URL that you must redirect the users browser to"
}
```

<a name="pdfRedirect"></a>

### 2. Redirect the users browser to the redirect URI

After you have successfully retrieved a redirect URI from Criipto Verify, you have to redirect the users browser to the redirect URI. The user will then be given the chance to review the document(s) and proceed to the actual signing.

<a name="pdfCallback"></a>

### 3. Handle the callback from Criipto Verify

If signing was successful, a `signature` property will be posted to the `Callback URL` you specified in the first step, and it will contain a JWT.

Your system must now validate the JWT before consuming it for production purposes (such as storing it for bookkeeping purposes).

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

In the example above, `jwtToken.RawPayload` will contain information about the user that signed the document, and a base64-encoded PDF with the seal. Below is an example of a `jwtToken.RawPayload` retrieved from one of the test users.

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

## Plain text signature

Plain text signature is supported for DK NemID, NO BankID and SE BankID.

There are two important steps in obtaining a signature:
1. [Redirect the user to the signature endpoint](#textRedirect)
2. [Handle a callback from Criipto Verify](#textCallback)

<a name="textRedirect"></a>

### 1. Redirect the user to the signature endpoint

A first step is to construct a valid signature URL, and redirect the user to the Criipto Verify text signing endpoint: `/sign/text`

Query parameters:
  * `wa` - constant value: `wsignin1.0`
  * `wtrealm` - ˇYour Criipto Verify client ID
  * `wreply` - a signature callback URL for your application
  * `wauth` - `acr_value` of the authentication method you want to use. You can find the exact value(s) to use [here](#acr_values)
  * `signtext` - base64-encoded text to be signed
  * `orderName` - string displayed to the user as an instruction when starting a signature process by authentication provider
  * `showUnderstanding` and `showConfirmation` - booleans which control respective UI aspects of authentication provider
  * `ui_locales` - specify the UI language to use by authentication provider

Full signature URL example: `{your_criipto_domain}/sign/pdfv1?wa=wsignin1.0&wtrealm={your_criipto_id}&wreply=https://localhost:5001/sign/callback&wauth=urn:grn:authn:no:bankid&signtext=VGhpcyBpcyBhbiBleGFtcGxlLg%3D%3D&orderName=Signing%20demo&showUnderstanding=true&showConfirmation=true&ui_locales=en`

If a valid signature URL has been constructed, Criipto Verify will redirect the user to the authentication provider and handle signing, after which the user will be redirected to the callback URL, and a JWT will be posted to the callback route.

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

In the example above, `jwtToken.RawPayload` will contain information about the user who signed the text. Below is an example of a `jwtToken.RawPayload` retrieved from one of the test users.

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

<a name="acr_values"></a>

## List of acr_values
{% include snippets/login-methods.md %}