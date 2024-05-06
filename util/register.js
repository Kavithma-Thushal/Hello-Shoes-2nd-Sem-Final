var baseURL = "http://localhost:8080/shoes/api/v1/";

// Open the register container
$('#btnRegister').click(function () {
    $('#registerContainer').css('right', '0');
});

// Close the register container when clicking outside of it
$(document).click(function (event) {
    let registerContainer = $('#registerContainer');
    // Check if the click target is not within the register container
    if (!registerContainer.is(event.target) && !$('#btnRegister').is(event.target) && registerContainer.has(event.target).length === 0) {
        registerContainer.css('right', '-400px');
    }
});

// User Register Using JWT Token
$(document).ready(function () {
    $('#registerForm').submit(function (event) {
        event.preventDefault();

        let signInObj = {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            email: $('#email').val(),
            username: $('#username').val(),
            password: $('#password').val(),
            role: $('#role').val(),
        }

        $.ajax({
            type: 'POST',
            url: baseURL + 'auth/signup',
            contentType: 'application/json',
            data: JSON.stringify(signInObj),
            success: function (resp) {
                successAlert("User Registered Successfully...!");
            },
            error: function (error) {
                errorAlert("User Registered Error...!");
            }
        });
    });
});