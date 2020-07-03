import React from 'react';

const Reservations = () => {
  return (
    <>
      <h1 className="mt-3 mb-3">Reservations</h1>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Start time</th>
            <th scope="col">Course</th>
            <th scope="col">Course loop</th>
            <th scope="col">Number of holes</th>
            <th scope="col">Usage punch ticket</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">22.07.2020</th>
            <td>10:30</td>
            <td>Park väljak</td>
            <td>Test</td>
            <td>18</td>
            <td>Yes</td>
          </tr>
          <tr>
            <th scope="row">22.07.2020</th>
            <td>10:30</td>
            <td>Park väljak</td>
            <td>Test</td>
            <td>18</td>
            <td>Yes</td>
          </tr>
          <tr>
            <th scope="row">22.07.2020</th>
            <td>10:30</td>
            <td>Park väljak</td>
            <td>Test</td>
            <td>18</td>
            <td>Yes</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Reservations
