const express = require('express')
const router = express.Router()

// const mysql = require('mysql')
// const con = mysql.createConnection({
//   host: "localhost",
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE
// });

const timesDummy = (id) => {
  const x = 8;
  const a = [ 0, 25, 50, 100 ]
  const courses = [
    { id: 1, name: 'Park-väljak', holes: [ '9 holes', '18 holes' ] },
    { id: 2, name: '1st 9 holes', holes: [ '9 holes' ]},
    { id: 3, name: 'Par20', holes: [ '9 holes' ]}
  ]
  const times = Object.keys(courses).map(course => {
    const { name, holes } = courses[course]
    const holesList = holes.map( name => {
      let tt = 0;
      const times =  Array(Math.floor(13 * 60 / x - 1)).fill().map( (item, index) => {
        const hh = Math.floor(tt / 60);
        const mm = ( tt % 60 );
        tt = tt + x;
        return ({
          time: ("0" + (hh + 7)).slice(-2) + ':' + ("0" + mm).slice(-2),
          available: a[Math.floor(a.length * Math.random())]
        })
      })
      return ({ name, times })
    })
    return ({ name: name, holes: holesList})
  })
  return times
}

router.get('/', (req, res) => {
  // const sql = `SELECT * FROM times WHERE date_start >= "${req.query.date_start}" AND date_end <= "${req.query.date_end}"`;
  // const times = {};
  // con.query(sql, function (err, result, fields) {
  //   if (err) throw err;
  //   Object.keys(result).forEach(work => {
  //     const {hash, added} = result[work]
  //     times[hash] = { hash, added }
  //   })
  //   res.json(times)
  // });
  res.json(timesDummy(req.params.id))
})

module.exports = router