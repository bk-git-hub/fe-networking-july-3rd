import { Suspense } from "react";
import { ClientFetchCacheSlot } from "../../../components/ClientFetchCacheSlot";
import { CodeBlock, PageIntro } from "../../../components/LessonPrimitives";
import {
  CachedServerFetchCard,
  ServerFetchCacheCard,
} from "../../../components/ServerCacheDemoCards";

const cacheCode = `// 1. Client fetch
useEffect(() => {
  setTimeout(() => {
    fetch("/api/cache-demo/client").then(...)
  }, 2400)
}, [])

// 2. Server fetch
const data = await getUncachedServerDemo()

// 3. Server fetch + caching
export async function getCachedServerDemo() {
  "use cache"
  cacheLife("hours")
  cacheTag("cache-demo")

  return getStableData()
}`;

function ServerFetchFallback() {
  return (
    <article className="cache-demo-card next-panel">
      <div className="cache-demo-head">
        <span>2. Server fetch</span>
        <b>streaming</b>
      </div>
      <h2>server에서 data 읽는 중</h2>
      <p>
        browser JS를 기다리지는 않지만, request-time server work가 끝날 때까지
        Suspense fallback이 보입니다.
      </p>
      <div className="cache-loader" aria-label="server fetch loading">
        <span />
        <div>
          <b>Server Component 대기 중</b>
          <small>dynamic server slot이 stream될 준비를 합니다.</small>
        </div>
      </div>
    </article>
  );
}

function ClientFetchFallback() {
  return (
    <article className="cache-demo-card react-panel">
      <div className="cache-demo-head">
        <span>1. Client fetch</span>
        <b>route activation</b>
      </div>
      <h2>browser fetch 준비 중</h2>
      <p>
        route cache와 구분하기 위해 이 demo slot은 navigation마다 새 run으로
        시작합니다.
      </p>
      <div className="cache-loader" aria-label="client fetch slot loading">
        <span />
        <div>
          <b>Client fetch demo 준비 중</b>
          <small>Client Component가 새 실행으로 mount될 준비를 합니다.</small>
        </div>
      </div>
    </article>
  );
}

export default function CacheLesson() {
  return (
    <>
      <PageIntro
        title="Cache는 fetch 위치와 따로 봐야 합니다"
        body="같은 data fetch라도 browser에서 하는지, Server Component에서 하는지, 그리고 server work를 cache하는지에 따라 UX와 network 흐름이 달라집니다."
      />
      <section className="cache-navigation-note">
        <b>Client Cache와 data cache는 다릅니다</b>
        <span>
          route를 오갈 때 이전 화면이 즉시 보이는 것은 Next.js의 client-side
          navigation과 <code>Client Cache</code> 영향일 수 있습니다. 이 page는
          수업 비교가 반복되도록 route가 바뀔 때 Client fetch demo를 다시
          시작합니다.
        </span>
      </section>
      <section className="cache-demo-grid" aria-label="Cache comparison">
        <Suspense fallback={<ClientFetchFallback />}>
          <ClientFetchCacheSlot />
        </Suspense>
        <Suspense fallback={<ServerFetchFallback />}>
          <ServerFetchCacheCard />
        </Suspense>
        <CachedServerFetchCard />
      </section>
      <CodeBlock>{cacheCode}</CodeBlock>
    </>
  );
}
