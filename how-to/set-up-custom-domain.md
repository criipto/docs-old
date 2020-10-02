---
layout: article
title: Criipto Documentation - Custom Domain
description: How to set up a custom domain for Criipto Verify
---

# Set Up Custom Domain

## Set up DNS CNAME record

1. Configure a DNS CNAME record for your domain to point it to `idp.criipto.id`
2. Go to Criipto Verify Dashboard and under Domain, choose to create a new domain
3. Select `<your-domain.*>`, enter domain details, and choose Verify your domain settings

If your custom domain successfully resolved to `idp.criipto.id`, you will see a checkmark appear, otherwise give it more time for DNS records to update, or check if you properly set a DNS CNAME record.

![Set up custom domain](/images/custom-domain.JPG)


## Create a self-contained certificate and upload it to Criipto Verify
1. If you don't have it already, download the root CA from your issuer
    - [How to obtain a root certificate](#root-certificate)
2. Download the chain of intermediate certificates from your issuer. Certificate issuers typically make these available from the same public website where you downloaded the root certificate in step 1. We will assume in the following that you have downloaded this bundle to a file called `ca_bundle.crt`.
3. You need the end-entity certificate and a corresponding `private.key` as well. Your mileage may vary a lot here, depending on which format your issuer makes this available in. Some will deliver 2 separate files - and we will refer to them in the following as `private.key` and `end-entity.crt`. Others will wrap them into a password-protected .p12 or .pfx file. If you have such a file (and assuming that it is called `certificate.pfx`), you can split it up into a private key and an end-entity certificate with 2 `openssl` commands:
    - `openssl pkcs12 -in certificate.pfx -nocerts -out private.key`
    - `openssl pkcs12 -in certificate.pfx -nokeys -out end-entity.crt`
4. Ensure that all certificates files are newline-terminated. You can use your favourite text editor to do this manually, but you can also leverage a tool such as `sed` by executing the following command for every certificate:
  ```
    sed -i -e '$a\' {file_name}.crt
  ```
If you are on Windows, you can [install the Ubuntu app](#ubuntu-on-windows) to get access to `sed`.

5. Concatenate all the certificates into one `.pem` file. Make sure to do it in the correct order.
  
    Linux:
    ```
    cat root.crt ca_bundle.crt end-entity.crt > all-certs.pem
    ```

    Windows:
    ```
    type root.crt ca_bundle.crt end-entity.crt > all-certs.pem
    ```
6. Create a self-contained `.p12` certificate. You will be prompted to create a password in this step.
  ```
    openssl pkcs12 -export -out {file_name}.p12 -inkey private.key -in all-certs.pem
  ```
  If you are on Windows, you can [install the Ubuntu app](#ubuntu-on-windows) to get access to `openssl`.

7. In Criipto Verify Dashboard, under Domain, select your custom domain and upload a self-contained certificate with a password.

<a name="root-certificate"></a>

## How to obtain a root certificate

### Windows
1. Open a certificate with a default program - Crypto Shell Extensions
2. Switch to a `Certification Path` tab
  ![Certification Path](/images/certificate-general.JPG)
3. Double-click on the top certificate (root certificate)
4. Another window will pop up. Switch to a `Details` tab and choose `Copy to File...` button
  ![Root Certificate](/images/root-certificate.JPG)
5. Choose `Next`, then choose `Base-64 encoded X.509(.CER)`
6. Enter a file name and choose a destination
7. Choose `Next`, then `Finish`

The root certificate is now copied to the chosen destination.

### Linux
1. Read the content of your certificate by executing:

    For base-64 encoded certificates:
    ```
    openssl x509 -in {your_certificate}.crt -text -noout
    ```
    For certificates in DER format:
    ```
    openssl x509 -in {your_certificate}.crt -inform DER -text
    ```
2. Check the Issuer CN and Subject CN. If they do not match, it means this is an intermediate certificate. In that case, find `CA Issuers - URI` in the certificate details and download the issuer certificate.
    ```
    curl -O {issuer_certificate_uri}
    ```
3. Repeat steps 1 and 2 with obtained certificate in the previous step until you find a root certificate.

<a name="ubuntu-on-windows"></a>

## Get Ubuntu on Windows
You can get access to a plethora of useful tools by installing the Ubuntu app from the Microsoft Store.

In the Start Menu, type "Microsoft Store", open the store, type "Ubuntu" in the Store's search box, click the Install button and follow the setup instructions.
