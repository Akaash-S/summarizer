import { useState, useEffect } from 'react'
//import LoginPage from './login/page'
import './App.css'

function App() {
  const [position, setPosition] = useState(0)
  const [isJumping, setIsJumping] = useState(false)
  const jumpHeight = 150
  const jumpDuration = 500

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' && !isJumping) {
        setIsJumping(true)
        setPosition(jumpHeight)
        
        setTimeout(() => {
          setPosition(0)
          setIsJumping(false)
        }, jumpDuration)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isJumping])

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-100">
      <div 
        className="w-20 h-20 bg-green-500 rounded-full transition-all duration-500"
        style={{
          transform: `translateY(-${position}px)`
        }}
      />
      <h1>Hello</h1>
    </div>
  )
}

export default App
