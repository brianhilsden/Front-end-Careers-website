import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
function Login() {
  /*   useEffect(() => {
        const loggedinApplicant = localStorage.getItem("applicantId");
        if (loggedinApplicant) {
          const foundApplicant = JSON.parse(loggedinApplicant)
          console.log(foundApplicant)
          
        }
      }, []) */
  const location = useLocation()
  const navigate = useNavigate()
  const [login, setLogin] = useState({ email: "", passwordLogin: "" })
  const [success, setSuccess] = useState(false) //sets state to display message once one logs in or registers
  function handleLogin(event) {
    const { name, value } = event.target;
    setLogin(item => ({ ...item, [name]: value }))
  }

  const handleLoginSubmit = async () => {
    try {
      const response = await fetch('https://administrator-careers-website.onrender.com/applicantlogin',
      /* const response = await fetch('http://127.0.0.1:5000/applicantlogin', */
      
      {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        withCredentials: true,
        body: JSON.stringify(login)
      })

      const resultinJson = await response.json()
      if (resultinJson.error === "401") {
        alert("Invalid username or password")
      }
      else {
        setSuccess(true)
        localStorage.setItem('applicantId', resultinJson.id)
        if (location.state) {
          navigate('/apply', { state: { jobId: location.state.jobId, job: location.state.job } })
        }
        else {
          navigate('/Front-end-Careers-website')
        }

      }


    }

    catch (err) {

      alert("Server error")


    }

  }

  return (
    <div>
      <div className="form">
        <h2>Log in to your account</h2>
        <label>
          
          <input type='email' name='email' value={login.email} placeholder='Email or username' onChange={handleLogin} />
        </label>
        <label>
        
          <input type='password' name='passwordLogin' value={login.passwordLogin} placeholder='Password' onChange={handleLogin} />
        </label>
        <div>
          <button onClick={handleLoginSubmit}>Login</button>
          {success && "Log in successful"}


        </div>

      </div>
    </div>
  )
}
export default Login