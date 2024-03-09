import { useState, useEffect } from "react";
import './App.css'
import Jobs from "./Jobs";

//Main function of the application

function App() {
  //set some states useful in the application
  const [job, setJob] = useState([])  //stores all the jobs data received from backend
  const [application, setApplication] = useState({ applicantId: "", jobId: "", name: "", email: "", github: "" })
  const [switchPage, setSwitchPage] = useState(false)
  const [applied, setApplied] = useState(false) //sets state to display message once one applies
  const [register, setRegister] = useState({ email: "", passwordApp: "" })
  const [login, setLogin] = useState({ email: "", passwordLogin: "" })
  const [success, setSuccess] = useState(false) //sets state to display message once one logs in or registers

  //This function handles change of inputs in the application form
  function handleChange(event) {
    const { name, value } = event.target;
    setApplication(item => ({ ...item, [name]: value }))

  }

  //This function handles the button that shows more details about a specific job
  function handleJobDetails(id) {
    setJob(jobs => jobs.map(item => (id === item.id ? { ...item, details: !item.details } : item)))
  }

  //This function handles the button that takes shows you the application form
  function handleApplyDetails(id) {
    setSwitchPage(true)
    setSuccess(false)
    setApplication(item => ({ ...item, jobId: id }))

  }

  //This function handles the changes made in Account Registration form inputs and saves them to state
  function handleRegister(event) {
    const { name, value } = event.target;
    setRegister(item => ({ ...item, [name]: value }))

  }
  //This function handles the changes made in Login User form inputs and saves then to state
  function handleLogin(event) {
    const { name, value } = event.target;
    setLogin(item => ({ ...item, [name]: value }))
  }

  //Filters through the jobs list and saves the job whose id matches the one being applied for
  const selected = job.filter((item) => item.id === application.jobId);

  //Function that closes the application form
  function closeApplication() {
    setApplied(false)
    setSwitchPage(false)
  }

  //This useEffect fetches all job data from the backend
  useEffect(() => {
    fetch("https://administrator-careers-website.onrender.com/data")
      .then(res =>
        res.json()
      )
      .then(data => {
        setJob(data.map(item => ({ ...item, details: false })))
      })


  }, [])

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
        setApplication(item => ({ ...item, applicantId: resultinJson.id }))
        localStorage.setItem('applicantId', resultinJson.id)
      }
      console.log(resultinJson)

    }

    catch (err) {

      alert("Server error")


    }

  }

   //Handles the login button. Sends data to backend for validation and then logs in user 
  const handleLoginSubmit = async () => {
    try {
      const response = await fetch('https://administrator-careers-website.onrender.com/applicantlogin', {
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
        setApplication(item => ({ ...item, applicantId: resultinJson.id }))
        localStorage.setItem('applicantId', resultinJson.id)
      }
      console.log(resultinJson)

    }

    catch (err) {

      alert("Server error")


    }

  }
 

  //Stores applicantId in localStorage so as to keep user logged in until they logout
  useEffect(() => {
    const loggedinApplicant = localStorage.getItem("applicantId");
    if (loggedinApplicant) {
      const foundApplicant = JSON.parse(loggedinApplicant)
      setApplication(item => ({ ...item, applicantId: foundApplicant }))

    }
  }, [])

  //This button logs out user by clearing their local storage data
  function handleLogout() {
    setApplication(item => ({ ...item, applicantId: "" }))
    localStorage.clear();
  }

  //This button sends the filled in application form to the back-end
  const handleSubmit = async () => {
    if (application.email && application.github && application.name) {
      setApplied(!applied)
      const result = await fetch('https://administrator-careers-website.onrender.com/applications', {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(application)
      })
      const resultinJson = await result.json()
      console.log(resultinJson)
    }
    else {
      alert("Kindly fill all the fields before submitting application")
    }
  }

  //maps through the job data fetched from back-end and passes it down as props to the Jobs file
  const jobList = job.map(item =>
    <Jobs key={item.id} item={item} handleJobDetails={handleJobDetails} handleApplyDetails={handleApplyDetails} />
  )

  //displays the working app on the screen
  return (

    <div className="app">
      <div className="form">
        <label>
          Email:&nbsp;
          <input type='email' name='email' value={login.email} placeholder='johndoe@xyz.com' onChange={handleLogin} />
        </label>
        <label>
          Password:&nbsp;
          <input type='password' name='passwordLogin' value={login.passwordLogin} placeholder='https://github.com/johndoe' onChange={handleLogin} />
        </label>
        <div>
          <button onClick={handleLoginSubmit}>Login</button>
          {success && "Log in successful"}


        </div>

      </div>

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

      <button onClick={handleLogout}>Logout</button>

      {switchPage && <div className='application'>
        <div className="jobDetails" >
          <h2>Title: {selected && selected[0].Job}</h2>
          <h3>Job location: {selected && selected[0].Location}</h3>
        </div>

        <div className="form">
          <label >
            Name:&nbsp;
            <input id="name" type='text' name='name' value={application.name} placeholder='John Doe' onChange={handleChange} autoFocus />
          </label>

          <label>
            Email:&nbsp;
            <input type='email' name='email' value={application.email} placeholder='johndoe@xyz.com' onChange={handleChange} />
          </label>

          <label>
            Github:&nbsp;
            <input type='url' name='github' value={application.github} placeholder='https://github.com/johndoe' onChange={handleChange} />
          </label>

          <div>
            <button onClick={closeApplication}>Back to jobs</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={handleSubmit}>Apply</button>
          </div>

          {applied && <p>Successfully applied for the job! You'll be hearing from us via email soon. Check out more opportunities available for you.</p>}
        </div>
      </div>}


      {!switchPage && <div className="available_jobs">
        {job[0] && jobList}
      </div>}
    </div>

  )

}
export default App;