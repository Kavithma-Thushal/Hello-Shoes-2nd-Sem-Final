/**
 * @author : Kavithma Thushal
 * @project : Hello-Shoes-FrontEnd
 * @since : 2:02 PM - 4/20/2024
 **/

$(document).ready(function () {
    $('#logout').click(function () {
        successAlert("User Logout Successfully...!");
        // localStorage.removeItem('jwtToken');    // Chrome
        document.cookie = 'jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';   // FireFox
        window.location.href = '../index.html';
    });
});