import * as React from "react"
import {
  Box,
  VStack,
  Heading,
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
  ModalFooter,
  Center
} from "@chakra-ui/react"

import {GameBoard} from '../components/GameBoard'
import {Scoreboard} from '../components/Scoreboard'
import { Category, Answer, Game, GameClue } from '../types'
import { RouteComponentProps } from "react-router-dom"
import { CheckCircleIcon, NotAllowedIcon, SettingsIcon } from "@chakra-ui/icons"

import { Link as RouterLink} from 'react-router-dom'

interface GamePageProps extends RouteComponentProps<any>{
  
}

export const GamePage: React.FC<GamePageProps> = ({ history }) => {

  

  // STATE: game
  const [game, setGame] = React.useState<Game | undefined>()
  const [clues, setClues] = React.useState<Category[]>([])
  

  // STATE: question
  const [currentClue, setCurrentClue] = React.useState<GameClue | undefined>()
  const [playersTurn, setPlayersTurn ] = React.useState(true)
  const [questionTimeRemaining, setQuestionTimeRemaining] = React.useState(25)
  const [clockInterval, setClockInterval] = React.useState<NodeJS.Timeout | undefined>()
  const [clockTimeout, setClockTimeout] = React.useState<NodeJS.Timeout | undefined>()
  const [response, setResponse] = React.useState('')

  // STATE : display
  const [ responseDisplayToggle, setResponseDisplayToggle]  = React.useState(false)
  const [ responseCorrect, setResponseCorrect]  = React.useState(false)
  const [ menuDisplayToggle, setMenuDisplayToggle]  = React.useState(false)
  

  // use Modal
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  // *************************************************
  // ON PAGE LOAD AND QUESTION ANSWER
  // ************************************************* 

  React.useEffect(() => {

    // get game and clues
    if (!game){
      setGame(getGame())
    }
    if (!clues){
      if (game) getClues(game)
      else console.log('error getting clues and game')
    }

    // CASE: game over
    if (game && game.answers.length === 30){
      console.log('game over')
      // displayGameOverScreen()
      history.push('/game-summary')
    }

    console.log('New turn: ', playersTurn ? 'user' : 'cpu')

    // if it is cpu turn pick a question and respond
    if (!playersTurn && game){
      console.log('cpu is choosing a question')
      setTimeout(() => {
        cpuPickRandomQuestion(game)
      }, 4000)
    }

  // only rerun this when an answer is added to the game
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ game ])


  
  // *************************************************
  // SETTING UP A GAME
  // *************************************************

  const getGame = () => {
    // set categories from storage
    const foundGame: Game  = JSON.parse(localStorage.getItem('jeopardyGame') || '{}')
    
    // return early if no game was found
    if (Object.keys(foundGame).length === 0){
      console.log('no game found from local storage')
      return 
    }

    console.log('game found from local storage', foundGame)
    return foundGame
  }

  const getClues = (game: Game) => {
   
    // fethes clues for each category id
    const getAllClues = async (game: Game) => {
      const categories = game.categories
      try {
        for (let category of categories){
          const response = await fetch(`https://jservice.io/api/category?id=${category.id}`)
          const fetchResults = await response.json()
          if (fetchResults){
            setClues(prevState => [ ...prevState, fetchResults])
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    // call the asnyc function
    getAllClues(game)
  }

  // *************************************************
  // CHOOSING A QUESTION
  // *************************************************

  // user picks a question
  const clickQuestionHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // read event and find coordinates of clue
    const element = event.currentTarget as HTMLInputElement
    if (element.getAttribute('disabled') === 'true') return 
    if (element.value){
      // get category and question indexes from coordinates
      const coords = element.value.split(':')
      const category = parseInt(coords[0])
      const question = parseInt(coords[1])
      
      // find clue using indexes and the clues state 
      const foundClue = clues[category].clues[question]

      // create currentClue Object
      const foundCurrentClue = {
        clue: foundClue,
        interval: undefined,
        location: {
          category, 
          question
        }
      }

      // set the currentClue to state, call display with the current clue
      console.log('found the question', foundCurrentClue) 
      setCurrentClue(foundCurrentClue) // to change render state
      displayQuestion(foundCurrentClue, 25)

      //set button as disabled , may not need this if answering will disable already
      element.setAttribute('disabled', 'true')
     }
    
  }

  // cpu picks a question and responds
  const cpuPickRandomQuestion = (game: Game) => {
    
      // fill array with index of all asked questions
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

      // get a random index from the avilable questions
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
    
      // find clue using indexes and the clues state 
      const foundClue = clues[category].clues[question]
      
      // create currentClue object
      const foundCurrentClue = {
        clue: foundClue,
        interval: undefined,
        location: {
          category, 
          question
        }
      }

      // set the currentClue to state, call display with the current clue
      console.log('cpu picked question', foundCurrentClue) 
      setCurrentClue(foundCurrentClue)
      displayQuestion(foundCurrentClue, 25)
  }

  // *************************************************
  // RUNNING A QUESTION
  // *************************************************

  const displayQuestion = (gameClue: GameClue, seconds: number) => {
    if (!game) return 

    // open the modal
    onOpen()

    //set the question time remaining state
    setQuestionTimeRemaining(seconds)

    // start an interval to tick down the time remaining
    const interval = setInterval(() => {
      setQuestionTimeRemaining(prevState => prevState - 1)
    }, 1000)
    setClockInterval(interval)
  
  
    // set timeout to handle response and stop timer at 0
    const duration = seconds * 1000
    const timeout = setTimeout(() => {
      clearInterval(interval)
      handleResponse(game, gameClue, response, 'none')
    }, duration)
    setClockTimeout(timeout)

    // submit cpu reponse if cpu turn
    if (!playersTurn){
      submitRandomCpuResponse(game, gameClue, interval, timeout)
    }
  }

  // *************************************************
  // SUBMITTING A RESPONSE
  // *************************************************

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

  // *************************************************
  // HANDLING A RESPONSE
  // *************************************************

  const handleResponse = (game: Game, current: GameClue, response: string, user: string) => {
   
    // this will be used on user input to stop the question clock
    if (clockInterval){
      clearInterval(clockInterval)
      setClockInterval(undefined)
    }
    if (clockTimeout){
      clearTimeout(clockTimeout)
      setClockTimeout(undefined)
    }

    //handle response
    const correct = isResponseCorrect(current.location.category, current.location.question, response)
    console.log(correct ? 'correct response' : 'incorrect response')
    displayResponse(5, correct)
    
    setTimeout(() => {
      // create answer
      const answer = { 
        id: current.clue.id, 
        response, 
        correct, 
        value: current.clue.value, 
        categoryIndex: current.location.category , 
        questionIndex: current.location.question, 
        answered_by: user
       
      }

      // change turns if not correct
      if (!correct){
        setPlayersTurn(!playersTurn)
      }

       // add answer, close modal, clear response 
      addAnswerToGame(game, current, answer)
      onClose()
      setResponse('')

    }, 5000)
 
  }
    
  // clean API answers 
  const stripAnswer = (answer: string) => {
    
    let newString = answer

    // dont require tags 
    newString = newString.replace(/^<[a-z]+>/, '')
    newString = newString.replace(/<\/[a-z]+>$/, '')
    //dont require 'a ' or 'an ' or 'the ' at the beginning of response
    newString = newString.replace(/^an?\s/, '')
    newString = newString.replace(/^the\s/, '')
    
    console.log('original answer', answer)
    console.log('cleaned string', newString)
        
    return newString
  }
  
  // determine if a response is correct
  const isResponseCorrect = (categoryIndex: number, questionIndex: number, response: string ): boolean => {
    if (response === '') return false
    
    // get clue
    const clue = clues[categoryIndex].clues[questionIndex]

    // if clue has multiple answers
    if (clue.answer.search(/\)$/) !== - 1){
      const answerString = clue.answer.replace(/\s\(([\w\s]+)\saccepted\)$/, ':$1')
      const answerArray = answerString.split(':')

      // check if reponse includes any of the answers
      for (let answer of answerArray){
        if ( response.toLowerCase().includes(stripAnswer(answer.toLowerCase()))){
          return true
        }
      }
      return false
    }
    
    // if clue has only one answer
    if ( response.toLowerCase().includes(stripAnswer(clue.answer.toLowerCase()))){
      return true
    }
      return false
  }

  const addAnswerToGame = (game: Game, current: GameClue, answer: Answer) => {
    if (!current || !game) return 
    
    // create game 
    const gameUpdate: Game = { 
      categories: game.categories, 
      answers: [ ...game.answers , answer ] 
    }

    // set to state and local storage
    setGame(gameUpdate)
    localStorage.setItem('jeopardyGame', JSON.stringify(gameUpdate))
  }

  const displayResponse = (seconds: number, correct: boolean) => {
    //display response for 5 seconds
    setResponseDisplayToggle(true)
    setResponseCorrect(correct)

    const duration = seconds * 1000
    setTimeout(() => {
      setResponseDisplayToggle(false)
    }, duration)
  }

  
  return (
    <Container>
      <Box position='absolute' top='3' right='3' onClick={() => {
          console.log('menu toggle')
          setMenuDisplayToggle(!menuDisplayToggle)
        }}>
        <SettingsIcon  fontSize={22} mx='2'/>
      </Box>
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

      {/* questions response overlay */}
      {
        responseDisplayToggle && currentClue &&
        <Box bg={responseCorrect ? 'green.300' : 'red.400' } w='100vw' h='100vh' zIndex='2000' position='absolute' top='0' right='0'>
          {responseCorrect ?
          <Center  w='100%' h='100%'>
          <VStack fontSize={46} spacing={6}>
            <Text fontSize={22} fontWeight='bold'>{playersTurn ? 'PLAYER' : 'CPU'}</Text>
            <Text >Correct!</Text>
            <CheckCircleIcon />
            <Text>${currentClue.clue.value}</Text>
            <Box d='flex' flexDirection='column' fontSize={16} border='2px solid black' borderRadius='md' p={2} w='80'>
              <Box d='flex' alignItems='center' justifyContent='space-between'>
                <Text fontWeight='bold'>Response: </Text>
                <Text>{response}</Text>
              </Box>
              <Box d='flex' alignItems='center' justifyContent='space-between'>
                <Text fontWeight='bold'>Correct Answer: </Text>
                <Text>{currentClue?.clue.answer}</Text>
              </Box>
            </Box>
          </VStack>
        </Center> :
          <Center  w='100%' h='100%'>
            <VStack fontSize={46} spacing={6}>
              <Text fontSize={22} fontWeight='bold'>{playersTurn ? 'PLAYER' : 'CPU'}</Text>
              <Text >Wrong!</Text>
              <NotAllowedIcon />
              <Box d='flex' flexDirection='column' fontSize={16} border='2px solid black' borderRadius='md' p={2} w='80'>
                <Box d='flex' alignItems='center' justifyContent='space-between'>
                  <Text fontWeight='bold'>Response: </Text>
                  <Text>{response}</Text>
                </Box>
                <Box d='flex' alignItems='center' justifyContent='space-between'>
                  <Text fontWeight='bold'>Correct Answer: </Text>
                  <Text>{currentClue.clue.answer}</Text>
                </Box>
              </Box>
            </VStack>
          </Center>
          }
        </Box>
      }


      {/* menu overlay */}
      { menuDisplayToggle &&
      <Box bg='blue.400' w='100vw' h='100vh' zIndex='4000' position='absolute' top='0' right='0'>
        <Box position='absolute' top='3' right='3' onClick={() => {
          console.log('menu toggle')
          setMenuDisplayToggle(!menuDisplayToggle)
        }}>
          <SettingsIcon  fontSize={22} mx='2'/>
        </Box>
        <Box d='flex' alignItems='center' justifyContent='center' textAlign='center' h='100%' w='100%'>
          <RouterLink to='/home'>
            <Text fontFamily='cursive' fontSize={42} maxWidth='60' noOfLines={2} >Leave Game</Text>
          </RouterLink>
        </Box>
      </Box>
      }
     





    </Container>

)
}