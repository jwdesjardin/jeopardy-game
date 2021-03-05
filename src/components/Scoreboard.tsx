import * as React from "react"
import {
  Box,
  Text,
  VStack,
  Badge
} from "@chakra-ui/react"
import { Answer } from "../types"


interface ScoreboardProps {
  answers: Answer[]
  playersTurn: boolean
}

export const Scoreboard: React.FC<ScoreboardProps> = ( { answers, playersTurn } ) => {

  const [playerScore, setPlayerScore] = React.useState(0)
  const [computerScore, setComputerScore] = React.useState(0)
  const [winning, setWinning] = React.useState(true)

  React.useEffect(() => {
    //tally scores
    let playerTally = 0
    let cpuTally = 0

    // loop through answers 
    for (let answer of answers){
      if (answer.answered_by === 'user' && answer.correct){
        playerTally += answer.value
      }

      if (answer.answered_by === 'cpu' && answer.correct){
        cpuTally += answer.value
      }
    }
    
    setComputerScore(cpuTally)
    setPlayerScore(playerTally)

    //set winner 
    if (playerTally > cpuTally) {
      setWinning(true)
    } else if (playerTally < cpuTally) {
      setWinning(false)
    }
  }, [answers])


  return (
    <VStack mt={4}>

      {/* player */}
      <Box p={2} bg={winning ? 'green.300' : 'gray.500'} borderRadius='lg' w='60'>
        {/* nameplate */}
        <Box d='flex' justifyContent='space-between' alignItems='center'>
          <Box d='flex' alignItems='flex-start' justifyContent='center' flexDirection='column'>
            <Text fontSize={20} fontWeight='semibold'>
              Player
            </Text>
            {playersTurn ? <Badge colorScheme='green'>It's Your Turn</Badge> : <Badge>Not Your Turn</Badge> }
            
          </Box>
        </Box>
        {/* cash score */}
        <Box mt={2}>
          <Text fontSize={26} fontFamily='cursive'>
            ${playerScore}
          </Text>
        </Box>
      </Box>

      {/* cpu */}
      <Box p={2} bg={winning ? 'gray.500': 'green.300' } borderRadius='lg' w='60'>
        {/* nameplate */}
        <Box d='flex' flexDirection='row-reverse' justifyContent='space-between' alignItems='center'>
          <Box d='flex' alignItems='flex-start' justifyContent='center' flexDirection='column'>
          <Text fontSize={20} fontWeight='semibold'>
              Computer
            </Text>
          </Box>
        </Box>
        {/* cash score */}
        <Box d='flex' flexDirection='row-reverse' justifyContent='space-between' alignItems='center' mt={2}>
          <Text fontSize={26} fontFamily='cursive'>
            ${computerScore}
          </Text>
        </Box>
      </Box>

      
      
    </VStack>
)
}
