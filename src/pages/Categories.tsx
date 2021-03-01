import * as React from "react"
import {
  Box,
  Text,
  VStack,
  Grid,
  Heading,
  Button,
  Container,
  Center
} from "@chakra-ui/react"



export const Categories = () => (
  
    <Container>
      <VStack spacing={10}>
      <Box textAlign="center" fontSize="xl">
        <Heading  fontSize='3rem' fontFamily='fantasy' letterSpacing='wide'>Categories</Heading>
      </Box>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <Box bg='blue.500' h='20' w='100%' borderRadius='lg' p={2} >
            <Box display='flex' textAlign='center' alignItems='center' justifyContent='center' h='100%'>
              <Text color='white'  fontSize={18} fontWeight='semibold'>
                Verry very long title #1
              </Text>
            </Box>
          </Box>
          <Box bg='blue.500' h='20' w='100%' borderRadius='lg' p={2}>
            <Box display='flex' textAlign='center' alignItems='center' justifyContent='center' h='100%'>
              <Text color='white'  fontSize={18} fontWeight='semibold'>
                Verry very long title #1
              </Text>
            </Box>
          </Box>
          <Box bg='blue.500' h='20' w='100%' borderRadius='lg' p={2}>
            <Box display='flex' textAlign='center' alignItems='center' justifyContent='center' h='100%'>
              <Text color='white'  fontSize={18} fontWeight='semibold'>
                Verry very long title #1
              </Text>
            </Box>
          </Box>
          <Box bg='blue.500' h='20' w='100%' borderRadius='lg' p={2}>
            <Box display='flex' textAlign='center' alignItems='center' justifyContent='center' h='100%'>
              <Text color='white'  fontSize={18} fontWeight='semibold'>
                Verry very long title #1
              </Text>
            </Box>
          </Box>
          <Box bg='blue.500' h='20' w='100%' borderRadius='lg' p={2}>
            <Box display='flex' textAlign='center' alignItems='center' justifyContent='center' h='100%'>
              <Text color='white'  fontSize={18} fontWeight='semibold'>
                Verry very long title #1
              </Text>
            </Box>
          </Box>
          <Box bg='blue.500' h='20' w='100%' borderRadius='lg' p={2}>
            <Box display='flex' textAlign='center' alignItems='center' justifyContent='center' h='100%'>
              <Text color='white'  fontSize={18} fontWeight='semibold'>
                Verry very long title #1
              </Text>
            </Box>
          </Box>
          
       
      </Grid>
      <VStack spacing={2}>
        <Button p={6} w='60' bg='green.600'>Randomize Categories</Button>
        <Button p={6} w='60' bg='yellow.300'>Start Game</Button>
      </VStack>
      </VStack>
    </Container>
  
)
