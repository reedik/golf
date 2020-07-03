const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const cors = require('cors')

const con = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

const corsOptions = {
  origin: 'https://sarponline.localhost',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.get('/', cors(corsOptions), (req, res) => {
  console.log(req)
  console.log("Connected!");
  const sql = `SELECT * FROM sarp_works WHERE date_start >= "${req.query.date_start}" AND date_end <= "${req.query.date_end}"`;
  const works = {};
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    Object.keys(result).forEach(work => {
      const {hash, added} = result[work]
      
      works[hash] = { hash, added }
    })
    res.json(works)
  });
})

module.exports = router