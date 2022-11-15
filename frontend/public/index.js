//const ENV = "production"; //uses render
const ENV = "dev";  //uses local node server

let URL = ENV == "dev" ? "http://localhost:3001" : "https://mvp-api-server.onrender.com";

let $body = $('body');
let $courseDiv = $('<div></div>');
let $catalogDiv = $('<div></div>');
let $addClassButton = $('#add-button');
let $dropClassButton = $('#drop-button');
let $editClassButton = $('#edit-button');

populateCourses();
populateSubmitionFields();
populateCatalog();




function populateCourses() {
    $body.append($courseDiv);
    let $courseHeader = $('<h1>Current Classes</h1>')
    $courseDiv.append($courseHeader);
    fetch(`${URL}/registration`)
        .then(response => response.json())
        .then(data => {
            data.forEach(record => {
                let aRecord = $(`<li>
            Registration ID : ${record.reg_id}
            Paid : ${record.paid}
            Course ID : ${record.course_id}
            Name : ${record.name}
            Date Registered : ${record.date_registered} 
            </li>`);
                $courseDiv.append(aRecord);
            });
        });

}

function populateCatalog() {
    let $catalogHeader = $('<h1>Current Catalog</h1>')
    $catalogDiv.append($catalogHeader);
    $body.append($catalogDiv);
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
function populateSubmitionFields() {
    let $submitionDiv = $('<div></div>');
    $body.append($submitionDiv);
    populateAddClassField($submitionDiv);
    populateDropClassField($submitionDiv);
    populateEditClassField($submitionDiv);
}
function populateAddClassField($submitionDiv) {
    let $addDiv = $('<div></div>');
    let $addHeader = $('<h1>Add a Class</h1>');
    $addDiv.append($addHeader);
    $submitionDiv.append($addDiv);
    let $addField = $(`
    <label>Course ID: </label><input id="add_id" type="text"/><br/>
    <button type="button"  id="add-button">Add class</button>
    `);
    $addDiv.append($addField);
}
function populateDropClassField($submitionDiv) {
    let $dropDiv = $('<div></div>');
    let $dropHeader = $('<h1>Drop a Class</h1>');
    $dropDiv.append($dropHeader);
    $submitionDiv.append($dropDiv);
    let $dropField = $(`
    <label>Course ID: </label><input id="drop_id" type="text"/><br/>
    <button type="button"  id="drop-button">Drop class</button>
    `);
    $dropDiv.append($dropField);
}
function populateEditClassField($submitionDiv) {
    let $editDiv = $('<div></div>');
    let $editHeader = $('<h1>Edit a Class</h1>');
    $editDiv.append($editHeader);
    $submitionDiv.append($editDiv);
    editPaid($editDiv);
    editDate($editDiv);
}
function editPaid($editDiv) {
    let $paidField = $(`
    <label>Course ID: </label><input id="paid_id" type="text"/>
    <label>Paid: </label><input id="payment_text" type="text"/>
    <button type="button"  id="paid-button">Update payment status</button><br/>
    `);
    $editDiv.append($paidField);
}
function editDate($editDiv) {
    let $dateField = $(`
    <label>Course ID: </label><input id="date_id" type="text"/>
    <label>Date Registered: </label><input id="date_text" type="text"/>
    <button type="button"  id="date-button">Update Date</button><br/>
    `);
    $editDiv.append($dateField);
}