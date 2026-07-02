import { connection } from "next/server";
import { ProductSummary } from "./ProductSummary";
import { wait } from "../lib/workshop-data";

export function NextStreamingShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <article className="stream-demo-card next-panel">
      <div className="stream-demo-head">
        <span>Next.js + Suspense</span>
        <b>shell 먼저 표시</b>
      </div>
      <div className="product-shell">
        <ProductSummary />
        {children}
      </div>
    </article>
  );
}

export function StreamSlotFallback({ title }: { title: string }) {
  return (
    <div className="stream-slot pending">
      <span className="mini-spinner" aria-hidden="true" />
      <div>
        <b>{title}</b>
        <span>이 영역만 Suspense fallback으로 기다립니다.</span>
      </div>
    </div>
  );
}

export async function SlowInventorySlot() {
  await connection();
  await wait(2400);

  return (
    <div className="stream-slot resolved">
      <b>실시간 재고</b>
      <span>남은 수량 7개 · 서울 기준 오늘 출고 가능</span>
    </div>
  );
}

export async function SlowRecommendationSlot() {
  await connection();
  await wait(5200);

  return (
    <div className="stream-slot resolved">
      <b>추천 상품</b>
      <span>같이 보면 좋은 keyboard wrist rest 2개</span>
    </div>
  );
}
