import { useState} from "react"
import { useNavigate} from "react-router-dom"
function Register(){
    const navigate=useNavigate()
    const [register, setRegister] = useState({ email: "", passwordApp: "",passwordConfirm:"" })
    const [success, setSuccess] = useState(false) //sets state to display message once one logs in or registers
      //This function handles the changes made in Account Registration form inputs and saves them to state
    function handleRegister(event) {
        const { name, value } = event.target;
        setRegister(item => ({ ...item, [name]: value }))

    }

      //Handles the Register Account button, it sends the data to the backend for validation and storage
  
    const handleRegisterSubmit = async () => {
      if(register.passwordApp===register.passwordConfirm){
        try {
          const response = await fetch('https://administrator-careers-website.onrender.com/applicantregister',
          /* const response = await fetch('http://127.0.0.1:5000/applicantregister', */
          
          {
            method: "POST",
            headers: {
              'Content-type': 'application/json'
            },
            withCredentials: true,
            body: JSON.stringify(register)
          })
    
          const resultinJson = await response.json()
          console.log(resultinJson)
          if (resultinJson.error === "409") {
            alert("Username taken")
          }
          else {
            setSuccess(true)
            localStorage.setItem('applicantId', resultinJson.id)
            navigate('/Front-end-Careers-website')
          }
        
    
        }
    
        catch (err) {
    
          alert("Server error")
    
    
        }}
        else{
          alert("Passwords do not match")
        }
    
      }
    
    return(
        <div className="form">
          <h2>Account Registration</h2>
        <label>
         
          <input type='email' name='email' value={register.email} placeholder='Email or username' onChange={handleRegister} />
        </label>

        <label>
        
          <input type='password' name='passwordApp' value={register.passwordApp} placeholder='Password' onChange={handleRegister} />
        </label>
        <label>
          
          <input type='password' name='passwordConfirm' value={register.passwordConfirm} placeholder='Confirm Password' onChange={handleRegister} />
        </label>

        <div>
          <button onClick={handleRegisterSubmit}>Register Account</button>
          {success && "Registration successful"}
        </div>

      </div>

    )
}
export default Register