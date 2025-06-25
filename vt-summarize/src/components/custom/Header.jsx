import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../../configs/FirebaseConfig';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showLogout, setShowLogout] = useState(false);

  const onReload = () => {
    window.location.reload();
  }

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/')
    setShowLogout(false);

  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    })
    return () => unsubscribe()
  }, [user])

  const toggleLogout = () => {
    setShowLogout((prev) => !prev);
  };


  return (
    <div className='p-3 shadow-lg flex justify-between items-center'>
      <div className='flex justify-start items-center'>
        <a onClick={() => onReload()} className='cursor-pointer'>
          <img src="/logo.svg" alt="Header Logo" />
        </a>
      </div>
      <div className='flex justify-evenly items-center gap-5'>
        <Button onClick={()=>navigate('/dashboard')}>Home</Button>
        <Button onClick={()=>navigate('/dashboard/downloads')}>Downloads</Button>
        <Button onClick={()=>navigate('/dashboard/summariser')}>Summariser</Button>

        {user && (
          <div
            className="relative"
          >
            <img
              src={user.photoURL}
              alt="User Avatar"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300"
              onClick={toggleLogout}
            />
            {showLogout && (
              <Button
                variant="destructive"
                className="absolute top-12 right-0"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Header