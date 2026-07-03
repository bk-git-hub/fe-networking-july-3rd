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

export function buildPokemonUrl(keyword: string): string {
  const normalizedKeyword = keyword.trim().toLowerCase()
  return `${POKEMON_API_BASE_URL}/${encodeURIComponent(normalizedKeyword)}`
}

export async function fetchPokemonByKeyword(keyword: string): Promise<Pokemon> {
  const normalizedKeyword = keyword.trim().toLowerCase()

  if (!normalizedKeyword) {
    throw new Error('포켓몬 이름이나 번호를 입력해 주세요.')
  }

  // STUDENT TODO 1.
  // buildPokemonUrl(normalizedKeyword)를 사용해서 요청 주소를 확인해 보세요.
  // 예: https://pokeapi.co/api/v2/pokemon/pikachu

  // STUDENT TODO 2.
  // fetch()로 PokeAPI에 GET 요청을 보내고, 응답을 response 변수에 담아 보세요.

  // STUDENT TODO 3.
  // response.ok가 false이면 에러를 던져 주세요.
  // 힌트: throw new Error('포켓몬을 찾지 못했어요. 영어 이름이나 번호를 확인해 주세요.')

  // STUDENT TODO 4.
  // response.json()으로 JSON 응답을 JavaScript 객체로 바꿔 data 변수에 담아 보세요.

  // STUDENT TODO 5.
  // data에서 화면에 필요한 값만 꺼내 아래 모양의 객체로 return해 주세요.
  // 힌트:
  // - id: data.id
  // - name: formatPokemonName(data.name)
  // - apiName: data.name
  // - image: data.sprites.other['official-artwork'].front_default
  // - height: `${(data.height / 10).toFixed(1)} m`
  // - weight: `${(data.weight / 10).toFixed(1)} kg`
  // - types: data.types.map((typeInfo) => typeInfo.type.name)
  // - abilities: data.abilities.map((abilityInfo) => formatPokemonName(abilityInfo.ability.name))
  // - stats: data.stats.map((statInfo) => ({ name: formatStatName(statInfo.stat.name), value: statInfo.base_stat }))

  throw new Error(
    '아직 통신 코드가 비어 있어요. src/lib/pokemonApi.ts의 STUDENT TODO를 완성해 주세요.',
  )
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
