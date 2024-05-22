/**
 * @author : Kavithma Thushal
 * @project : Hello-Shoes-FrontEnd
 * @since : 2:02 PM - 4/20/2024
 **/

let baseURL = "http://localhost:8080/shoes/api/v1/";

/** Login **/
$('#login').click(function () {

    let loginObj = {
        email: $('#loginEmail').val(),
        password: $('#loginPassword').val(),
    };

    $.ajax({
        type: 'POST',
        url: baseURL + 'auth/signin',
        contentType: 'application/json',
        data: JSON.stringify(loginObj),
        success: function (resp) {
            successAlert("Login Successfully...!");
            // localStorage.setItem('jwtToken', resp.token);    // Chromr
            document.cookie = `jwtToken=${resp.token}; path=/;`;    // Firefox
            window.location.href = '../pages/AdminPanel.html';
        },
        error: function (error) {
            errorAlert("Login Error...!");
        }
    });
});

/** Register **/
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
