import React, { useState, useEffect } from 'react'
import moment from 'moment'
import M from 'materialize-css'
import boardHOC from './wrappers/BoardHOC'
import { openingTimes } from '../components/helpers';


export default boardHOC(({ onSubmit, db, user }) => {
  const [booking, setBooking] = useState({})
  const [select, setSelect] = useState(null)
  const [datePicker, setDatePicker] = useState(null)
  const [freeTables, setFreeTables] = useState(0)

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

              console.log('from db -- ', free)
              setFreeTables(free)
            } else {
              console.log('from db -- ', 14)
              setFreeTables(14)
            }
          } else {
            console.log(14)
            setFreeTables(14)
          }
        })
    }

    return () => ref.off()
  }, [booking, db, user])

  const onSubmitHandler = (event) => {
    event.preventDefault()
    onSubmit(booking)
  }

  const timeOptions = []

  const { day, date, time } = booking

  if (day && openingTimes[day][0]) {
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
          disabled={!!!freeTables ? true : false} />
        <label>Seats</label>
      </div>
    : null

  return (
    <div className={`book-popup`} >
      <h3>{`${date}T${time}`}</h3>
      <form onSubmit={onSubmitHandler}>
        <div className="input-field col s12">
          <input
            type="text"
            className="datepicker"
            ref={(datepicker) => {setDatePicker(datepicker)}}
          />
          <label>Date</label>
        </div>
        <div className="input-field col s12">
          <select
            ref={(select) => {setSelect(select)}}
            defaultValue=""
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
        {seats}
        <button
          disabled={!!!booking.time || !!!booking.date || !!!booking.chairs}
          className="btn waves-effect waves-light" type="submit"
        >
          BOOK
          <i className="material-icons right">send</i>
        </button>
      </form>
    </div>
  )
})
