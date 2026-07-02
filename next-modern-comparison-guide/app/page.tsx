import Link from "next/link";

const lessons = [
  {
    href: "/routing",
    title: "Routing",
    body: "폴더가 URL이 되고, layout.tsx가 child page를 감쌉니다.",
  },
  {
    href: "/server-data",
    title: "Server Data",
    body: "hydration 이후 client fetch와 Server Component data를 비교합니다.",
  },
  {
    href: "/cache",
    title: "Cache",
    body: "\"use cache\", cacheLife, cacheTag가 왜 필요한지 봅니다.",
  },
  {
    href: "/streaming",
    title: "Streaming",
    body: "static shell을 먼저 보내고 dynamic slot을 나중에 stream합니다.",
  },
  {
    href: "/actions",
    title: "Actions",
    body: "Server Action으로 form을 submit하고 cached data를 갱신합니다.",
  },
];

const fileTree = `app/
  layout.tsx
  page.tsx
  (lessons)/
    layout.tsx
    routing/page.tsx
    server-data/page.tsx
    cache/page.tsx
    streaming/page.tsx
    actions/page.tsx
  api/react-style/products/route.ts`;

export default function Home() {
  return (
    <main className="page">
      <div className="shell hub-shell">
        <header className="topbar compact-topbar">
          <div className="brand">
            <div className="brand-mark" aria-hidden="true">
              N
            </div>
            <div>
              <h1>Next.js App Router Guide</h1>
              <p>React와 비교하면서 Next.js 장점을 페이지별로 봅니다.</p>
            </div>
          </div>
          <div className="version-strip" aria-label="Version and scope">
            <span className="chip dark">Next.js 16.2.10</span>
            <span className="chip">App Router first</span>
          </div>
        </header>

        <section className="hub-hero">
          <div>
            <span className="eyebrow">app/ file tree 먼저 보기</span>
            <h2>route별로 나누면 App Router 구조가 더 잘 보입니다.</h2>
            <p>
              홈에서는 전체 구조를 먼저 보고, 각 페이지에서는 Next.js의 장점
              하나만 비교합니다. 모든 lesson page는 같은 nested layout을
              공유합니다.
            </p>
          </div>
          <pre className="file-tree">{fileTree}</pre>
        </section>

        <section className="lesson-grid" aria-label="Lesson routes">
          {lessons.map((lesson) => (
            <Link className="lesson-card" href={lesson.href} key={lesson.href}>
              <span>{lesson.href}</span>
              <h3>{lesson.title}</h3>
              <p>{lesson.body}</p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
