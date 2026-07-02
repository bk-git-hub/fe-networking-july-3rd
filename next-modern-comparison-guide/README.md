# React vs Modern Next.js Guide Demo

React를 이미 아는 학생들이 Next.js App Router의 장점을 눈으로 비교할 수 있게
만든 demo repo입니다. route별로 나누어 file-based routing, nested layout,
server data, caching, streaming, Server Actions를 따로 확인할 수 있습니다.

2026-07-02 기준 stable version:

- `next@16.2.10`
- `react@19.2.7`
- `react-dom@19.2.7`

## Run

```bash
npm install
npm run dev
```

http://localhost:3000 을 엽니다.

## Lesson routes

- `/routing`: file-based routing과 `layout.tsx`
- `/server-data`: Server Component에서 데이터 fetching
- `/cache`: `"use cache"`, `cacheLife`, and `cacheTag`
- `/streaming`: static shell + streamed dynamic slot
- `/actions`: Server Actions와 cache invalidation

## 학생들이 봐야 할 점

`/server-data` lesson은 Next.js의 서버 사이드 fetching을 보여줍니다:

- App Router의 `page.tsx`와 `layout.tsx`는 기본적으로 Server Component입니다.
- Server Component는 `async` 함수로 만들고 `fetch`, ORM, database 같은 server I/O를 `await`할 수 있습니다.
- API key, token, query logic은 client bundle에 포함하지 않고 서버에 둘 수 있습니다.
- state, event handler, browser API가 필요한 UI만 `"use client"`로 분리합니다.
- 안정적인 데이터는 `"use cache"`, `cacheLife()`, `cacheTag()`로 재사용과 invalidation을 선택합니다.
- 느린 request-time 데이터는 Suspense로 감싸 stream할 수 있습니다.

## Official docs used

- Next.js 16 release notes: https://nextjs.org/blog/next-16
- Server and Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Fetching Data: https://nextjs.org/docs/app/getting-started/fetching-data
- Caching with Cache Components: https://nextjs.org/docs/app/getting-started/caching
- `"use cache"` directive: https://nextjs.org/docs/app/api-reference/directives/use-cache
- Data Security: https://nextjs.org/docs/app/guides/data-security
- Updating Data: https://nextjs.org/docs/app/getting-started/updating-data
- Route Handlers: https://nextjs.org/docs/app/getting-started/route-handlers

## Teaching stance

App Router부터 시작합니다. Pages Router는 오래된 project를 유지보수할 때 여전히
필요하지만, 이 guideline에서는 짧은 appendix 정도로만 다루는 편이 좋습니다.
