$(document).ready(function () {
    let baseURL = "http://localhost:8080/shoes/api/v1/";
    let loginContainer = $('#loginContainer');
    let loginButton = $('#btnLogin');

    // Open the login container
    loginButton.click(function (event) {
        loginContainer.css('right', '0');
    });

    // Close the login container when clicking outside of it
    $(document).click(function (event) {
        if (!loginContainer.is(event.target) && !loginButton.is(event.target) && loginContainer.has(event.target).length === 0) {
            loginContainer.css('right', '-400px');
        }
    });

    // User Login Using JWT Token
    $('#loginForm').submit(function (event) {
        event.preventDefault();

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
                document.cookie = `jwtToken=${resp.token}; path=/; max-age=86400`;
                window.location.href = './pages/Admin.html';
            },
            error: function (error) {
                errorAlert("User Login Error...!");
            }
        });
    });
});
