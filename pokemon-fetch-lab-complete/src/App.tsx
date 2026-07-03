import { AppHeader } from './components/AppHeader'
import { PokemonCard } from './components/PokemonCard'
import { SearchPanel } from './components/SearchPanel'
import { StatusPanel } from './components/StatusPanel'
import { TodoPanel } from './components/TodoPanel'
import { starterSuggestions, lessonSteps } from './constants/labContent'
import { usePokemonSearch } from './hooks/usePokemonSearch'

function App() {
  const {
    error,
    lastRequest,
    loading,
    pokemon,
    query,
    requestPokemon,
    requestRandomPokemon,
    setQuery,
    statusTone,
  } = usePokemonSearch('pikachu')

  function handleSuggestionClick(suggestion: string) {
    setQuery(suggestion)
    requestPokemon(suggestion)
  }

  return (
    <main className="app-shell">
      <div className="top-grid">
        <AppHeader />

        <section className="lab-board" aria-label="PokeFetch Lab workspace">
          <div className="main-column">
            <SearchPanel
              error={error}
              loading={loading}
              onQueryChange={setQuery}
              onRandomClick={requestRandomPokemon}
              onSearch={requestPokemon}
              onSuggestionClick={handleSuggestionClick}
              query={query}
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

export default App
