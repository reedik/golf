const express = require('express');
const app = express();
const cors = require('cors')

const PORT = process.env.PORT || 4999;
require('dotenv/config');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/booking', require('./routes/booking'))

app.listen(PORT, () => console.log(`Server starter on port ${PORT}`))