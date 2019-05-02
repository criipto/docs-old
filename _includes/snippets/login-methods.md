
Criipto Verify supports a range of country and bank specific e-ID services. They are all accessed through the same endpoints, e.g. `https://<YOUR COMPANY>.criipto.id/oauth2/authorize`

To pick the login method you must set the `AcrValues` parameter on the authentication request in order to choose the type of authentication you want. How you set this query string parameter varies with programming platform and your OpenID Connect library of choice.

The current list of possible values is:


| **Norwegian BankID** |
| &nbsp;&nbsp;Mobile:                                    | `urn:grn:authn:no:bankid:mobile` |
| &nbsp;&nbsp;Hardware token (kodebrikke):&nbsp;         | `urn:grn:authn:no:bankid:central` | 
| **Swedish BankID** |
| &nbsp;&nbsp;Same device:                               | `urn:grn:authn:se:bankid:same-device` | 
| &nbsp;&nbsp;Another device (aka mobile):&nbsp;         | `urn:grn:authn:se:bankid:another-device` | 
| **Danish NemID** |
| &nbsp;&nbsp;Personal with code card:&nbsp;             | `urn:grn:authn:dk:nemid:poces` | 
| &nbsp;&nbsp;Employee with code card:&nbsp;             | `urn:grn:authn:dk:nemid:moces` | 
| &nbsp;&nbsp;Employee with code file:&nbsp;             | `urn:grn:authn:dk:nemid:moces:codefile` | 
| **Finish e-ID** |
| &nbsp;&nbsp;BankID:                                    |`urn:grn:authn:fi:tupas` | 
| &nbsp;&nbsp;Mobile certificate (Mobiilivarmenne):&nbsp;|`urn:grn:authn:fi:mobile-id` | 
| &nbsp;&nbsp;Any of the two:                            |`urn:grn:authn:fi:all` | 

&nbsp;&nbsp;