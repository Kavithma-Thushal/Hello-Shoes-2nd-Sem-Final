/** User Service **/
$('#btnSaveUserDetails').click(function () {
    const userServiceObject = {
        email: $('#txtEmail').val(),
        password: $('#txtPassword').val(),
        role: $('#txtRole').val()
    };

    $.ajax({
        url: baseURL + 'userService',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(userServiceObject),
        success: function (resp) {
            successAlert(resp);
        },
        error: function (resp) {
            errorAlert(resp);
        }
    });
});
