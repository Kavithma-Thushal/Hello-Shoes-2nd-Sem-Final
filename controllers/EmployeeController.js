/**
 * @author : Kavithma Thushal
 * @project : Hello-Shoes-FrontEnd
 * @since : 2:02 PM - 4/20/2024
 **/

loadAllEmployees();

/** Save Employee **/
$('#btnSaveEmployee').click(function () {
    const fileInput = $('#txtEmpPicture')[0];
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
        let employeeObj = {
            id: $('#txtEmpId').val(),
            name: $('#txtEmpName').val(),
            picture: reader.result,
            gender: $('#txtEmpGender').val(),
            civilStatus: $('#txtEmpStatus').val(),
            designation: $('#txtEmpDesignation').val(),
            role: $('#txtEmpRole').val(),
            dob: $('#txtEmpDOB').val(),
            joinDate: $('#txtEmpJoinDate').val(),
            branch: $('#txtEmpBranch').val(),
            addressLine1: $('#txtEmpAddressLine1').val(),
            addressLine2: $('#txtEmpAddressLine2').val(),
            addressLine3: $('#txtEmpAddressLine3').val(),
            addressLine4: $('#txtEmpAddressLine4').val(),
            addressLine5: $('#txtEmpAddressLine5').val(),
            contactNo: $('#txtEmpContactNo').val(),
            email: $('#txtEmpEmail').val(),
            emergencyGuardian: $('#txtEmpEmergencyGuardian').val(),
            emergencyNo: $('#txtEmpEmergencyNo').val()
        };

        $.ajax({
            url: baseURL + 'employee',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(employeeObj),
            headers: {
                Authorization: 'Bearer ' + jwtToken
            },
            success: function (resp) {
                successAlert(resp.message);
                loadAllEmployees();
            },
            error: function (error) {
                errorAlert(error.responseJSON.message);
            }
        });
    };
});

/** Search Employee **/
$('#btnSearchEmployee').click(function () {
    searchEmployee();
});
$("#txtSearchEmployee").on("keypress", function (event) {
    if (event.which === 13) {
        searchEmployee();
    }
});
function searchEmployee() {
    let id = $("#txtSearchEmployee").val();

    $.ajax({
        url: baseURL + 'employee/searchEmployee/' + id,
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + jwtToken
        },
        success: function (resp) {
            $("#tblEmployees").empty();
            let row = $("<tr>");
            row.append($("<td>").text(resp.id));
            row.append($("<td>").text(resp.name));
            row.append($("<td>").append($("<img>", { src: resp.picture, style: "max-width: 100px; max-height: 100px; border-radius:10px" })));
            row.append($("<td>").text(resp.gender));
            row.append($("<td>").text(resp.civilStatus));
            row.append($("<td>").text(resp.designation));
            row.append($("<td>").text(resp.role));
            row.append($("<td>").text(resp.dob));
            row.append($("<td>").text(resp.joinDate));
            row.append($("<td>").text(resp.branch));
            row.append($("<td>").text(resp.addressLine1));
            row.append($("<td>").text(resp.addressLine2));
            row.append($("<td>").text(resp.addressLine3));
            row.append($("<td>").text(resp.addressLine4));
            row.append($("<td>").text(resp.addressLine5));
            row.append($("<td>").text(resp.contactNo));
            row.append($("<td>").text(resp.email));
            row.append($("<td>").text(resp.emergencyGuardian));
            row.append($("<td>").text(resp.emergencyNo));
            $("#tblEmployees").append(row);

            clearEmployeeInputFields();
            employeeTableListener();
        },
        error: function (error) {
            emptyMessage(error.responseJSON.message);
            loadAllEmployees();
        }
    });
}

