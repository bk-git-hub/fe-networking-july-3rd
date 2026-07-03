import { ClockIcon } from './icons'

export function AppHeader() {
  return (
    <header className="app-header">
      <a className="brand" href="/" aria-label="PokeFetch Lab home">
        <span className="brand-mark" aria-hidden="true">
          PF
        </span>
        <span>
          <strong>PokeFetch Lab</strong>
          <small>Vite + React + fetch</small>
        </span>
      </a>

      <div className="header-meter" aria-label="Class time estimate">
        <ClockIcon />
        <span>30-40 min</span>
      </div>
    </header>
  )
}
