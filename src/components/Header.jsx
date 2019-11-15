import React from 'react'
import moment from 'moment'
import { Link } from "react-router-dom"
import BoardHOC from '../containers/wrappers/BoardHOC'

const checkIfOpen = () => {
  const times = [
    // Sunday
    ['12:45','20:30'],
    // Monday
    ['',''],
    // Tuesday
    ['16:00','22:00'],
    // Wednesday
    ['16:00','22:00'],
    // Thursday
    ['12:30','22:00'],
    // Friday
    ['12:00','22:30'],
    // Satuday
    ['12:45','20:30'],
  ]

  const date = moment();
  const day = date.day()

  if (!times[day][0]) {
    return "unfortunately we're off today!"
  }

  const [
    open,
    close
  ] = [
    moment(date.format('YYYY-MM-DD ') + times[day][0]),
    moment(date.format('YYYY-MM-DD ') + times[day][1])
  ]

  return date >= open && date < close
    ? "we're open!"
    : "unfortunately we're closed!"
}

export default BoardHOC((props) => {
  const button = props.loggedIn
    ? (<Link to="/bookings">
        <h2 className="head animation_h2">
          book now =>
        </h2>
      </Link>)
    : (<h1
        className="book_link"
        onClick={props.onClickHandler}>
          login to book =>
      </h1>)

  return (
    <div>
      <h1 className="head animation_h1">Hi, {props.loggedIn && props.firstName ? props.firstName : 'there'}</h1>
      <h2 className="head animation_h2">{checkIfOpen()}</h2>
      <br/>
      <br/>
      {button}
    </div>
)})
