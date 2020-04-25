// import { response } from "express";

$(document).ready(onReady);

function onReady() {
  console.log("in onReady");
  // add click listener for add task button
  
  $("#addTask").on("click", addTask);
  $(".toggleComplete").on("click", completed);

  // run function that updates the dom and pulls current tasks
  getAllTasks();
}

function addTask() {
  console.log("in addTask");
  // create object of task to send
  let taskToAdd = {
    task: $("#task").val(),
  };
  console.log(taskToAdd);
  //ajax POST request
  $.ajax({
    type: "POST",
    url: "/todo",
    data: taskToAdd,
  }).then(function (response) {
    console.log("back from POST", response);
    getAllTasks();
  });
}

function getAllTasks() {
  console.log("getting all tasks");
  //ajax get request
  $.ajax({
    type: "GET",
    url: "/todo",
  })
    .then(function (responses) {
      console.log("getting all tasks", responses);
      let el = $("#showAllTasks");
      el.empty();
      console.log(responses);
      responses.forEach((response) => {
        console.log(response.complete);
        //     // check for completeness (is the complete value true?)
        if (response.complete) {
          console.log("it's true");
          el.append(`<li><s>${response.task}</s><button class="deleteButton data-id="${response.id}">Delete</button>
         </li>`);
        } else {
          console.log("this is false");
          el.append(`<li>${response.task}<button class="deleteButton data-id="${response.id}">Delete</button>
         <button class="toggleComplete" data-id="${response.id}"
         data-complete="${response.complete}">Complete</button></li>`);
        }
        //     // if complete
        //     // render list normally
        //     // else, redner the list item with red background or striketrough
      });
    })
    .catch(function (err) {
      console.log("error getting tasks", err);
    });
  // make an el const, make for loop for response[i].something append to dom
}

function completed() {
  console.log("in completed function");
  const id = $(this).data("id");

  console.log(" in completed", id);
  $.ajax({
    type: "PUT",
    url: `/todo/${id}`,
    data: { complete: true },
  })
    .then(function (response) {
      console.log("back from server side PUT", response);
      getAllTasks();
    })
    .catch(function (err) {
      console.log("error updating PUT ", err);
    });
}
