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
        },
        error: function (resp) {
            errorAlert(resp);
        }
    });
});