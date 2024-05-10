$(document).ready(function () {
    $('#logout').click(function () {
        successAlert("User Logout Successfully...!");
        localStorage.removeItem('jwtToken');
        // document.cookie = 'jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = '../index.html';
    });
});