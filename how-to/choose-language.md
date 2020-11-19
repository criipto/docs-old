---
layout: article
title: Criipto Documentation - UI language
description: How to specify the language used by the user interface (where supported)
---

# Language detection
By default, Criipto Verify uses the _Accept-Language_ HTTP request header to figure out which language the user prefers. 

You can override this per authentication request by specifying a `ui_locales` query parameter. This works for both OpenID Connect and WS-Federation, even if WS-Federation does not have protocol support for per-request language selection.

The actual support for controlling the language varies by e-ID method

1. Danish NemID: Both keycard-based methods support `da` and `en`. Keyfile is only available in danish.
2. Norwegian BankID: `nb` and `en` supported.
3. Norwegian Vipps Login: Language is controlled by user in the app.
4. Swedish BankID: `sv` and `en` supported.
5. Finnish BankID: `fi`, `se` and `en` supported.
6. Dutch DigiD: User chooses language in the UI presented by Logius.
