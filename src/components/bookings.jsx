import React from 'react'
import moment from 'moment'


export default ({ bookings, onRemoveHandler }) => {
  let bookingList

  if (bookings) {
    bookingList = Object.keys(bookings).map((key, i) => {
      return (
        <div key={key}>
          <hr/>
          <h3>
            {moment(key).format('ddd, Do MMMM YYYY @ HH:mm')}
          </h3>
          <h3>Table for: {bookings[key]}</h3>
          <h3
              className="delete"
              title="delete booking"
              onClick={() => onRemoveHandler(key)}>delete</h3>
        </div>
      )
    })
  }

  return (
    <div className="container bookings">
      <div>
        <h1>My Bookings</h1>
      </div>
      {bookingList || <div><hr /><h1>you don't have any bookings</h1></div>}
    </div>
  )
}
