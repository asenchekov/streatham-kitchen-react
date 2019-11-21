import React from 'react'
import BoardHOC from '../containers/wrappers/BoardHOC'
import { checkIfOpen } from './helpers';


export default BoardHOC((props) => {
  const button = (
    <h1
      className="book-link"
      onClick={props.onClickHandler}>
        {props.loggedIn ? `>book now` : `>login to book`}
    </h1>
  )

  const greeting = `Hi, ${props.loggedIn && props.firstName ? props.firstName : 'there'}`

  return (
    <div>
      <h1 className="head animation_h1">{greeting}</h1>
      <h1 className="head animation_h2">{checkIfOpen()}</h1>
      <br/>
      {button}
    </div>
  )
})
