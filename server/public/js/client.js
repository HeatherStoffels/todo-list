// import { response } from "express";

$(document).ready(onReady);

function onReady() {
  console.log("in onReady");
  // add click listener for add task button

  $("#addTask").on("click", addTask);
  $("#showAllTasks").on("click", ".completeButton", completed);
  $("#showAllTasks").on("click", ".deleteButton", deleteTask);

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
      console.log("getting all tasks");
      let el = $("#showAllTasks");
      el.empty();
      for (let i = 0; i < responses.length; i++) {
        if (responses[i].complete === true) {
          el.append(
            `<div class="row mb-2">
            <div class="col-8">
              <span class="strikeThrough">${responses[i].task}</span>
            </div>
            <div class="col-2">
              <button class="deleteButton btn btn-danger" data-id="${responses[i].id}"><i class="fas fa-trash"></i></button>
            </div>
            <div class="col-2">
            </div>
          </div>`
          );
        } else {
          el.append(
            `<div class="row mb-2">
            <div class="col-8">
              ${responses[i].task}
            </div>
            <div class="col-2">
              <button class="deleteButton btn btn-danger" data-id="${responses[i].id}"><i class="fas fa-trash"></i></button>
            </div>
            <div class="col-2">
            <button class="completeButton btn btn-success" data-id="${responses[i].id}"
                     data-complete="${responses[i].complete}"><i class="far fa-calendar-check"></i></button>
            </div>
          </div>`
          );
        }

        $("#task").val("");
      } //end for
    })
    .catch(function (err) {
      console.log("error getting tasks", err);
    });
  // make an el const, make for loop for response[i].something append to dom
}

function completed() {
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
function deleteTask() {
  console.log("in delete task client");
  const id = $(this).data("id");
  $.ajax({
    type: "DELETE",
    url: `/todo/${id}`,
  })
    .then(function (response) {
      console.log("back from DELETE with", response);
      getAllTasks();
    })
    .catch(function (err) {
      console.log("problem with delete client side", err);
    });
}
