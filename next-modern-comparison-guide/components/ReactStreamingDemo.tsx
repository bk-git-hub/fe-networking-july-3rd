"use client";

import { useEffect, useState } from "react";
import { ProductSummary } from "./ProductSummary";

export function ReactStreamingDemo() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setReady(true);
    }, 5600);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <article className="stream-demo-card react-panel">
      <div className="stream-demo-head">
        <span>React SPA</span>
        <b>{ready ? "client render 완료" : "전체 page loading"}</b>
      </div>
      {!ready ? (
        <div className="stream-page-loader">
          <span />
          <strong>상품 page 전체를 기다리는 중</strong>
          <small>
            product info, inventory, recommendation이 모두 준비될 때까지
            route가 loading처럼 보입니다.
          </small>
        </div>
      ) : (
        <div className="product-shell">
          <ProductSummary />
          <div className="stream-slot resolved">
            <b>실시간 재고</b>
            <span>남은 수량 7개 · 서울 기준 오늘 출고 가능</span>
          </div>
          <div className="stream-slot resolved">
            <b>추천 상품</b>
            <span>같이 보면 좋은 keyboard wrist rest 2개</span>
          </div>
        </div>
      )}
    </article>
  );
}
