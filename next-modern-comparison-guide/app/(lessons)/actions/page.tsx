import { addNextNote } from "../../actions";
import { CodeBlock, Comparison, PageIntro } from "../../../components/LessonPrimitives";
import { getCachedNotes } from "../../../lib/workshop-data";

const actionCode = `"use server"

export async function addNextNote(formData: FormData) {
  addServerNote(String(formData.get("note")))
  updateTag("notes")
}`;

export default async function ActionsLesson() {
  const notes = await getCachedNotes();

  return (
    <>
      <PageIntro
        title="Server Actions로 mutation 처리"
        body="form mutation을 꼭 직접 만든 API endpoint로 보낼 필요는 없습니다. App Router 근처에 server function으로 둘 수 있습니다."
      />
      <Comparison
        reactTitle="mutation마다 client submit과 API 설계가 필요함"
        reactBody="보통 form state, fetch POST, loading state, cache refresh를 직접 연결해야 합니다."
        nextTitle="form이 server function을 직접 호출할 수 있음"
        nextBody="Server Action은 server에서 실행되고, data를 바꾼 뒤 관련 cache tag를 update할 수 있습니다."
      />
      <article className="lesson-panel next-panel wide-panel">
        <span>Server Action 실행해보기</span>
        <form className="form-row" action={addNextNote}>
          <input name="note" placeholder="server note 입력" />
          <button type="submit">전송</button>
        </form>
        <div className="result-list">
          {notes.map((note) => (
            <div className="result-row" key={note.id}>
              <strong>{note.createdAt}</strong>
              <span>{note.text}</span>
            </div>
          ))}
        </div>
      </article>
      <CodeBlock>{actionCode}</CodeBlock>
    </>
  );
}
