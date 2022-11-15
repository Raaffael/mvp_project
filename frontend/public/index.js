const ENV = "production"; //uses render
//const ENV = "dev";  //uses local node server

let URL = ENV == "dev" ? "http://localhost:3001" : "https://mvp-api-server.onrender.com";

let $body = $('body');
let $courseDiv = $('<div></div>')
let $catalogDiv = $('<div></div>')
$body.append($courseDiv);
$body.append($catalogDiv);
let $courseHeader = $('<h1>Current Classes</h1>')
$courseDiv.append($courseHeader);
populateCourses();
let $catalogHeader = $('<h1>Current Catalog</h1>')
$catalogDiv.append($catalogHeader);
populateCatalog();




function populateCourses(){
    fetch(`${URL}/registration`)
        .then(response => response.json())
        .then(data => {
            data.forEach(record => {
                let aRecord = $(`<li>
                Registration ID : ${record.reg_id}
                Date Registered : ${record.date_registered} 
                Paid : ${record.paid}
                </li>`)
                $courseDiv.append(aRecord);
            });
        });

}

function populateCatalog(){
    fetch(`${URL}/course-catalog`)
        .then(response => response.json())
        .then(data => {
            data.forEach(course => {
                let aCourse = $(`<li>
                Course ID : ${course.course_id}
                Name : ${course.name} 
                Description : ${course.description}
                </li>`)
                $catalogDiv.append(aCourse);
            });
        });

}