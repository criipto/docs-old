---
layout: article
---

# Getting ready for production

Once you have developed and tested your application to work with test user accounts, you are ready to move ahead and work with real user e-ID accounts.

_Please note_ that for production usage you do need a paid subscription.

1. If you haven't done so already, go to the [subscription management site](https://subscription.criipto.com) and choose a plan that suits your expected usage.
2. Go to [manage.criipto.id](https://manage.criipto.id) and log in to access your tenant
3. Go to the "Domains" tab and set up a production domain.
    - Note that if you choose a domain that ends with something other than `criipto.id`, you must also bring your own SSL certificate
4. Go to the "Applications" tab and register your production application:
    - **_Note: It is important_** that you register it on a production domain, probably the one from the previous step
    - The Client ID must be unique; it cannot be the same as any of your other applications
5. Configure your production application with the new Client ID and Client secret. 

Once you have been through these steps you are ready to start using real Swedish BankID, Danish NemID, and so on in your production application.
