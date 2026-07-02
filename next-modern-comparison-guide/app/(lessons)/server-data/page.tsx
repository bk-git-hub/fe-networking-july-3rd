import { NextStylePanel } from "../../../components/NextStylePanel";
import { ReactStylePanel } from "../../../components/ReactStylePanel";
import { Comparison, PageIntro } from "../../../components/LessonPrimitives";

export default function ServerDataLesson() {
  return (
    <>
      <PageIntro
        title="서버에서 데이터 읽기"
        body="Next.js App Router의 page와 layout은 기본적으로 Server Component입니다. 컴포넌트를 async 함수로 만들고 서버에서 fetch, ORM, database 같은 비동기 I/O를 실행한 뒤 렌더링 결과를 클라이언트로 보냅니다."
      />
      <Comparison
        reactTitle="브라우저에서 나중에 가져오기"
        reactBody="Client Component는 state, event handler, useEffect, browser API가 필요할 때 사용합니다. 데이터를 브라우저에서 가져오면 hydration 이후 요청이 시작되어 첫 화면에는 빈 상태나 로딩 UI가 보일 수 있습니다."
        nextTitle="서버에서 먼저 읽고 렌더링하기"
        nextBody="Server Component는 서버에서 실행되므로 fetch나 ORM/database 호출을 직접 await할 수 있습니다. API 키와 쿼리 로직은 클라이언트 번들에 포함되지 않고, 필요한 결과만 Client Component에 props로 넘깁니다."
      />
      <div className="compare-grid one-screen-grid">
        <ReactStylePanel />
        <NextStylePanel />
      </div>
    </>
  );
}
