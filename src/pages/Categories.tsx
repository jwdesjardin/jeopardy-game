import * as React from "react"
import {
  Box,
  Text,
  VStack,
  Grid,
  Heading,
  Button,
  Container,
} from "@chakra-ui/react"

import { Link as RouterLink} from 'react-router-dom'
import { Category, Game } from "../types"
import { waitFor } from "@testing-library/react"

export const Categories = () => {

  const [categories, setCategories] = React.useState<Category[]>([])
  const [game, setGame ] = React.useState<Game | undefined>()

  React.useEffect(() => {
    fetchCategories() 
  }, [])

  const fetchCategories = async () => {
    // get a random number from 0-9999
    const randomNumber = Math.floor(Math.random() * 10000)
    console.log(randomNumber)
    // fetch a list of categories and set to state
    const response = await fetch(`https://jservice.io/api/categories?count=6&offset=${randomNumber}`)
    const data: Category[] = await response.json()
    console.log('received categories', data)
    setCategories(data)
    setGame({
      categories: data,
      answers: []
    })
  }

  // set to local storage on button click
  const startGameHandler = async () => {
    localStorage.setItem('jeopardyGame', JSON.stringify(game))
  }



  return (
    <Container>
      <VStack spacing={10}>
      <Box textAlign="center" fontSize="xl">
        <Heading  fontSize='3rem' fontFamily='fantasy' letterSpacing='wide'>Categories</Heading>
      </Box>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          {categories.map(category => (
            <Box key={category.id} bg='blue.500' h='20' w='100%' borderRadius='lg' p={2} >
            <Box display='flex' textAlign='center' alignItems='center' justifyContent='center' h='100%'>
              <Text color='white'  fontSize={18} fontWeight='semibold'>
                {category.title}
              </Text>
            </Box>
          </Box>
          ) ) }
          
          
          
       
      </Grid>
      <VStack spacing={2}>
        <Button p={6} w='60' bg='green.600' onClick={fetchCategories}>Randomize Categories</Button>
        <RouterLink to='/game'>
          <Button p={6} w='60' bg='yellow.300' onClick={startGameHandler}>Start Game</Button>
        </RouterLink>
      </VStack>
      </VStack>
    </Container>
  
)
}
