export const POKEMON_API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon'

export function buildPokemonUrl(keyword) {
  const normalizedKeyword = keyword.trim().toLowerCase()
  return `${POKEMON_API_BASE_URL}/${encodeURIComponent(normalizedKeyword)}`
}

export async function fetchPokemonByKeyword(keyword) {
  const normalizedKeyword = keyword.trim().toLowerCase()

  if (!normalizedKeyword) {
    throw new Error('포켓몬 이름이나 번호를 입력해 주세요.')
  }

  // STUDENT TODO:
  // 1. fetch로 PokeAPI에 GET 요청을 보냅니다.
  // 2. response.ok가 false면 에러를 던집니다.
  // 3. response.json()으로 JSON 데이터를 JavaScript 객체로 바꿉니다.
  // 4. 화면에서 쓰기 좋은 모양으로 데이터를 정리해서 반환합니다.
  const response = await fetch(buildPokemonUrl(normalizedKeyword))

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('포켓몬을 찾지 못했어요. 영어 이름이나 번호를 확인해 주세요.')
    }

    throw new Error(`API 요청에 실패했어요. HTTP ${response.status}`)
  }

  const data = await response.json()
  return normalizePokemon(data)
}

function normalizePokemon(data) {
  const artwork = data.sprites.other['official-artwork'].front_default
  const dreamWorld = data.sprites.other.dream_world.front_default
  const homeSprite = data.sprites.other.home.front_default
  const frontSprite = data.sprites.front_default

  return {
    id: data.id,
    name: formatPokemonName(data.name),
    apiName: data.name,
    image: artwork ?? dreamWorld ?? homeSprite ?? frontSprite,
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

function formatPokemonName(name) {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function formatStatName(name) {
  const statNames = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    speed: 'Speed',
  }

  return statNames[name] ?? formatPokemonName(name)
}
