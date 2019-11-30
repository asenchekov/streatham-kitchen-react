import React, { useState, useEffect } from 'react'
import BoardHOC from '../containers/wrappers/BoardHOC'
import { checkIfOpen } from './helpers';


export default BoardHOC(({ onClickHandler, loggedIn, firstName }) => {
  const [headerTop, setHeaderTop] = useState()
  const [headerBottom, setHeaderBottom] = useState()

  useEffect(() => {
    if (headerTop && headerBottom) {
      headerTop.className += ' animation_h1'
      headerBottom.className += ' animation_h2'
    }
  })

  const button = (
    <h1
      className="book-link"
      onClick={onClickHandler}>
        {loggedIn ? `>book now` : `>login to book`}
    </h1>
  )

  const greeting = `Hi, ${loggedIn && firstName ? firstName : 'there'}`

  return (
    <div>
      <h1
        ref={(heading) => setHeaderTop(heading)}
        className="head">
          {greeting}
      </h1>
      <h1
        ref={(heading) => setHeaderBottom(heading)}
        className="head">
          {checkIfOpen()}
      </h1>
      <br/>
      {button}
    </div>
  )
})
