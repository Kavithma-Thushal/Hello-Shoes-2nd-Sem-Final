$("#btnSignIn").click(function () {
    signIn();
});
$(document).ready(function () {
    $("#btnSignIn").prop("disabled", true);
});
$("#log-in-Password").on("keydown keyup", function (e) {
    $("#btnSignIn").prop("disabled", true);
    if ($("#log-in-Password").val() !== "") {
        passwordCheck($("#log-in-Username").val(),$("#log-in-Password").val()).then(function (pass) {
            if (pass) {
                $("#log-in-PasswordError").text("");
                $("#log-in-Password").css("border", "2px solid green");

                if ($("#log-in-Username").val() !== "") {
                    searchUserPanel($("#log-in-Username").val()).then(function (res) {
                        if (res) {
                            $("#log-in-UsernameError").text("");
                            $("#log-in-Username").css("border", "2px solid green");
                            $("#btnSignIn").prop("disabled", false);
                        } else {
                            $("#log-in-UsernameError").text("Invalid User Name");
                            $("#log-in-Username").css("border", "2px solid red");
                            $("#btnSignIn").prop("disabled", true);
                        }

                    });
                } else {
                    $("#log-in-UsernameError").text("");
                    $("#log-in-Username").css("border", "1px solid #ced4da");
                }
            } else {
                $("#log-in-PasswordError").text("Invalid password");
                $("#log-in-Password").css("border", "2px solid red");
                $("#btnSignIn").prop("disabled", true);
            }
        });
    }else {
            $("#log-in-PasswordError").text("");
            $("#log-in-Password").css("border", "1px solid #ced4da");
        }
});
$("#log-in-Username").on("keydown keyup", function (e) {

    $("#btnSignIn").prop("disabled", true);
    if ($("#log-in-Username").val() !== "") {
            searchUserPanel($("#log-in-Username").val()).then(function (res) {
                if (res) {
                    $("#log-in-UsernameError").text("");
                    $("#log-in-Username").css("border", "2px solid green");
                    passwordCheck($("#log-in-Username").val(),$("#log-in-Password").val()).then(function (pass) {
                        if (pass) {
                            $("#log-in-PasswordError").text("");
                            $("#log-in-Password").css("border", "2px solid green");
                            $("#btnSignIn").prop("disabled", false);

                        }else {
                            $("#log-in-PasswordError").text("Invalid password");
                            $("#log-in-Password").css("border", "2px solid red");
                            $("#btnSignIn").prop("disabled", true);
                        }
                    });
                }
                else {
                    $("#log-in-UsernameError").text("Invalid Username");
                    $("#log-in-Username").css("border", "2px solid red");
                }
            });
    } else {
        $("#log-in-UsernameError").text("");
        $("#log-in-Username").css("border", "1px solid #ced4da");
    }
});
function signIn() {
    let value = {
        email: $("#log-in-Username").val(),
        password: $("#log-in-Password").val(),
    }
    console.log(value);
    $.ajax({
        url: "http://localhost:8080/helloshoes/api/v1/auth/signin",
        method: "POST",
        data: JSON.stringify(value),
        contentType: "application/json",
        success: function (res, textStatus, jsXH) {
            localStorage.setItem('email', value.email);
            localStorage.setItem('password', value.password);
            localStorage.setItem('accessToken', res.token);
            console.log("User SignIn Successfully "+res.token);
            performAuthenticatedRequest();
            const accessToken = localStorage.getItem('accessToken');
            //need check admin or user
            $.ajax({
                url: "http://localhost:8080/helloshoes/api/v1/auth/search/" + value.email,
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                dataType: "json",
                success: function (res, textStatus, xhr) {
                    localStorage.setItem('role', res.role);
                    localStorage.setItem('cashier', value.email);
                    if (res.role === "ADMIN") {
                        userlimitOff();
                        allContainerHide();
                        showAlert("Admin");
                        adminPage.css('display','block');
                        adminDashboard.css('display','block');
                        setAdminPanel();
                        $("#formIcon").text("Admin Panel");
                        logInPage.css('display','none');
                    } else if(res.role === "USER"){
                        userLimits();
                        allContainerHide();
                        showAlert("User");
                        userPage.css('display','block');
                        userDashboard.css('display','block');
                        $("#userFormIcon").text("Dashboard");
                        logInPage.css('display','none');
                    }
                },
                error: function (ob, textStatus, error) {
                    swal("Error","Error Sign in", "error");
                }
            });

        },
        error: function (ob, textStatus, error) {
            swal("Error", "Error Sign in", "error");
        }
    });

};

function isTokenExpired(token) {
    const jwtPayload = JSON.parse(atob(token.split('.')[1]));
    const expiryTime = jwtPayload.exp * 1000;
    return Date.now() >= expiryTime;
}
function performAuthenticatedRequest() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken || isTokenExpired(accessToken)) {
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/auth/signin",
            method: "POST",
            data: JSON.stringify({
                email: localStorage.getItem('email'),
                password: localStorage.getItem('password'),
            }),
            contentType: "application/json",
            success: function (res, textStatus, jsXH) {
                localStorage.setItem('accessToken', res.token);
                console.log("sign in Successfully "+res.token);
            },
            error: function (ob, textStatus, error) {
                console.log("token renew sign in error "+accessToken);
            }
        });
    } else {

    }
}

