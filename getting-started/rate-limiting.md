---
title: Criipto Verify Rate Limiting
description: Learn more about SSO rate limiting.
layout: article
---
# Criipto Verify Rate Limiting

Criipto Verify applies rate limits on two different levels:

1. On a service-wide level, DoS and DDoS protection mechanisms are enforced
2. On a per-user level, limits to the number of allowed single sign-on requests are enforced

Note that we do not share the details of the DoS and DDoS protection, but below is more about the limits to single sign-on requests

## Single sign-on (SSO) limits
Criipto Verify has two per-user rate limits for how many SSO attempts that can be performed.

{% iconnote note %}

There are no limits to the number of interactive user logins, that is, an actual login attempt where a user supplies hers or his credentials. The limits only apply to subsequent SSO requests based on the session established during interactive login.

{% endiconnote %}

- High-frequency guard: Maximum 2 SSO's per 5 seconds.
- Low-frequency guard: Maximum 6 SSO's per hour.

The high-frequency guard protects against sudden spikes in traffic, while the low-frequency guard protects against long-running repeated SSO attempts.

The settings for the high-frequency limit is chosen so it is possible to have a "mash-up" of websites where you must establish sessions in rapid succession after the interactive login, but also ensures that any given user cannot abuse the service.

The settings for the low-frequency guard is chosen to ensure that, say, broken infrastructure in client deployments do not accidentally trigger an excessive load on the service. Such errors can trigger a very large load on the service when the simultaneous number of users becomes very large.

Should a user exceed any of the limits, the service will respond with a `429` HTTP status code (aka `Too Many Requests`). The user's session will not be terminated if a limit is hit.