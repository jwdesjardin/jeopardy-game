import * as React from 'react'
import { Box, Text, VStack, Grid, Heading, Button } from '@chakra-ui/react'

import { Link as RouterLink } from 'react-router-dom'
import { Category, Game } from '../types'
import { ContainerVariants, MotionContainer } from '../variants'

export const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = React.useState<Category[]>([])
  const [game, setGame] = React.useState<Game | undefined>()

  React.useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    // get a random number from 0-9999
    const randomNumber = Math.floor(Math.random() * 10000)
    console.log(randomNumber)
    // fetch a list of categories and set to state
    const response = await fetch(
      `https://jservice.io/api/categories?count=6&offset=${randomNumber}`
    )
    const data: Category[] = await response.json()
    console.log('received categories', data)
    setCategories(data)
    setGame({
      categories: data,
      answers: [],
    })
  }

  // set to local storage on button click
  const startGameHandler = async () => {
    localStorage.setItem('jeopardyGame', JSON.stringify(game))
  }

  return (
    <MotionContainer variants={ContainerVariants} initial='initial' animate='animate' exit='exit'>
      <VStack spacing={10}>
        {/* page header   */}
        <Box textAlign='center' fontSize='xl'>
          <Heading fontSize='3rem' fontFamily='heading' letterSpacing='wide'>
            Categories
          </Heading>
        </Box>

        {/* grid of categories */}
        <Grid templateColumns='repeat(2, 1fr)' gap={4}>
          {categories.map((category) => (
            <Box key={category.id} bg='blue.500' h='20' w='100%' borderRadius='lg' p={2}>
              <Box
                display='flex'
                textAlign='center'
                alignItems='center'
                justifyContent='center'
                h='100%'
              >
                <Text color='white' fontSize={18} fontWeight='semibold'>
                  {category.title}
                </Text>
              </Box>
            </Box>
          ))}
        </Grid>

        {/* nav links */}
        <VStack spacing={2}>
          <Button p={6} w='60' bg='green.600' onClick={fetchCategories}>
            Randomize Categories
          </Button>
          <RouterLink to='/game'>
            <Button p={6} w='60' bg='yellow.300' onClick={startGameHandler}>
              Start Game
            </Button>
          </RouterLink>
        </VStack>
      </VStack>
    </MotionContainer>
  )
}

// const testingCategories: Category[] =
// [
//   {
//     id: 15053,
//     title: "i'm taking french leave",
//     clues_count: 10,
//     clues: []
//   },
//   {

//     id: 655,
//     title: 'the 50 states',
//     clues_count: 70,
//     clues: []
//   },
//   {

//     id: 15446,
//     title: 'let me call your attention...',
//     clues_count: 10,
//     clues: []
//   },
//   {

//     id: 15497,
//     title: 'cartoon voices',
//     clues_count: 10,
//     clues: []
//   },
//   {

//     id: 18177,
//     title: "carb's",
//     clues_count: 5,
//     clues: []
//   },
//   {

//     id: 15699,
//     title: 'does this dressing make me look fat?',
//     clues_count: 10,
//     clues: []
//   }
// ]

//  setGame({
//    categories: testingCategories,
//    answers: []
//  })
