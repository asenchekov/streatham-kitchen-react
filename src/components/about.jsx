import React from 'react'


export default () => {
  

  return (
    <div className="container about">
      <h1>Something about us</h1>
      <hr/>
      <div className="row"
        style={{'padding': '50px 20px'}}>
        <div className="col s6 left-side-about">
          <p>Streatham Kitchen is a popular</p>
          <p>intimate restaurant with 14 seats.</p>
          <br/>
          <p>Our menu indulges the cravings of</p>
          <p>both meat-eaters and vegetarians</p>
          <p>plus a wide range of tapas</p>
          <br/>
          <p>At Streatham Kitchen we aim to accommodate all kinds</p>
          <p>of customers, satisfying many special requests.</p>
          <p>The restaurant is also a perfect venue for family</p>
          <p>reunions, birthdays and special occasions.</p>
          <p>We offer a weekly special and are currently BYOB.</p>
          <br/>
          <p>20 Mitcham Lane, London, SW166NN</p>
          <p>streathamkitchen@gmail.com</p>
          <p>020 3556 7916</p>
          <br/>
          <p>Opening hours:</p>
          <p>Monday closed</p>
          <p>Tuesday, Wednseday 16:00 - 22:00</p>
          <p>Thursday 12:30 - 22:00</p>
          <p>Friday and Saturday 12:00 - 22:30</p>
          <p>Sunday 12:45 - 20:30</p>
        </div>
        <div className="col s6">
          <div
            className="row image1"
          >
          </div>
          <div
            className="row image2"
          >
          </div>
          <div
            className="row image3"
          >
          </div>
        </div>
      </div>
    </div>
  );
}