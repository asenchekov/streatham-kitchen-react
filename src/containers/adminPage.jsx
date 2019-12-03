import React, {
  useState,
  useEffect,
} from 'react'
import M from 'materialize-css'
import moment from 'moment'


export default ({ fetchData, adminData, onRemoveHandler }) => {
  const [datePicker, setDatePicker] = useState(null)

  useEffect(() => {
    M.Datepicker.init(datePicker, {
      autoClose: true,
      onSelect: (date) => {
        fetchData(moment(date).format('YYYY-MM-DD'))
      },
    })
  })

  const { data, date } = adminData

  const tableRows = data
    ? Object.keys(data).map((time) => (
          Object.keys(data[time]).map((user) => (
            <tr key={date+time}>
              <td>{time}</td>
              <td>{data[time][user].chairs}</td>
              <td>{data[time][user].displayName}</td>
              <td>{data[time][user].confirmed ? 'Yes' : 'No'}</td>
              <td onClick={() => onRemoveHandler(date + 'T' + time, user)}>X</td>
            </tr>
          ))
        )).flat()
    : null

  return (
    <div>
      <h1>Hi admin</h1>
      <div className="input-field col s12">
        <input
          type="text"
          className="datepicker"
          ref={(datepicker) => {setDatePicker(datepicker)}}
        />
        <label>Date</label>
      </div>
      <table className="admin-table highlight centered">
        <caption>Bookings {date}</caption>
        <thead>
          <tr>
            <th>Arriving</th>
            <th>Seats</th>
            <th>Name</th>
            <th>Confirmation</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </div>
  )
}
