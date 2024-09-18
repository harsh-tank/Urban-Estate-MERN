import React, {useState} from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function SignIn() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) =>{
    setFormData({
      ...formData,
     [e.target.id]: e.target.value,
    })
  }
  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('/api/auth/signin',{
        ...formData
      })
      console.log(res);
      if(res.success===false){
        setLoading(false);
        setError(res.message);
        return
      }
      setLoading(false);
      setError(null);
      localStorage.setItem('token',res.data.token);
      navigate('/');

    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type='text' placeholder='email' id='email' className='focus:outline-none border p-3 rounded-lg' onChange={handleChange}></input>
        <input type='password' placeholder='password' id='password' className='focus:outline-none border p-3 rounded-lg' onChange={handleChange}></input>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:75'> {loading?`Loading...`:`Sign In`} </button>
      </form>
      <div className='mt-3'><p>New User ? <span className='text-sky-600'><Link to={'/sign-up'}>Sign Up</Link></span> </p></div>
      
    </div>
  )
}

export default SignIn