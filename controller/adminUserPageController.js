$(document).ready(function () {
    $("#userNewPass").hide();
    $("#userNewPassLabel").hide();
    $("#userSave").prop("disabled", true);
    $("#userDelete").prop("disabled", true);
    $("#userUpdate").prop("disabled", true);
    $("#userClear").prop("disabled", true);


    $('#userTable').css({
        'max-height': '100px',
        'overflow-y': 'auto',
        'display': 'table-caption'
    });
    $('#user-thead').css({
        'width': '100%',
    });
    $('#user-thead>th').css({
        'width': 'calc(100%/2*1)'
    })
    $('#userTable>tr>td').css({
        'width': 'calc(100%/2*1)'
    });

});

const User_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const User_PASS_REGEX =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;
let us_vArray = new Array();
us_vArray.push({ field: $("#userName"), regEx: User_EMAIL_REGEX, error: $("#userIdError") });
us_vArray.push({ field: $("#userOldPassword"), regEx: User_PASS_REGEX, error: $("#userOldPasswordError") });

$("#userName").on("keydown keyup", function (e) {
    /*$("#userIdError").text("");
    $("#userName").css("border", "1px solid #ced4da");*/
    //adminEvents(e);
    $("#userClear").prop("disabled", true);
    $("#userSave").prop("disabled", true);
    $("#userUpdate").prop("disabled", true);
    if ($("#userName").val() !== "") {
        $("#userClear").prop("disabled", false);
    if (User_EMAIL_REGEX.test($("#userName").val())) {
        searchUserPanel($("#userName").val()).then(function (res) {
            $("#userIdError").text("");
            $("#userName").css("border", "2px solid green");
            if (!res) {
                $("#userNewPass").hide();
                $("#userNewPassLabel").hide();
                $("#userNewPass").val("");
                $("#userNewPassError").text("");
                $("#userNewPass").css("border", "1px solid #ced4da");
                $("#userDelete").prop("disabled", true);
                if ($("#userOldPassword").val() !== "") {
                    if (User_PASS_REGEX.test($("#userOldPassword").val())) {
                        $("#userSave").prop("disabled", false);
                        $("#userOldPasswordError").text("");
                    } else {
                        $("#userOldPasswordError").text("8 Chars - Uppercase,Lowercase,numbers");
                        $("#userSave").prop("disabled", true);
                    }
                }
            } else {
                const role = localStorage.getItem('role');
                if (role == "ADMIN"){
                    $("#userDelete").prop("disabled", false);
                }
                else if (role == "USER"){
                    userCheckToUpdate($("#userOldPassword").val());
                }

            }
            //captureClear();
        });
    } else {
        $("#userIdError").text("Not valid Email");
        $("#userName").css("border", "2px solid red");
    }
}else {
        $("#userIdError").text("");
        $("#userName").css("border", "1px solid #ced4da");
        $("#userClear").prop("disabled", true);
        $("#userNewPass").hide();
        $("#userNewPassLabel").hide();
        $("#userNewPass").val("");
        $("#userNewPassError").text("");
        $("#userNewPass").css("border", "1px solid #ced4da");
    }
});
$("#userOldPassword").on("keydown keyup", function (e) {
    /*$("#userOldPasswordError").text("");
    $("#userOldPassword").css("border", "1px solid #ced4da");*/
    if ($("#userOldPassword").val() !== "") {
        $("#userClear").prop("disabled", false);
        if (User_PASS_REGEX.test($("#userOldPassword").val())) {
            $("#userOldPasswordError").text("");
            $("#userOldPassword").css("border", "2px solid green");
            searchUserPanel($("#userName").val()).then(function (res) {
                const role = localStorage.getItem('role');
                if (!res) {
                    if (role == "ADMIN"){
                        $("#userSave").prop("disabled", false);
                        $("#userOldPasswordError").text("");
                        $("#userOldPassword").css("border", "1px solid #ced4da");
                    }
                }
                else {
                    userCheckToUpdate($("#userOldPassword").val());
                }
            });
        }
        else {
            $("#userOldPasswordError").text("8 Chars - Uppercase,Lowercase,numbers");
            $("#userOldPassword").css("border", "2px solid red");
            $("#userSave").prop("disabled", true);
        }
    } else {
        $("#userSave").prop("disabled", true);
        $("#userOldPasswordError").text("");
        $("#userOldPassword").css("border", "1px solid #ced4da")
        $("#userClear").prop("disabled", true);
        $("#userNewPass").hide();
        $("#userNewPassLabel").hide();
        $("#userNewPass").val("");
        $("#userNewPassError").text("");
        $("#userNewPass").css("border", "1px solid #ced4da");
    }
});
$("#userOldPassword").on("keydown keyup", function (e) {
    if ($("#userNewPass").is(":visible")){
        $("#userDelete").prop("disabled", false);
    }
    var password = $("#userOldPassword").val();
    userCheckToUpdate(password);
});

