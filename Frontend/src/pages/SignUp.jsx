import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/signup',{
        ...formData
      })
      if(res.success===false){
        setError(res.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
        setLoading(false);
        setError(error.message);
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="text" placeholder='username' className='focus:outline-none border p-3 rounded-lg' id='username' onChange={handleChange}></input>
        <input type="email" placeholder='email' className='focus:outline-none border p-3 rounded-lg' id='email' onChange={handleChange}></input>
        <input type="password" placeholder='password' className='focus:outline-none border p-3 rounded-lg' id='password' onChange={handleChange}></input>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:75'> {loading?`Loading...`:`Sign up`} </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account ?</p><Link to={'/sign-in'}><span className='text-blue-700'>Sign in</span></Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
    
  )
}

export default SignUp