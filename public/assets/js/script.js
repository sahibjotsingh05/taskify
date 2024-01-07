$(document).ready(function () {
  $(".blackbody").hide();
  $(".popup").hide();
  $("#createMainBtn").on("click", function () {
    $(".blackbody").show();
    $("#popup1").show();
  });
  $("#cross1").on("click", function () {
    $(".blackbody").hide();
    $("#popup1").hide();
  });
  $("#createTaskBtn").on("click", function () {
    // Collect data from input fields and radio buttons
    var taskName = $("#task-name").val();
    var description = $("#task-description").val();
    var dateOfTask = $("#date-of-task").val();
    var startTime = $("#startTime").val();
    var endTime = $("#endTime").val();
    var recurring = $("input[name='reccuringBool']:checked").val() === "true";
    var recurringType = $("input[name='reccuringType']:checked").val();

    // Prepare JSON data
    var jsonData = {
      name: taskName,
      description: description,
      assignedDate: dateOfTask,
      start:
        dateOfTask && startTime
          ? new Date(`${dateOfTask} ${startTime}`)
          : undefined,
      end:
        dateOfTask && endTime
          ? new Date(`${dateOfTask} ${endTime}`)
          : undefined,
      recurring: recurring,
      recurringType: recurringType,
      assigned: false,
      status: "Pending",
    };

    // Make API request using $.ajax
    $.ajax({
      url: "/createTask", // Replace with your API endpoint
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(jsonData),
      success: function (response) {
        // Handle successful response
        console.log("Response from server:", response);
        if (response.message == "Task added successfully") {
          alert("Task Added Successfully");
          $(".blackbody").hide();
          $("#popup1").hide();
        }
      },
      error: function (error) {
        // Handle error
        console.error("Error:", error);
      },
    });
  });
  $("#signupBtn").on("click", function () {
    // Collect data from text fields
    var name = $("#signup-name").val();
    var email = $("#signup-email").val();
    var password = $("#signup-password").val();
    // Validate form inputs using regular expressions
    var nameRegex = /^[a-zA-Z\s]+$/;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var passwordRegex = /^.{8,}$/;

    if (!nameRegex.test(name)) {
      alert("Name is invalid");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Email is invalid");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert("Password is invalid");
      return;
    }

    // Prepare JSON data
    var jsonData = {
      name: name,
      email: email,
      password: password,
    };
    console.log(jsonData);
    // Make API request using $.ajax
    $.ajax({
      url: "/api/signup", // Replace with your API endpoint
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(jsonData),
      success: function (response) {
        // Handle successful response
        console.log("Response from server:", response);
        if (response.status == "success") window.location.replace("/");
      },
      error: function (error) {
        // Handle error
        console.error("Error:", error);
      },
    });
  });

  $("#loginBtn").on("click", function () {
    // Collect data from text fields
    var email = $("#login-email").val();
    var password = $("#login-password").val();

    // Prepare JSON data
    var jsonData = {
      email: email,
      password: password,
    };
    console.log(jsonData);
    // Make API request using $.ajax
    $.ajax({
      url: "/api/login", // Replace with your API endpoint
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(jsonData),
      success: function (response) {
        // Handle successful response
        console.log("Response from server:", response);
        if (response.status == "success") window.location.replace("/");
      },
      error: function (error) {
        // Handle error
        alert("Wrong Email or Password");
      },
    });
  });
  const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcon = document.querySelectorAll(".icons span");
  // getting new date, current year and month
  let date = new Date(),
    currYear = $("#hidden-year").val(),
    currMonth = parseInt($("#hidden-month").val()) - 1;
  currDate = parseInt($("#hidden-day").val());
  console.log(currDate);

  // storing full name of all months in array
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
      lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
      lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
      lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";
    for (let i = firstDayofMonth; i > 0; i--) {
      // creating li of previous month last days
      liTag += `<li class="inactive" onclick="window.location.replace('/${
        lastDateofLastMonth - i + 1
      }/${currMonth > 0 ? currMonth : 12}/${
        currMonth > 0 ? currYear : currYear - 1
      }')">${lastDateofLastMonth - i + 1}</li>`;
    }
    for (let i = 1; i <= lastDateofMonth; i++) {
      // creating li of all days of current month
      // adding active class to li if the current day, month, and year matched
      let isToday =
        i == parseInt($("#hidden-day").val()) &&
        currMonth == parseInt($("#hidden-month").val()) - 1 &&
        currYear == parseInt($("#hidden-year").val())
          ? "active"
          : "";

      liTag += `<li class="${isToday}" onclick="window.location.replace('/${i}/${
        currMonth + 1
      }/${currYear}')">${i}</li>`;
    }
    for (let i = lastDayofMonth; i < 6; i++) {
      // creating li of next month first days
      liTag += `<li class="inactive" onclick="window.location.replace('/${
        i - lastDayofMonth + 1
      }/${currMonth + 2 < 13 ? currMonth + 2 : 1}/${
        currMonth + 2 < 13 ? currYear : parseInt(currYear) + 1
      }')">${i - lastDayofMonth + 1}</li>`;
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
  };
  renderCalendar();
  prevNextIcon.forEach((icon) => {
    // getting prev and next icons
    icon.addEventListener("click", () => {
      // adding click event on both icons
      // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
      currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
      if (currMonth < 0 || currMonth > 11) {
        // if current month is less than 0 or greater than 11
        // creating a new date of current year & month and pass it as date value
        date = new Date(currYear, currMonth, new Date().getDate());
        currYear = date.getFullYear(); // updating current year with new date year
        currMonth = date.getMonth(); // updating current month with new date month
      } else {
        date = new Date(); // pass the current date as date value
      }
      renderCalendar(); // calling renderCalendar function
    });
  });
  function sortTasks() {
    alert("Event Fired!");
  }

  const draggabletasks = document.querySelectorAll(".draggable-task");
  const dragContainers = document.querySelectorAll(".drag-containers");

  draggabletasks.forEach((draggabletask) => {
    draggabletask.addEventListener("dragstart", () => {
      draggabletask.classList.add("dragging");
    });

    draggabletask.addEventListener("dragend", () => {
      draggabletask.classList.remove("dragging");
      sortTasks();
    });
  });

  dragContainers.forEach((container) => {
    container.addEventListener("dragover", (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(container, e.clientY);
      console.log(afterElement);
      const draggable = document.querySelector(".dragging");
      if (afterElement == null) {
        container.appendChild(draggable);
      } else {
        container.insertBefore(draggable, afterElement);
      }
    });
  });

  function getDragAfterElement(container, y) {
    const draggableElements = [
      ...container.querySelectorAll(".draggable-task:not(.dragging)"),
    ];
    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
});