function searchUserPanel(name) {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/auth/search/" + name,
            method: "GET",
            dataType: "json",
            success: function (res, textStatus, xhr) {
                if (xhr.status === 200) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            },
            error: function (ob, textStatus, error) {
                resolve(false);
            }
        });
    });

}

function getUserDetail(name) {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/auth/search/" + name,
            method: "GET",
            dataType: "json",
            success: function (res, textStatus, xhr) {
                if (xhr.status === 200) {
                    resolve(res);
                } else {
                    resolve(false);
                }
            },
            error: function (ob, textStatus, error) {
                resolve(false);
            }
        });
    });

}

function userCheckToUpdate(oldPass) {
    searchUserPanel($("#userName").val()).then(function (user) {
        if (user) {
            if (User_PASS_REGEX.test($("#userOldPassword").val())) {
                const role = localStorage.getItem('role');
                if (role == "ADMIN"){
                    $("#userDelete").prop("disabled", false);
                    $("#userUpdate").prop("disabled", false);
                }else if (role == "USER"){
                    passwordCheck($("#userName").val(),oldPass).then(function (pass) {
                        if (pass) {
                            $("#userNewPass").show();
                            $("#userNewPassLabel").show();
                            $("#userDelete").prop("disabled", false);
                            $("#userUpdate").prop("disabled", true);

                        }else {
                            $("#userNewPass").hide();
                            $("#userNewPassLabel").hide();
                            $("#userDelete").prop("disabled", true);
                            $("#userUpdate").prop("disabled", true);
                        }
                    });
                }
                }else {
                    $("#userDelete").prop("disabled", true);
                    $("#userUpdate").prop("disabled", true);
                }
        }else {
            if (User_PASS_REGEX.test($("#userOldPassword").val())) {
                const role = localStorage.getItem('role');
                if (role == "ADMIN"){
                    $("#userSave").prop("disabled", false);
                }else if (role == "USER"){
                    $("#userSave").prop("disabled", true);
                }
            }else {
                $("#userSave").prop("disabled", true);
            }
        }
    });
}

$("#userNewPass").on("keydown keyup", function (e) {

    if ($("#userNewPass").val() !== "" && $("#userOldPassword").val() !== "") {
        var oldPass = $("#userOldPassword").val();
        var newPass = $("#userNewPass").val();
        searchUserPanel($("#userName").val()).then(function (user) {
            if (user) {
                passwordCheck($("#userName").val(), oldPass).then(function (pass) {
                    if (pass) {
                        passwordCheck($("#userName").val(), newPass).then(function (check) {
                            console.log(check)
                            if (!check && ADMIN_PASS_REGEX.test($("#userNewPass").val())) {
                                $("#userDelete").prop("disabled", false);
                                $("#userUpdate").prop("disabled", false);
                            } else {
                                $("#userUpdate").prop("disabled", true);
                            }
                        });
                    }
                });
            }
        });
    }
});
$("#userSave").click(function () {
    saveUser();
});
$("#userUpdate").click(function () {
    console.log("update")
    searchUserPanel($("#userName").val()).then(function (user) {
        if (user) {
            swal("Do you really want to update this user.?", {
                buttons: {
                    cancel1: {
                        text: "Cancel",
                        className: "custom-cancel-btn",
                    },
                    ok: {
                        text: "OK",
                        value: "confirm",
                        className: "custom-ok-btn",
                    }
                },
            }).then((con) => {
                if (con === "confirm") {
                    const role = localStorage.getItem('role');
                    let password ;
                    if (role == "ADMIN"){
                        password = $("#userOldPassword").val();
                    }else if (role == "USER"){
                        password = $("#userNewPass").val();
                    }
                    let value = {
                        email: $("#userName").val(),
                        password: password,
                        role: $('#userRole').val()
                    }
                    console.log(value);
                    $.ajax({
                        url: "http://localhost:8080/helloshoes/api/v1/auth/user",
                        method: "PUT",
                        data: JSON.stringify(value),
                        contentType: "application/json",
                        success: function (res, textStatus, jsXH) {
                            swal("Updated", "User Update Successfully", "success");
                            const email = localStorage.getItem('email');
                            if ($("#userName").val() == email){
                                localStorage.setItem('password', password);
                            }
                            getAllUsers();
                            userClear();
                        },
                        error: function (ob, textStatus, error) {
                            swal("Error", textStatus + " : Error User Not Update", "error");
                        }
                    });
                }
            });
        } else {
            swal("Error", "User already exits.!", "error");
        }
    });
});
function saveUser() {
    searchUserPanel($("#userName").val()).then(function (user) {
        console.log("save 1")
        if (!user) {
            let value = {
                email: $("#userName").val(),
                password: $("#userOldPassword").val(),
                role: $('#userRole').val()
            }
            console.log(value);
            $.ajax({
                url: "http://localhost:8080/helloshoes/api/v1/auth/signup",
                method: "POST",
                data: JSON.stringify(value),
                contentType: "application/json",
                success: function (res, textStatus, jsXH) {
                    swal("Saved", "User Added Successfully", "success");
                    getAllUsers();
                    userClear();
                },
                error: function (ob, textStatus, error) {
                    swal("Error", textStatus + " : Error User Not Added", "error");
                }
            });

        } else {
            swal("Error", "Admin already exits.!", "error");
        }
    });
}

