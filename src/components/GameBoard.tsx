import * as React from "react"
import {
  Box,
  Grid,
  Button,
  Text
} from "@chakra-ui/react"



export const GameBoard = () => (
      <Grid templateColumns="repeat(6, 1fr)">

        {/* categories */}
        <Box w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1}  textAlign='center' alignItems='center' justifyContent='center'>
          <Text fontSize={9} color='white' noOfLines={2} >Very Long TiTle category #1</Text>
        </Box>
        <Box w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1}  textAlign='center' alignItems='center' justifyContent='center'>
          <Text fontSize={9} color='white' noOfLines={2} >Very Long TiTle category #1</Text>
        </Box>
        <Box w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1}  textAlign='center' alignItems='center' justifyContent='center'>
          <Text fontSize={9} color='white' noOfLines={2} >Very Long TiTle category #1</Text>
        </Box>
        <Box w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1}  textAlign='center' alignItems='center' justifyContent='center'>
          <Text fontSize={9} color='white' noOfLines={2} >Very Long TiTle category #1</Text>
        </Box>
        <Box w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1}  textAlign='center' alignItems='center' justifyContent='center'>
          <Text fontSize={9} color='white' noOfLines={2} >Very Long TiTle category #1</Text>
        </Box>
        <Box w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1}  textAlign='center' alignItems='center' justifyContent='center'>
          <Text fontSize={9} color='white' noOfLines={2} >Very Long TiTle category #1</Text>
        </Box>
        
          
        {/* squares */}
        <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='1:a' >
          <Text fontSize={14} color='yellow.400'  >$200</Text>
        </Button>
        <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='2:a' >
          <Text fontSize={14} color='yellow.400'  >$200</Text>
        </Button>
        <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='3:a' >
          <Text fontSize={14} color='yellow.400'  >$200</Text>
        </Button>
        <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='4:a' >
          <Text fontSize={14} color='yellow.400'  >$200</Text>
        </Button>
        <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='5:a' >
          <Text fontSize={14} color='yellow.400'  >$200</Text>
        </Button>
        <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='6:a' >
          <Text fontSize={14} color='yellow.400'  >$200</Text>
        </Button>

        <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='1:b' >
          <Text fontSize={14} color='yellow.400'  >$400</Text>
        </Button>
        <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='2:b' >
          <Text fontSize={14} color='yellow.400'  >$400</Text>
        </Button>
        <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='3:b' >
          <Text fontSize={14} color='yellow.400'  >$400</Text>
        </Button>
        <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='4:b' >
          <Text fontSize={14} color='yellow.400'  >$400</Text>
        </Button>
        <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='5:b' >
          <Text fontSize={14} color='yellow.400'  >$400</Text>
        </Button>
        <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='6:b' >
          <Text fontSize={14} color='yellow.400'  >$400</Text>
        </Button>

        <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='1:b' >
          <Text fontSize={14} color='yellow.400'  >$600</Text>
        </Button>
        <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='2:b' >
          <Text fontSize={14} color='yellow.400'  >$600</Text>
        </Button>
        <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='3:b' >
          <Text fontSize={14} color='yellow.400'  >$600</Text>
        </Button>
        <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='4:b' >
          <Text fontSize={14} color='yellow.400'  >$600</Text>
        </Button>
        <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='5:b' >
          <Text fontSize={14} color='yellow.400'  >$600</Text>
        </Button>
        <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='6:b' >
          <Text fontSize={14} color='yellow.400'  >$600</Text>
        </Button>

        <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='1:b' >
          <Text fontSize={14} color='yellow.400'  >$800</Text>
        </Button>
        <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='2:b' >
          <Text fontSize={14} color='yellow.400'  >$800</Text>
        </Button>
        <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='3:b' >
          <Text fontSize={14} color='yellow.400'  >$800</Text>
        </Button>
        <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='4:b' >
          <Text fontSize={14} color='yellow.400'  >$800</Text>
        </Button>
        <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='5:b' >
          <Text fontSize={14} color='yellow.400'  >$800</Text>
        </Button>
        <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='6:b' >
          <Text fontSize={14} color='yellow.400'  >$800</Text>
        </Button>

        <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='1:b' >
          <Text fontSize={14} color='yellow.400'  >$1000</Text>
        </Button>
        <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='2:b' >
          <Text fontSize={14} color='yellow.400'  >$1000</Text>
        </Button>
        <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='3:b' >
          <Text fontSize={14} color='yellow.400'  >$1000</Text>
        </Button>
        <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='4:b' >
          <Text fontSize={14} color='yellow.400'  >$1000</Text>
        </Button>
        <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='5:b' >
          <Text fontSize={14} color='yellow.400'  >$1000</Text>
        </Button>
        <Button w="100%" h="10" bg="blue.500" border='1px solid black' d='flex' p={1} borderRadius={0} value='6:b' >
          <Text fontSize={14} color='yellow.400'  >$1000</Text>
        </Button>
        
      </Grid>
)
