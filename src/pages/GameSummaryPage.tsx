import * as React from "react"
import {
  Box,
  Text,
  VStack,
  Heading,
  Button,
  Container,
  HStack,
  Center,
} from "@chakra-ui/react"

import { Link as RouterLink} from 'react-router-dom'
import { Category, Game } from "../types"
import { StarIcon } from "@chakra-ui/icons"

export const GameSummaryPage: React.FC = () => {
 
  interface GameSummary {
    questionsPicked: number
    questionsCorrect: number
    bestCategory: string
    worstCategory: string
    moneyWon: number 
  }

  //player summary
  const [playerGameSummary, setPlayerGameSummary] = React.useState<GameSummary | undefined>()
  // cpu summary
  const [cpuGameSummary, setCpuGameSummary] = React.useState<GameSummary | undefined>()
  // winner state
  const [userWon, setUserWon] = React.useState('none')
  

  React.useEffect(() => {

    // get game from local storage
    const game = localStorage.getItem('jeopardyGame')

    //return early if no game is found
    if (!game) return 

    // parse game to abject
    const gameOBJ: Game = JSON.parse(game)
    
    // get answers
    const answers = gameOBJ.answers


    // calculate player data
    const userSummary = {
      questionsPicked: 0,
      questionsCorrect: 0,
      bestCategory: '',
      worstCategory: '',
      moneyWon: 0 
    }
    const cpuSummary = {
      questionsPicked: 0,
      questionsCorrect: 0,
      bestCategory: '',
      worstCategory: '',
      moneyWon: 0 
    }


    // tally questions and money
    for (let answer of answers){
      // if answered by user, log a question picked
      if (answer.answered_by === 'user'){
        userSummary.questionsPicked += 1
        // if correct, log correct and value
        if (answer.correct){
          userSummary.questionsCorrect +=1
          userSummary.moneyWon += answer.value
        }
      }
      // do the same thing for cpu answers
      if (answer.answered_by === 'cpu'){
        cpuSummary.questionsPicked += 1
        // if correct, log correct and value
        if (answer.correct){
          cpuSummary.questionsCorrect +=1
          cpuSummary.moneyWon += answer.value
        }
      }

    }

    // determine best and worst category

    // get list of category names
    const categoryTitles = gameOBJ.categories.map(category => category.title)
      
    // initialize tallys
    const playerWinnings = [0,0,0,0,0,0]
    const cpuWinnings = [0,0,0,0,0,0]

    // for each correct answer add value to correct category index
    for (let answer of answers){
      if (answer.correct){
        if (answer.answered_by === 'user'){
          playerWinnings[answer.categoryIndex] += answer.value
        }
        if (answer.answered_by === 'cpu'){
          cpuWinnings[answer.categoryIndex] += answer.value
        }
      }
    }
    
    // calculate best and worst indexes
    console.log('player winnings', playerWinnings)
    const playerBestIndex = playerWinnings.indexOf(Math.max(...playerWinnings))
    const playerWorstIndex = playerWinnings.indexOf(Math.min(...playerWinnings))
    console.log('cpu winnings', cpuWinnings)
    const cpuBestIndex = cpuWinnings.indexOf(Math.max(...cpuWinnings))
    const cpuWorstIndex = cpuWinnings.indexOf(Math.min(...cpuWinnings))

    console.log('player min and mix', playerBestIndex, playerWorstIndex)
    console.log('cpu min and mix', cpuBestIndex, cpuWorstIndex)

    // set user strings based on index
    userSummary.bestCategory = `${categoryTitles[playerBestIndex]} ($${playerWinnings[playerBestIndex]})`
    userSummary.worstCategory = `${categoryTitles[playerWorstIndex]} ($${playerWinnings[playerWorstIndex]})`
    // set cpu strings based on index
    cpuSummary.bestCategory = `${categoryTitles[cpuBestIndex]} ($${cpuWinnings[cpuBestIndex]})`
    cpuSummary.worstCategory = `${categoryTitles[cpuWorstIndex]} ($${cpuWinnings[cpuWorstIndex]})`

    // set summary objects to state
    setCpuGameSummary(cpuSummary)
    setPlayerGameSummary(userSummary)

    // determine winner
    if (cpuSummary.moneyWon > userSummary.moneyWon){
      setUserWon('cpu')
    } else if (cpuSummary.moneyWon < userSummary.moneyWon){
      setUserWon('user')
    }




  // run this once on page load
  }, [])



  return (
    <Container>
      <VStack spacing={3}>
      {/* page header */}
      <Box textAlign="center" fontSize="xl">
        <Heading  fontSize='3rem' fontFamily='fantasy' letterSpacing='wide'>Game Summary</Heading>
      </Box>

      {/* winner message */}
      {userWon === 'user' && <Box textAlign="center" fontSize="xl">
        <Heading color='green.500' fontSize='1.2rem' fontFamily='cursive' letterSpacing='wide'>Player is the winner</Heading>
      </Box> } 
      { userWon === 'cpu' &&
      <Box textAlign="center" fontSize="xl">
        <Heading color='orange.500' fontSize='1.2rem' fontFamily='cursive' letterSpacing='wide'>CPU is the winner</Heading>
      </Box>}
      {userWon === 'none' && <Box textAlign="center" fontSize="xl">
        <Heading color='green.500' fontSize='1.2rem' fontFamily='cursive' letterSpacing='wide'>Its a tie no winner</Heading>
      </Box> } 
      
      

      {/* game summary */}
      { playerGameSummary && 
      <Box w='100%' border='2px solid black' borderRadius='lg' p={4}>
        <VStack spacing={2}>

          {/* show star if player won */}
          {userWon === 'user' && 
          <Box>
            <Center>
              <StarIcon fontSize='2rem' color='gold'/>
            </Center>
          </Box>
          }

          <Box  w='100%' d='flex' justifyContent='space-between' alignItems='center'>
            <Text fontWeight='bold'>Player Money Won</Text>
            <Text>${playerGameSummary.moneyWon}</Text>
          </Box>
          <Box w='100%' d='flex' justifyContent='space-between' alignItems='center'>
            <Text fontWeight='bold'>Player Questions (Correct / Total): </Text>
            <Text>{playerGameSummary.questionsCorrect}{` / `}{playerGameSummary.questionsPicked}</Text>
          </Box>
          
          <Box  w='100%' d='flex' justifyContent='space-between' alignItems='center'>
            <Text fontWeight='bold'>Best Category: </Text>
            <Text>{playerGameSummary.bestCategory}</Text>
          </Box>
          <Box  w='100%' d='flex' justifyContent='space-between' alignItems='center'>
            <Text fontWeight='bold'>Worst Category: </Text>
            <Text>{playerGameSummary.worstCategory}</Text>
          </Box>
        </VStack>

      </Box>
      }
      { cpuGameSummary && 
      <Box w='100%' border='2px solid black' borderRadius='lg' p={4}>
        <VStack spacing={2}>
          
          {/* show star if cpu won */}
          {userWon === 'cpu' && 
          <Box>
            <Center>
              <StarIcon fontSize='2rem' color='gold'/>
            </Center>
          </Box>
          }

          <Box  w='100%' d='flex' justifyContent='space-between' alignItems='center'>
            <Text fontWeight='bold'>CPU Money Won</Text>
            <Text>${cpuGameSummary.moneyWon}</Text>
          </Box>
          <Box w='100%' d='flex' justifyContent='space-between' alignItems='center'>
            <Text fontWeight='bold'>CPU Questions (Correct / Total): </Text>
            <Text>{cpuGameSummary.questionsCorrect}{` / `}{cpuGameSummary.questionsPicked}</Text>
          </Box>
          
          <Box  w='100%' d='flex' justifyContent='space-between' alignItems='center'>
            <Text fontWeight='bold'>Best Category: </Text>
            <Text>{cpuGameSummary.bestCategory}</Text>
          </Box>
          <Box  w='100%' d='flex' justifyContent='space-between' alignItems='center'>
            <Text fontWeight='bold'>Worst Category: </Text>
            <Text>{cpuGameSummary.worstCategory}</Text>
          </Box>
        </VStack>

      </Box>
      }


      {/* buttons */}
      <HStack spacing={2}>
        <RouterLink to='/categories'>
          <Button p={6}  bg='green.600' >Play Again?</Button>
        </RouterLink>
        <RouterLink to='/home'>
          <Button p={6} bg='yellow.400' >Return Home</Button>
        </RouterLink>
      </HStack>
      </VStack>
    </Container>
  
)
}
