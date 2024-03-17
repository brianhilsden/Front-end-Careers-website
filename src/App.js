import { useState, useEffect } from "react";
import './App.css';
import Jobs from "./Jobs";
import { useNavigate } from "react-router-dom";


//Main function of the application

function App() {
  //set some states useful in the application
  const [job, setJob] = useState([])  //stores all the jobs data received from backend  
  
  const navigate=useNavigate()

  //This function handles change of inputs in the form


  //This function handles the button that shows more details about a specific job
  function handleJobDetails(id) {
    setJob(jobs => jobs.map(item => (id === item.id ? { ...item, details: !item.details } : item)))
  }

  //This function handles the button that takes shows you the application form
  function handleApplyDetails(id) {

    if (localStorage.getItem("applicantId")){
      navigate('/apply',{state:{jobId:id,job:job}})

    }
    else{
      navigate('/login',{state:{jobId:id,job:job}})
    }
   
    

  }

  //This useEffect fetches all job data from the backend
  useEffect(() => {
    fetch("https://administrator-careers-website.onrender.com/data")
 /*    fetch("http://127.0.0.1:5000/data") */
      .then(res =>
        res.json()
      )
      .then(data => {
        setJob(data.map(item => ({ ...item, details: false })))
      })
console.log(job)

  }, [])



  //maps through the job data fetched from back-end and passes it down as props to the Jobs file
  const jobList = job.map(item =>
    <Jobs key={item.id} item={item} handleJobDetails={handleJobDetails} handleApplyDetails={handleApplyDetails} />
  )

  //displays the working app on the screen
  return (

    <div className="app">
    
      <div className="available_jobs">
        {job[0] && jobList}
      </div>
    </div>

  )

}
export default App;