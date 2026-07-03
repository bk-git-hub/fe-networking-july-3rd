import type { CSSProperties } from 'react'
import { typeColorMap } from '../constants/typeColors'

type TypeColorStyle = CSSProperties & {
  '--type-color': string
}

export function getTypeColor(type: string): string {
  return typeColorMap[type] ?? '#2a75bb'
}

export function getTypeColorStyle(type: string): TypeColorStyle {
  return {
    '--type-color': getTypeColor(type),
  }
}
