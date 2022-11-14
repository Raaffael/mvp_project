//const ENV = "production"; //uses render
const ENV = "dev";  //uses local node server

let URL = ENV == "dev" ? "http://localhost:3001" : "https://mvp-api-server.onrender.com";
console.log("API:", URL);

fetch(`${URL}/`)
    .then(response => response.text())
    .then(data => {
        console.log(data)
    });