var baseURL = "http://localhost:8080/shoes/api/v1/";

// Open the login container
$('#btnLogin').click(function () {
    $('#loginContainer').css('right', '0');
});

// Close the login container when clicking outside of it
$(document).click(function (event) {
    let loginContainer = $('#loginContainer');
    // Check if the click target is not within the login container
    if (!loginContainer.is(event.target) && !$('#btnLogin').is(event.target) && loginContainer.has(event.target).length === 0) {
        loginContainer.css('right', '-400px');
    }
});

// User Login Using JWT Token
$(document).ready(function () {
    $('#loginForm').submit(function (event) {
        event.preventDefault();

        let username = $('#loginUsername').val();
        let password = $('#loginPassword').val();

        $.ajax({
            type: 'POST',
            url: baseURL + 'auth/signin',
            contentType: 'application/json',
            data: JSON.stringify({ username: username, password: password }),
            success: function (resp) {
                console.log("User Login Successfully...!");
                document.cookie = `jwtToken=${resp.token}; path=/; max-age=86400`;
                window.location.href = './pages/Admin.html';
            },
            error: function (error) {
                console.log("User Login Error...!");
            }
        });
    });
});