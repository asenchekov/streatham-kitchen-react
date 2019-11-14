import React, { Component } from 'react'

export default (WrappedComponent) => {
  return class BoardHOC extends Component {
    render() {
      return (
        <div className="main container z-depth-5">
          <div className="z-depth-5 head">
            <WrappedComponent {...this.props} />
          </div>
        </div>
      )
    }
  }
}
