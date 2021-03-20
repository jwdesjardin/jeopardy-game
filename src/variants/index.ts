import { Button, Container } from '@chakra-ui/react'
import { motion } from 'framer-motion'

export const ContainerVariants = {
  initial: { opacity: 0, x: 200 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -200 },
}

export const MotionContainer = motion(Container)
export const MotionButton = motion(Button)
