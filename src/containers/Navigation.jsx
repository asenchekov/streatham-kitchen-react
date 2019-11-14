import React, { Component } from 'react'
import {
  Link
} from "react-router-dom"

export default class Navigation extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper z-depth-5">
          <Link to="/" className="brand-logo right">
            <img className="z-depth-4 animation_logo" src="http://localhost:3000/images/image3.jpeg" width="150px" height="150px" alt="LOGO" />
          </Link>
          <ul id="nav-mobile" className="left" >
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/about">ABOUT US</Link></li>
            <li><Link to="/menu">OUR MENU</Link></li>
            <li><Link to="/order">ORDER NOW!</Link></li>
            <li><Link to="/book">BOOK NOW!</Link></li>
          </ul>
        </div>
      </nav>
    )
  }
}
