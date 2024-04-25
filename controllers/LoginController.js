// Open the login container
$('#btnLogin').click(function () {
    $('#loginContainer').css('right', '0');
});

// Close the login container when clicking outside of it
$(document).click(function (event) {
    let loginContainer = $('#loginContainer');
    // Check if the click target is not within the login container
    if (!loginContainer.is(event.target) && !$('#btnLogin').is(event.target) && loginContainer.has(event.target).length === 0) {
        loginContainer.css('right', '-300px');
    }
});