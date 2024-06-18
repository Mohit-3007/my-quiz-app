import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [error, setError] = useState(null)


    function handleEmail(e){
        setEmail(e.target.value);
    }

    function handleLoginUser(e){
        e.preventDefault();
        console.log("Enter user");
    }


  return (
    <form onSubmit={handleLoginUser} className="w-full px-16 text-center h-full flex flex-col gap-5 py-8 justify-center">

        <div className="py-1 text-2xl font-bold tracking-wider">Ready for Quiz !!</div>

        <div>
            <label className="text-left block pb-2 text-xl font-semibold " htmlFor="email" >Email</label>
            <input type="email" placeholder="Enter your email" id="email"
                className="px-3 py-2 placeholder:text-lg rounded-md text-lg outline-none w-full bg-gray-100 " 
                value={email}  
                onChange={handleEmail} required />
            {error && <span className="block text-start text-red-600 font-medium tracking-wide">{error}</span> }      
        </div>

    
        <input type="submit" value={"Submit"}
            className="px-3 py-2 placeholder:text-lg rounded-md outline-none block bg-slate-600
            text-gray-300 text-2xl font-bold tracking-wider hover:scale-105 duration-300 
            hover:shadow-2xl hover:shadow-slate-600 hover:tracking-widest transition-all" />

  </form>
  )
}


export default UserLogin;