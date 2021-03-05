import * as React from "react"
import {
  Box,
  Grid,
  Button,
  Text,
} from "@chakra-ui/react"
import { Answer, Game } from "../types"




interface GameBoardProps {
  chooseQuestion(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void,
  game: Game
}

export const GameBoard: React.FC<GameBoardProps> = ({ chooseQuestion, game }) => {
  React.useEffect(() => {
    disableAnsweredQuestions(gameboard, game.answers)
  }, [game])

  const gameboard = React.useRef<HTMLDivElement | null>(null)
  const disableAnsweredQuestions = (gameboard: React.MutableRefObject<HTMLDivElement | null> , answers: Answer[]) => {
    
    // for each answer
    for (let answer of answers){
      // navigate to the correct node by counting the index
      let nodeIndex = answer.questionIndex * 6
      nodeIndex = nodeIndex + answer.categoryIndex + 7
      // set the node attribute disabled to true
      let node = gameboard.current?.querySelector(`:nth-child(${nodeIndex})`)
      node?.setAttribute('disabled', 'true')
    }
    
  }



  return (
    <Grid ref={gameboard} templateColumns="repeat(6, 1fr)">

      {/* categories */}
      {game.categories.map(category => (
        <Box key={category.id} w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1}  textAlign='center' alignItems='center' justifyContent='center'>
          <Text fontSize={9} color='white' noOfLines={2} >{category.title}</Text>
        </Box>
      ))}
      
        
      {/* squares */} 

      
      
      <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='0:0' onClick={chooseQuestion} >
        <Text fontSize={14} color='yellow.400'  >$200</Text>
      </Button>
      <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='1:0' onClick={chooseQuestion} >
        <Text fontSize={14} color='yellow.400'  >$200</Text>
      </Button>
      <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='2:0' onClick={chooseQuestion} >
        <Text fontSize={14} color='yellow.400'  >$200</Text>
      </Button>
      <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='3:0' onClick={chooseQuestion} >
        <Text fontSize={14} color='yellow.400'  >$200</Text>
      </Button>
      <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='4:0' onClick={chooseQuestion} >
        <Text fontSize={14} color='yellow.400'  >$200</Text>
      </Button>
      <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='5:0' onClick={chooseQuestion} >
        <Text fontSize={14} color='yellow.400'  >$200</Text>
      </Button>

      <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='0:1' onClick={chooseQuestion} >
        <Text fontSize={14} color='yellow.400'  >$400</Text>
      </Button>
      <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='1:1' onClick={chooseQuestion} >
        <Text fontSize={14} color='yellow.400'  >$400</Text>
      </Button>
      <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='2:1' onClick={chooseQuestion} >
        <Text fontSize={14} color='yellow.400'  >$400</Text>
      </Button>
      <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='3:1' onClick={chooseQuestion} >
        <Text fontSize={14} color='yellow.400'  >$400</Text>
      </Button>
      <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='4:1' onClick={chooseQuestion} >
        <Text fontSize={14} color='yellow.400'  >$400</Text>
      </Button>
      <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='5:1' onClick={chooseQuestion} >
        <Text fontSize={14} color='yellow.400'  >$400</Text>
      </Button>

      <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='0:2' onClick={chooseQuestion} >
        <Text fontSize={14} color='yellow.400'  >$600</Text>
      </Button>
      <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='1:2' onClick={chooseQuestion} >
        <Text fontSize={14} color='yellow.400'  >$600</Text>
      </Button>
      <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='2:2' onClick={chooseQuestion} >
        <Text fontSize={14} color='yellow.400'  >$600</Text>
      </Button>
      <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='3:2' onClick={chooseQuestion} >
        <Text fontSize={14} color='yellow.400'  >$600</Text>
      </Button>
      <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='4:2' onClick={chooseQuestion} >
        <Text fontSize={14} color='yellow.400'  >$600</Text>
      </Button>
      <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='5:2' onClick={chooseQuestion} >
        <Text fontSize={14} color='yellow.400'  >$600</Text>
      </Button>

      <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='0:3' onClick={chooseQuestion} >
        <Text fontSize={14} color='yellow.400'  >$800</Text>
      </Button>
      <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='1:3' onClick={chooseQuestion} >
        <Text fontSize={14} color='yellow.400'  >$800</Text>
      </Button>
      <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='2:3' onClick={chooseQuestion} >
        <Text fontSize={14} color='yellow.400'  >$800</Text>
      </Button>
      <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='3:3' onClick={chooseQuestion} >
        <Text fontSize={14} color='yellow.400'  >$800</Text>
      </Button>
      <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='4:3' onClick={chooseQuestion} >
        <Text fontSize={14} color='yellow.400'  >$800</Text>
      </Button>
      <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='5:3' onClick={chooseQuestion} >
        <Text fontSize={14} color='yellow.400'  >$800</Text>
      </Button>

      <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='0:4' onClick={chooseQuestion} >
        <Text fontSize={14} color='yellow.400'  >$1000</Text>
      </Button>
      <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='1:4' onClick={chooseQuestion} >
        <Text fontSize={14} color='yellow.400'  >$1000</Text>
      </Button>
      <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='2:4' onClick={chooseQuestion} >
        <Text fontSize={14} color='yellow.400'  >$1000</Text>
      </Button>
      <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='3:4' onClick={chooseQuestion} >
        <Text fontSize={14} color='yellow.400'  >$1000</Text>
      </Button>
      <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='4:4' onClick={chooseQuestion} >
        <Text fontSize={14} color='yellow.400'  >$1000</Text>
      </Button>
      <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='5:4' onClick={chooseQuestion} >
        <Text fontSize={14} color='yellow.400'  >$1000</Text>
      </Button>

      

      
    
      
    </Grid>
)
}
