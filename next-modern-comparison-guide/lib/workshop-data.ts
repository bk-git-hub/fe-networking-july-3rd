import { cacheLife, cacheTag } from "next/cache";

export type LessonItem = {
  id: string;
  title: string;
  detail: string;
  owner: "browser" | "server" | "cache";
};

export type LessonPayload = {
  generatedBy: string;
  items: LessonItem[];
  observedAt: string;
};

export type Note = {
  id: string;
  text: string;
  createdAt: string;
};

export type CacheDemoPayload = {
  source: string;
  visibleAt: string;
  detail: string;
};

const lessons: LessonItem[] = [
  {
    id: "routing",
    title: "Server Component에서 await",
    detail: "App Router의 page와 layout은 기본적으로 서버에서 실행되며 비동기 데이터를 읽을 수 있습니다.",
    owner: "server",
  },
  {
    id: "cache",
    title: "DB와 ORM 접근은 서버에 남음",
    detail: "쿼리 로직, 토큰, secret은 클라이언트 번들에 포함되지 않고 서버에서만 사용됩니다.",
    owner: "cache",
  },
  {
    id: "islands",
    title: "Client Component는 필요한 곳만",
    detail: "\"use client\"는 state, event handler, browser API가 필요한 UI에 둡니다.",
    owner: "browser",
  },
];

let serverNotes: Note[] = [
  {
    id: "seed-action",
    text: "이 list는 Server Component가 읽고 Server Action이 refresh합니다.",
    createdAt: "seed",
  },
];

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getReactStyleLessons(): Promise<LessonPayload> {
  await wait(1400);

  return {
    generatedBy: "Client Component가 브라우저 fetch로 가져옴",
    items: lessons,
    observedAt: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  };
}

export async function getCachedNextLessons(): Promise<LessonPayload> {
  "use cache";

  cacheLife("hours");
  cacheTag("lessons");

  await wait(260);

  return {
    generatedBy: "Server Component가 캐시된 서버 데이터를 직접 읽음",
    items: lessons,
    observedAt: "cacheLife('hours')로 cached",
  };
}

export async function getCachedNotes(): Promise<Note[]> {
  "use cache";

  cacheLife("minutes");
  cacheTag("notes");

  return serverNotes;
}

export async function getClientCacheDemo(): Promise<CacheDemoPayload> {
  await wait(500);

  return {
    source: "Client fetch",
    visibleAt: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    detail: "useEffect가 실행된 뒤 browser에서 API route를 호출했습니다.",
  };
}

export async function getUncachedServerDemo(): Promise<CacheDemoPayload> {
  await wait(900);

  return {
    source: "Server fetch",
    visibleAt: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    detail: "Server Component가 request마다 data를 읽습니다.",
  };
}

export async function getCachedServerDemo(): Promise<CacheDemoPayload> {
  "use cache";

  cacheLife("hours");
  cacheTag("cache-demo");

  await wait(260);

  return {
    source: "Server fetch + caching",
    visibleAt: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    detail: "\"use cache\"로 안정적인 server work를 재사용합니다.",
  };
}

export function addServerNote(text: string) {
  serverNotes = [
    {
      id: `note-${Date.now()}`,
      text,
      createdAt: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    },
    ...serverNotes,
  ].slice(0, 4);
}
