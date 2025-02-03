import React from "react";
import './../App.css'
import { Link, Outlet } from "react-router-dom";
const Header: React.FC = () => {
    return (
      <>
         <div className="header-content">
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>     <li>
            <Link to="/bars">Bars</Link>
          </li>
          <li>
            <Link to="/bar-form">Add a bar</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/profil">Profil</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="*">Nothing Here</Link>
          </li>
        </ul>
      </nav>
      <hr />
      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
      </>
    );
  };


  export default Header;