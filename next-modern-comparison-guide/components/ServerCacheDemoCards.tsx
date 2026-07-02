import { connection } from "next/server";
import {
  getCachedServerDemo,
  getUncachedServerDemo,
} from "../lib/workshop-data";

export async function ServerFetchCacheCard() {
  await connection();
  const payload = await getUncachedServerDemo();

  return (
    <article className="cache-demo-card next-panel">
      <div className="cache-demo-head">
        <span>2. Server fetch</span>
        <b>request-time</b>
      </div>
      <h2>server가 먼저 가져옴</h2>
      <p>
        Server Component가 data를 읽습니다. browser JS를 기다리지는 않지만,
        cache하지 않았기 때문에 request-time work로 남습니다.
      </p>
      <div className="cache-demo-result">
        <strong>{payload.source}</strong>
        <span>{payload.detail}</span>
        <em>{payload.visibleAt}</em>
      </div>
    </article>
  );
}

export async function CachedServerFetchCard() {
  const payload = await getCachedServerDemo();

  return (
    <article className="cache-demo-card cached-panel">
      <div className="cache-demo-head">
        <span>3. Server fetch + caching</span>
        <b>"use cache"</b>
      </div>
      <h2>server work를 재사용함</h2>
      <p>
        안정적인 data는 `"use cache"`, cacheLife, cacheTag로 재사용 가능하게
        표시합니다. shell에 포함하기 좋은 형태입니다.
      </p>
      <div className="cache-demo-result">
        <strong>{payload.source}</strong>
        <span>{payload.detail}</span>
        <em>{payload.visibleAt}</em>
      </div>
    </article>
  );
}
