"use client";

import { useEffect, useState } from "react";
import { useLessonActivationKey } from "./LessonContentShell";
import type { CacheDemoPayload } from "../lib/workshop-data";

type Status = "idle" | "effect-delay" | "fetching" | "ready" | "error";

const statusText: Record<Status, string> = {
  idle: "대기",
  "effect-delay": "useEffect 지연 중",
  fetching: "browser fetch 중",
  ready: "client fetch 완료",
  error: "error",
};

export function ClientFetchCacheCard({ runId = "initial" }: { runId?: string }) {
  const activationKey = useLessonActivationKey();
  const runKey = `${activationKey}:${runId}`;
  const [state, setState] = useState<{
    activationKey: string;
    payload: CacheDemoPayload | null;
    status: Status;
  }>({
    activationKey: runKey,
    payload: null,
    status: "idle",
  });

  const isCurrentActivation = state.activationKey === runKey;
  const status = isCurrentActivation ? state.status : "idle";
  const payload = isCurrentActivation ? state.payload : null;

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setState({
        activationKey: runKey,
        payload: null,
        status: "effect-delay",
      });
      await new Promise((resolve) => setTimeout(resolve, 2400));

      if (cancelled) {
        return;
      }

      setState({
        activationKey: runKey,
        payload: null,
        status: "fetching",
      });

      try {
        const response = await fetch("/api/cache-demo/client", {
          cache: "no-store",
        });
        const data = (await response.json()) as CacheDemoPayload;

        if (!cancelled) {
          setState({
            activationKey: runKey,
            payload: data,
            status: "ready",
          });
        }
      } catch {
        if (!cancelled) {
          setState({
            activationKey: runKey,
            payload: null,
            status: "error",
          });
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [runKey]);

  return (
    <article className="cache-demo-card react-panel">
      <div className="cache-demo-head">
        <span>1. Client fetch</span>
        <b>{statusText[status]}</b>
      </div>
      <h2>browser가 나중에 가져옴</h2>
      <p>
        <code>useEffect</code>를 일부러 2.4초 늦춘 뒤 API route를 호출합니다.
        DevTools에서 Network throttling을 걸면 가장 늦게 채워지는 카드입니다.
      </p>
      {payload ? (
        <div className="cache-demo-result">
          <strong>{payload.source}</strong>
          <span>{payload.detail}</span>
          <em>{payload.visibleAt}</em>
        </div>
      ) : (
        <CacheDemoLoader label="hydration 이후 useEffect 대기 중" />
      )}
    </article>
  );
}

export function CacheDemoLoader({ label }: { label: string }) {
  return (
    <div className="cache-loader" aria-label={label}>
      <span />
      <div>
        <b>{label}</b>
        <small>loader가 보이는 구간을 의도적으로 만들었습니다.</small>
      </div>
    </div>
  );
}
