import { useState } from 'react'
import { buildPokemonUrl, fetchPokemonByKeyword } from './lib/pokemonApi'

const RANDOM_MAX_ID = 1025

const starterSuggestions = ['pikachu', 'eevee', 'squirtle', '25']

const lessonSteps = [
  '검색어 state 만들기',
  'fetch로 GET 요청 보내기',
  'response.ok 확인하기',
  'response.json()으로 변환하기',
  'pokemon state로 화면 바꾸기',
]

const typeColorMap = {
  bug: '#8cb230',
  dark: '#58575f',
  dragon: '#0f6ac0',
  electric: '#eed535',
  fairy: '#ed6ec7',
  fighting: '#d04164',
  fire: '#fd7d24',
  flying: '#748fc9',
  ghost: '#556aae',
  grass: '#62b957',
  ground: '#dd7748',
  ice: '#61cec0',
  normal: '#9da0aa',
  poison: '#a552cc',
  psychic: '#ea5d60',
  rock: '#baab82',
  steel: '#417d9a',
  water: '#4a90da',
}

function App() {
  const [query, setQuery] = useState('pikachu')
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [lastRequest, setLastRequest] = useState({
    method: 'GET',
    url: buildPokemonUrl('pikachu'),
    status: 'Ready',
  })

  async function requestPokemon(nextQuery) {
    const keyword = nextQuery.trim()

    if (!keyword) {
      setError('검색어를 먼저 입력해 주세요.')
      return
    }

    setLoading(true)
    setError('')
    setLastRequest({
      method: 'GET',
      url: buildPokemonUrl(keyword),
      status: 'Pending',
    })

    try {
      const nextPokemon = await fetchPokemonByKeyword(keyword)
      setPokemon(nextPokemon)
      setLastRequest({
        method: 'GET',
        url: buildPokemonUrl(keyword),
        status: '200 OK',
      })
    } catch (requestError) {
      setPokemon(null)
      setError(requestError.message)
      setLastRequest({
        method: 'GET',
        url: buildPokemonUrl(keyword),
        status: 'Failed',
      })
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    requestPokemon(query)
  }

  function handleRandomClick() {
    const randomId = String(Math.floor(Math.random() * RANDOM_MAX_ID) + 1)
    setQuery(randomId)
    requestPokemon(randomId)
  }

  function handleSuggestionClick(suggestion) {
    setQuery(suggestion)
    requestPokemon(suggestion)
  }

  const statusTone = getStatusTone(lastRequest.status, loading, error)

  return (
    <main className="app-shell">
      <div className="top-grid">
        <AppHeader />

        <section className="lab-board" aria-label="PokeFetch Lab workspace">
          <div className="main-column">
            <SearchPanel
              error={error}
              loading={loading}
              onRandomClick={handleRandomClick}
              onSubmit={handleSubmit}
              onSuggestionClick={handleSuggestionClick}
              query={query}
              setQuery={setQuery}
              suggestions={starterSuggestions}
            />

            <PokemonCard error={error} loading={loading} pokemon={pokemon} />
          </div>

          <aside className="side-rail" aria-label="Lab side panels">
            <StatusPanel lastRequest={lastRequest} statusTone={statusTone} />
            <TodoPanel steps={lessonSteps} />
          </aside>
        </section>
      </div>
    </main>
  )
}

function AppHeader() {
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

function SearchPanel({
  error,
  loading,
  onRandomClick,
  onSubmit,
  onSuggestionClick,
  query,
  setQuery,
  suggestions,
}) {
  return (
    <section className="search-panel" aria-labelledby="search-title">
      <div>
        <p className="section-label">PokeAPI request</p>
        <h1 id="search-title">Search by name or ID</h1>
      </div>

      <form className="search-form" onSubmit={onSubmit}>
        <label className="search-label" htmlFor="pokemon-search">
          Pokemon keyword
        </label>
        <div className="search-row">
          <div className="input-frame">
            <SearchIcon />
            <input
              autoComplete="off"
              id="pokemon-search"
              onChange={(event) => setQuery(event.target.value)}
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

function PokemonCard({ error, loading, pokemon }) {
  if (loading) {
    return <LoadingCard />
  }

  if (error) {
    return <ErrorCard />
  }

  if (!pokemon) {
    return <EmptyCard />
  }

  const mainType = pokemon.types[0]

  return (
    <section className="pokemon-card" aria-label={`${pokemon.name} detail card`}>
      <div
        className="pokemon-art-panel"
        style={{ '--type-color': getTypeColor(mainType) }}
      >
        <span className="pokemon-number">#{String(pokemon.id).padStart(4, '0')}</span>
        <img src={pokemon.image} alt={`${pokemon.name} artwork`} />
      </div>

      <div className="pokemon-info-panel">
        <div className="pokemon-title-row">
          <div>
            <p className="section-label">Fetched JSON</p>
            <h2>{pokemon.name}</h2>
          </div>
          <div className="type-row" aria-label="Pokemon types">
            {pokemon.types.map((type) => (
              <TypePill key={type} type={type} />
            ))}
          </div>
        </div>

        <dl className="quick-facts">
          <div>
            <dt>Height</dt>
            <dd>{pokemon.height}</dd>
          </div>
          <div>
            <dt>Weight</dt>
            <dd>{pokemon.weight}</dd>
          </div>
          <div>
            <dt>Ability</dt>
            <dd>{pokemon.abilities[0]}</dd>
          </div>
        </dl>

        <div className="stat-list" aria-label="Base stats">
          {pokemon.stats.map((stat) => (
            <StatBar key={stat.name} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  )
}

function LoadingCard() {
  return (
    <section className="pokemon-card loading-card" aria-live="polite">
      <div className="pokemon-art-panel skeleton-art">
        <span className="scan-line" />
      </div>
      <div className="pokemon-info-panel">
        <p className="section-label">Loading</p>
        <h2>JSON decoding...</h2>
        <div className="skeleton-line wide" />
        <div className="skeleton-line" />
        <div className="skeleton-line short" />
      </div>
    </section>
  )
}

function ErrorCard() {
  return (
    <section className="empty-state-card error-state" aria-label="Request failed">
      <AlertIcon />
      <div>
        <p className="section-label">Request failed</p>
        <h2>다시 검색해 볼까요?</h2>
      </div>
    </section>
  )
}

function EmptyCard() {
  return (
    <section className="empty-state-card" aria-label="Waiting for request">
      <SparkIcon />
      <div>
        <p className="section-label">Ready</p>
        <h2>첫 번째 API 요청을 기다리는 중</h2>
      </div>
    </section>
  )
}

function TypePill({ type }) {
  return (
    <span className="type-pill" style={{ '--type-color': getTypeColor(type) }}>
      {type}
    </span>
  )
}

function StatBar({ stat }) {
  const safeValue = Math.min(stat.value, 180)
  const width = `${Math.round((safeValue / 180) * 100)}%`

  return (
    <div className="stat-row">
      <span>{stat.name}</span>
      <div className="stat-track" aria-hidden="true">
        <span style={{ width }} />
      </div>
      <strong>{stat.value}</strong>
    </div>
  )
}

function StatusPanel({ lastRequest, statusTone }) {
  return (
    <section className="rail-panel" aria-labelledby="api-status-title">
      <div className="rail-heading">
        <div>
          <p className="section-label">Network tab</p>
          <h2 id="api-status-title">API Status</h2>
        </div>
        <span className={`status-dot ${statusTone}`} aria-hidden="true" />
      </div>

      <dl className="request-list">
        <div>
          <dt>Method</dt>
          <dd>{lastRequest.method}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{lastRequest.status}</dd>
        </div>
        <div>
          <dt>URL</dt>
          <dd className="url-cell">{lastRequest.url}</dd>
        </div>
      </dl>
    </section>
  )
}

function TodoPanel({ steps }) {
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

function getTypeColor(type) {
  return typeColorMap[type] ?? '#2a75bb'
}

function getStatusTone(status, loading, error) {
  if (loading || status === 'Pending') {
    return 'pending'
  }

  if (error || status === 'Failed') {
    return 'failed'
  }

  if (status === '200 OK') {
    return 'success'
  }

  return 'ready'
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="button-svg" viewBox="0 0 24 24">
      <path d="m20 20-4.5-4.5" />
      <circle cx="10.75" cy="10.75" r="6.25" />
    </svg>
  )
}

function ShuffleIcon() {
  return (
    <svg aria-hidden="true" className="button-svg" viewBox="0 0 24 24">
      <path d="M4 7h2.7c2.2 0 3.3 1.2 4.4 3.2l1.8 3.3c1 1.9 2.1 3.5 4.4 3.5H20" />
      <path d="m17 4 3 3-3 3" />
      <path d="M4 17h2.6c1.4 0 2.4-.5 3.2-1.5" />
      <path d="m17 14 3 3-3 3" />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg aria-hidden="true" className="state-svg" viewBox="0 0 24 24">
      <path d="M12 3 14.1 9.2 20 12l-5.9 2.8L12 21l-2.1-6.2L4 12l5.9-2.8L12 3Z" />
    </svg>
  )
}

function AlertIcon() {
  return (
    <svg aria-hidden="true" className="state-svg" viewBox="0 0 24 24">
      <path d="M12 4 21 20H3L12 4Z" />
      <path d="M12 9v5" />
      <path d="M12 17.5v.1" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="check-svg" viewBox="0 0 24 24">
      <path d="m5 12.5 4 4L19 6.5" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg aria-hidden="true" className="button-svg" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.5l3 1.8" />
    </svg>
  )
}

export default App
