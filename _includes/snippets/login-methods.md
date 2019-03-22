
Criipto Verify supports a range of country and bank specific e-ID services. They are all accessed through the same endpoints, e.g. `https://<YOUR COMPANY>.criipto.id/oauth2/authorize`

To pick the login method you must set the `AcrValues` parameter on the authentication request in order to choose the type of authentication you want. How you set this query string parameter varies with programming platform and your OpenID Connect library of choice.

The current list of possible values is:

| **Norwegian BankID** |
| Mobile:                                    | `urn:grn:authn:no:bankid:mobile` |
| Hardware token (kodebrikke):&nbsp;         | `urn:grn:authn:no:bankid:central` | 
| **Swedish BankID** |
| Same device:                               | `urn:grn:authn:se:bankid:same-device` | 
| Another device (aka mobile):&nbsp;         | `urn:grn:authn:se:bankid:another-device` | 
| **Danish NemID** |
| Personal with code card:&nbsp;             | `urn:grn:authn:dk:nemid:poces` | 
| Employee with code card:&nbsp;             | `urn:grn:authn:dk:nemid:moces` | 
| Employee with code file:&nbsp;             | `urn:grn:authn:dk:nemid:moces:codefile` | 
| **Finish e-ID** |
| BankID:                                    |`urn:grn:authn:fi:tupas` | 
| Mobile certificate (Mobiilivarmenne):&nbsp;|`urn:grn:authn:fi:mobile-id` | 
| Any of the two:                            |`urn:grn:authn:fi:mobile-id` | 
&nbsp;