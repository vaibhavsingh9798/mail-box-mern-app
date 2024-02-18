import { useState } from "react";

const Signup = () =>{
const [user,setUser] = useState({email:'',password:'',confirmPassword:''})
const [error,setError] = useState('')

const handleChange = (e) =>{
    setError('')
    setUser({...user,[e.target.name]:e.target.value})
}

    const handleSubmit = (e) =>{
        e.preventDefault();
        if( (user.email && user.password && user.confirmPassword) && (user.password.replace(/\s/g, "").length >= 6) && (user.password === user.confirmPassword)){
            // api call
            console.log('user',user)
        }
        else{
            setError('Invalid Details')
        }
    }

    return(
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-red-500 to-pink-500 ">
      <form className="bg-zinc-50 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-96" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">SingUp</h2>
      
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email 
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            name="email"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            name="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
            
          />
        </div>
         <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={user.confirmPassword}
            onChange={handleChange}
            required
          />
        </div> 
        
        <div className="flex flex-col items-center justify-center">
          <button
            className="bg-gradient-to-r from-red-500 to-pink-500  hover:font-extrabold text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
             Sing up
          </button>
        </div>
        <div className='mt-4'>
        
        <p  className='text-slate-400'>Have an account? <button className="text-blue-500" >Log in </button></p>  
        {error && <p className='text-red-500 mt-2'>{error}</p>} 
        </div>
      </form>
    </div>
    )
}

export default Signup;