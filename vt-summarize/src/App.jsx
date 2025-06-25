import './App.css'
import LoginPage from './auth/login'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
      </Routes>

    </>
  )
}

export default App
