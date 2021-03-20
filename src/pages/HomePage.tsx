import * as React from 'react'
import { Box, VStack, Heading, Link } from '@chakra-ui/react'

import { Link as RouterLink } from 'react-router-dom'

import { ContainerVariants, MotionButton, MotionContainer } from '../variants'

export const HomePage: React.FC = () => {
  const [resume, setResume] = React.useState(false)

  React.useEffect(() => {
    const foundGame = localStorage.getItem('jeopardyGame')
    if (foundGame) {
      console.log('game found in local storage local storage')
      setResume(true)
    } else {
      console.log('no game found in local storage')
    }
  }, [])

  const newGameHandler = () => {
    localStorage.removeItem('jeopardyGame')
  }

  return (
    <MotionContainer variants={ContainerVariants} initial='initial' animate='animate' exit='exit'>
      <Box display='flex' h='90vh' alignItems='center' justifyContent='center'>
        <Box textAlign='center' fontSize='xl'>
          <Heading mb='10' fontSize='4rem' fontFamily='heading' letterSpacing='wide'>
            Jeopardy
          </Heading>
          <VStack spacing={2} width='100%'>
            <Link as={RouterLink} to='/categories'>
              <MotionButton width='60' p='10' bg='blue.500' onClick={newGameHandler}>
                Start Game?
              </MotionButton>
            </Link>
            <Link as={RouterLink} to='/game'>
              <MotionButton
                width='60'
                p='10'
                bg={resume ? 'green.300' : 'gray.300'}
                disabled={!resume}
              >
                Resume Game?
              </MotionButton>
            </Link>
          </VStack>
        </Box>
      </Box>
    </MotionContainer>
  )
}
