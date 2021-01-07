---
published: false
---

# Documentation
This repo holds the documentation for Criipto Verify.

[![Build Status](https://dev.azure.com/CriiptoDev/Criipto%20Docs/_apis/build/status/Criipto%20Docs-CI?branchName=master)](https://dev.azure.com/CriiptoDev/Criipto%20Docs/_build/latest?definitionId=6&branchName=master)


Please view the [styleguide](./STYLEGUIDE.md) and the [list of words](./WORDS.md) for guidance on e.g. whether and when to say "log in" og "login".

## Testing locally

To test the site just run: 
```
bundle exec jekyll serve
``` 

## Viewing current non-published version

All non-master branches pushed to GitHub will be built and and published at this URL: https://criiptodocstest.z16.web.core.windows.net/.

## Publishing 

All pushes to the `master` branch in GitHub will be published to the [documentation web site](https://docs.criipto.com). This a CDN front for the publish URL (https://criiptoweb.z6.web.core.windows.net/).
 
Note that there are refresh issues with the CDN distribution, so you may have to purge the CDN to bring the changes online.
This is done on the CDN in the Azure Portal. Ask for help!

