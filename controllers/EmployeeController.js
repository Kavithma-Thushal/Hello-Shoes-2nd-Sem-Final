/** Save Employee **/
$('#btnSaveEmployee').click(function () {
    const employeeObject = {
        id: $('#txtEmployeeId').val(),
        name: $('#txtEmployeeName').val(),
        picture: $('#txtEmployeePicture').val(),
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
        url: baseURL + 'employees',
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
});
