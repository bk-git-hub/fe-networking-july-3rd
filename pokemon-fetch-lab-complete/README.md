# PokeFetch Lab

Vite + React로 PokeAPI에 `fetch` 요청을 보내는 30-40분짜리 수업용 보일러플레이트입니다.

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
- React state에 저장해서 화면 바꾸기

## 학생이 집중해서 볼 파일

- `src/lib/pokemonApi.js`: 실제 통신 코드
- `src/App.jsx`: 검색 폼, 로딩, 에러, 결과 상태
- `src/App.css`: 화면 스타일

## 사용하는 API

```txt
GET https://pokeapi.co/api/v2/pokemon/pikachu
GET https://pokeapi.co/api/v2/pokemon/25
```

## 수업 진행 예시

1. 완성 화면을 먼저 시연합니다.
2. 개발자도구 Network 탭을 열고 요청 URL, status, response JSON을 확인합니다.
3. `src/lib/pokemonApi.js`의 `STUDENT TODO` 영역을 함께 읽습니다.
4. 시간이 있으면 랜덤 버튼, 타입 색상, 스탯 바를 확장 미션으로 줍니다.

## 실습용 빈칸으로 바꾸기

학생에게 직접 구현시키려면 `src/lib/pokemonApi.js`의 `fetchPokemonByKeyword` 함수 안에서 아래 부분만 지우고 TODO 주석을 남기면 됩니다.

```js
const response = await fetch(buildPokemonUrl(normalizedKeyword))

if (!response.ok) {
  // ...
}

const data = await response.json()
return normalizePokemon(data)
```
