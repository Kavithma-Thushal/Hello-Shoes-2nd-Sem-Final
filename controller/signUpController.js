$("#signup-page-signup").click(function () {
    signUp();

});
$(document).ready(function () {
    $("#signup-page-signup").prop("disabled", true);
});
function signUp() {
    let value = {
        email: $("#inputEmail").val(),
        password: $("#reInputPassword").val(),
        role: $('#inputRole').val()
    }
    console.log(value);
    $.ajax({
        url: "http://localhost:8080/helloshoes/api/v1/auth/signup",
        method: "POST",
        data: JSON.stringify(value),
        contentType: "application/json",
        success: function (res, textStatus, jsXH) {
            localStorage.setItem('accessToken', res.token);
            console.log(res);
            swal("Saved", "User Added Successfully", "success");
            $("#inputEmailError").text("");
            $("#inputEmail").css("border", "1px solid #ced4da");
            $("#inputPasswordError").text("");
            $("#inputPassword").css("border", "1px solid #ced4da");
            $("#reInputPasswordError").text("");
            $("#reInputPassword").css("border", "1px solid #ced4da");
            $("#signup-page-signup").prop("disabled", true);
            $("#inputEmail").val("");
            $("#inputPassword").val("");
            $("#reInputPassword").val("");
        },
        error: function (ob, textStatus, error) {
            swal("Error","Error User Not Added", "error");
        }
    });

};

$("#inputPassword").on("keydown keyup", function (e) {
    $("#signup-page-signup").prop("disabled", true);
    if ($("#inputPassword").val() !== "") {
        if (User_PASS_REGEX.test($("#inputPassword").val())) {
                $("#inputPasswordError").text("");
                $("#inputPassword").css("border", "2px solid green");

                if ($("#inputEmail").val() !== "") {
                    searchUserPanel($("#inputEmail").val()).then(function (res) {
                        if (res) {
                            $("#inputEmailError").text("Invalid User Name");
                            $("#inputEmail").css("border", "2px solid red");
                            $("#signup-page-signup").prop("disabled", true);
                        } else {
                            if ($("#reInputPassword").val() !== "") {
                                if (User_PASS_REGEX.test($("#reInputPassword").val())) {
                                    if ($("#reInputPassword").val() === $("#inputPassword").val()){
                                        $("#reInputPasswordError").text("");
                                        $("#reInputPassword").css("border", "2px solid green");
                                        $("#signup-page-signup").prop("disabled", false);
                                    }else {
                                        $("#reInputPasswordError").text("Password not match");
                                        $("#reInputPassword").css("border", "2px solid red");
                                        $("#signup-page-signup").prop("disabled", true);
                                    }

                                } else {
                                    $("#reInputPasswordError").text("8 Chars - Uppercase,Lowercase,numbers");
                                    $("#reInputPassword").css("border", "2px solid red");
                                    $("#signup-page-signup").prop("disabled", true);
                                }
                            }else {
                                $("#reInputPasswordError").text("");
                                $("#reInputPassword").css("border", "1px solid #ced4da");
                            }
                        }

                    });
                } else {
                    $("#inputEmailError").text("");
                    $("#inputEmail").css("border", "1px solid #ced4da");
                }
            } else {
                $("#inputPasswordError").text("8 Chars - Uppercase,Lowercase,numbers");
                $("#inputPassword").css("border", "2px solid red");
                $("#signup-page-signup").prop("disabled", true);
            }
    }else {
        $("#inputPasswordError").text("");
        $("#inputPassword").css("border", "1px solid #ced4da");
    }
});
$("#reInputPassword").on("keydown keyup", function (e) {
    $("#signup-page-signup").prop("disabled", true);
    if ($("#reInputPassword").val() !== "") {
        if (User_PASS_REGEX.test($("#reInputPassword").val())) {
            $("#reInputPasswordError").text("");
            $("#reInputPassword").css("border", "2px solid green");

            if ($("#inputEmail").val() !== "") {
                searchUserPanel($("#inputEmail").val()).then(function (res) {
                    if (res) {
                        $("#inputEmailError").text("Invalid User Name");
                        $("#inputEmail").css("border", "2px solid red");
                        $("#signup-page-signup").prop("disabled", true);
                    } else {
                        if ($("#inputPassword").val() !== "") {
                            if (User_PASS_REGEX.test($("#inputPassword").val())) {
                                if ($("#reInputPassword").val() === $("#inputPassword").val()){
                                    $("#reInputPasswordError").text("");
                                    $("#reInputPassword").css("border", "2px solid green");
                                    $("#signup-page-signup").prop("disabled", false);
                                }else {
                                    $("#reInputPasswordError").text("Password not match");
                                    $("#reInputPassword").css("border", "2px solid red");
                                    $("#signup-page-signup").prop("disabled", true);
                                }

                            } else {
                                $("#inputPasswordError").text("8 Chars - Uppercase,Lowercase,numbers");
                                $("#inputPassword").css("border", "2px solid red");
                                $("#signup-page-signup").prop("disabled", true);
                            }
                        }else {
                            $("#inputPasswordError").text("");
                            $("#inputPassword").css("border", "1px solid #ced4da");
                        }
                    }

                });
            } else {
                $("#inputEmailError").text("");
                $("#inputEmail").css("border", "1px solid #ced4da");
            }
        } else {
            $("#reInputPasswordError").text("8 Chars - Uppercase,Lowercase,numbers");
            $("#reInputPassword").css("border", "2px solid red");
            $("#signup-page-signup").prop("disabled", true);
        }
    }else {
        $("#reInputPasswordError").text("");
        $("#reInputPassword").css("border", "1px solid #ced4da");
    }

});
$("#inputEmail").on("keydown keyup", function (e) {
    $("#signup-page-signup").prop("disabled", true);
    if ($("#inputEmail").val() !== "") {
        if (User_EMAIL_REGEX.test($("#inputEmail").val())) {
            $("#inputEmailError").text("");
            $("#inputEmail").css("border", "2px solid green");

            searchUserPanel($("#inputEmail").val()).then(function (res) {
                if (res) {
                    $("#inputEmailError").text("Invalid User Name");
                    $("#inputEmail").css("border", "2px solid red");
                    $("#signup-page-signup").prop("disabled", true);
                } else {
                    if ($("#reInputPassword").val() !== "") {
                        if (User_PASS_REGEX.test($("#reInputPassword").val())) {
                            if ($("#reInputPassword").val() === $("#inputPassword").val()) {
                                $("#reInputPasswordError").text("");
                                $("#reInputPassword").css("border", "2px solid green");
                                $("#signup-page-signup").prop("disabled", false);
                            } else {
                                $("#reInputPasswordError").text("Password not match");
                                $("#reInputPassword").css("border", "2px solid red");
                                $("#signup-page-signup").prop("disabled", true);
                            }

                        } else {
                            $("#reInputPasswordError").text("8 Chars - Uppercase,Lowercase,numbers");
                            $("#reInputPassword").css("border", "2px solid red");
                            $("#signup-page-signup").prop("disabled", true);
                        }
                    } else {
                        $("#reInputPasswordError").text("");
                        $("#reInputPassword").css("border", "1px solid #ced4da");
                    }
                }

            });
        }else {
            $("#inputEmailError").text("Invalid username");
            $("#inputEmail").css("border", "2px solid red");
            $("#signup-page-signup").prop("disabled", true);
        }
    } else {
        $("#inputEmailError").text("");
        $("#inputEmail").css("border", "1px solid #ced4da");
    }
});
