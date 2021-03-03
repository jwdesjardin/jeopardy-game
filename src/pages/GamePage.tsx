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
import { Category, Clue, Answer, Game } from '../types'

import {testingClues} from '../clues'

export const GamePage = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  
  const [clues, setClues] = React.useState<Category[]>(testingClues)
  const [game, setGame] = React.useState<Game | undefined>()
  const [current, setCurrent] = React.useState<Clue | undefined>()
  const [response, setResponse] = React.useState('')

  // need to set clues and categories to test lol

  // take categories from local storgae and set clues to state
  React.useEffect(() => {


    // set categories from storage
  
    const foundGame: Game  = JSON.parse(localStorage.getItem('jeopardyGame') || '{}')
    
    // reutrn early if no game was found
    if (Object.keys(foundGame).length === 0){
      console.log('no game found from local storage')
      return 
    }

    setGame(foundGame);
    console.log('setting game from storage', game)
    
      
    
    // get clue data 
    const getAllClues = async (game: Game) => {
      const categories = game.categories
      try {
        for (let category of categories){
          const fetchResults = await fetchCategory(category.id)
          console.log(fetchResults)
          if (fetchResults){
            setClues(prevState => [ ...prevState, fetchResults])
            
          }
        }
        
        setTimeout(() => {
          console.log('we should have clues', clues)
          localStorage.setItem('clues', JSON.stringify(clues))
        }, 4000)
        
      } catch (error) {
        console.log(error);
      }
    }

    // if game has loaded and there are no clues(testing) fill all clues into state
    if (foundGame && clues.length === 0){
      getAllClues(foundGame)
      console.log('setting clues', clues)
    }

     
    
  }, [])

  const fetchCategory = async (id: number ): Promise<Category | undefined> => {
    try {
      const response = await fetch(`https://jservice.io/api/category?id=${id}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.log(error);
    }
    
  }

  const chooseQuestionHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // read event and find coordinates of clue
    const element = event.currentTarget as HTMLInputElement
    if (element.value){
      // get numbers from button element value
      const coords = element.value.split(':')
      const category = parseInt(coords[0])
      const question = parseInt(coords[1])
      // find the question 
      console.log(category, question);
      const found = clues[category].clues[question]
      // set this for data for the questioncard and open it
      setCurrent(found)
      console.log('opening', found)
      onOpen()

      // handle answer response
      setTimeout(() => {
        
      }, 9000)

      //set button as disabled
      element.setAttribute('disabled', 'true')
     }
    
  }

  
  const isCorrect = (categoryIndex: number, questionIndex: number, response: string ): boolean => {
    const clue = clues[categoryIndex].clues[questionIndex]
    if ( clue.answer.toLowerCase().includes(response)){
      return true
    }
      return false
  }

  const submitResponseHandler = (event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault()

    if (!current || !game) return 

    // close the modal
    onClose()
    

    const categoryIndex = game.categories.findIndex(category => category.id === current.category_id)
    const questionIndex = clues[categoryIndex].clues.findIndex(clue => clue.id === current.id)
    console.log('received indexes', categoryIndex, questionIndex)

    //handle response
    let gameUpdate: Game
    if (response && game){
      //correct response
      if (isCorrect(categoryIndex, questionIndex, response)){
        console.log('correct response')
        gameUpdate = { categories: game.categories, answers: [ ...game.answers , { id: current.id, response, correct: true, value: current.value, categoryIndex, questionIndex } ] }
        setGame(gameUpdate)
        localStorage.setItem('jeopardyGame', JSON.stringify(gameUpdate))
        // incorrect response
      } else {
        console.log('incorrect response')
        gameUpdate = { categories: game.categories, answers: [ ...game.answers , { id: current.id, response, correct: false, value: current.value, categoryIndex, questionIndex } ]}
        setGame(gameUpdate)
        localStorage.setItem('jeopardyGame', JSON.stringify(gameUpdate))
      }
      // no response
    } else {
      console.log('no response')
      gameUpdate = { categories: game.categories, answers: [ ...game.answers , { id: current.id, response: '', correct: false, value: current.value, categoryIndex, questionIndex }  ]}
      setGame(gameUpdate)
      localStorage.setItem('jeopardyGame', JSON.stringify(gameUpdate))
    }
    
    setResponse('')
    
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
        <GameBoard game={game} chooseQuestion={chooseQuestionHandler} />
        }
        {/* scoreboard */}
        <Scoreboard />
      </VStack>

      {/* question card */}
      { current && 
      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={31} fontFamily='cursive'>{clues.filter(clue => clue.id === current.category_id).map(category => category.title)}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize={26} textAlign='center'>{current.question}</Text>
          <Text fontFamily='fantasy' fontSize={36} >9</Text>
        </ModalBody>
        <ModalFooter>
          <form onSubmit={submitResponseHandler}>
            <Input size='lg'  placeholder="answer here" onChange={(e) => setResponse(e.target.value)} value={response}  />
          </form>
        </ModalFooter>
      </ModalContent>
    </Modal>
      }

      

      



    </Container>

)
}