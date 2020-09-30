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

![Callback URLs](/images/custom-domain.JPG)


## Create a self-contained certificate and upload it to Criipto Verify
1. If you don't have it already, obtain a root CA from your issuer
2. Gather any intermediate certificates and/or `ca_bundle.crt` you may require, and the end-entity certificate with a `private.key`
3. Ensure that all certificates are newline-terminated by executing the following command for every certificate:
  ```
    sed -i -e '$a\' {file_name}.crt
  ```

    If you are on Windows, you can [get sed for Windows](http://gnuwin32.sourceforge.net/packages/sed.htm).

4. Concatenate all the certificates into one `.pem` file. Make sure to do it in the correct order.
  
    Linux:
    ```
    cat root.crt ca_bundle.crt end-entity.crt > all-cert.pem
    ```

    Windows:
    ```
    type root.crt ca_bundle.crt end-entity.crt > all-cert.pem
    ```
5. Create a self-contained `.p12` certificate. You will be prompted to create a password in this step.
  ```
    openssl pkcs12 -export -out {file_name}.p12 -inkey private.key -in all-certs.pem
  ```
  If you are on Windows, you can [get openssl for Windows](http://gnuwin32.sourceforge.net/packages/openssl.htm).
6. In Criipto Verify Dashboard, under Domain, select your custom domain and upload a self-contained certificate with a password.