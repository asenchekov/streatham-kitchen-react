import React from 'react'
import BoardHOC from '../containers/wrappers/BoardHOC';

const checkIfOpen = () => {
  let time = new Date().getHours();
  return time > 10 && time < 23 ? "we're open!" : "we're closed";
}

export default BoardHOC(() => (
  <div>
    <h1 className="animation_h1">Wellcome</h1>
    <h2 className="animation_h2">{checkIfOpen()}</h2>
  </div>
));
