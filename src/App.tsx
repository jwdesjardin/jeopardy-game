import * as React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from 'react-router-dom'

// ui
import { Box, ChakraProvider, theme } from '@chakra-ui/react'
import { ColorModeSwitcher } from './components/ColorModeSwitcher'

// pages
import { HomePage } from './pages/HomePage'
import { CategoriesPage } from './pages/CategoriesPage'
import { GamePage } from './pages/GamePage'
import { GameSummaryPage } from './pages/GameSummaryPage'
import { AnimatePresence } from 'framer-motion'

export const AppContent = () => {
  let location = useLocation()

  return (
    <Box>
      <Box p='2' d='flex' alignItems='center' justifyContent='space-between'>
        <ColorModeSwitcher />
      </Box>
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route exact path='/' render={() => <Redirect to='/home' />} />
          <Route path='/home' component={HomePage} />
          <Route path='/categories' component={CategoriesPage} />
          <Route path='/game' component={GamePage} />
          <Route path='/game-summary' component={GameSummaryPage} />
        </Switch>
      </AnimatePresence>
    </Box>
  )
}

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <AppContent></AppContent>
      </Router>
    </ChakraProvider>
  )
}
