import moment from 'moment'


export const openingTimes = [
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

export const checkIfOpen = (date = moment()) => {
  const day = date.day()

  if (!openingTimes[day][0]) {
    return "unfortunately we're off today!"
  }

  const [
    open,
    close
  ] = [
    moment(date.format('YYYY-MM-DD ') + openingTimes[day][0]),
    moment(date.format('YYYY-MM-DD ') + openingTimes[day][1])
  ]

  return date >= open && date < close
    ? "we're open!"
    : "unfortunately we're closed!"
}