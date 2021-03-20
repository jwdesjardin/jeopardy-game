import { Box, Button, Container, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'

export const ContainerVariants = {
  initial: { opacity: 0, x: 200 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -200 },
}

export const MenuVariants = {
  initial: { opacity: 0, y: 200 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 200 },
}

export const ResponseVariants = {
  initial: { opacity: 0, x: 400 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -400 },
}

export const MotionContainer = motion(Container)
export const MotionBox = motion(Box)
export const MotionButton = motion(Button)
export const MotionText = motion(Text)
