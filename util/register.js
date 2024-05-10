let baseURL = "http://localhost:8080/shoes/api/v1/";
let registerContainer = $('#registerContainer');
let registerButton = $('#btnRegister');

// Open the register container
registerButton.click(function () {
    registerContainer.css('right', '0');
});

// Close the register container when clicking outside of it
$(document).on('click', function (event) {
    if (!registerContainer.is(event.target) && !registerButton.is(event.target) && registerContainer.has(event.target).length === 0) {
        registerContainer.css('right', '-400px');
    }
});

// User Register Using JWT Token
$('#register').click(function () {

    let registerObj = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        email: $('#email').val(),
        username: $('#username').val(),
        password: $('#password').val(),
        role: $('#role').val(),
    };

    $.ajax({
        type: 'POST',
        url: baseURL + 'auth/signup',
        contentType: 'application/json',
        data: JSON.stringify(registerObj),
        success: function (resp) {
            successAlert("User Registered Successfully...!");
        },
        error: function (error) {
            errorAlert("User Registered Error...!");
        }
    });
});
