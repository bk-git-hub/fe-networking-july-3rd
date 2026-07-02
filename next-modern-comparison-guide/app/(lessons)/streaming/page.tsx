import { Suspense } from "react";
import { PageIntro } from "../../../components/LessonPrimitives";
import { ReactStreamingDemo } from "../../../components/ReactStreamingDemo";
import {
  NextStreamingShell,
  SlowInventorySlot,
  SlowRecommendationSlot,
  StreamSlotFallback,
} from "../../../components/StreamingServerSlots";

const streamingConcepts = [
  {
    title: "1. Static shell",
    body: (
      <>
        <code>layout</code>, <code>navigation</code>, heading, product
        summary처럼 async data 없이 render 가능한 UI입니다. Next.js는 이 부분을
        먼저 HTML로 보낼 수 있습니다.
      </>
    ),
  },
  {
    title: "2. Suspense fallback",
    body: (
      <>
        <code>loading.tsx</code> 또는 직접 만든{" "}
        <code>{"<Suspense>"}</code>가 기다리는 영역의 임시 UI를 만듭니다.
        fallback은 shell과 함께 먼저 보입니다.
      </>
    ),
  },
  {
    title: "3. Streamed content",
    body: (
      <>
        느린 <code>Server Component</code>가 끝나면 React가 해당 boundary의
        HTML을 stream하고 fallback 자리를 실제 UI로 바꿉니다.
      </>
    ),
  },
];

export default function StreamingLesson() {
  return (
    <>
      <PageIntro
        title="Streaming Rendering"
        body="Next.js App Router의 Streaming은 route 전체가 끝날 때까지 기다리지 않고, 먼저 준비된 HTML을 보내는 rendering 방식입니다. WebSocket이나 SSE처럼 데이터를 계속 주고받는 socket 기반 통신 기능이 아닙니다."
      />

      <section className="streaming-note">
        <b>Official docs 기준 핵심</b>
        <span>
          <code>Suspense boundary</code>가 <code>static shell</code>의 끝과
          streaming이 시작되는 지점을 정합니다. 느린 data는 필요한
          component까지 내려서, 그 영역만 fallback으로 기다리게 만듭니다.
        </span>
      </section>

      <section
        className="streaming-concept-grid"
        aria-label="Streaming rendering concepts"
      >
        {streamingConcepts.map((concept) => (
          <article className="streaming-concept" key={concept.title}>
            <h2>{concept.title}</h2>
            <p>{concept.body}</p>
          </article>
        ))}
      </section>

      <section className="streaming-guide">
        <div>
          <h2>두 가지 사용 방식</h2>
          <p>
            <code>loading.tsx</code>를 route segment 옆에 두면 Next.js가 해당
            page를 자동으로 <code>Suspense</code>로 감싸고 fallback을 먼저
            보여줍니다. 더 세밀한 제어가 필요하면 component 가까이에 직접{" "}
            <code>{"<Suspense>"}</code>를 둡니다.
          </p>
        </div>
        <div>
          <h2>왜 중요한가</h2>
          <p>
            느린 query 하나가 page 전체의 first paint를 막지 않습니다.{" "}
            <code>Cache Components</code>와 <code>Partial Prerendering</code>
            에서는 cached/static UI를 shell로 먼저 제공하고, request-time data가
            필요한 부분만 나중에 stream할 수 있습니다.
          </p>
        </div>
      </section>

      <section className="stream-demo-grid" aria-label="Streaming rendering demo">
        <ReactStreamingDemo />
        <NextStreamingShell>
          <Suspense fallback={<StreamSlotFallback title="실시간 재고 확인 중" />}>
            <SlowInventorySlot />
          </Suspense>
          <Suspense fallback={<StreamSlotFallback title="추천 상품 계산 중" />}>
            <SlowRecommendationSlot />
          </Suspense>
        </NextStreamingShell>
      </section>
    </>
  );
}
