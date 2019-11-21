import React, { useState, useEffect } from 'react'
import moment from 'moment'
import M from 'materialize-css'
import boardHOC from './wrappers/BoardHOC'
import { openingTimes } from '../components/helpers';


export default boardHOC((props) => {
  const [booking, setBooking] = useState({
    date: moment().format('YYYY-MM-DD'),
    day: moment().day(),
  })
  const [select, setSelect] = useState(null)
  const [datePicker, setDatePicker] = useState(null)

  useEffect(()=> {
    M.FormSelect.init(select)

    M.Datepicker.init(datePicker, {
      autoClose: true,
      onSelect: (date) => {
        setBooking({
          ...booking,
          date: moment(date).format('YYYY-MM-DD'),
          day: date.getDay(),
        })
      },
    })
  })

  const onSubmitHandler = (event) => {
    event.preventDefault()
    if (booking.time && booking.date) props.onSubmit(booking)
    
  }

  const timeOptions = []

  const { day, date, time } = booking

  if (openingTimes[day][0]) {
    const open = moment(`${date} ${openingTimes[day][0]}`)
    const close = moment(`${date} ${openingTimes[day][1]}`)
    
    while (open < moment(date)) {
      open.add(30, 'm')
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
      open.add(30, 'm');
    }
  }

  return (
    <div className={`book-popup`} >
      <h1 >{props.visible ? 'true' : 'false'}</h1>
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
          <label>Time</label>
        </div>
        <button className="btn waves-effect waves-light" type="submit" >BOOK
          <i className="material-icons right">send</i>
        </button>
      </form>
    </div>
  )
})
