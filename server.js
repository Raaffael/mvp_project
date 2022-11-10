const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express()
app.use(cors());
app.use(express.json());
const config = require('./config')[process.env.NODE_ENV||"dev"]
const PORT = config.port;
const pool = new Pool({
    connectionString: config.connectionString,
});
pool.connect();





app.get('/', (req, res) => {
    res.send('Hello World');
});



app.listen(PORT, () => {
    console.log(`Our app is running on ${PORT}`)
})