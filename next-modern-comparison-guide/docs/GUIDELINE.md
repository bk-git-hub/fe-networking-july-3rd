# Next.js Guideline for React-Familiar Students

## Core message

Do not teach Next.js as React plus a required API layer. React gives the
component model. Next.js adds the routing, rendering, server/client boundary,
caching, streaming, mutation, and deployment model around React.

## Start here

Teach the App Router first:

1. `app/` routes are the mental model.
2. Server Components are the default.
3. `"use client"` is a boundary for interactivity, not a default habit.
4. Rendering is a choice between static work, dynamic request-time work, cached
   work, streamed work, and client-only work.
5. Route Handlers are for real HTTP endpoints, webhooks, external APIs, auth
   callbacks, and explicit HTTP boundaries. They are not required for ordinary
   page data.

## The visual comparison

Use the demo home page as the first class exercise.

Left side: React SPA habit.

- Hydrate first.
- Fetch in `useEffect`.
- Fetch from the browser when the UI is intentionally client-rendered.
- Keep loading/error/mutation state in the browser.

Right side: Modern Next.js habit.

- Fetch in a Server Component when the data belongs to the page.
- Add `"use cache"` when the result is stable enough to reuse.
- Add `cacheLife()` to describe freshness.
- Add `cacheTag()` so mutations can invalidate the right cache entries.
- Use a Server Action for form mutations.
- Use Suspense for uncached dynamic request-time work.

## What to say about rendering

Prefer these terms:

- Static rendering: the shell or cached output can be prepared ahead of time.
- Dynamic rendering: request-time server work.
- Streaming: dynamic pieces arrive later through Suspense.
- Client rendering: browser-side interactivity and effects.

Avoid making "SSR" the center of the course. Students will see the term in old
articles, but modern App Router teaching should focus on the boundary and cache
model.

## What to say about PPR

With Next.js 16, Partial Prerendering is taught through Cache Components.
Enable it with:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
};

export default nextConfig;
```

The mental model:

- Cached/static parts form the shell.
- Uncached request-time parts are wrapped in Suspense.
- The shell appears first, then dynamic parts stream in.

## What to say about `"use cache"`

Use it inside an async function or Server Component when the return value is
stable enough to reuse.

```ts
import { cacheLife, cacheTag } from "next/cache";

export async function getProducts() {
  "use cache";

  cacheLife("hours");
  cacheTag("products");

  return db.product.findMany();
}
```

After a user mutation in a Server Action, use `updateTag()` when the user should
see the fresh result immediately.

```ts
"use server";

import { updateTag } from "next/cache";

export async function updateProduct(formData: FormData) {
  await db.product.update(/* ... */);
  updateTag("products");
}
```

## Pages Router appendix

Keep this short. Students only need enough to read older codebases:

- `pages/index.tsx` maps conceptually to `app/page.tsx`.
- `getServerSideProps` maps to request-time server work.
- `getStaticProps` maps to static/cached/revalidated work.
- API Routes map to Route Handlers.
- `_app` and `_document` map loosely to App Router layouts and root document
  concerns.

Do not spend the main course building up from Pages Router. It teaches older
API names before students understand the current architecture.
