import './App.css'
import LoginPage from './auth/login'
import { Routes, Route } from "react-router-dom";
import SignUpPage from './auth/signup';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
      </Routes>

      <Toaster />

    </>
  )
}

export default App
