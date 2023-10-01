import React, { useState } from "react";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Person2Icon from "@mui/icons-material/Person2";
import { useSelector, useDispatch } from 'react-redux';
import { setMode,setLogout } from "../../state";
import { useNavigate } from "react-router-dom";



const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(true);

const dispatch=useDispatch();
const navigate=useNavigate();
// const user=useSelector((state)=>state.auth.user);
// const fullName=`${user.firstName} ${user.lastName}`;


  const logout = () => {
dispatch(setLogout());
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" onClick={()=>navigate("/home")}>
          TwitSphere
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
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </li>
          </ul>
          <div className="d-flex">
            <div className="icon my-2">    <NotificationsActiveIcon /></div>
        

            <div className="dropdown mx-2">
              <button
                className="btn btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
               <Person2Icon/>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Log Out
                  </a>
                </li>
              
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
