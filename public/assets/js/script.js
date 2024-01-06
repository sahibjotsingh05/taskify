$(document).ready(function () {
  $("#signupBtn").on("click", function () {
    // Collect data from text fields
    var name = $("#signup-name").val();
    var email = $("#signup-email").val();
    var password = $("#signup-password").val();

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
      },
      error: function (error) {
        // Handle error
        console.error("Error:", error);
      },
    });
  });
});
