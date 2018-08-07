// Initialize Firebase
var config = {
  apiKey: "AIzaSyDvyFnz6u4WViv10c2-ZKrgqvrtg6H7I7I",
  authDomain: "employeedatamanagement-2a5b8.firebaseapp.com",
  databaseURL: "https://employeedatamanagement-2a5b8.firebaseio.com",
  projectId: "employeedatamanagement-2a5b8",
  storageBucket: "employeedatamanagement-2a5b8.appspot.com",
  messagingSenderId: "418944101846"
};
firebase.initializeApp(config);

//global variables
var name;
var role;
var rate;
var start;
var database = firebase.database();
var newTableRow;
var monthsWorked;
var totalRate;
//receive info from input boxes
$("#submit").on("click", function (event) {

  event.preventDefault();
  name = $("#employeeName").val().trim();
  role = $("#role").val().trim();
  start = $("#startDate").val().trim();
  rate = $("#monthlyRate").val().trim();

  //push info to server
  database.ref().push({
    name: name,
    role: role,
    start: start,
    rate: rate

  });

});

database.ref().on("child_added", function(childSnapshot) {
      
  // Log everything that's coming out of snapshot
  console.log("name: " + childSnapshot.val().name);
  console.log("role: " + childSnapshot.val().role);
  console.log("start: " + childSnapshot.val().start);
  console.log("rate: " + childSnapshot.val().rate);

  //determine months worked
  moment().format();
  convertedDate = moment(childSnapshot.val().start,  "MM/DD/YYYY");

  convertedDate.toNow();
  monthsWorked = moment().diff(convertedDate, "months");

  //determine total rate
  totalRate = (monthsWorked * (childSnapshot.val().rate))
  

  // full list of items to the well
  newTableRow = $("#employeeInfo").append("<tr>");
    newTableRow.append("<td>" + childSnapshot.val().name + "</td>");
    newTableRow.append("<td>" + childSnapshot.val().role + "</td>");
    newTableRow.append("<td>" + childSnapshot.val().start + "</td>");
    newTableRow.append("<td>" + monthsWorked + "</td>");
    newTableRow.append("<td>" + childSnapshot.val().rate + "</td>");
    newTableRow.append("<td>" + totalRate + "</td>");
});