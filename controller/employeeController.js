$(document).ready(function () {
    empFieldSet(true);
    $("#empSave").prop("disabled", true);
    $("#empDelete").prop("disabled", true);
    $("#empUpdate").prop("disabled", true);
    $("#empSearch").prop("disabled", true);
    $("#empClear").prop("disabled", true);

});
$('#empCaptureButton').click(function () {
    let text = $(this).text();
    var video = $('#empVideo')[0];
    var canvas = $('#empCanvas')[0];
    var capturedImage = $('#empCapturedImage');

    var constraints = {
        video: true
    };

    if (text === "Capture") {
        $("#empClear").prop("disabled", false);
        $(this).text("Take Picture");
        $(this).css("background-color", "#dc3545");
        $(this).css("border-color", "#dc3545");
        $(video).show();
        capturedImage.hide();

        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                empVideoStream = stream;
                video.srcObject = stream;
            })
            .catch((error) => {
                console.error('Error accessing webcam:', error);
            });
    } else if (text === "Take Picture") {
        $("#empClear").prop("disabled", false);
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageDataUrl = canvas.toDataURL('image/png');
        capturedImage.attr('src', imageDataUrl);
        capturedImage.show();
        $(this).css("background-color", "#007bff");
        $(this).css("border-color", "#007bff");
        $(this).text("Capture");
        stopEmpWebcamStream();
        $(video).hide();
    }
});

function stopEmpWebcamStream() {
    if (empVideoStream) {
        const tracks = empVideoStream.getTracks();
        tracks.forEach(track => track.stop());
        empVideoStream = null;
    }
}

$('#empAdd').click(function () {
    empFieldSet(false);
    $(this).find("#empId").focus();
    generateEmployeeId();
    //setEmpClBtn();
});

function empFieldSet(state) {
    em_vArray.forEach(function(item) {
        item.field.prop('disabled', state);
    });
    $(this).find("#empId").focus();
    //generateEmployeeId();
    setEmpClBtn();
}

function returnAllEmpVal() {
    var image = $("#empCapturedImage");
    var imageUrl = image.attr('src');
    var formData = {
        employeeId: $("#empId").val(),
        employeeName: $("#empName").val(),
        gender: $("#empGender").val(),
        employeeStatus: $("#empStatus").val(),
        designation: $("#designation").val(),
        role: $("#empRole").val(),
        employeeDob: $("#empDob").val(),
        joinDate: $("#joinDate").val(),
        branch: $("#empBranch").val(),
        address: {
            buildNo: $("#empBuildNo").val(),
            lane: $("#empLane").val(),
            city: $("#empCity").val(),
            state: $("#empState").val(),
            postalCode: $("#empPostalCode").val()
        },
        contactNo: $("#empContactNo").val(),
        email: $("#empEmail").val(),
        guardianName: $("#guardianName").val(),
        emergencyContact: $("#emergencyContact").val(),
        proPic: imageUrl
    };

    return formData;
}
function setAllEmpVal(ar) {
    console.log(ar)
    $("#empName").val(ar.employeeName);
    $("#empBuildNo").val(ar.address.buildNo);
    $("#empLane").val(ar.address.lane);
    $("#empCity").val(ar.address.city);
    $("#empState").val(ar.address.state);
    $("#empPostalCode").val(ar.address.postalCode);
    $("#empEmail").val(ar.email);
    $("#empDob").val(ar.employeeDob);
    $("#empGender").val(ar.gender);
    $("#empContactNo").val(ar.contactNo);
    $("#empStatus").val(ar.employeeStatus);
    $("#designation").val(ar.designation);
    $("#empRole").val(ar.role);
    $("#joinDate").val(ar.joinDate);
    $("#empBranch").val(ar.branch);
    $("#guardianName").val(ar.guardianName);
    $("#emergencyContact").val(ar.emergencyContact);
    $("#empCapturedImage").attr('src', ar.proPic);
}

