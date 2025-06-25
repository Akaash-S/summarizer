import './App.css'
import LoginPage from './auth/login'
import { Routes, Route } from "react-router-dom";
import SignUpPage from './auth/signup';
import { Toaster } from './components/ui/sonner';
import Dashboard from './components/custom/Dashboard';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>

      <Toaster />

    </>
  )
}

export default App
