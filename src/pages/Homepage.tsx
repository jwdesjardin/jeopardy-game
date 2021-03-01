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
 


export const Homepage = () => {

  

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
            <Button width='60' p='10' bg='green.300' disabled>Resume Game?</Button>
            
          </VStack>
      </Box>
      </Box>
    </Container>
  
  )
}