//getAllEmployees();
$("#empSave").click(function () {

    if (checkAllEmp()) {
        var image = $("#empCapturedImage");
        var imageUrl = image.attr('src');
        if (!imageUrl) {
            //alert("Error");
            swal("Error", "Take Employee Photo.!", "error");
        } else {
            saveEmployee();
        }
    } else {
        alert("Error");
        swal("Error", "Error Employee Save.!", "error");
    }
});

function generateEmployeeId() {
    loadEmpId().then(function (id) {
        $("#empId").val(id);
    }).catch(function (error) {
        console.error("Error loading Employee Id:", error);
    });
}

function loadEmpId() {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        var ar;
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/employee/getGenId",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function (res) {
                console.log(res);
                ar = res;
                resolve(ar);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

function loadEmpAr() {
    return new Promise(function (resolve, reject) {
        var ar;
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/employee/getAll",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function (res) {
                console.log(res);
                ar = res;
                resolve(ar);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}


function bindEmpTrrEvents() {
    $('#employeeTable>tr').click(function () {
        var employeeId = $(this).children().eq(0).text();
        var employeeName = $(this).children().eq(1).text();
        var gender = $(this).children().eq(2).text();
        var employeeDob = $(this).children().eq(3).text();
        var employeeStatus = $(this).children().eq(4).text();
        var contactNo = $(this).children().eq(5).text();
        var email = $(this).children().eq(6).text();
        var branch = $(this).children().eq(7).text();
        var designation = $(this).children().eq(8).text();
        var role = $(this).children().eq(9).text();
        var joinDate = $(this).children().eq(10).text();
        var guardianName = $(this).children().eq(11).text();
        var emergencyContact = $(this).children().eq(12).text();
        var buildNo = $(this).children().eq(13).text();
        var lane = $(this).children().eq(14).text();
        var city = $(this).children().eq(15).text();
        var state = $(this).children().eq(16).text();
        var postalCode = $(this).children().eq(17).text();


        $("#empId").val(employeeId);
        $("#empName").val(employeeName);
        $("#empBuildNo").val(buildNo);
        $("#empLane").val(lane);
        $("#empCity").val(city);
        $("#empState").val(state);
        $("#empPostalCode").val(postalCode);
        $("#empEmail").val(email);
        $("#empDob").val(employeeDob);
        $("#empGender").val(gender);
        $("#empContactNo").val(contactNo);
        $("#empStatus").val(employeeStatus);
        $("#designation").val(designation);
        $("#empRole").val(role);
        $("#joinDate").val(joinDate);
        $("#empBranch").val(branch);
        $("#guardianName").val(guardianName);
        $("#emergencyContact").val(emergencyContact);

        setEmpBtn();
        searchEmployee(employeeId).then(function (res){
            empCaptureClear();
            $("#empCapturedImage").attr('src', res.proPic);

        });
        $("#empListLabelSp").text(employeeId);
        $("#empListLabel").text(" selected, Back to view details");
    });
}

$("#empDelete").click(function () {
    let id = $("#empId").val();

    validEmployee(id).then(function (isValid) {
        if (isValid == false) {
            swal("Error", "No such Employee..please check the ID", "error");
            clearEmpInputFields();
        } else {

            swal("Do you want to delete this Employee.?", {
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
                    $.ajax({
                        url: "http://localhost:8080/helloshoes/api/v1/employee?empId=" + id,
                        method: "DELETE",
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        },
                        success: function (res) {
                            console.log(res);
                            swal("Deleted", "Employee Delete Successfully", "success");
                            clearEmpInputFields();
                            empCaptureClear();
                            getAllEmployees();
                            setEmpBtn();
                        },
                        error: function (ob, textStatus, error) {
                            swal("Error", textStatus + "Error Employee Not Delete", "error");
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

$("#empUpdate").click(function () {
    let id = $("#empId").val();
    validEmployee(id).then(function (isValid) {
        if (isValid) {
            swal("Do you really want to update this employee.?", {
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
                    var data = returnAllEmpVal();
                    performAuthenticatedRequest();
                    const accessToken = localStorage.getItem('accessToken');
                    console.log(data)
                    $.ajax({
                        url: "http://localhost:8080/helloshoes/api/v1/employee",
                        method: "PUT",
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        },
                        data: JSON.stringify(data),
                        contentType: "application/json",
                        success: function (res) {
                            console.log(res);
                            //alert("Customer Update Successfully")
                            swal("Updated", "Employee Update Successfully", "success");
                            empCaptureClear();
                            getAllEmployees();
                            setEmpBtn();
                        },
                        error: function (ob, textStatus, error) {
                            //alert(textStatus+" : Error Customer Not Update");
                            swal("Error", textStatus + "Error Employee Not Update", "error");
                        }
                    });
                    /* $("#customerID").prop('disabled', true);
                     $("#customerName").prop('disabled', true);
                     $("#customerAddress").prop('disabled', true);
                     clearCustomerInputFields();*/
                }
            });

        } else {
            swal("Error", "No such Employee..please check the ID", "error");
            /*alert("No such Customer..please check the ID");*/
        }
    });

});

function saveEmployee() {
    let id = $("#empId").val();
    validEmployee(id).then(function (isValid) {
        console.log(isValid)
        if (!isValid) {
            console.log(isValid);
            var formData = returnAllEmpVal();
            performAuthenticatedRequest();
            const accessToken = localStorage.getItem('accessToken');
            console.log(formData);
            console.log(accessToken);
            $.ajax({
                url: "http://localhost:8080/helloshoes/api/v1/employee",
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                data: JSON.stringify(formData),
                contentType: "application/json",
                success: function (res, textStatus, jsXH) {
                    console.log(res);
                    // alert("Customer Added Successfully");
                    swal("Saved", "Employee Added Successfully", "success");
                    generateEmployeeId();
                    getAllEmployees();
                    setEmpBtn();
                },
                error: function (ob, textStatus, error) {
                    //alert(textStatus + " : Error Customer Not Added")
                    swal("Error", textStatus + " : Error Employee Not Added", "error");
                }
            });


        } else {
            //alert("Customer already exits.!");
            swal("Error", "Employee already exits.!", "error");
            clearEmpInputFields();
        }
    });
}

function getAllEmployees() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    $("#employeeTable").empty();
    $.ajax({
        url: "http://localhost:8080/helloshoes/api/v1/employee/getAll",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (res) {
            console.log(res);
            for (var r of res) {
                let row = `<tr>
                    <th scope="row">${r.employeeId}</th>
                    <td>${r.employeeName}</td>
                    <td>${r.gender}</td>
                    <td>${r.employeeDob}</td> 
                    <td>${r.employeeStatus}</td>
                    <td>${r.contactNo}</td>
                    <td>${r.email}</td>
                    <td>${r.branch}</td>
                    <td>${r.designation}</td>
                    <td>${r.role}</td>
                    <td>${r.joinDate}</td>
                    <td>${r.guardianName}</td>
                    <td>${r.emergencyContact}</td>
                    <td>${r.address.buildNo}</td>
                    <td>${r.address.lane}</td>
                    <td>${r.address.city}</td>
                    <td>${r.address.state}</td>
                    <td>${r.address.postalCode}</td>
                </tr>`;

                $("#employeeTable").append(row);
                bindEmpTrrEvents();
            }
        }
    });
}

function validEmployee(id) {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/employee/search/" + id,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (res, textStatus, xhr) {
                console.log(res);
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

function searchEmployee(id) {
    console.log(id);
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/employee/search/" + id,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (res) {
                console.log(res);
                resolve(res);
            },
            error: function (ob, textStatus, error) {
                resolve(error);
            }
        });
    });
}

$('#empSearch').click(function () {
    let id = $("#empId").val();
    searchEmployee(id).then(function (res) {
        setAllEmpVal(res);
        empCaptureClear();
        $("#empCapturedImage").attr('src', res.proPic);
    });
    setEmpClBtn();
    setEmpBtn();
});
$('#backToEmp').click(function () {
    empList.css('display', 'none');
    empMain.css('display', 'block');
    employeePage.css('display', 'block');
});