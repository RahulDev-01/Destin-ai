import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import Hero from './components/custom/Hero'

function App() {
  const [count, setCount] = useState(0)

 return(
  <>
 <Hero />
  </>
 )
}
// https://github.com/oykuky/Full-Stack-AI-Trip-Planner?tab=readme-ov-file#key-environment-variables
export default App
