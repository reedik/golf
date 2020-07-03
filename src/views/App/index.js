import React from 'react';
import {Link} from 'react-router-dom'

import Booking from '../Booking'
import Reservations from '../Reservations'

const App = (props) => {
  const { location } = props
  const switcher = () => {
    switch(location.pathname){
      case '/reservations':
        return <Reservations />;
      case '/booking':
        return <Booking />;
      default:
        return <h1>Home</h1>
    }
  }
  return (
    <div className="container">
      <LoggedIn />
      {switcher()}
    </div>
  )
}

export default App;

export const LoggedIn = () => {
  return(
    <div className="container">
      <nav class="row">
        <ol className="breadcrumb col">
          <li className="breadcrumb-item"><Link to="/booking">Booking</Link></li>
          <li className="breadcrumb-item"><Link to="/reservations">Reservations</Link></li>
        </ol>
      </nav>
      <div className="row align-items-center mb-3 alert alert-primary">
        <div className="col-md-6 mb-3 mb-md-0"><h5 className="card-title mb-0">Logged in as <b>Aivar Riimets</b></h5></div>
        <div className="col-auto ml-md-auto">
          <div className="btn-group">
            <Link to="/reservations" className="btn btn-primary">My reservations</Link>
            <Link to="/" className="btn btn-danger">Log out</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

