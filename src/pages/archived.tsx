

// export const runQuestion = (clue: Clue) => {
//   if (!game ) return 

//   // present question
//   console.log('presenting question', clue)
//   // const locationClue = presentQuestion(clue)
//   if (!currentClue) return 
  
//   // if !players turn 
//   if (!playersTurn){
//     // disable input / set timout cpu response
//     setResponseDisabled(true)
//     submitRandomCpuResponse(game, currentClue, secondAttempt)
//   } else {
//     setResponseDisabled(false) 
//   }
      
// }


// export const presentQuestion = (foundClue: Clue) => {
//   if (!game) return 

//   // find board location and set to found clue in state
//   const categoryIndex = game.categories.findIndex(category => category.id === foundClue.category_id)
//   const questionIndex = clues[categoryIndex].clues.findIndex(clue => clue.id === foundClue.id)

//   const gameClue = { clue: foundClue, interval: undefined, location: { category: categoryIndex, question: questionIndex}}
//   setCurrentClue(gameClue)

//   //open the modal  and start clock
//   console.log('opening', gameClue)
//   // startQuestionClock(gameClue, 25)
//   onOpen()
  
//   return gameClue
// }

// const startQuestionClock = (gameClue: GameClue, seconds: number) => {
//   if (!game) return 
//   onOpen()
//   //set the display time in seconds
//   setQuestionTimeRemaining(seconds)

//   // start an interval to reduce time and store ref in state
//   const interval = setInterval(() => {
//     setQuestionTimeRemaining(prevState => prevState - 1)
//   }, 1000)
//   // set interval on gameClue for future use
//   gameClue.interval = interval

//   // set timeout to handle response and stop timer
//   const duration = seconds * 1000
//   setTimeout(() => {
//     handleResponse(game, gameClue, response, playersTurn, secondAttempt)
//   }, duration)

// }

export const dog = () => {
  return 'brown'
}