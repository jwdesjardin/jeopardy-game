import * as React from "react"
import {
  Box,
  VStack,
  Grid,
  Heading,
  Button,
  Container,
  Text
} from "@chakra-ui/react"

import {GameBoard} from '../components/GameBoard'
import {Scoreboard} from '../components/Scoreboard'

export const Game = () => (
    <Container>
      <VStack spacing={4}>
        {/* heading box */}
        <Box textAlign='center'>
          <Heading  fontSize='4rem' fontFamily='fantasy' letterSpacing='wide'>
            Jeopardy
          </Heading>
        </Box>

        {/* jeopardy board */}
        <GameBoard />

        {/* scoreboard */}
        <Scoreboard />
      </VStack>
    </Container>

)