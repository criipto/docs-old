---
layout: article
title: Criipto Documentation - custom styling
description: How to customize the UI in user-facing dialogs
---

# Apply custom styling to login pages

Some of the e-ID methods require additional dialogs outside of those of the actual eID service.
These may be styled to you liking using CSS as described below.

## Preview of the user-facing dialogs
You can see a preview of the dialogs in the `Identity Services` tab for your tenant in the management dashboard on [manage.criipto.id](https://manage.criipto.id) - such as the ones for SE BankID:

![Previews](/images/preview-sebankid.png)

Each e-ID method supports a specific set of languages - see [UI Language]({% link how-to/choose-language.md %}) for details. You can change the language used to generate the previews in the dropdown.

Each of the previews is shown in mobile device size by default, but you can expand each of the previews to desktop size by clicking on the dashed square shown just above each preview. In desktop mode, all dialogs will have a customizable common header and footer structure, as well as the elements presented for mobile devices.

You can enter a URL to your own (self-hosted) style sheet just above the previews, and experiment with the effect of changing the preview tile size. The previews use the value in the `Link to your own style sheet` field, so you can see the effect of your customizations before you hit `Save`.

![Custom Styling](/images/custom-styling.png)

<a name="dynamic-stylesheets"></a>

## 'Dynamic' style sheets

In some cases, bundling all of your CSS in just one style sheet can be tricky and/or infeasible. Criipto Verify supports overriding the _path_ part of the style sheet URL on a per-authorize request basis.

You can specify a `css_path:/a/b/...?c=d&e=f&...` token in the `login_hint` query parameter in your authorize request, which will then override the path and query parts of the pre-configured style sheet URL.
Criipto Verify will use the authority part of your pre-configured URL as a "base" URL, and then set the value you specify in the `css_path` token as the path name and query part of the style sheet URL.

{% iconnote info %}

If you have not configured a custom style sheet URL, Criipto Verify ignores the `css_path` token in the `login_hint` query parameter.

{% endiconnote %}

### Example

If you have configured, say,
```
https://my.css.host/static/path
```
as a custom style sheet, and your construct an authorize request containing a
```
css_path:dynamic/subpath?q=x
```
in the `login_hint` parameter, the resulting CSS URL put in the HTML responses from Criipto Verify will change to
```
https://my.css.host/dynamic/subpath?q=x
```

{% iconnote info %}

You can specify more than 1 query parameter in the `css_path` token. In this case, you must URL-component encode (at least) the `&` characters in the query before adding them to the value of the `css_path` token. The URL-component version of the `&` chararcter is `%26`.

{% endiconnote %}

## Common HTML structures found in user-facing dialogs

## Localizable texts
These appear in both common and dialog-specific HTML elements. The structure is the same everywhere:
```html
    <span class="lang lang-sv">
        <span class="text">...svenska ord...</span>
    </span>
    <span class="lang lang-en">
        <span class="text">...english words...</span>
    </span>
```
The wording can be change via CSS selectors in your custom style sheet - see below for examples.
Depending on the e-ID, the `lang-sv` class will be replaced with `lang-da`, `lang-nb` etc.

## Desktop screen sizes

### Above the Criipto Verify frame
```html
<header id="header" class="default-hidden desktop-show">
    <div class="inner"></div>
</header>
<h1 id="headline" class="default-hidden desktop-show centered">
    <span class="lang lang-sv">
        <span class="text">...svenska ord...</span>
    </span>
    <span class="lang lang-en">
        <span class="text">...english words...</span>
    </span>
</h1>
```
You can change the texts in the `<h1 id="headline">` element via the following CSS:
```css
#headline .lang span {
  display: none;
}
#headline .lang-sv:after {
  content: "...andra svenska ord...";
}
#headline .lang-en:after {
    content: "...other english words...";
}
```
### Below the Criipto Verify frame
```html
<aside id="description" class="centered default-hidden desktop-show">
    <p>
        <span class="lang lang-sv">
            <span class="text">...svenska ord #1...</span>
        <span class="lang lang-en">
            <span class="text">...english words #1</span>
        </span>
    </p>
    <p>
        <span class="lang lang-sv">
            <span class="text">...svenska ord #2...</span>
        </span>
        <span class="lang lang-en">
            <span class="text">...english words #2</span>
        </span>
    </p>
    <p class="default-hidden">
        <span class="lang lang-sv">
            <span class="text"></span>
        </span>
        <span class="lang lang-en">
            <span class="text"></span>
        </span>
    </p>
    <p class="default-hidden">
        <span class="lang lang-sv">
            <span class="text"></span>
        </span>
        <span class="lang lang-en">
            <span class="text"></span>
        </span>
    </p>
    <p class="default-hidden">
        <span class="lang lang-sv">
            <span class="text"></span>
        </span>
        <span class="lang lang-en">
            <span class="text"></span>
        </span>
    </p>
</aside>
<footer id="footer" class="default-hidden desktop-show">
    <div class="inner centered"></div>
</footer>
```

***Note*** The text elements in the last 3 paragraphs in the `<aside>` are intentionally left blank by default.

You can change the texts in each of the `<p>` elements via the following CSS:
```css
#description p:nth-child(-n+2) .lang span {
  display: none;
}
#description p:nth-child(1) .lang-sv:after {  
  content: '...andra svenska ord #1...';
}
#description p:nth-child(2) .lang-sv:after {  
  content: '...andra svenska ord #2...';
}
#description p:nth-child(1) .lang-en:after {
  content: '...other english words #1...'
}
#description p:nth-child(2) .lang-en:after {
  content: '...other english words #2...'
}
```
where the first selector hides all the default texts in the `<aside id="description">` element in one go, and the subsequent 4 selectors adds language-specific texts per `<p>` element.

If you want to show text in one of the hidden-by-default `<p>` elements, you can do the following (here, the third `<p>` is having an English text added):
```css
#description p:nth-child(3) {
  display: inline;
}
#description p:nth-child(3) .lang-en:after {
  content: '...this is hidden by default...'
}
```
***Note*** The first selector is needed to "undo" the effect of the `default-hidden` class on the third `<p>` element.

## CSS classes
### Generally available
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
```html
    <body class="sebankid broker auth host-identity-yourdomain-com app-one">
```

You can use these dynamically added CSS classes to customize the UI on a per-application basis, which may be quite practical for, say, Single Sign-On scenarios where you re-use a Criipto Verify DNS domain across web applications with very different branding requirements.

### Dialog specific
Each of the dialogs have their own HTML/CSS structure, and you can inspect the details with your browsers developer tools.
You get the best overview if you expand the preview first.

## Example: Replacing headline texts in the signature flow for SE BankID
If you expand the `Another Device: Prompt for SSN` preview, you'll se a `{Log in with BankId | Logga in med BankId}` headline text (actual text will depend on the currently selected language for the SE BankID previews).

Should you also want to change the wording for signature flow, you could add the following selectors to your custom style sheet:
```css
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

## Original (now obsolete) HTML/CSS version
For tenants that were created before the beginning of October 2020, it is possible to toggle between the original and the current HTML/CSS structure. We recommend moving to the current version as soon as possible, as the original structure is now obsolete, and will only be updated with bugfixes.
