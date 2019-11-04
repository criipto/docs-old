---
title: Criipto Verify Overview
description: Learn what Criipto is and how you can use it.
layout: article
---
# Criipto Verify Overview

Criipto Verify provides e-ID authentication as a service. 

{% iconnote note %}

An **e-ID** is a special kind of online identity that is tied to a *natural person*. A natural person in relation to e-ID is a living, individual human being. 

This means that when a person signs into your app or your web site with an e-ID you will know who the person really is. 

{% endiconnote %}

An e-ID is different from traditional external identity sources such as Google or Facebook. Generall an online identity lifecycle has three main phases:

1. **Enrollment** consists verifcation of legal identity and subsequently the issuance of digitial identity
2. **Active, day-to-day use** is the authentication of the user as the holder of an issued digital identity.
3. **Archival** terminates the active use of the idenity for authentication, but maintains the details for future reference in, for example, a dispute resolution case

## Why use Criipto Verify?

Generally you will want to use Criipto Verify when one of these scenarios fit your situation:

- You have a **regulatory requirements** to confirm and continously verify the legal identity of your users. Consider as a prominent example anti-money laundering regulation, AML, regualtion of the financial services sector, which sets strict requirements for customer identification
- You develop e-commerce solutions and have a business interest in identifying customers as part of your **fraud reduction and mitigation** activities.

In each of these cases using e-ID services provided by banks and goverments may be the preferable solution as it may be used for not only initial onboarding identity verification but most often also as a continues means of strong authentication.

At Criipto we strive to give developers and companies an easy path to using e-ID services without having to become security experts. To actually go live in production with e-ID you will still in most cases need to set up a formal relationship with a bank or government body in each of the relevant countries.

Technically, you can connect any application (written in any language or on any stack) to Criipto Verify and define the e-ID providers you want to use (how you want your users to log in). 

## Which industry standards does Criipto use?

At the core, being able to provide a service like Criipto Verify is based on the premise of *federated authentication*, which means that you delegate the authentication and authorization process to a service outside of your own applications. 

Becuase federated authentication leverages one or more widely adopted industry standards, you are free to implement your applications without having to worry about how the actual idenity services develop over time, how they are secured.

The identity industry standards that we use here in Criipto are:

- **Open Authorization (OAuth2)**: An authorization standard that allows a user to grant limited access to their resources on one site, to another site, without having to expose their credentials. 
- **OpenID Connect (OIDC)**: An identity layer that sits on top of OAuth 2 and allows for easy verification of the user's identity, as well the ability to get basic profile information from the identity provider.
- **JSON Web Tokens (JWT)**: An open standard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.