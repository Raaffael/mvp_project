const config = require("./config")[process.env.NODE_ENV || "dev"]
//process.env.NODE_ENV pulls the build command from Render, if none is pulled "dev" will be used
//dev and production specify different settings for the port and URL
//look in config.js
const express = require('express');
const PORT = config.port;

const app = express();

app.use(express.static('public'))

app.listen(PORT, () => {
    console.log(`Frontend is listening on ${PORT}`);
})