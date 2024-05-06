$(document).ready(function () {
    $('#logout').click(function (event) {
        event.preventDefault();
        successAlert("User Logout Successfully...!");
        document.cookie = 'jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = '../index.html';
    });
});