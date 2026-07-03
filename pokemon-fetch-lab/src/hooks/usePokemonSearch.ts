import { useState } from 'react'
import { RANDOM_MAX_ID } from '../constants/labContent'
import { buildPokemonUrl, fetchPokemonByKeyword } from '../lib/pokemonApi'
import type { Pokemon } from '../lib/pokemonApi'
import type { LastRequest } from '../types/request'
import { getStatusTone } from '../utils/requestStatus'

export function usePokemonSearch(initialQuery: string) {
  const [query, setQuery] = useState(initialQuery)
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [lastRequest, setLastRequest] = useState<LastRequest>({
    method: 'GET',
    url: buildPokemonUrl(initialQuery),
    status: 'Ready',
  })

  async function requestPokemon(nextQuery: string) {
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
      setError(
        requestError instanceof Error
          ? requestError.message
          : '알 수 없는 요청 오류가 발생했어요.',
      )
      setLastRequest({
        method: 'GET',
        url: buildPokemonUrl(keyword),
        status: 'Failed',
      })
    } finally {
      setLoading(false)
    }
  }

  function requestRandomPokemon() {
    const randomId = String(Math.floor(Math.random() * RANDOM_MAX_ID) + 1)
    setQuery(randomId)
    requestPokemon(randomId)
  }

  return {
    error,
    lastRequest,
    loading,
    pokemon,
    query,
    requestPokemon,
    requestRandomPokemon,
    setQuery,
    statusTone: getStatusTone(lastRequest.status, loading, error),
  }
}