/** Update Employee **/
$('#btnUpdateEmployee').click(function () {
    const fileInput = $('#txtEmpPicture')[0];
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
        let employeeObj = {
            id: $('#txtEmpId').val(),
            name: $('#txtEmpName').val(),
            picture: reader.result,
            gender: $('#txtEmpGender').val(),
            civilStatus: $('#txtEmpStatus').val(),
            designation: $('#txtEmpDesignation').val(),
            role: $('#txtEmpRole').val(),
            dob: $('#txtEmpDOB').val(),
            joinDate: $('#txtEmpJoinDate').val(),
            branch: $('#txtEmpBranch').val(),
            addressLine1: $('#txtEmpAddressLine1').val(),
            addressLine2: $('#txtEmpAddressLine2').val(),
            addressLine3: $('#txtEmpAddressLine3').val(),
            addressLine4: $('#txtEmpAddressLine4').val(),
            addressLine5: $('#txtEmpAddressLine5').val(),
            contactNo: $('#txtEmpContactNo').val(),
            email: $('#txtEmpEmail').val(),
            emergencyGuardian: $('#txtEmpEmergencyGuardian').val(),
            emergencyNo: $('#txtEmpEmergencyNo').val()
        };

        $.ajax({
            url: baseURL + 'employee',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(employeeObj),
            headers: {
                Authorization: 'Bearer ' + jwtToken
            },
            success: function (resp) {
                successAlert(resp.message);
                loadAllEmployees();
            },
            error: function (error) {
                errorAlert(error.responseJSON.message);
            }
        });
    };
});

/** Delete Employee **/
$('#btnDeleteEmployee').click(function () {
    let id = $("#txtEmpId").val();

    $.ajax({
        url: baseURL + 'employee/' + id,
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + jwtToken
        },
        success: function (resp) {
            successAlert(resp.message);
            loadAllEmployees();
        },
        error: function (error) {
            errorAlert(error.responseJSON.message);
        }
    });
});

/** ClearAll Employees **/
$('#btnClearAllEmployees').click(function () {
    loadAllEmployees();
});

/** LoadAll Employees **/
function loadAllEmployees() {
    $.ajax({
        url: baseURL + "employee/loadAllEmployees",
        method: "GET",
        headers: {
            Authorization: 'Bearer ' + jwtToken
        },
        success: function (resp) {
            $("#tblEmployees").empty();

            resp.data.forEach(function (i) {
                let row = $("<tr>");
                row.append($("<td>").text(i.id));
                row.append($("<td>").text(i.name));
                row.append($("<td>").append($("<img>", { src: i.picture, style: "max-width: 100px; max-height: 100px; border-radius:10px" })));
                row.append($("<td>").text(i.gender));
                row.append($("<td>").text(i.civilStatus));
                row.append($("<td>").text(i.designation));
                row.append($("<td>").text(i.role));
                row.append($("<td>").text(i.dob));
                row.append($("<td>").text(i.joinDate));
                row.append($("<td>").text(i.branch));
                row.append($("<td>").text(i.addressLine1));
                row.append($("<td>").text(i.addressLine2));
                row.append($("<td>").text(i.addressLine3));
                row.append($("<td>").text(i.addressLine4));
                row.append($("<td>").text(i.addressLine5));
                row.append($("<td>").text(i.contactNo));
                row.append($("<td>").text(i.email));
                row.append($("<td>").text(i.emergencyGuardian));
                row.append($("<td>").text(i.emergencyNo));

                $("#tblEmployees").append(row);
            });
            clearEmployeeInputFields();
            // checkValidity(customerValidations);
            employeeTableListener();
            generateEmployeeId();
            employeeCount();
        },
        error: function (error) {
            console.log("Load All Employees Error : " + error);
        }
    });
}

/** Generate EmployeeId **/
function generateEmployeeId() {
    $("#txtEmpId").val("E00-001");
    $.ajax({
        url: baseURL + "employee/generateEmployeeId",
        method: "GET",
        headers: {
            Authorization: 'Bearer ' + jwtToken
        },
        success: function (resp) {
            let id = resp.generatedId;
            let tempId = parseInt(id.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                $("#txtEmpId").val("E00-00" + tempId);
            } else if (tempId <= 99) {
                $("#txtEmpId").val("E00-0" + tempId);
            } else {
                $("#txtEmpId").val("E00-" + tempId);
            }
        },
        error: function (error) {
            console.log("Fail to Generate Employee ID : ", error);
        }
    });
}

