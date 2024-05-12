/**
 * @author : Kavithma Thushal
 * @project : Hello-Shoes-FrontEnd
 * @since : 2:02 PM - 4/20/2024
 **/

let loginContainer = $('#loginContainer');
let loginButton = $('#btnLogin');

// Open the login container
loginButton.click(function () {
    loginContainer.css('right', '0');
});

// Close the login container when clicking outside of it
$(document).click(function (event) {
    if (!loginContainer.is(event.target) && !loginButton.is(event.target) && loginContainer.has(event.target).length === 0) {
        loginContainer.css('right', '-400px');
    }
});

// User Login Using JWT Token
$('#login').click(function () {

    let loginObj = {
        username: $('#loginUsername').val(),
        password: $('#loginPassword').val(),
    };

    $.ajax({
        type: 'POST',
        url: baseURL + 'auth/signin',
        contentType: 'application/json',
        data: JSON.stringify(loginObj),
        success: function (resp) {
            successAlert("User Login Successfully...!");
            localStorage.setItem('jwtToken', resp.token);
            // document.cookie = `jwtToken=${resp.token}; path=/;`;
            window.location.href = './pages/Admin.html';
        },
        error: function (error) {
            errorAlert("User Login Error...!");
        }
    });
});
