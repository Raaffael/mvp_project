const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express()
app.use(cors());
app.use(express.json());
const config = require('./config')[process.env.NODE_ENV || "dev"]
//process.env.NODE_ENV pulls the build command from Render 
//in this case the script render uses is 'npm start:production' which runs 'node server.js' in render
//look in package.json under scripts and in the config.js file
//dev and production specify different settings for the port and URL
const PORT = config.port;
const pool = new Pool({
    connectionString: config.connectionString,
});
pool.connect();





app.get('/course-catalog', (req, res) => {
    getCatalog(req, res);
});
app.get('/registration', (req, res) => {
    getRegistration(req, res);
});

app.post('/registration', (req, res) => {
    addAClass(req, res);
});

app.patch('/registration', (req, res) => {
    patchARegistration(req, res);
});
app.delete('/registration', (req, res) => {
    dropAClass(req, res);
})
app.get('*', (req, res) => {
    res.send('Check url');
});



app.listen(PORT, () => {
    console.log(`Our app is running on ${PORT}`)
});

async function getCatalog(req, res) {
    try {
        const text = 'SELECT * FROM course;';
        queryReturn(req, res, text);
    } catch (e) {
        console.error(e.stack);
    }
}
async function getRegistration(req, res) {
    try {
        const text = 'SELECT registration.reg_id,registration.paid,course.name,registration.course_id, '+
        'TO_CHAR(date_registered, $1) AS date_registered FROM registration '+
        'INNER JOIN course ON registration.course_ID = course.course_id '+
        'ORDER BY registration.reg_id ASC;';
        //SELECT registration.reg_id,registration.paid,course.name, TO_CHAR(date_registered, 'Mon dd, yyyy') AS date_registered FROM registration INNER JOIN course ON registration.course_id = course.course_id;
        const values = ['Mon dd, yyyy'];
        queryReturn(req, res, text,values);
    } catch (e) {
        console.error(e.stack);
    }
}
async function addAClass(req, res) {
    try {
        const classToAdd = req.body;
        const text = 'INSERT INTO registration (date_registered,paid,course_id) VALUES (NOW(),$1,$2) RETURNING *;'
        //INSERT INTO registration (date_registered,paid,course_id) VALUES (NOW(),true,9) RETURNING *;
        const values = [classToAdd.paid, classToAdd.course_id];
        queryReturn(req, res, text, values);
    } catch (e) {
        console.error(e.stack);
    }
}
async function patchARegistration(req, res) {
    try {
        const classToPatch = req.body;
        let text = '';
        let values = [];
        if (classToPatch.reg_id !== undefined && classToPatch.paid !== undefined) {
            text = 'UPDATE registration SET paid = $2 WHERE reg_id = $1 RETURNING *;'
            values = [classToPatch.reg_id, classToPatch.paid];
        } else if (classToPatch.reg_id !== undefined && classToPatch.date_registered !== undefined) {
            text = 'UPDATE registration SET date_registered = $2 WHERE reg_id = $1 RETURNING *;'
            values = [classToPatch.reg_id, classToPatch.date_registered];
        }
        queryReturn(req, res, text, values);
    } catch (e) {
        console.error(e.stack);
    }
}
async function dropAClass(req, res) {
    try {
        const classToDrop = req.body;
        let text = '';
        if (classToDrop.reg_id !== undefined) {
            text = 'DELETE FROM registration WHERE reg_id = $1 RETURNING *;';
        }
        queryReturn(req, res, text, [classToDrop.reg_id]);
    } catch (e) {
        console.error(e.stack);
    }
}

async function queryReturn(req, res, text, values) {
    const result = await pool.query(text, values);
    console.log(result.rows);
    res.send(result.rows);
}