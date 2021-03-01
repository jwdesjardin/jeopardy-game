# Jeopardy Game 

this project was bootstrapped using: 

```
npx create-react-app client --template @chakra-ui/typescript
```

## screens
- [x] home page
- [x] selectCategories page
- [x] game board
- [] question page overlay
- [] question response overlay
- [] options menu overlay
- [] game summary

## features
- [] build random categories and start game functionality
- [] selecting question
- [] answering question
  - [] timing a question
- [] switching turns
  - [] random question selection
  - [] random answering
- [] persisting answered questions to state
- [] determing a win
- [] quiting a game early
- [] showing summary
- [] restarting game
- [] resume a game on browser close

## state
```js
  categories: [
    {}
  ],
  clues: [
    {}
  ],
  answers: [
    {}
  ]
```
  #### how state will be used in the app: 
  only persist categories and answers to localstorage. then use categories to find all clues. use clues to build the game board and store each answer in the answer array. use the answer array to tally the scores and the game summary. use the answer array to determine when all questions have been answered. 

  - component level state in the gameboard component 
  - persist categories and answers to localstorage