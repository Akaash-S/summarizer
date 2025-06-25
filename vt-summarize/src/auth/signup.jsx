import React from 'react'
import { Mic } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../configs/FirebaseConfig'
import { toast } from 'sonner'

function SignUpPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/')
  }

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      toast.success('Login Successfully')
      navigate('/dashboard');
    } catch (error) {
      toast.error('Google Sign-in error');
    }
  };

  const handleSignup = () => {

  }

  return (
    <div className='w-full h-screen flex items-start'>
      <div className='relative w-1/2 h-full flex flex-col'>
        <div className='absolute top-[42%] left-[10%] flex flex-col text-center'>
          <h1 className='text-4xl font-bold my-4'>From Voice to Insight – In Seconds.</h1>
          <p className='text-base font-normal'>Real-time voice input converted into brief, readable summaries</p>
        </div>

        <img src="/signup.jpg" className='w-full h-full object-cover' />
      </div>

      <div className='w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between items-center'>
        <h1 className='w-full max-w-[500px] text-xl mx-auto flex items-center gap-1.5 text-black font-semibold'>
          <Mic />
          Voice Digest
        </h1>

        <div className='w-full flex flex-col max-w-[500px]'>
          <div className='w-full flex flex-col mb-2'>
            <h3 className='text-2xl font-semibold mt-2'>Create your VT-Summarize account</h3>
            <p className='text-sm mb-2 text-gray-500'>Join now to summarize instantly</p>
          </div>

          <div className='w-full flex flex-col'>
            {/* Input for Full Name */}
            <input type="text"
              placeholder='Full Name'
              required
              className='w-full border-b py-4 my-2 bg-transparent border-black outline-none focus:outline-none placeholder:text-gray-500'
            />
            {/* Input for Email Address */}
            <input type="email"
              placeholder='Email Address'
              required
              className='w-full border-b py-4 my-2 bg-transparent border-black outline-none focus:outline-none placeholder:text-gray-500'
            />
            {/* Input for Password */}
            <input type="password"
              placeholder='Password'
              required
              className='w-full border-b py-4 my-2 bg-transparent border-black outline-none focus:outline-none placeholder:text-gray-500'
            />
          </div>

          <div className='w-full flex items-center justify-between'>
            <div className='w-full flex items-center'>
              <input type="checkbox" className='w-4 h-4 mr-2' />
              <p className='text-sm'>I agree to terms & policy</p>
            </div>
          </div>

          <div className='w-full flex flex-col my-4'>
            <button className='w-full my-3 font-semibold text-white bg-black rounded-md p-2.5 text-center flex items-center justify-center'
              onClick={() => handleSignup()}
            >
              Register to Voice Digest
            </button>
            <button className='w-full bg-transparent font-semibold border border-black rounded-md p-2.5 text-center flex items-center justify-center'
              onClick={() => handleClick()}
            >
              Login to Voice Digest
            </button>
          </div>

          <div className='w-full flex items-center justify-center relative'>
            <div className='w-full h-[1px] bg-black' />
            <p className='text-sm font-semibold absolute text-black bg-[#f5f5f5]'>or</p>
          </div>

          <button className='w-full my-5 bg-transparent font-semibold border border-black rounded-md p-2.5 text-center flex items-center justify-center' onClick={() => handleGoogleLogin()}>
            <img src="/google.png" className='h-5 mr-2' />
            Sign up with Google
          </button>
        </div>

        <div className='w-full flex items-center justify-center'>
          <p className='text-sm font-normal'>Already have an account? <span onClick={() => handleClick()} className='font-semibold underline underline-offset-2 cursor-pointer'>Login Here</span></p>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
