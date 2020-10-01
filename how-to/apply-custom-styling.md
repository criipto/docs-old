---
layout: article
title: Criipto Documentation - custom styling
description: How to customize the UI in user-facing dialogs
---

# Preview of the user-facing dialogs
You can see a preview of a representative subset of the dialogs in the `Identity Services` tab for your tenant in the management dashboard on [manage.criipto.id](https://manage.criipto.id) - such as the following 2 used in the another-device flow for SE BankID:

![Previews](/images/preview-sebankid-anotherdevice.png)

Each of the dialogs is shown in mobile device size by default, but you can expand each of the view templates to desktop size by clicking on the dashed square shown just above the templates. That will also let you use your browsers developer tools to inspect the underlying HTML and corresponding CSS attributes.

You can enter a URL to your own (self-hosted) stylesheet just above the previews, and experiment with the effect of changing the preview tile size. The previews use the value in the `Link to your own stylesheet` field, so you can see the effect of your customizations before you hit `Save`.

![Custom Styling](/images/custom-styling.png)

# Generic HTML structure of user-facing dialogs
TODO: A drawing of our frame-model

# Generally available CSS classes
Each `<body>` element has up to 5 CSS classes attached to it:
1. Indicator of the e-ID method in use - such as `sebankid`.
2. Indicator that this is a page from Criipto Verify - `broker`. This makes it possible to target our pages specifically, even if you use the same CSS file for different websites.
3. Indicator of the flow in use - authentication (`auth`) or signature (`sign`).
4. Indicator of which DNS name the page is loaded on.
5. (Optional) Your very own CSS class name on a per-application basis. You can set it in the management UI as well.

Putting it all together, for a case where:

- your Verify DNS name is `identity.yourdomain.com` 
- you request `authentication` for `SE BankID`
- you have set a CSS class name value of `app-one` for the app requesting authentication

you will have the following CSS class content on the `body` tag:
```
    <body class="sebankid broker auth host-identity-yourdomain-com app-one">
```

## CSS classes per dialog
Each of the dialogs have their own HTML/CSS structure, and you can inspect the details with your browsers developer tools.

# Replacing built-in texts
If you expand the `Another Device: Prompt for SSN` preview, you'll se a `{Log in with BankId | Logga in med BankId}` headline text (actual text will depend on the currently selected language for the SE BankID previews). If you want to change these texts, you could add the following to your stylesheet:
```
.auth #headline .lang span {
  display: none;
}
.auth #headline .lang-sv:after {
  content: "Logga in med Bank-ID";
}
.auth #headline .lang-en:after {
    content: "Auth with Bank-ID";
}
```
The first bit hides the default texts (the `.lang` selector hits both built-in texts), and the 2 following selectors then add new content per supported language.

Should you also want to change the wording for signature flow, you could add the following selectors as well:
```
.sign #headline .lang span {
  display: none;
}
.sign #headline .lang-sv:after {
  content: "Signera med Bank-ID";
}
.sign #headline .lang-en:after {
    content: "Sign with Bank-ID";
}
```

# Original (now obsolete) HTML/CSS version
For tenants that were created before the beginning of October 2020, it is possible to toggle between the original and the current HTML/CSS structure. We recommend moving to the current version as soon as possible, as the original structure is now obsolete, and will only be updated with bugfixes.
