---
layout: article
title: MitID user interface requirements
---


# MitID user interface requirements

When supporting MitID in your application, you must adhere to a few style requirements, both [in your application](#webapp) 
and on [the MitID landing page](#landingpage) hosted by Criipto.

As long as you follow the guidelines below, you should be in compliance with the UX requirements from MitID. However, please reach out to our support if you need assistance verifying that your buttons, pages, and screens comply.

{% iconnote info %}

Note that when moving to production with MitID you will be bound by the terms of service for MitID in which you - among other things - commit to the below UX requirements.

Also, Criipto may request that you submit a URL where we can verify that you are, in fact, in line with the requirements.

{% endiconnote %}

<a name="landingpage"></a>

## The MitID landing page

With MitID everything happens on a page hosted by Criipto. Specifically, MitID cannot be iframed, only shown in full page view.

You will therefore redirect the current page to Criipto (alternatively [open a web view](#mobileapp) in a native app), or you may open up a popup window. The latter is only relevant on the desktop and is typically not recommended by Criipto.

### Styling the landing page

In general, the landing page for MitID may styled by following [the general guide on styling](/how-to/apply-custom-styling). In essence, you can modify the page any way you like using CSS.

As illustrated below, the default landing page has the MitID box - the red rectangle - at the center. 
It is essential that you do not, under any circumstances, change the styling or layout of anything inside the red rectangle.

![MitID default landing page](/images/mitid-landing-page.png)

<a name="webapp"></a>

## MitiD branding in your application

When referring to MitID in your application, web or native alike, you must make sure your language and styling matches 
the requirements.

If you are building a native app a few additional requirements must be observed as [described below](#mobileapp).

Criipto currently provides required assets, such as the MitID logo, upon request. 
### Call to Action

When providing a call to action, for example, log in or sign, make sure you follow these requirements:

- In web applications, always use a button or anchor tag, `<a>` or `<button>`, to make sure it is accessible for keyboard
navigation and screen readers according to the WCAG 3.0 standard. 
- The button must be the right color of blue with the white text. See the detailed styling below.
- The button text must be exactly one of the five allowed phrases as listed below.

The MitID button should be shown with lightly rounded corners:

<img src="/images/mitid-rounded.png" alt="Default MitID button" style="width: 300px; box-shadow: none;">

The key elements of the default styling are shown below, but we suggest to simply inspect the buttons in the MitID applet and copy the corresponding styles.

```css
{
    background: #0060e6;
    color: #ffffff;
    font-family: "IBM Plex Sans", Helvetica, Arial, sans-serif;
    border-radius: 4px;
    height: 48px;
    padding: .25rem .75rem .25rem 1rem;
}
```

The text inside the button must be from the set of approved texts:

| &nbsp;&nbsp;**Danish** | &nbsp;&nbsp;**English** |
| --- | --- |
| Log ind med MitID | Log on with MitID |
| Godkend med MitID | Approve with MitID |
| Bekræft med MitID | Confirm with MitID |
| Acceptér med MitID | Accept with MitID |
| Underskriv med MitID | Sign with MitID |

<br/>

<a name="mobileapp"></a>

## MitID branding in a native app

Just as illustrated above, your app must show a call to action which will open a webview hosting the MitID landing page:

<img src="/images/mitid-button-in-native-app.png" alt="MitID CTA in native app" style="width: 300px; box-shadow: none;">

Your app must use a platform-specific web view (Custom Tab on Android and Safari View Controller on iOS) which clearly reassures the user that they 
are on a legitimate mitid.dk domain with appropriate security (TLS and the padlock symbol):

<img src="/images/mitid-native-app-browser-with-address-visible.png" alt="MitID CTA in native app" style="width: 300px; box-shadow: none;">


