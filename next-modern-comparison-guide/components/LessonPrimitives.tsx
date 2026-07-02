import Link from "next/link";

type ComparisonProps = {
  reactTitle: string;
  reactBody: string;
  nextTitle: string;
  nextBody: string;
};

type PageIntroProps = {
  title: string;
  body: string;
};

type CodeBlockProps = {
  children: string;
};

export function PageIntro({ title, body }: PageIntroProps) {
  return (
    <section className="lesson-intro">
      <div>
        <span className="eyebrow">Lesson route</span>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    </section>
  );
}

export function Comparison({ reactTitle, reactBody, nextTitle, nextBody }: ComparisonProps) {
  return (
    <div className="lesson-compare">
      <article className="lesson-panel react-panel">
        <span>React only</span>
        <h2>{reactTitle}</h2>
        <p>{reactBody}</p>
      </article>
      <article className="lesson-panel next-panel">
        <span>Next.js App Router</span>
        <h2>{nextTitle}</h2>
        <p>{nextBody}</p>
      </article>
    </div>
  );
}

export function CodeBlock({ children }: CodeBlockProps) {
  return <pre className="lesson-code">{children}</pre>;
}

export function NextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link className="lesson-link" href={href}>
      {children}
    </Link>
  );
}