function bindUserTrrEvents() {
    $('#userTable>tr').click(function () {

        let name = $(this).children().eq(0).text();
        let role = $(this).children().eq(1).text();

        $("#userName").val(name);
        $("#userRole").val(role);

        const storedRole = localStorage.getItem('role');
        if (storedRole == "ADMIN"){
            $("#userDelete").prop('disabled', false);
        }
        //$("#userDelete").prop('disabled', false);
    });
}

function getAllUsers() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    $("#userTable").empty();
    $.ajax({
        url: "http://localhost:8080/helloshoes/api/v1/auth/getall/user",
        method: "GET",
        success: function (res) {
            console.log(res);
            for (var r of res) {
                let row = `<tr>
                    <th scope="row">${r.email}</th>
                    <td>${r.role}</td>
                    </tr>`;
                $("#userTable").append(row);
                /*$('#userTable').css({
                    'max-height': '100px',
                    'overflow-y': 'auto',
                    'display': 'table-caption'
                });
                $('#userTable>tr>td').css({
                    'width': 'calc(100%/2*1)'
                });
                $('#userTable > tr > td:nth-child(1),#adminTable > tr > td:nth-child(1)').css({
                    'width': '100%'
                });
                $('#userTable>tr').css({
                    'display': 'inline-table',
                    'width': '100%'
                });
*/

                $('#userTable').css({
                    'max-height': '100px',
                    'overflow-y': 'auto',
                    'display': 'table-caption'
                });
                $('#userTable>tr>td').css({
                    'width': 'calc(100%/2*1)'
                });
                $('#userTable > tr > td:nth-child(1),#userTable > tr > td:nth-child(1)').css({
                    'width': '100%'
                });
                $('#userTable>tr').css({
                    'display': 'inline-table',
                    'width': '100%'
                });

                if ($("#userTable>tr").length > 2) {
                    $('#userTable>tr> th,#userTable>tr > td').css({
                        'width': 'calc(100%/2*1)'
                    });
                    $('#userTable').css({
                        'max-height': '100px',
                        'overflow-y': 'auto',
                        'display': 'table-caption',
                        'width': '105%'
                    });
                    $('#userTable>tr').css({
                        'display': 'flex',
                    });
                }
                bindUserTrrEvents();
            }
        }
    });
}
$("#userDelete").click(function () {
    let id = $("#userName").val();

    searchUserPanel(id).then(function (isValid) {
        if (isValid == false) {
            swal("Error", "No such user..please check the ID", "error");
        } else {

            swal("Do you want to delete this user.?", {
                buttons: {
                    cancel1: {
                        text: "Cancel",
                        className: "custom-cancel-btn",
                    },
                    ok: {
                        text: "OK",
                        value: "confirm",
                        className: "custom-ok-btn",
                    }
                },
            }).then((value) => {
                if (value === "confirm") {
                    performAuthenticatedRequest();
                    const accessToken = localStorage.getItem('accessToken');
                    let value = {
                        email: $("#userName").val(),
                        password: $("#userOldPassword").val(),
                        role: "USER"
                    }
                    $.ajax({
                        url: "http://localhost:8080/helloshoes/api/v1/auth/user",
                        method: "DELETE",
                        data: JSON.stringify(value),
                        contentType: "application/json",
                        success: function (res) {
                            console.log(res);
                            swal("Deleted", "User Delete Successfully", "success");
                            userClear();
                            getAllUsers();
                            //captureClear();
                            //setBtn();
                        },
                        error: function (ob, textStatus, error) {
                            swal("Error", textStatus + "Error User Not Delete", "error");
                        }
                    });
                }
            });
        }
    });

    /*$("#customerID").prop('disabled', true);
    $("#customerName").prop('disabled', true);
    $("#customerAddress").prop('disabled', true);*/

});
$("#userClear").click(function () {
   userClear();
});
function userClear() {
    $("#userNewPass").hide();
    $("#userNewPassLabel").hide();
    $("#userNewPass").val("");
    $("#userNewPassError").text("");
    $("#userNewPass").css("border", "1px solid #ced4da");
    var ids = ["userName", "userIdError", "userOldPassword","userOldPasswordError"];
    ids.forEach(function(id) {
        $("#" + id).val("");
    });
    $("#userIdError").text("");
    $("#userOldPasswordError").text("");
    $("#userName").css("border", "1px solid #ced4da");
    $("#userOldPassword").css("border", "1px solid #ced4da");
    $("#userSave").prop("disabled", true);
    $("#userDelete").prop("disabled", true);
    $("#userUpdate").prop("disabled", true);
    $("#userClear").prop("disabled", true);
}