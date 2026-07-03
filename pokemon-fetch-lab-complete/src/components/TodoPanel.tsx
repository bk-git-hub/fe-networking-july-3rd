import { CheckIcon } from './icons'

type TodoPanelProps = {
  steps: string[]
}

export function TodoPanel({ steps }: TodoPanelProps) {
  return (
    <section className="rail-panel todo-panel" aria-labelledby="todo-title">
      <div className="rail-heading">
        <div>
          <p className="section-label">Student TODO</p>
          <h2 id="todo-title">Fetch checklist</h2>
        </div>
      </div>

      <ol className="todo-list">
        {steps.map((step) => (
          <li key={step}>
            <CheckIcon />
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
