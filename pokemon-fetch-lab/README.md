# PokeFetch Lab

Vite + React로 PokeAPI에 `fetch` 요청을 보내는 30-40분짜리 수업용 보일러플레이트입니다.

현재 폴더는 여러분이 직접 완성할 TypeScript 스타터 코드입니다. 완성본은 형제 폴더 `pokemon-fetch-lab-complete`에 따로 복사해 두었습니다.

## 실행

```bash
npm install
npm run dev
```

## 실습 목표

- 입력값으로 API URL 만들기
- `fetch()`로 서버에 GET 요청 보내기
- `response.ok`로 성공/실패 나누기
- `response.json()`으로 JSON 응답 읽기
- 응답 JSON을 TypeScript 타입에 맞는 화면용 객체로 정리하기
- React state에 저장해서 화면 바꾸기

## 여러분이 집중해서 볼 파일

- `src/lib/pokemonApi.ts`: 실제 통신 코드와 응답 타입
- `src/App.tsx`: 검색 폼, 로딩, 에러, 결과 상태
- `src/App.css`: 화면 스타일

## 사용하는 API

```txt
GET https://pokeapi.co/api/v2/pokemon/pikachu
GET https://pokeapi.co/api/v2/pokemon/25
```

## 수업 진행 예시

1. 완성본 폴더 `pokemon-fetch-lab-complete`에서 먼저 시연합니다.
2. 개발자도구 Network 탭을 열고 요청 URL, status, response JSON을 확인합니다.
3. 실습용 폴더 `pokemon-fetch-lab`에서 `src/lib/pokemonApi.ts`의 `STUDENT TODO`를 완성합니다.
4. `fetch`, `response.ok`, `response.json()`, JSON 데이터 해체 순서로 구현합니다.
5. 시간이 있으면 랜덤 버튼, 타입 색상, 스탯 바를 확장 미션으로 줍니다.

## 여러분이 완성할 부분

`src/lib/pokemonApi.ts`의 `fetchPokemonByKeyword` 함수 안을 완성하면 됩니다.

```js
const response = await fetch(buildPokemonUrl(normalizedKeyword))

if (!response.ok) {
  throw new Error('포켓몬을 찾지 못했어요. 영어 이름이나 번호를 확인해 주세요.')
}

const data = await response.json()

return {
  id: data.id,
  name: formatPokemonName(data.name),
  // 나머지 값도 data에서 꺼내서 채웁니다.
}
```
