import * as React from "react"
import {
  Box,
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { SettingsIcon } from '@chakra-ui/icons'

import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {Homepage} from './pages/Homepage'
import {Categories} from './pages/Categories'
import {GameBoard} from './pages/GameBoard'
import { ColorModeSwitcher } from "./components/ColorModeSwitcher"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Box p='2' d='flex' alignItems='center' justifyContent='space-between'>
        <ColorModeSwitcher  />
        <SettingsIcon mx='2'/>


      </Box>
      <Switch>
        <Route exact path='/' render={() => <Redirect to='/home'/>} />
        <Route path='/home' component={Homepage} />
        <Route path='/categories' component={Categories} />
        <Route path='/game' component={GameBoard} />
      </Switch>
    </Router>
  </ChakraProvider>
)
