// Open the register container
$('#btnRegister').click(function () {
    $('#registerContainer').css('right', '0');
});

// Close the register container when clicking outside of it
$(document).click(function (event) {
    let registerContainer = $('#registerContainer');
    // Check if the click target is not within the register container
    if (!registerContainer.is(event.target) && !$('#btnRegister').is(event.target) && registerContainer.has(event.target).length === 0) {
        registerContainer.css('right', '-300px');
    }
});