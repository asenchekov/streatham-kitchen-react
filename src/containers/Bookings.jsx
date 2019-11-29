import React from 'react'
import moment from 'moment'
import BoardHOC from '../containers/wrappers/BoardHOC'


export default BoardHOC(({ bookings, onRemoveHandler }) => {
  let bookingList

  if (bookings) {
    bookingList = Object.keys(bookings).map((key, i) => {
      return (
        <div key={key}>
          <hr/>
          <h1>
            {i + 1 + ')'} {moment(key).format('ddd, Do MMMM YYYY @ HH:mm')}
            <span
              className="delete"
              onClick={() => onRemoveHandler(key)}> x</span>
          </h1>
          <h1>Table for: {bookings[key]}</h1>
        </div>
      )
    })
  }

  return (
    <div>
      <div>
        <h1>My Bookings</h1>
      </div>
      {bookingList || <h1>you don't have any bookings</h1>}
    </div>
  )
})
