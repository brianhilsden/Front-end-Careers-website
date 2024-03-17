import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Apply() {
  const location = useLocation();
  const navigate = useNavigate();
  const [application, setApplication] = useState({
    applicantId: "",
    jobId: location.state.jobId,
    name: "",
    email: "",
    github: "",
  });

  const [applied, setApplied] = useState(false); //sets state to display message once one applies
  const job = location.state.job;
  const selected = job.filter((item) => item.id === application.jobId);

  function backtoJobs() {
    setApplied(false);
    navigate("/Front-end-Careers-website");
  }

  useEffect(() => {
    const loggedinApplicant = localStorage.getItem("applicantId");
    if (loggedinApplicant) {
      const foundApplicant = JSON.parse(loggedinApplicant);
      setApplication((item) => ({ ...item, applicantId: foundApplicant }));
    }
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setApplication((item) => ({ ...item, [name]: value }));
  }

  const handleSubmit = async () => {
    if (application.email && application.github && application.name) {
      setApplied(!applied);
      await fetch(
        "https://administrator-careers-website.onrender.com/applications",
        /* await fetch('http://127.0.0.1:5000/applications', */

        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(application),
        }
      );
    } else {
      alert("Kindly fill all the fields before submitting application");
    }
  };

  return (
    
      <div className="container-fluid">
        <div className="jobDetails">
          <h2>Title: {selected && selected[0].Job}</h2>
          <h3>Location: {selected && selected[0].Location}</h3>
        </div>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            value={application.name}
            placeholder="John Doe"
            onChange={handleChange}
            autoFocus
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            value={application.email}
            placeholder="johndoe@xyz.com"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Github:</label>
          <input
            type="url"
            name="github"
            value={application.github}
            placeholder="https://github.com/johndoe"
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div>
          <button onClick={backtoJobs} className="btn btn-secondary">Back to jobs</button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={handleSubmit} className="btn btn-primary">Apply</button>
        </div>

        {applied && (
          <p>
            Successfully applied for the job! You'll be hearing from us via
            email soon. Check out more opportunities available for you.
          </p>
        )}
      </div>
  
  );
}
export default Apply;
