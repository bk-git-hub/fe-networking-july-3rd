import { Suspense } from "react";
import { getCachedNextLessons } from "../lib/workshop-data";
import { RequestPulse } from "./RequestPulse";

export async function NextStylePanel() {
  const payload = await getCachedNextLessons();

  return (
    <section className="compare-column" aria-labelledby="next-column-title">
      <div className="column-head next">
        <div>
          <h2 id="next-column-title">Server Component에서 fetch</h2>
          <p>서버에서 데이터를 먼저 읽고 렌더링 결과를 클라이언트로 보냅니다.</p>
        </div>
        <span className="column-tag next">Server first</span>
      </div>

      <article className="module comparison-card" id="server-components">
        <div className="module-header">
          <h3>새로고침 결과</h3>
          <span>server rendered</span>
        </div>
        <div className="module-body">
          <div className="first-paint next">
            <b>First paint</b>
            <strong>데이터가 이미 보임</strong>
            <span>fetch, DB, ORM 같은 서버 I/O를 컴포넌트 안에서 await할 수 있습니다.</span>
          </div>

          <div className="result-list compact-results">
            <div className="callout good">
              Server Component에서 읽은 데이터입니다. timestamp:{" "}
              {payload.observedAt}.
            </div>
            {payload.items.slice(0, 2).map((item) => (
              <div className="result-row" key={item.id}>
                <strong>{item.title}</strong>
                <span>{item.detail}</span>
              </div>
            ))}
          </div>

          <div className="stream-strip">
            <span>Dynamic slot</span>
            <Suspense fallback={<b>streaming...</b>}>
              <RequestPulse />
            </Suspense>
          </div>
        </div>
      </article>
    </section>
  );
}
