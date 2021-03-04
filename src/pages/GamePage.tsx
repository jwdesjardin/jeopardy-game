import * as React from "react"
import {
  Box,
  VStack,
  Grid,
  Heading,
  Button,
  Container,
  Text,
  Input,
  Badge,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from "@chakra-ui/react"

import {GameBoard} from '../components/GameBoard'
import {Scoreboard} from '../components/Scoreboard'
import { Category, Clue, Answer, Game, GameClue } from '../types'

import {testingClues} from '../clues'

export const GamePage = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [game, setGame] = React.useState<Game | undefined>()
  const [clues, setClues] = React.useState<Category[]>(testingClues)
  const [currentClue, setCurrentClue] = React.useState<GameClue | undefined>()

  const [response, setResponse] = React.useState('')
  const [playersTurn, setPlayersTurn ] = React.useState(true)
  const [questionTimeRemaining, setQuestionTimeRemaining] = React.useState(25)
  const [clockInterval, setClockInterval] = React.useState<NodeJS.Timeout | undefined>()
  const [clockTimeout, setClockTimeout] = React.useState<NodeJS.Timeout | undefined>()

  const [ responseDisplayToggle, setResponseDisplayToggle]  = React.useState(false)
  const [ secondAttempt, setSecondAttempt] = React.useState(false)
  

  
// ON PAGE LOAD FILLING IN GAME AND CLUES 




  
  React.useEffect(() => {

    // get game and clues
    if (!game){
      setGame(getGame())
    }

    if (!clues){
      if (game) getClues(game)
      else console.log('error getting clues and game')
    }

    console.log('players turn', playersTurn)

    if (!playersTurn && game){
      console.log('choosing question')
      setTimeout(() => {
        cpuPickRandomQuestion(game)
      }, 4000)
    }

    

  // only rerun this when an answer is added to the game
  }, [ game ])


  
  // SETTING UP GAME


  const getGame = () => {
    // set categories from storage
    const foundGame: Game  = JSON.parse(localStorage.getItem('jeopardyGame') || '{}')
    
    // reutrn early if no game was found
    if (Object.keys(foundGame).length === 0){
      console.log('no game found from local storage')
      return 
    }

    console.log('game found from local storage', foundGame)
    return foundGame
  }

  const getClues = (game: Game) => {
   
    const getAllClues = async (game: Game) => {
      const categories = game.categories
      try {
        for (let category of categories){
          const fetchResults = await fetchCategory(category.id)
          if (fetchResults){
            setClues(prevState => [ ...prevState, fetchResults])
          }
        }
        
      } catch (error) {
        console.log(error);
      }
    }

    getAllClues(game)
  }

  const fetchCategory = async (id: number ): Promise<Category | undefined> => {
    try {
      const response = await fetch(`https://jservice.io/api/category?id=${id}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.log(error);
    }
    
  }




  // CHOOSING A QUESTION




  const clickQuestionHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // read event and find coordinates of clue
    const element = event.currentTarget as HTMLInputElement
    if (element.getAttribute('disabled') === 'true') return 
    if (element.value){
      // get numbers from button element value
      const coords = element.value.split(':')
      const category = parseInt(coords[0])
      const question = parseInt(coords[1])
      
      const foundClue = clues[category].clues[question]
      
      const foundCurrentClue = {
        clue: foundClue,
        interval: undefined,
        location: {
          category, 
          question
        }
      }

      console.log('found the question', foundCurrentClue) 
      setCurrentClue(foundCurrentClue)
      displayQuestion(foundCurrentClue, 25)

      //set button as disabled
      element.setAttribute('disabled', 'true')
     }
    
  }

  const cpuPickRandomQuestion = (game: Game) => {
    
      // fill array asked question with index of all asked questions
      const answers = game.answers
      const askedQuestions: number[] = []
      for (let answer of answers){
        let nodeIndex = answer.questionIndex * 6
        nodeIndex = nodeIndex + answer.categoryIndex + 1
        askedQuestions.push(nodeIndex)
      }
      console.log('asked questions', askedQuestions)

      // filter available questions
      const range = []
      for (let i = 1; i <= 30; i++){
        range.push(i)
      }
      const availableQuestions = range.filter(num => !askedQuestions.includes(num))
      console.log('available questions', availableQuestions)
      // get a random int from 0 to array.length - 1
      const randomInt = Math.floor(Math.random() * availableQuestions.length)
      const randomIndex = availableQuestions[randomInt]
      console.log('random index', randomIndex)
      // get coords from index
      let category: number
      let question: number
      if (randomIndex % 6 === 0){
        category = 5 
        question = Math.floor(randomIndex / 6) - 1
      } else {
        category = (randomIndex % 6) - 1
        question = Math.floor(randomIndex / 6)
      }
    
      const foundClue = clues[category].clues[question]
      
      const foundCurrentClue = {
        clue: foundClue,
        interval: undefined,
        location: {
          category, 
          question
        }
      }

      console.log('cpu picked question', foundCurrentClue) 
      setCurrentClue(foundCurrentClue)
      displayQuestion(foundCurrentClue, 25)
  }

  


  //RUNNING A QUESTION


  const displayQuestion = (gameClue: GameClue, seconds: number) => {
    if (!game) return 
    onOpen()

    //set the display time in seconds
    setQuestionTimeRemaining(seconds)

    // start an interval to reduce time and store ref in state
    const interval = setInterval(() => {
      setQuestionTimeRemaining(prevState => prevState - 1)
    }, 1000)
    setClockInterval(interval)
  
  
    // set timeout to handle response and stop timer
    const duration = seconds * 1000
    const timeout = setTimeout(() => {
      clearInterval(interval)
      // setClockInterval(undefined)
      // setClockTimeout(undefined)
      handleResponse(game, gameClue, response, 'none')
    }, duration)
    setClockTimeout(timeout)

    if (!playersTurn){
      submitRandomCpuResponse(game, gameClue, interval, timeout)
    }
    

  
  }

 

 
  






// SUBMITTING A RESPONSE




  const submitRandomCpuResponse = (game: Game, currentClue : GameClue, interval: NodeJS.Timeout, timeout: NodeJS.Timeout) => {
    //randomize response time
    //set cpu timer bewteen 6 and 10
    const randomInt = Math.floor(Math.random() * 4) + 6
    const duration = randomInt * 1000
    setTimeout(() => {
      
       //randomize correct or wrong
      // get ranom number between 0 and 1
      const correct = Math.floor(Math.random() * 2)

      let fresh_response = ''
      if (correct === 0){
        //resond with 'asadfasf' - WRONG
        fresh_response = '@#KJ$@$%'
        setResponse(fresh_response)

      } 
      if (correct === 1){
        // respond with current.answer
        fresh_response = currentClue.clue.answer
        setResponse(fresh_response)
      }

      //clear interval here since state will not show up in response handler yet
      clearInterval(interval)
      setClockInterval(undefined)
      clearTimeout(timeout)
      setClockTimeout(undefined)

      handleResponse(game, currentClue, fresh_response, 'cpu')

    }, duration)

  }

  
   // submit a user response
   const submitResponseHandler = (event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    if (!game || !currentClue) return 
   
    handleResponse(game, currentClue, response, 'user')
  }








// HANDLING A RESPONSE




  const handleResponse = (game: Game, current: GameClue, response: string, user: string) => {
    // get user 
    // const userString = user ? 'user' : 'cpu'
    

    // console.log('recieved interval', current.interval)

    // // if timer is running stop it
    // const interval = current.interval
    // if (interval){
    //   clearTimeout(interval)
    //   current.interval = undefined
    // }

    // console.log('cleared interval', current.interval)
    

    // this will be used on user input
    if (clockInterval){
      clearInterval(clockInterval)
      setClockInterval(undefined)
    }

    if (clockTimeout){
      clearTimeout(clockTimeout)
      setClockTimeout(undefined)
    }



    //handle response
      //correct response
      if (isResponseCorrect(current.location.category, current.location.question, response)){
        console.log('correct response')
        displayResponse(5)
        
        setTimeout(() => {
          // add answer
          const answer = { 
            id: current.clue.id, 
            response, 
            correct: true, 
            value: current.clue.value, 
            categoryIndex: current.location.category , 
            questionIndex: current.location.question, 
            answered_by: user
           
          }
          addAnswerToGame(game, current, answer)
          // close modal, clear response 
          onClose()
          setResponse('')

        }, 5000)
        
      
      } else { // incorrect response
        console.log('incorrect response')
        displayResponse(5)

        setTimeout(() => {
          
            const answer = { 
              id: current.clue.id, 
              response, 
              correct: false, 
              value: current.clue.value, 
              categoryIndex: current.location.category , 
              questionIndex: current.location.question, 
              answered_by: user
            }
            setPlayersTurn(!playersTurn)
            addAnswerToGame(game, current, answer)
            // close modal, clear response, change turns
            onClose()
            setResponse('')
            
  
          }
          
        , 5000)

      } 
  }
    
  

  
  const isResponseCorrect = (categoryIndex: number, questionIndex: number, response: string ): boolean => {
    const clue = clues[categoryIndex].clues[questionIndex]
    if (response === '') return false
    if ( clue.answer.toLowerCase().includes(response.toLowerCase())){
      return true
    }
      return false
  }

  const addAnswerToGame = (game: Game, current: GameClue, answer: Answer) => {
    if (!current || !game) return 
    
    const gameUpdate = { 
      categories: game.categories, 
      answers: [ ...game.answers , answer ] 
    }
    setGame(gameUpdate)
    localStorage.setItem('jeopardyGame', JSON.stringify(gameUpdate))
  }

  const displayResponse = (seconds: number) => {
    //display response for 5 seconds
    setResponseDisplayToggle(true)

    const duration = seconds * 1000
    setTimeout(() => {
      setResponseDisplayToggle(false)
    }, duration)
  }

  
  return (
    <Container>
      <VStack spacing={4}>
        {/* heading box */}
        <Box textAlign='center'>
          <Heading  fontSize='3.5rem' fontFamily='fantasy' letterSpacing='wide'>
            Jeopardy
          </Heading>
        </Box>

        {/* jeopardy board */}
        {game &&
          <GameBoard game={game} chooseQuestion={clickQuestionHandler} />
        }

        {/* scoreboard */}
        { game &&
          <Scoreboard playersTurn={playersTurn} answers={game.answers} />
        }
      </VStack>

      {/* question card */}
      { currentClue && 
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={31} fontFamily='cursive'>{clues.filter(clue => clue.id === currentClue.clue.category_id).map(category => category.title)}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={26} textAlign='center'>{currentClue.clue.question}</Text>
            <Text fontFamily='fantasy' fontSize={36} >{questionTimeRemaining}</Text>
            {secondAttempt && <Badge colorScheme='yellow'>Second Attempt</Badge> }
          </ModalBody>
          <ModalFooter>
            <form onSubmit={submitResponseHandler}>
              {playersTurn ? <Badge colorScheme='green'>It's Your Turn</Badge> : <Badge>Not Your Turn</Badge> }
              <Input size='lg'  placeholder="answer here" disabled={!playersTurn} onChange={(e) => setResponse(e.target.value)} value={response}  />
            </form>
          </ModalFooter>
        </ModalContent>
      </Modal>
      }

    </Container>

)
}