import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker"
import BookingModal from './BookingModal'

const Booking = () => {
  const [ list, setList ] = useState({})
  const [ view, setView ] = useState({ type: 'day', date: new Date(), hole: 0, course: 0})
  const [ bookingData, setBookingData ] = useState({ show: false, date: '', time: '', hole: 0, course: 0, available: 0 })
  useEffect( () => {
    axios.get('/api/booking').then(({data}) => {
      setList(data)
    })
  }, []);

  const changeDate = (date) => {
    setView({ ...view, date})
    axios.get('/api/booking').then(({data}) => {
      setList(data)
    })
  }
  const getDay = (type, times) => {
    return(
      <div style={{ 'maxHeight': '500px', 'overflow': 'auto'}}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col" width="100px">#</th>
              <th scope="col">Availability</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(times).map((item) => {
                const {time, available} = times[item]
                return(
                  <tr  key={item}>
                    <th scope="row">{time}</th>
                    <td><Availability data={{time, available, view, type, list}} setBookingData={setBookingData} /></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
  const getWeek = (type, times) => {
    return (
      <div style={{ 'maxHeight': '500px', 'overflow': 'auto'}}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Mon 29-06</th>
              <th scope="col">Tue 30-06</th>
              <th scope="col">Wed 01-07</th>
              <th scope="col">Thu 02-07</th>
              <th scope="col">Fri 03-07</th>
              <th scope="col">Sat 04-07</th>
              <th scope="col">Sun 05-07</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(times).map((item) => {
                const {time, available} = times[item]
                return(
                  <tr  key={item}>
                    <th scope="row">{time}</th>
                    <td><Availability data={{time, available, view, type, list}} setBookingData={setBookingData} /></td>
                    <td><Availability data={{time, available, view, type, list}} setBookingData={setBookingData} /></td>
                    <td><Availability data={{time, available, view, type, list}} setBookingData={setBookingData} /></td>
                    <td><Availability data={{time, available, view, type, list}} setBookingData={setBookingData} /></td>
                    <td><Availability data={{time, available, view, type, list}} setBookingData={setBookingData} /></td>
                    <td><Availability data={{time, available: 'XXVIII Niitvälja Karikas', view, type, list}} setBookingData={setBookingData} /></td>
                    <td><Availability data={{time, available: 'XXVIII Niitvälja Karikas', view, type, list}} setBookingData={setBookingData} /></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
  if(Object.keys(list).length){ 
    const holes = list[view.course].holes
    return (
        <>
          <h1 className="mt-3 mb-3">Booking</h1>
          <div className="row">
            <div className="col-6 col-md-3">
              <select className="form-control mb-3" onChange={(e) => setView({...view, hole: 0, course: e.target.value})}>
                {
                  Object.keys(list).map((item) => {
                    return <option key={item} value={item}>{list[item].name}</option>
                  })
                }
              </select>
            </div>
            <div className="col-6 col-md-4">
              <div className="form-group">
                <div className="btn-group">
                {
                  Object.keys(holes).map((item, index) => {
                    return <button 
                              key={index} 
                              className={view.hole === parseInt(item) ? "btn btn-primary" : "btn btn-secondary"} 
                              onClick={() => setView({...view, hole: parseInt(item)})}
                              >{holes[item].name}</button>
                  })
                }
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="form-group">
                <DatePicker selected={view.date} onChange={(date) => changeDate(date)} className="form-control" />
              </div>
            </div>
            <div className="col-6 col-md-2">
              <div className="form-group">
                <div className="btn-group">
                  <button type="button" className={view.type === 'day' ? "btn btn-primary" : "btn btn-secondary"} onClick={() => setView({...view, type: 'day'})}>Day</button>
                  <button type="button" className={view.type === 'week' ? "btn btn-primary" : "btn btn-secondary"} onClick={() => setView({...view, type: 'week'})}>Week</button>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-content" id="myTabContent">
            {
              Object.keys(holes).map((item, index) => {
                return <div 
                          key={index} 
                          className={view.hole === parseInt(item) ? 'active show tab-pane fade' : 'tab-pane fade'}>
                          {view.type === 'day' ? getDay(holes[item].name, holes[item].times): getWeek(holes[item].name, holes[item].times)}
                        </div>
              })
            }
          </div>
          {bookingData.show ? <BookingModal data={bookingData} setData={setBookingData} /> : ''}
        </>
    );
  } else { return 'Loading' }
}

export default Booking;

const Availability = (props) => {
  const { setBookingData } = props
  const { time, available, view, type, list } = props.data
  const btnAvailable = 'd-flex justify-content-between align-items-center pl-2 pr-2 btn btn-success';
  const btnBooked = 'd-flex justify-content-between align-items-center pl-2 pr-2 btn btn-secondary';
  return(
    <div className="progress" style={{'height': '31px'}}>
      <div className={typeof available === 'string' ? 'progress-bar bg-danger' : available ? "progress-bar" : 'progress-bar bg-secondary'} role="progressbar" style={{'width': typeof available === 'string' ? '100%' : available ? available + '%'  : '100%'}} aria-valuenow={available} aria-valuemin="0" aria-valuemax="100">
        <button 
          onClick={() => setBookingData({ show: true, date: view.date, time, type, course: list[view.course].name, available })}
          className={available === 0 || typeof available === 'string' ? btnBooked : btnAvailable}
          disabled={available === 0 || typeof available === 'string' ? 'disabled' : ''}
          >     
          <div>{available + '%'}</div>      
        </button>
      </div>
    </div>
  )
}