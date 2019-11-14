import React, { Component } from 'react'

export default class Header extends Component {
  checkIfOpen () {
    // $('img').addClass('animation_logo');
    let time = new Date();
    return time.getHours() > 10 && time.getHours() < 23 ? "we're open!" : "we're closed";
  }

  render() {
    return (
      <div className="main container z-depth-5">
        <div className="z-depth-5 head">
          <div>
            <h1 className="animation_h1">Wellcome</h1>
            <h2 className="animation_h2">{this.checkIfOpen()}</h2>
          </div>
        </div>
      </div>
    )
  }
}
