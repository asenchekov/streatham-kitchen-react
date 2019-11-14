import React, { Component } from 'react'

export default class Navigation extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper z-depth-5">
          <a href="#" className="brand-logo right">
            <img className="z-depth-4 animation_logo" src="http://localhost:3000/images/image3.jpeg" width="150px" height="150px" alt="LOGO" />
          </a>
          <ul id="nav-mobile" className="left" >
            <li><a href="#">ABOUT US</a></li>
            <li><a href="#">OUR MENU</a></li>
            <li><a href="#">ORDER NOW!</a></li>
          </ul>
        </div>
      </nav>
    )
  }
}
