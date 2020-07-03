import React, {useState} from 'react';
import moment from 'moment';


const BookingModal = (props) => {
  const { data, setData } = props
  const { date, time, type, course, available } = data
  const [ guest, setGuest ] = useState()

  const addGuest = () => {
    setGuest(true)
  }
  return (
    <div>
      <div className="modal fade show" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{'display': 'block'}}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Reservation on {moment(date).format('DD.MM.YYYY')} at {time} for {type} at {course}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setData({ ...data, show: false})}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <ul className="list-group mb-3">
                {available <= 75 ? <li className="list-group-item d-flex justify-content-between align-items-center">Aivar Riimets<span className="badge badge-primary badge-pill">14.0</span></li> : '' }
                {available <= 50 ? <li className="list-group-item d-flex justify-content-between align-items-center">Mai-Liis Mägi<span className="badge badge-primary badge-pill">18.4</span></li> : '' }
                {available <= 25 ? <li className="list-group-item d-flex justify-content-between align-items-center">Reedik Lindau<span className="badge badge-primary badge-pill">1</span></li> : '' }
                {available <= 100 ? <li className="list-group-item d-flex justify-content-between align-items-center"><button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => addGuest({ ...data, show: false})}>Add a player</button></li> : '' }
              </ul>
              <div className="form-group">
                <label htmlFor="comment">Any comments</label>
                <textarea className="form-control" id="comment" aria-describedby="emailHelp"></textarea>
                <small id="comment" className="form-text text-muted">Please note that your comment is purely informative and no rights can be derived from it.</small>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setData({ ...data, show: false})}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={() => setData({ ...data, show: false})}>Book reservation</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </div>
  );
}

export default BookingModal;
