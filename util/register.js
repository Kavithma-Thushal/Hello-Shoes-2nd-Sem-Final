/**
 * @author : Kavithma Thushal
 * @project : Hello-Shoes-FrontEnd
 * @since : 2:02 PM - 4/20/2024
 **/

let baseURL = "http://localhost:8080/shoes/api/v1/";
let registerContainer = $('#registerContainer');
let registerButton = $('#btnRegister');

/** Open the Register Container **/
registerButton.click(function () {
    registerContainer.css('right', '0');
});

/** Close the register container when clicking outside of it **/
$(document).on('click', function (event) {
    if (!registerContainer.is(event.target) && !registerButton.is(event.target) && registerContainer.has(event.target).length === 0) {
        registerContainer.css('right', '-400px');
    }
});

 /** User Register Using JWT Token **/
$('#register').click(function () {

    let registerObj = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        email: $('#email').val(),
        password: $('#password').val(),
        role: $('#role').val(),
    };

    $.ajax({
        type: 'POST',
        url: baseURL + 'auth/signup',
        contentType: 'application/json',
        data: JSON.stringify(registerObj),
        success: function (resp) {
            successAlert("Registered Successfully...!");
        },
        error: function (error) {
            errorAlert("Registered Error...!");
        }
    });
});
