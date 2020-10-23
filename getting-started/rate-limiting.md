---
title: Criipto Verify Rate Limiting
description: Learn how Criipto Verify enforces rate limits.
layout: article
---
# Criipto Verify Rate Limiting

Criipto Verify applies rate limits on 2 different levels. 
1. On a service-wide level, DoS and DDoS protection mechanisms are enforced
2. On a per-user level, limits to the amount of permissible single sign-ons are enforced

We keep the details of the DoS and DDoS guards internal, but you can read about the formal aspects of that in our [terms of service](https://www.criipto.com/tos#dos).

## Single sign-on (SSO) limits
Criipto Verify has 2 per-user rate limits for how many SSO attempts that can be performed.

{% iconnote note %}

There are no limits to the amount of interactive user logins. The limits only apply to subsequent SSO's based on the session established during interactive login.

{% endiconnote %}

- High-frequency guard: Max 2 SSO's per 5 seconds.
- Low-frequency guard: Max 6 SSO's per hour.

The high-frequency guard protects against sudden spikes in traffic, while the low-frequency guard protects against long-running repeated SSO attempts.

The settings for the high-frequency limit is chosen so it is possible to have a "mash-up" of websites where you must establish sessions in rapid succession after the interactive login, but also ensures that any given user cannot abuse the service.

The settings for the low-frequency guard is chosen to ensure that, say, broken infrastructure in client deployments do not accidentally trigger an excessive load on the service. Such errors can trigger a very large load on the service, because the involved number of users could be extremely large.

Should a user exceed any of the limits, the service will respond with a `429` HTTP status code (aka `Too Many Requests`). The users session will not be terminated if a limit is hit.