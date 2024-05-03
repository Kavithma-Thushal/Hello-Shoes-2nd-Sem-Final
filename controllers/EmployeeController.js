loadAllEmployees();

/** Save Employee **/
$('#btnSaveEmployee').click(function () {
    const fileInput = $('#txtEmployeePicture')[0];
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
        const employeeObject = {
            id: $('#txtEmployeeId').val(),
            name: $('#txtEmployeeName').val(),
            picture: reader.result,
            gender: $('#txtEmployeeGender').val(),
            status: $('#txtEmployeeStatus').val(),
            designation: $('#txtEmployeeDesignation').val(),
            role: $('#txtEmployeeRole').val(),
            dob: $('#txtEmployeeDOB').val(),
            joinDate: $('#txtEmployeeJoinDate').val(),
            branch: $('#txtEmployeeBranch').val(),
            addressLine1: $('#txtEmployeeAddressLine1').val(),
            addressLine2: $('#txtEmployeeAddressLine2').val(),
            addressLine3: $('#txtEmployeeAddressLine3').val(),
            addressLine4: $('#txtEmployeeAddressLine4').val(),
            addressLine5: $('#txtEmployeeAddressLine5').val(),
            contactNo: $('#txtEmployeeContactNo').val(),
            email: $('#txtEmployeeEmail').val(),
            emergencyGuardian: $('#txtEmployeeEmergencyGuardian').val(),
            emergencyNo: $('#txtEmployeeEmergencyNo').val()
        };

        $.ajax({
            url: baseURL + 'employee',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(employeeObject),
            success: function (resp) {
                successAlert(resp);
                loadAllEmployees();
            },
            error: function (resp) {
                errorAlert(resp);
            }
        });
    };
});

/** Search Employee **/
$('#btnSearchEmployee').click(function () {
    let id = $("#txtEmployeeId").val();

    $.ajax({
        url: baseURL + 'employee/searchEmployee/' + id,
        method: 'GET',
        contentType: 'application/json',
        success: function (resp) {
            console.log("Employee Searched Successfully...!");
        },
        error: function (resp) {
            errorAlert(resp);
        }
    });
});

/** Update Employee **/
$('#btnUpdateEmployee').click(function () {
    const fileInput = $('#txtEmployeePicture')[0];
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
        const employeeObject = {
            id: $('#txtEmployeeId').val(),
            name: $('#txtEmployeeName').val(),
            picture: reader.result,
            gender: $('#txtEmployeeGender').val(),
            status: $('#txtEmployeeStatus').val(),
            designation: $('#txtEmployeeDesignation').val(),
            role: $('#txtEmployeeRole').val(),
            dob: $('#txtEmployeeDOB').val(),
            joinDate: $('#txtEmployeeJoinDate').val(),
            branch: $('#txtEmployeeBranch').val(),
            addressLine1: $('#txtEmployeeAddressLine1').val(),
            addressLine2: $('#txtEmployeeAddressLine2').val(),
            addressLine3: $('#txtEmployeeAddressLine3').val(),
            addressLine4: $('#txtEmployeeAddressLine4').val(),
            addressLine5: $('#txtEmployeeAddressLine5').val(),
            contactNo: $('#txtEmployeeContactNo').val(),
            email: $('#txtEmployeeEmail').val(),
            emergencyGuardian: $('#txtEmployeeEmergencyGuardian').val(),
            emergencyNo: $('#txtEmployeeEmergencyNo').val()
        };

        $.ajax({
            url: baseURL + 'employee',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(employeeObject),
            success: function (resp) {
                successAlert(resp);
                loadAllEmployees();
            },
            error: function (resp) {
                errorAlert(resp);
            }
        });
    };
});

/** Delete Employee **/
$('#btnDeleteEmployee').click(function () {
    let id = $("#txtEmployeeId").val();

    $.ajax({
        url: baseURL + 'employee/' + id,
        method: 'DELETE',
        contentType: 'application/json',
        success: function (resp) {
            successAlert(resp);
            loadAllEmployees();
        },
        error: function (resp) {
            errorAlert(resp);
        }
    });
});

/** LoadAll Employee **/
function loadAllEmployees() {
    $.ajax({
        url: baseURL + "employee/loadAllEmployees",
        method: "GET",
        dataType: "json",
        success: function (resp) {
            $("#tblEmployees").empty();

            resp.data.forEach(function (i) {
                let row = $("<tr>");
                row.append($("<td>").text(i.id));
                row.append($("<td>").text(i.name));
                row.append($("<td>").append($("<img>", {
                    src: i.picture,
                    alt: "Employee Image",
                    style: "max-width: 100px; max-height: 100px; border-radius:10px"
                })));
                row.append($("<td>").text(i.gender));
                row.append($("<td>").text(i.status));
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
        },
        error: function (error) {
            console.log("Load All Employees Error : " + error);
        }
    });
}