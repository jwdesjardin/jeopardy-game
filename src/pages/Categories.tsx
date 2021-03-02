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

export const Categories = () => {

  interface Category {
    id: number,
    title: string,
    clues_count: number | null
  }

  const [categories, setCategories] = React.useState<Category[]>([])

  React.useEffect(() => {
    fetchCategories() 
  }, [])

  const fetchCategories = async () => {
    const randomNumber = Math.floor(Math.random() * 10000)
    console.log(randomNumber)
    const response = await fetch(`https://jservice.io/api/categories?count=6&offset=${randomNumber}`)
    const data = await response.json()
    console.log(data)
    setCategories(data)
    localStorage.setItem('categories', JSON.stringify(data))
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
          <Button p={6} w='60' bg='yellow.300'>Start Game</Button>
        </RouterLink>
      </VStack>
      </VStack>
    </Container>
  
)
}
