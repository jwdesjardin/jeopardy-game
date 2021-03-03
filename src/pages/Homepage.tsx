import * as React from "react"
import {
  Box,
  VStack,
  Heading,
  Button,
  Container,
  Link
} from "@chakra-ui/react"

import { Link as RouterLink} from 'react-router-dom'
import { Game } from "../types"
 


export const Homepage = () => {

  // const [game, setGame] = React.useState<Game | undefined>()
  const [ resume, setResume] = React.useState(false)
  React.useEffect(() => {
    const foundGame = localStorage.getItem('jeopardyGame')
    if (foundGame){
      console.log('game found in local storage local storage')
      // const parsedGame = JSON.parse(foundGame)
      // setGame(parsedGame)
      setResume(true)
    } else {
      console.log('no game found in local storage')
    }
  
  },[])

  return (
    <Container>
      <Box display='flex' h='90vh' alignItems='center' justifyContent='center'>
      <Box textAlign="center" fontSize="xl">
          <Heading mb='10' fontSize='4rem' fontFamily='fantasy' letterSpacing='wide' >
            Jeopardy
          </Heading>
          <VStack spacing={2} width='100%'>
            <Link as={RouterLink} to='/categories'>
            <Button width='60' p='10' bg='blue.500' >Start Game?</Button>
            </Link>
            <Button width='60' p='10' bg='green.300' disabled={!resume} >Resume Game?</Button>
            
          </VStack>
      </Box>
      </Box>
    </Container>
  
  )
}