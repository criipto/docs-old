---
layout: article
title: MitID user interface requirements
---


# MitID user interface requirements

When supporting MitID in your application, you must adhere to a few style requirements, both [in your application](#yourapp) 
and on [the MitID landing page](#landingpage) hosted by Criipto.  

As long as you follow the guidelines below, you must comply with the UX requirements from MitID. Please reach out to our support if you have questions about this or if you want us to verify that your buttons and landing page comply.

{% iconnote info %}

Note that when moving to production with MitID you will be agreeing to the terms of service for MitID in which you - among other things - commit to the below UX requirements.

Also, Criipto may request that you submit a URL where we can verify that you are, in fact, in line with the requirements.

{% endiconnote %}

<a name="yourapp"></a>

## The MitID landing page

With MitID everything happens on a page hosted by Criipto. Specifically, MitID cannot be iframed, only shown in full page view.

You will therefore redirect the current page to Criipto, or you may open up a popup window. The latter is only relevant on the desktop and is typically not recommended by Criipto.

### Styling the landing page

In general, the landing page for MitID may styled by following [the general guide on styling](/how-to/apply-custom-styling). In essence, you can modify the page any way you like using CSS.

As illustrated below, the default landing page has the MitID box - the red rectangle - at the center. 
It is essential that you do not, under any circumstances, change the styling or layout of anything inside the red rectangle.

![MitID default landing page](/images/mitid-landing-page.png)

<a name="yourapp"></a>

## MitiD branding in your application

When referring to MitID in your application, web or native alike, you must make sure your language and styling matches 
the requirements.

Criipto currently provides required assets, such as the MitID logo, upon request. 
### Call to Action

When providing a call to action, for example, log in or sign, make sure you follow these requirements:

- Always use a button or anchor tag, `<a>` or `<button>`, to make sure it is accessible for keyboard
navigation and screen readers according to the WCAG 3.0 standard. 
- The button must be the right color of blue with the white text. See the exact style guide below.
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

## MitID from a native app
Your app must show a call to action ![just like for websites](/images/mitid-button-in-native-app.png)

Your app must use a platform-specific web view (custom tab / Safari view controller) where the user can ![see the address bar and green (TLS) padlock clearly](/images/mitid-native-app-browser-with-address-visible.png).


