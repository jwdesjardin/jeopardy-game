# Jeopardy Game 

this project was bootstrapped using: 

```
npx create-react-app client --template @chakra-ui/typescript
```

## screens
- [x] home page
- [x] selectCategories page
- [x] game board
- [x] question page overlay
- [] question response overlay
- [] options menu overlay
- [] game summary

## features
- [x] build random categories and start game functionality
- [x] selecting question
- [x] answering question
  - [x] timing a question
  - [x] persisting answered questions to state
  - [] determing a valid response 
- [x] displaying score  
- [x] switching turns
  - [x] random question selection
  - [x] random answering
- [] recalculate score with 2 players
- [] determing a win(all questions answered)
- [] showing summary
- [] restarting game (play again)
- [] quiting a game early
- [x] resume a game on browser close

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

