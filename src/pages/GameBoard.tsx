import * as React from "react"
import {
  Box,
  VStack,
  Grid,
  Heading,
  Button
} from "@chakra-ui/react"



export const GameBoard = () => (

    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <VStack spacing={8}>
          <Heading  mb='10' fontSize='4rem' fontFamily='fantasy' letterSpacing='wide'>
            Jeopardy
          </Heading>
          <Button>Start Game?</Button>
          <Button>Resume Game?</Button>
        </VStack>
      </Grid>
    </Box>

)
