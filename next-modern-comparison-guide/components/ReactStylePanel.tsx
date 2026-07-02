"use client";

import { useEffect, useState } from "react";
import type { LessonPayload } from "../lib/workshop-data";

export function ReactStylePanel() {
  const [payload, setPayload] = useState<LessonPayload | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    "idle",
  );
  const statusText =
    status === "ready"
      ? "client fetched 완료"
      : status === "loading"
        ? "loading"
        : status === "error"
          ? "error"
          : "대기";

  async function loadLessons() {
    setStatus("loading");

    try {
      const response = await fetch("/api/react-style/products", {
        cache: "no-store",
      });
      const data = (await response.json()) as LessonPayload;
      setPayload(data);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => {
    void loadLessons();
  }, []);

  return (
    <section className="compare-column" aria-labelledby="react-column-title">
      <div className="column-head react">
        <div>
          <h2 id="react-column-title">Client Component에서 fetch</h2>
          <p>상호작용 중심 컴포넌트에서는 hydration 이후 브라우저에서 데이터를 가져옵니다.</p>
        </div>
        <span className="column-tag react">Browser first</span>
      </div>

      <article className="module comparison-card" id="routing">
        <div className="module-header">
          <h3>새로고침 결과</h3>
          <span>{statusText}</span>
        </div>
        <div className="module-body">
          <div className="first-paint react">
            <b>First paint</b>
            <strong>데이터는 아직 없음</strong>
            <span>JS가 hydrate된 뒤 useEffect가 실행되면 요청이 시작됩니다.</span>
          </div>

          {status === "idle" && (
            <div className="loading-box compact-box">hydration 대기 중...</div>
          )}
          {status === "loading" && (
            <div className="loading-box compact-box">브라우저에서 fetch 중...</div>
          )}
          {status === "error" && (
            <div className="callout">client fetch에 실패했습니다.</div>
          )}
          {payload && (
            <div className="result-list compact-results">
              <div className="callout">
                브라우저 fetch가 나중에 완료되었습니다. 시각: {payload.observedAt}
              </div>
              {payload.items.slice(0, 2).map((item) => (
                <div className="result-row" key={item.id}>
                  <strong>{item.title}</strong>
                  <span>{item.detail}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </article>
    </section>
  );
}
