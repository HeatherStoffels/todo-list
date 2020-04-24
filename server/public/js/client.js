$(document).ready(onReady);

function onReady() {
  console.log("in onReady");
  // add click listener for add task button
  $("#addTask").on("click", addTask);

  // run function that updates the dom and pulls current tasks
  getAllTasks();
}

function addTask() {
  console.log("in addTask");
  // create object of task to send
  let taskToAdd = {
    taskInput: $("#task").val(),
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
  //ajax get request
  // make an el const, make for loop for response[i].something append to dom
}
