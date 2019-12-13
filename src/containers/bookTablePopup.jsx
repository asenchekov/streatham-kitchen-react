import React, { useState, useEffect } from 'react'
import moment from 'moment'
import M from 'materialize-css'
import { openingTimes } from '../components/helpers';


export default ({ onSubmit, onCancel, db, user }) => {
  const [booking, setBooking] = useState({})
  const [select, setSelect] = useState(null)
  const [datePicker, setDatePicker] = useState(null)
  const [freeTables, setFreeTables] = useState(null)

  useEffect(()=> {
    M.FormSelect.init(select)

    M.Datepicker.init(datePicker, {
      autoClose: true,
      minDate: new Date(),
      onSelect: (date) => {
        setBooking({
          ...booking,
          date: moment(date).format('YYYY-MM-DD'),
          day: date.getDay(),
        })
      },
    })
  })

  useEffect(() => {
    const { date, time } = booking
    const ref = db.ref(`bookings/${date}/${time}`)

    if (date && time) {
        ref.on('value', (data) => {
          const value = data.val()
          if (value) {
            const keys = Object.keys(value)
              .filter((key) => key !== user)
            if (!!keys.length) {
              const free = 14 - keys.map((key) => value[key].chairs)
                .reduce((a, b) => a + b)
              setFreeTables(free)
            } else {
              setFreeTables(14)
            }
          } else {
            setFreeTables(14)
          }
        })
    }

    return () => ref.off()
  }, [booking, db, user])

  useEffect(() => {
    M.Toast.dismissAll()
    if(freeTables) {
      M.toast({
        html: `<span>${freeTables} free chairs at this time!</span>`,
        classes: 'rounded info-toast',
      })
    }
  }, [freeTables, booking.date, booking.time])

  const onSubmitHandler = (event) => {
    event.preventDefault()
    M.Toast.dismissAll()
    onSubmit(booking)
    setBooking({})
  }

  const timeOptions = []

  const { day, date } = booking

  if (day !== undefined && openingTimes[day][0]) {
    const open = moment(`${date} ${openingTimes[day][0]}`)
    const close = moment(`${date} ${openingTimes[day][1]}`)

    while (open < moment()) {
      open.add(60, 'm')
    }

    while (open < close) {
      timeOptions.push(
        <option
          key={open.toNow() + Math.random() * 100}
          value={open.format('HH:mm')}
        >
          {open.format('HH:mm')}
        </option>
      )
      open.add(60, 'm');
    }
  }

  const seats = !!timeOptions.length
    ? <div className="input-field col s12">
        <input
          onChange={(event) => setBooking({
            ...booking,
            chairs: Number(event.target.value),
          })}
          type="number"
          min="1"
          max={freeTables}
          disabled={!!!freeTables ? true : false}
        />
        <label>Seats</label>
      </div>
    : null

  return (
    <div className="container popup">
      <h1>Book a table</h1>
      <br/>
      <form onSubmit={onSubmitHandler}>
        <div className="row form">
          <div className="input-field col s12">
            <input
              placeholder="pick a date"
              type="text"
              className="datepicker"
              ref={(datepicker) => setDatePicker(datepicker)}
            />
          </div>
        </div>
        <div className="row form">
          <div className="input-field col s12">
            <select
              className={window.innerWidth <= 415 ? "browser-default" : ""}
              ref={(select) => setSelect(select)}
              value={booking.time || ""}
              onChange={(event) => setBooking({
                ...booking,
                time: event.target.value,
              })}
            >
              <option
                value="" disabled
              >
                {!!timeOptions.length ? `Choose time` : `Closed`}
              </option>
              {timeOptions}
            </select>
          </div>
        </div>
        <div className="row form">
          {seats}
        </div>
        <div className="row form">
          <button
            disabled={!!!booking.time || !!!booking.date || !!!booking.chairs}
            className="btn waves-effect waves-light"
            type="submit"
          >
            BOOK
            <i className="material-icons right">send</i>
          </button>
          <button
            onClick={() => onCancel(false)}
            className="btn waves-effect waves-light right cancel-btn"
          >
            CANCEL
            <i className="material-icons right">cancel</i>
          </button>
        </div>
      </form>
    </div>
  )
}
