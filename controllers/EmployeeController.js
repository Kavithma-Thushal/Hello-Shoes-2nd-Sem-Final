loadAllEmployees();

/** Save Employee **/
$('#btnSaveEmployee').click(function () {
    const fileInput = $('#txtEmpPicture')[0];
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
        const employeeObj = {
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
            success: function (resp) {
                successAlert(resp);
                loadAllEmployees();
            },
            error: function (error) {
                errorAlert(error);
            }
        });
    };
});

/** Search Employee **/
$('#btnSearchEmployee').click(function () {
    let id = $("#txtEmpId").val();

    $.ajax({
        url: baseURL + 'employee/searchEmployee/' + id,
        method: 'GET',
        success: function (resp) {
            alert("Employee Searched Successfully...!");
        },
        error: function (error) {
            errorAlert(error);
        }
    });
});

/** Update Employee **/
$('#btnUpdateEmployee').click(function () {
    const fileInput = $('#txtEmpPicture')[0];
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
        const employeeObj = {
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
            success: function (resp) {
                successAlert(resp);
                loadAllEmployees();
            },
            error: function (error) {
                errorAlert(error);
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
        success: function (resp) {
            successAlert(resp);
            loadAllEmployees();
        },
        error: function (error) {
            errorAlert(error);
        }
    });
});

/** LoadAll Employee **/
function loadAllEmployees() {
    $.ajax({
        url: baseURL + "employee/loadAllEmployees",
        method: "GET",
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
        },
        error: function (error) {
            console.log("Load All Employees Error : " + error);
        }
    });
}