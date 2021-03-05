import * as React from "react"
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

// ui
import {
  Box,
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { SettingsIcon } from '@chakra-ui/icons'
import { ColorModeSwitcher } from "./components/ColorModeSwitcher"

// pages
import {HomePage} from './pages/HomePage'
import {CategoriesPage} from './pages/CategoriesPage'
import {GamePage} from './pages/GamePage'
import {GameSummaryPage} from './pages/GameSummaryPage'



export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Box p='2' d='flex' alignItems='center' justifyContent='space-between'>
        <ColorModeSwitcher  />
        <SettingsIcon mx='2'/>


      </Box>
      <Switch>
        <Route exact path='/' render={() => <Redirect to='/home'/>} />
        <Route path='/home' component={HomePage} />
        <Route path='/categories' component={CategoriesPage} />
        <Route path='/game' component={GamePage} />
        <Route path='/game-summary' component={GameSummaryPage} />
      </Switch>
    </Router>
  </ChakraProvider>
)
