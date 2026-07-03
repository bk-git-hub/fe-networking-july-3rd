import type { Pokemon, PokemonStat } from '../lib/pokemonApi'
import { getTypeColorStyle } from '../utils/pokemonStyles'
import { AlertIcon, SparkIcon } from './icons'

type PokemonCardProps = {
  error: string
  loading: boolean
  pokemon: Pokemon | null
}

export function PokemonCard({ error, loading, pokemon }: PokemonCardProps) {
  if (loading) {
    return <LoadingCard />
  }

  if (error) {
    return <ErrorCard />
  }

  if (!pokemon) {
    return <EmptyCard />
  }

  return <PokemonDetailCard pokemon={pokemon} />
}

type PokemonDetailCardProps = {
  pokemon: Pokemon
}

function PokemonDetailCard({ pokemon }: PokemonDetailCardProps) {
  const mainType = pokemon.types[0]

  return (
    <section className="pokemon-card" aria-label={`${pokemon.name} detail card`}>
      <div className="pokemon-art-panel" style={getTypeColorStyle(mainType)}>
        <span className="pokemon-number">#{String(pokemon.id).padStart(4, '0')}</span>
        <img src={pokemon.image} alt={`${pokemon.name} artwork`} />
      </div>

      <div className="pokemon-info-panel">
        <PokemonHeader pokemon={pokemon} />
        <PokemonFacts pokemon={pokemon} />
        <PokemonStats stats={pokemon.stats} />
      </div>
    </section>
  )
}

type PokemonHeaderProps = {
  pokemon: Pokemon
}

function PokemonHeader({ pokemon }: PokemonHeaderProps) {
  return (
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
  )
}

type PokemonFactsProps = {
  pokemon: Pokemon
}

function PokemonFacts({ pokemon }: PokemonFactsProps) {
  return (
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
  )
}

type PokemonStatsProps = {
  stats: PokemonStat[]
}

function PokemonStats({ stats }: PokemonStatsProps) {
  return (
    <div className="stat-list" aria-label="Base stats">
      {stats.map((stat) => (
        <StatBar key={stat.name} stat={stat} />
      ))}
    </div>
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

type TypePillProps = {
  type: string
}

function TypePill({ type }: TypePillProps) {
  return (
    <span className="type-pill" style={getTypeColorStyle(type)}>
      {type}
    </span>
  )
}

type StatBarProps = {
  stat: PokemonStat
}

function StatBar({ stat }: StatBarProps) {
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
