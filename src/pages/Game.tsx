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
import { Categories } from "./Categories"

import { Category, Clue, Answer } from '../types'


export const Game = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [categories, setCategories] = React.useState<Category[]>([])
  const [clues, setClues] = React.useState<Category[]>([])
  const [answers, setAnswers] = React.useState<Answer[]>([])
  const [current, setCurrent] = React.useState<Clue | undefined>()
  const [response, setResponse] = React.useState<string | undefined>()


  

  // need to set clues and categories to test lol

  // set categories on page load
  React.useEffect(() => {
    const foundData: Category[]  = JSON.parse(localStorage.getItem('categories') || '[]')
    if (foundData.length > 0){
      console.log('setting data from storage', foundData)
      setCategories(foundData)

      // get clue data 
      const getAllClues = async () => {
        setClues([])
        for (let category of foundData){
          try {
            const fetchResults = await fetchCategory(category.id)
            console.log(fetchResults)
            if (fetchResults){
              setClues(prevState => [ ...prevState, fetchResults])
            }
          } catch (error) {
            console.log(error);
          }
          
        }
        
      }

      getAllClues()
      
      setTimeout(() => {
        console.log('we should have clues', clues)
      }, 2000)
      

      
    } else {
      console.log('no data found in local storage', foundData)
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
    
      const coords = element.value.split(':')
      const category = parseInt(coords[0])
      const question = parseInt(coords[1])
      console.log(category, question);
      // find the question and show it
      const found = clues[category].clues[question]
      setCurrent(found)
      console.log('opening', found)
      onOpen()

    //   // handle answer response
    //   setTimeout(() => {
    //     if (!current) return 

    //     onClose()

    //     if (response){
    //       //correct response
    //       if (isCorrect(category, question, response)){
    //         console.log('correct response')
    //         setAnswers([ ...answers , { id: question, response, correct: true, value: current.value } ])
    //         // incorrect response
    //       } else {
    //         console.log('incorrect response')
    //         setAnswers([ ...answers , { id: question, response, correct: false, value: current.value } ])
    //       }
    //       // no response
    //     } else {
    //       console.log('no response')
    //       setAnswers([ ...answers , { id: question, response: '', correct: false, value: current.value } ])
    //     }
    //   }, 9000)
     }
    
  }

  
  const isCorrect = (category: number, question: number, response: string ): boolean => {
    const clue = clues[category].clues[question]
    if ( clue.answer.toLowerCase().includes(response)){
      return true
    }
      return false
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
        <GameBoard categories={categories} chooseQuestion={chooseQuestionHandler} />

        {/* scoreboard */}
        <Scoreboard />
      </VStack>

      {/* question card */}
      { current && 
      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={31} fontFamily='cursive'>{categories.filter(category => category.id === current.category_id).map(category => category.title)}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize={26} textAlign='center'>{current.question}</Text>
          <Text fontFamily='fantasy' fontSize={36} >9</Text>
        </ModalBody>
        <ModalFooter>
          <Input size='lg'  placeholder="answer here" />
        </ModalFooter>
      </ModalContent>
    </Modal>
      }

      

      



    </Container>

)
}