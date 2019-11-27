import React from 'react'
import { Link } from "react-router-dom"

export default (props) => {
  const bookings = props.loggedIn
    ? <li><Link to="/bookings">MY BOOKINGS</Link></li>
    : null

  const logout = props.loggedIn
    ? <li><Link to="/" onClick={props.logout}>LOG OUT</Link></li>
    : null

  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper z-depth-5">
          <Link to="/" className="brand-logo right">
            <img
              className="z-depth-4 animation_logo"
              src="image3.jpeg"
              width="150px"
              height="150px"
              alt="LOGO"
            />
          </Link>
          <ul id="nav-mobile" className="left">
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/about">ABOUT US</Link></li>
            <li><Link to="/order">ORDER NOW!</Link></li>
            {bookings}
            {logout}
          </ul>
        </div>
      </nav>
    </div>
  )
}
