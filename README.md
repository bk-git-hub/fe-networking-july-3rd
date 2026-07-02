# FE Networking July 3rd

React에서 `fetch`로 공개 API에 요청을 보내고, 응답 JSON을 해체해서 화면에 표시하는 실습 자료입니다.

## 폴더 구조

- `pokemon-fetch-lab`: 파트원 여러분이 직접 완성할 스타터 코드
- `pokemon-fetch-lab-complete`: 동작 확인용 완성본

## 실행 방법

스타터 코드:

```bash
cd pokemon-fetch-lab
npm install
npm run dev
```

완성본:

```bash
cd pokemon-fetch-lab-complete
npm install
npm run dev
```

## 실습 핵심

`pokemon-fetch-lab/src/lib/pokemonApi.js`의 `fetchPokemonByKeyword` 함수를 완성합니다.

구현할 내용:

- `fetch()`로 PokeAPI에 GET 요청 보내기
- `response.ok`로 성공/실패 확인하기
- `response.json()`으로 JSON 응답 읽기
- 응답 JSON에서 필요한 값을 꺼내 화면용 객체로 반환하기
