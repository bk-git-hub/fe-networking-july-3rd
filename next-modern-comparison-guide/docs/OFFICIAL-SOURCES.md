# Official Source Checklist

Last checked: 2026-07-02.

Stable package versions were checked with:

```bash
npm view next version dist-tags --json
npm view react version react-dom version --json
```

## Version

- npm `next` stable latest: `16.2.10`
- npm `next` preview tag: `16.3.0-preview.5`
- npm `next` canary tag: `16.3.0-canary.74`

## Official Next.js pages

- Next.js 16 release notes: https://nextjs.org/blog/next-16
- Server and Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Fetching Data: https://nextjs.org/docs/app/getting-started/fetching-data
- Caching with Cache Components: https://nextjs.org/docs/app/getting-started/caching
- `cacheComponents` config: https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents
- `"use cache"` directive: https://nextjs.org/docs/app/api-reference/directives/use-cache
- `cacheTag`: https://nextjs.org/docs/app/api-reference/functions/cacheTag
- `updateTag`: https://nextjs.org/docs/app/api-reference/functions/updateTag
- Data Security: https://nextjs.org/docs/app/guides/data-security
- Updating Data: https://nextjs.org/docs/app/getting-started/updating-data
- Route Handlers: https://nextjs.org/docs/app/getting-started/route-handlers

## Notes for future refreshes

Before teaching or publishing the guide, rerun the npm commands and skim the
official docs above. In particular, watch for changes around:

- Cache Components
- `"use cache"`
- `cacheLife`, `cacheTag`, `revalidateTag`, `updateTag`
- Partial Prerendering wording
- Route Handler behavior under `cacheComponents: true`