/** Employee Count **/
function employeeCount() {
    $.ajax({
        url: baseURL + "employee/employeeCount",
        method: "GET",
        headers: {
            Authorization: 'Bearer ' + jwtToken
        },
        success: function (resp) {
            $("#txtEmployeeCount").text(resp.count);
        },
        error: function (error) {
            console.log("Employee Count Error : ", error);
        }
    });
}

/** Employee Table Listner **/
function employeeTableListener() {
    $("#tblEmployees>tr").on("click", function () {
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let picture = $(this).children().eq(2).text();
        let gender = $(this).children().eq(3).text();
        let civilStatus = $(this).children().eq(4).text();
        let designation = $(this).children().eq(5).text();
        let role = $(this).children().eq(6).text();
        let dob = $(this).children().eq(7).text();
        let joinDate = $(this).children().eq(8).text();
        let branch = $(this).children().eq(9).text();
        let addressLine1 = $(this).children().eq(10).text();
        let addressLine2 = $(this).children().eq(11).text();
        let addressLine3 = $(this).children().eq(12).text();
        let addressLine4 = $(this).children().eq(13).text();
        let addressLine5 = $(this).children().eq(14).text();
        let contactNo = $(this).children().eq(15).text();
        let email = $(this).children().eq(16).text();
        let emergencyGuardian = $(this).children().eq(17).text();
        let emergencyNo = $(this).children().eq(1).text();

        $("#txtEmpId").val(id);
        $("#txtEmpName").val(name);
        $("#txtEmpPicture").val(picture);
        $("#txtEmpGender").val(gender);
        $("#txtEmpStatus").val(civilStatus);
        $("#txtEmpDesignation").val(designation);
        $("#txtEmpRole").val(role);
        $("#txtEmpDOB").val(dob);
        $("#txtEmpJoinDate").val(joinDate);
        $("#txtEmpBranch").val(branch);
        $("#txtEmpAddressLine1").val(addressLine1);
        $("#txtEmpAddressLine2").val(addressLine2);
        $("#txtEmpAddressLine3").val(addressLine3);
        $("#txtEmpAddressLine4").val(addressLine4);
        $("#txtEmpAddressLine5").val(addressLine5);
        $("#txtEmpContactNo").val(contactNo);
        $("#txtEmpEmail").val(email);
        $("#txtEmpEmergencyGuardian").val(emergencyGuardian);
        $("#txtEmpEmergencyNo").val(emergencyNo);

        // $("#btnSaveCustomer").attr('disabled', true);
        // $("#btnUpdateCustomer").attr('disabled', false);
        // $("#btnDeleteCustomer").attr('disabled', false);
    });
}

/** Clear Shoe Input Fields **/
function clearEmployeeInputFields() {
    $('#txtEmpName').val("");
    $('#txtEmpPicture').val("");
    $('#txtEmpGender').val("");
    $('#txtEmpStatus').val("");
    $('#txtEmpDesignation').val("");
    $('#txtEmpRole').val("");
    $('#txtEmpDOB').val("");
    $('#txtEmpJoinDate').val("");
    $('#txtEmpBranch').val("");
    $('#txtEmpAddressLine1').val("");
    $('#txtEmpAddressLine2').val("");
    $('#txtEmpAddressLine3').val("");
    $('#txtEmpAddressLine4').val("");
    $('#txtEmpAddressLine5').val("");
    $('#txtEmpContactNo').val("");
    $('#txtEmpEmail').val("");
    $('#txtEmpEmergencyGuardian').val("");
    $('#txtEmpEmergencyNo').val("");

    $('#txtSearchEmployee').val("");
    $("#btnSaveEmployee").attr('disabled', true);
    $("#btnUpdateEmployee").attr('disabled', true);
    $("#btnDeleteEmployee").attr('disabled', true);
}
