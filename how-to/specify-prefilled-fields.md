---
layout: article
title: Criipto Documentation - prefilled input
description: How to specify input that the user would otherwise be queried for
---

# Prefilled input fields
In some login flows, Criipto Verify needs user-specific data to complete the authentication. 

Examples:
1. CPR number in Denmark for personal NemID
2. SSN in Sweden for BankID on another device

By default, Criipto Verify propmts the user for this data when needed, but if you would like to avoid these dialogs, you can specify the values up-front in the request for authentication, via the `login_hint` query parameter. This works for both OpenID Connect and WS-Federation.

The actual support for controlling the input data varies by e-ID method:

1. Danish NemID: Use `login_hint=sub:CPR` where `CPR` has the format `DDMMYYXXXX`
2. Swedish BankID: Use `login_hint=sub:<SSN>` where `SSN` has the format `YYYYMMDDXXXX`
3. Norwegian BankID Mobile: Use `login_hint=BIM:<PHONENUMBER>:<BIRTHDATE>` where `PHONENUMBER` are 8 digits and `BIRTHDATE` has the format `DDMMYY`
4. Norwegian BankID Kodebrikke: Use `login_hint=BID:<SSN>` where `SSN` has the format `DDMMYYXXXXX`

