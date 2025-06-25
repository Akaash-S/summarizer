import './App.css'
import LoginPage from './auth/login'
import { Routes, Route } from "react-router-dom";
import SignUpPage from './auth/signup';
import { Toaster } from './components/ui/sonner';
import Dashboard from './components/custom/Dashboard';
import Downloads from './components/custom/Downloads';
import Summariser from './components/custom/Summariser';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard/downloads' element={<Downloads />} />
        <Route path='/dashboard/summariser' element={<Summariser />} />
      </Routes>

      <Toaster />

    </>
  )
}

export default App
