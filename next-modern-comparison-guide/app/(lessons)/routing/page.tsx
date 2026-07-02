import { CodeBlock, Comparison, PageIntro } from "../../../components/LessonPrimitives";

const reactRoutes = `// React Router style
createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "routing", element: <RoutingPage /> },
      { path: "cache", element: <CachePage /> },
    ],
  },
])`;

const nextRoutes = `app/
  layout.tsx
  page.tsx
  (lessons)/
    layout.tsx
    routing/page.tsx
    cache/page.tsx
    streaming/page.tsx`;

export default function RoutingLesson() {
  return (
    <>
      <PageIntro
        title="File-based routing"
        body="Next는 폴더 구조로 routing을 설명합니다. URL, layout boundary, loading state, error boundary, Route Handler가 file tree 안에서 보입니다."
      />
      <Comparison
        reactTitle="route가 app config 안에 따로 있음"
        reactBody="React에서도 routing은 가능하지만 보통 React Router 같은 library와 route config를 별도로 둡니다."
        nextTitle="route가 project structure가 됨"
        nextBody="App Router에서는 page.tsx가 있는 folder가 route가 되고, layout.tsx가 child route를 감쌉니다."
      />
      <div className="code-pair">
        <CodeBlock>{reactRoutes}</CodeBlock>
        <CodeBlock>{nextRoutes}</CodeBlock>
      </div>
    </>
  );
}
