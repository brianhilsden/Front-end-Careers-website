import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState("");
  function handleLogout() {
    localStorage.clear();
    setLoggedIn(false);
    navigate("/Front-end-Careers-website");
    console.log(loggedIn);
  }

  useEffect(() => {
    const loggedinApplicant = localStorage.getItem("applicantId");
    if (loggedinApplicant) {
      setLoggedIn(true);
    }
  }, [localStorage.getItem("applicantId")]);

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Royalty inc.
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button
                className="nav-link active"
                aria-current="page"
                onClick={() => navigate("/Front-end-Careers-website")}
              >
                Home
              </button>
            </li>
            <li className="nav-item">
              {!loggedIn && (
                <button
                  className="nav-link"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              )}
            </li>
            <li className="nav-item">
              {!loggedIn && (
                <button className="nav-link" onClick={() => navigate("/login")}>
                  {" "}
                  Login
                </button>
              )}
            </li>
            <li className="nav-item">
              {loggedIn && (
                <button className="nav-link" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </li>
          </ul>
          
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
