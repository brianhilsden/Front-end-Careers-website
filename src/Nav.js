import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom"

function Navbar(){
    const navigate=useNavigate()
    const [loggedIn,setLoggedIn]=useState("")
    function handleLogout() {
        localStorage.clear();
        setLoggedIn(false)
        navigate('/Front-end-Careers-website')
        console.log(loggedIn)
        
      } 

    useEffect(() => {
        
        const loggedinApplicant = localStorage.getItem("applicantId");
        if (loggedinApplicant) {
          setLoggedIn(true)
        }
       
      }, [localStorage.getItem("applicantId")])

    
    return(
    <nav>
        <div className="title">
        <h2>Royalty inc.</h2>
        <button onClick={()=>navigate('/Front-end-Careers-website')}>Home</button>
        </div>
      
        <div className="login--buttons">
        {!loggedIn && <button onClick={()=>navigate('/register')}>Register</button>}
        {!loggedIn && <button onClick={()=>navigate('/login')}> Login</button>}
        {loggedIn && <button onClick={handleLogout}>Logout</button>}
        </div>
        
    </nav>)
}
export default Navbar