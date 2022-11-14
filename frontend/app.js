const config = require("./config")[process.env.NODE_ENV || "dev"]
const express = require('express');
const PORT = config.port;

const app = express();

app.use(express.static('public'))

app.listen(PORT, () => {
    console.log(`Frontend is listening on ${PORT}`);
})