const baseURL = "http://localhost:8080/shoes/api/v1/";

loadAllCustomers();

/** Save Customer **/
$('#btnSaveCustomer').click(function () {
    const customerObject = {
        id: $('#txtCustomerId').val(),
        name: $('#txtCustomerName').val(),
        gender: $('#txtCustomerGender').val(),
        dob: $('#txtCustomerDOB').val(),
        level: $('#txtCustomerLoyaltyLevel').val(),
        loyaltyDate: $('#txtCustomerLoyaltyDate').val(),
        totalPoints: parseInt($('#txtCustomerTotalPoints').val()),
        addressLine1: $('#txtCustomerAddressLine1').val(),
        addressLine2: $('#txtCustomerAddressLine2').val(),
        addressLine3: $('#txtCustomerAddressLine3').val(),
        addressLine4: $('#txtCustomerAddressLine4').val(),
        addressLine5: $('#txtCustomerAddressLine5').val(),
        contactNo: $('#txtCustomerContactNo').val(),
        email: $('#txtCustomerEmail').val(),
        recentDate: new Date($('#txtCustomerRecentDate').val()).toISOString()
    };

    $.ajax({
        url: baseURL + 'customer',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(customerObject),
        success: function (resp) {
            successAlert(resp);
        },
        error: function (resp) {
            errorAlert(resp);
        }
    });
});

/** Search Customer **/
$('#btnSearchCustomer').click(function () {
    let id = $("#txtCustomerId").val();

    $.ajax({
        url: baseURL + 'customer/searchCustomer/' + id,
        method: 'GET',
        contentType: 'application/json',
        success: function (resp) {
            console.log("Customer Searched Successfully...!");
        },
        error: function (resp) {
            errorAlert(resp);
        }
    });
});

/** Update Customer **/
$('#btnUpdateCustomer').click(function () {
    const customerObject = {
        id: $('#txtCustomerId').val(),
        name: $('#txtCustomerName').val(),
        gender: $('#txtCustomerGender').val(),
        dob: $('#txtCustomerDOB').val(),
        level: $('#txtCustomerLoyaltyLevel').val(),
        loyaltyDate: $('#txtCustomerLoyaltyDate').val(),
        totalPoints: parseInt($('#txtCustomerTotalPoints').val()),
        addressLine1: $('#txtCustomerAddressLine1').val(),
        addressLine2: $('#txtCustomerAddressLine2').val(),
        addressLine3: $('#txtCustomerAddressLine3').val(),
        addressLine4: $('#txtCustomerAddressLine4').val(),
        addressLine5: $('#txtCustomerAddressLine5').val(),
        contactNo: $('#txtCustomerContactNo').val(),
        email: $('#txtCustomerEmail').val(),
        recentDate: new Date($('#txtCustomerRecentDate').val()).toISOString()
    };

    $.ajax({
        url: baseURL + 'customer',
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(customerObject),
        success: function (resp) {
            successAlert(resp);
        },
        error: function (resp) {
            errorAlert(resp);
        }
    });
});

/** Delete Customer **/
$('#btnDeleteCustomer').click(function () {
    let id = $("#txtCustomerId").val();

    $.ajax({
        url: baseURL + 'customer/' + id,
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

/** LoadAll Customers **/
function loadAllCustomers() {
    $.ajax({
        url: baseURL + "customer/loadAllCustomers",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            $("#tblCustomers").empty();

            for (let i of resp.data) {
                let id = i.id;
                let name = i.name;
                let gender = i.gender;
                let dob = i.dob;
                let level = i.level;
                let loyaltyDate = i.loyaltyDate;
                let totalPoints = i.totalPoints;
                let addressLine1 = i.addressLine1;
                let addressLine2 = i.addressLine2;
                let addressLine3 = i.addressLine3;
                let addressLine4 = i.addressLine4;
                let addressLine5 = i.addressLine5;
                let contactNo = i.contactNo;
                let email = i.email;
                let recentDate = i.recentDate;

                let row = "<tr><td>" + id + "</td><td>" + name + "</td><td>" + gender + "</td><td>" + dob + "</td><td>" + level + "</td><td>" + loyaltyDate + "</td><td>" + totalPoints + "</td><td>" + addressLine1 + "</td><td>" + addressLine2 + "</td><td>" + addressLine3 + "</td><td>" + addressLine4 + "</td><td>" + addressLine5 + "</td><td>" + contactNo + "</td><td>" + email + "</td><td>" + recentDate + "</td></tr>"
                $("#tblCustomers").append(row);
            }
            // clearInputFields();
            // checkValidity(customerValidations);
            // tableListener();
            // generateCustomerId();
        },
        error: function (error) {
            console.log("Load All Customers Error : " + error);
        }
    });
}