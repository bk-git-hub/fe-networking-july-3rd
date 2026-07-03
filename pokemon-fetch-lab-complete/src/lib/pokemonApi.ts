export const POKEMON_API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon'

export type PokemonStat = {
  name: string
  value: number
}

export type Pokemon = {
  id: number
  name: string
  apiName: string
  image: string
  height: string
  weight: string
  types: string[]
  abilities: string[]
  stats: PokemonStat[]
}

type PokemonApiTypeSlot = {
  type: {
    name: string
  }
}

type PokemonApiAbilitySlot = {
  ability: {
    name: string
  }
}

type PokemonApiStatSlot = {
  base_stat: number
  stat: {
    name: string
  }
}

type PokemonApiResponse = {
  id: number
  name: string
  height: number
  weight: number
  sprites: {
    front_default: string | null
    other: {
      'official-artwork': {
        front_default: string | null
      }
      dream_world: {
        front_default: string | null
      }
      home: {
        front_default: string | null
      }
    }
  }
  types: PokemonApiTypeSlot[]
  abilities: PokemonApiAbilitySlot[]
  stats: PokemonApiStatSlot[]
}

export function buildPokemonUrl(keyword: string): string {
  const normalizedKeyword = keyword.trim().toLowerCase()
  return `${POKEMON_API_BASE_URL}/${encodeURIComponent(normalizedKeyword)}`
}

export async function fetchPokemonByKeyword(keyword: string): Promise<Pokemon> {
  const normalizedKeyword = keyword.trim().toLowerCase()

  if (!normalizedKeyword) {
    throw new Error('포켓몬 이름이나 번호를 입력해 주세요.')
  }

  const response = await fetch(buildPokemonUrl(normalizedKeyword))

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('포켓몬을 찾지 못했어요. 영어 이름이나 번호를 확인해 주세요.')
    }

    throw new Error(`API 요청에 실패했어요. HTTP ${response.status}`)
  }

  const data = (await response.json()) as PokemonApiResponse
  return normalizePokemon(data)
}

function normalizePokemon(data: PokemonApiResponse): Pokemon {
  const artwork = data.sprites.other['official-artwork'].front_default
  const dreamWorld = data.sprites.other.dream_world.front_default
  const homeSprite = data.sprites.other.home.front_default
  const frontSprite = data.sprites.front_default

  return {
    id: data.id,
    name: formatPokemonName(data.name),
    apiName: data.name,
    image: artwork ?? dreamWorld ?? homeSprite ?? frontSprite ?? '',
    height: `${(data.height / 10).toFixed(1)} m`,
    weight: `${(data.weight / 10).toFixed(1)} kg`,
    types: data.types.map((typeInfo) => typeInfo.type.name),
    abilities: data.abilities.map((abilityInfo) =>
      formatPokemonName(abilityInfo.ability.name),
    ),
    stats: data.stats.map((statInfo) => ({
      name: formatStatName(statInfo.stat.name),
      value: statInfo.base_stat,
    })),
  }
}

export function formatPokemonName(name: string): string {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function formatStatName(name: string): string {
  const statNames: Record<string, string> = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    speed: 'Speed',
  }

  return statNames[name] ?? formatPokemonName(name)
}
