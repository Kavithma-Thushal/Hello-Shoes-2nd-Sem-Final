/**
 * @author : Kavithma Thushal
 * @project : Hello-Shoes-FrontEnd
 * @since : 2:02 PM - 4/20/2024
 **/

let loginContainer = $('#loginContainer');
let loginButton = $('#btnLogin');

/** Open the Login Container **/
loginButton.click(function () {
    loginContainer.css('right', '0');
});

 /** Close the login container when clicking outside of it **/
$(document).click(function (event) {
    if (!loginContainer.is(event.target) && !loginButton.is(event.target) && loginContainer.has(event.target).length === 0) {
        loginContainer.css('right', '-400px');
    }
});

 /** User Login Using JWT Token **/
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
