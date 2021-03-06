import React from "react";
import { Link ,useLocation} from "react-router-dom";
export default function Navbar() {
  let location = useLocation();
  function handleLogout(){
    localStorage.removeItem("token");
  }
  return (
    <>
    
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Cloud Notes
          </Link>
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
                <Link
                  className={`nav-link ${location.pathname==="/"?"active":""}`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">
                  About
                </Link>
              </li>
            </ul>

          </div>
         {!localStorage.getItem("token")? <form class="d-flex">
          <Link class="btn btn-primary mx-2" to="/login" role="button">Login</Link>
          <Link class="btn btn-primary" to="/signup" role="button">Signup</Link>
      </form>
      :
      <Link class="btn btn-danger mx-2" to="/login" onClick={handleLogout} role="button">Logout</Link>}


        </div>
      </nav>
    </>
  );
}
