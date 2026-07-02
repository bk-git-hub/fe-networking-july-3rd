import Link from "next/link";
import { LessonContentShell } from "../../components/LessonContentShell";

const lessonLinks = [
  { href: "/routing", label: "Routing" },
  { href: "/server-data", label: "Server Data" },
  { href: "/cache", label: "Cache" },
  { href: "/streaming", label: "Streaming" },
  { href: "/actions", label: "Actions" },
];

export default function LessonsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="page">
      <div className="lesson-shell">
        <aside className="lesson-sidebar">
          <Link className="back-link" href="/">
            App Router Guide
          </Link>
          <p>
            이 sidebar는 <code>app/(lessons)/layout.tsx</code>에서 한 번
            렌더링됩니다. route를 바꿔도 공통 layout은 유지되고 child page만
            바뀝니다.
          </p>
          <nav aria-label="Lesson pages">
            {lessonLinks.map((link) => (
              <Link href={link.href} key={link.href} prefetch={false}>
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>
        <LessonContentShell>{children}</LessonContentShell>
      </div>
    </main>
  );
}
