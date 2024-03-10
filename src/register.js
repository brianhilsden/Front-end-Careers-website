import { useState} from "react"
import { useNavigate} from "react-router-dom"
function Register(){
    const navigate=useNavigate()
    const [register, setRegister] = useState({ email: "", passwordApp: "" })
    const [success, setSuccess] = useState(false) //sets state to display message once one logs in or registers
      //This function handles the changes made in Account Registration form inputs and saves them to state
    function handleRegister(event) {
        const { name, value } = event.target;
        setRegister(item => ({ ...item, [name]: value }))

    }

      //Handles the Register Account button, it sends the data to the backend for validation and storage
  
    const handleRegisterSubmit = async () => {
        try {
          const response = await fetch('https://administrator-careers-website.onrender.com/applicantregister', {
            method: "POST",
            headers: {
              'Content-type': 'application/json'
            },
            withCredentials: true,
            body: JSON.stringify(register)
          })
    
          const resultinJson = await response.json()
          if (resultinJson.error === "409") {
            alert("Username taken")
          }
          else {
            setSuccess(true)
            localStorage.setItem('applicantId', resultinJson.id)
            navigate('/')
          }
        
    
        }
    
        catch (err) {
    
          alert("Server error")
    
    
        }
    
      }
    
    return(
        <div className="form">
        <label>
          Email:&nbsp;
          <input type='email' name='email' value={register.email} placeholder='johndoe@xyz.com' onChange={handleRegister} />
        </label>

        <label>
          Password:&nbsp;
          <input type='password' name='passwordApp' value={register.passwordApp} placeholder='https://github.com/johndoe' onChange={handleRegister} />
        </label>

        <div>
          <button onClick={handleRegisterSubmit}>Register Account</button>
          {success && "Registration successful"}
        </div>

      </div>

    )
}
export default Register