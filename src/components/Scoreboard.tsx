import * as React from "react"
import {
  Box,
  Text,
  VStack,
  Avatar,
  Badge
} from "@chakra-ui/react"



export const Scoreboard = () => (
      <VStack mt={4}>

        {/* player1 */}
        <Box p={2} bg='green.300' borderRadius='lg' w='60'>
          {/* nameplate */}
          <Box d='flex' justifyContent='space-between' alignItems='center'>
            <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            <Box d='flex' alignItems='flex-start' justifyContent='center' flexDirection='column'>
              <Text fontSize={20} fontWeight='semibold'>
                Player 1
              </Text>
              <Badge >It's Your Turn</Badge>
            </Box>
          </Box>

          {/* cash score */}
          <Box mt={2}>
            <Text fontSize={26} fontFamily='cursive'>
              $17,620
            </Text>
          </Box>
        </Box>

        {/* player2 */}
        <Box p={2} bg='gray.400' borderRadius='lg' w='60'>
          {/* nameplate */}
          <Box d='flex' flexDirection='row-reverse' justifyContent='space-between' alignItems='center'>
            <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
            <Box d='flex' alignItems='flex-start' justifyContent='center' flexDirection='column'>
            <Text fontSize={20} fontWeight='semibold'>
                Player 2
              </Text>
              
            </Box>
          </Box>
          {/* cash score */}
          <Box mt={2}>
            <Text fontSize={20} fontFamily='cursive'>
              $10,450
            </Text>
          </Box>
        </Box>

        
        
      </VStack>
)
