import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
// import './App.css'
import MyData from './Components/MyData'
import Person from './Components/Person'
import MyAppClass from './Components/MyAppClass'
import Accounts from './Components/Accounts'
import User from './Components/User'
import Box from './Components/Box'
import Counter from './Components/Counter'
import ResetCounter from './Components/ResetCounter'
import MyClasCompo from './Components/MyClasCompo'
import Menu from '../appRoute/components/Menu'

function App() {
  const location = "Bangalore";

  return (
    <>
      <Box><p>{location}</p>
      </Box>
      <Box>
      <h1> Welcome to My First React App</h1>
      </Box>
      <hr/>
      <MyData />
      <Person pname = "Ajay" job="Software Engineer" />
      <hr/>
      <MyAppClass />
      <Accounts name = "Akahil" actype="sb" balance="1000"/>
      <User />
      {/* <Counter /> */}
      <ResetCounter />
      <hr/>
      <MyClasCompo />
      <hr />
      <Menu /> 
    </>
  )
}

export default App
