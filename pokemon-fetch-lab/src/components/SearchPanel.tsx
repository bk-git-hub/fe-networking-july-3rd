import type { FormEvent } from 'react'
import { SearchIcon, ShuffleIcon } from './icons'

type SearchPanelProps = {
  error: string
  loading: boolean
  onQueryChange: (query: string) => void
  onRandomClick: () => void
  onSearch: (query: string) => void
  onSuggestionClick: (suggestion: string) => void
  query: string
  suggestions: string[]
}

export function SearchPanel({
  error,
  loading,
  onQueryChange,
  onRandomClick,
  onSearch,
  onSuggestionClick,
  query,
  suggestions,
}: SearchPanelProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSearch(query)
  }

  return (
    <section className="search-panel" aria-labelledby="search-title">
      <div>
        <p className="section-label">PokeAPI request</p>
        <h1 id="search-title">Search by name or ID</h1>
      </div>

      <form className="search-form" onSubmit={handleSubmit}>
        <label className="search-label" htmlFor="pokemon-search">
          Pokemon keyword
        </label>
        <div className="search-row">
          <div className="input-frame">
            <SearchIcon />
            <input
              autoComplete="off"
              id="pokemon-search"
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="pikachu 또는 25"
              type="text"
              value={query}
            />
          </div>

          <button className="primary-button" disabled={loading} type="submit">
            <SearchIcon />
            <span>{loading ? 'Finding...' : 'Find Pokemon'}</span>
          </button>

          <button
            className="icon-button"
            disabled={loading}
            onClick={onRandomClick}
            title="Random Pokemon"
            type="button"
          >
            <ShuffleIcon />
            <span>Random</span>
          </button>
        </div>
      </form>

      <div className="suggestion-row" aria-label="Starter suggestions">
        {suggestions.map((suggestion) => (
          <button
            className="suggestion-chip"
            disabled={loading}
            key={suggestion}
            onClick={() => onSuggestionClick(suggestion)}
            type="button"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {error ? (
        <p className="error-message" role="alert">
          {error}
        </p>
      ) : null}
    </section>
  )
}
