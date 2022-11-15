

//const ENV = "production"; //uses render
const ENV = "dev";  //uses local node server

let URL = ENV == "dev" ? "http://localhost:3001" : "https://mvp-api-server.onrender.com";

let $body = $('body');
let $courseDiv = $('<div></div>');
let $catalogDiv = $('<div></div>');
let $editDiv;
let $addClassButton;
let $dropClassButton;
let $editPaymentButton;
let $editDateButton;

$body.append($courseDiv);
populateCourses();
populateSubmitionFields();
populateCatalog();
$addClassButton.click(function(){
    let $addClassText = $('#add_text');
    let $addClassPaid = $('#add_pay_text')
    addClass($addClassText.val(),$addClassPaid.val());
})
$dropClassButton.click(function(){
    let $dropClassText = $('#drop_text');
    dropClass($dropClassText.val());
})
$editPaymentButton.click(function(){
    let $paidRegID = $('#reg_paid_text');
    let $paidBoolean = $('#paid_text');
    editPaid($paidRegID.val(),$paidBoolean.val());
})
$editDateButton.click(function(){
    let $dateRegID = $('#reg_date_text');
    let $date = $('#date_text');
    editDate($dateRegID.val(),$date.val());
})

function addClass(id,isPaid){
    let course = {
        course_id : id,
        paid : isPaid
    }
    fetch(`${URL}/registration`,{
        method: 'POST',
        mode: "cors",
        headers: { 'Content-Type':'application/json'},
        body:JSON.stringify(course)
    }).then(function(){
        populateCourses();
    })
}
function dropClass(id){
    let course = {
        reg_id : id
    }
    fetch(`${URL}/registration`,{
        method: 'DELETE',
        mode: "cors",
        headers: { 'Content-Type':'application/json'},
        body:JSON.stringify(course)
    }).then(function(){
        populateCourses();
    })
}
function editPaid(id, isPaid){
    let course = {
        reg_id : id,
        paid : isPaid
    }
    fetch(`${URL}/registration`,{
        method: 'PATCH',
        mode: "cors",
        headers: { 'Content-Type':'application/json'},
        body:JSON.stringify(course)
    }).then(function(){
        populateCourses();
    })
}
function editDate(id, date){
    let course = {
        reg_id : id,
        date_registered : date
    }
    fetch(`${URL}/registration`,{
        method: 'PATCH',
        mode: "cors",
        headers: { 'Content-Type':'application/json'},
        body:JSON.stringify(course)
    }).then(function(){
        populateCourses();
    })
}


function populateCourses() {
    $courseDiv.empty();
    let $courseHeader = $('<h1>Current Classes</h1>');
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
    $catalogDiv.empty();
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
    <label>Course ID: </label><input id="add_text" type="text"/>
    <label>Paid: </label><input id="add_pay_text" type="text" placeholder="true/false"/><br/>
    <button type="button" id="add_button">Add class</button>
    `);
    $addDiv.append($addField);
    $addClassButton = $('#add_button');
}
function populateDropClassField($submitionDiv) {
    let $dropDiv = $('<div></div>');
    let $dropHeader = $('<h1>Drop a Class</h1>');
    $dropDiv.append($dropHeader);
    $submitionDiv.append($dropDiv);
    let $dropField = $(`
    <label>Reg ID: </label><input id="drop_text" type="text"/><br/>
    <button type="button"  id="drop_button">Drop class</button>
    `);
    $dropDiv.append($dropField);
    $dropClassButton = $('#drop_button');
}
function populateEditClassField($submitionDiv) {
    $editDiv = $('<div></div>');
    let $editHeader = $('<h1>Edit a Class</h1>');
    $editDiv.append($editHeader);
    $submitionDiv.append($editDiv);
    populatePaid();
    populateDate();
}
function populatePaid() {
    let $paidField = $(`
    <label>Reg ID: </label><input id="reg_paid_text" type="text"/>
    <label>Paid: </label><input id="paid_text" type="text" placeholder="true/false"/>
    <button type="button" id="paid_button">Update payment status</button><br/>
    `);
    $editDiv.append($paidField);
    $editPaymentButton = $('#paid_button');
}
function populateDate() {
    let $dateField = $(`
    <label>Reg ID: </label><input id="reg_date_text" type="text"/>
    <label>Date Registered: </label><input id="date_text" type="text" placeholder="YYYY-MM-DD"//>
    <button type="button" id="date_button">Update Date</button><br/>
    `);
    $editDiv.append($dateField);
    $editDateButton = $('#date_button');
}