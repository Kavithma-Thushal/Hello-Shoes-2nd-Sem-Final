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
            loadAllCustomers();
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
            loadAllCustomers();
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
            loadAllCustomers();
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

                let row = "<tr><td>" + id + "</td><td>" + name + "</td><td>" + gender + "</td><td>" + dob + "</td><td>" + level + "</td><td>" +
                    loyaltyDate + "</td><td>" + totalPoints + "</td><td>" + addressLine1 + "</td><td>" + addressLine2 + "</td><td>" +
                    addressLine3 + "</td><td>" + addressLine4 + "</td><td>" + addressLine5 + "</td><td>" + contactNo + "</td><td>" + email +
                    "</td><td>" + recentDate + "</td></tr>"
                $("#tblCustomers").append(row);
            }
            // clearInputFields();
            // checkValidity(customerValidations);
            tableListener();
            // generateCustomerId();
        },
        error: function (error) {
            console.log("Load All Customers Error : " + error);
        }
    });
}

// Table Listener
function tableListener() {
    $("#tblCustomers>tr").on("click", function () {
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let gender = $(this).children().eq(2).text();
        let dob = $(this).children().eq(3).text();
        let level = $(this).children().eq(4).text();
        let loyaltyDate = $(this).children().eq(5).text();
        let totalPoints = $(this).children().eq(6).text();
        let addressLine1 = $(this).children().eq(7).text();
        let addressLine2 = $(this).children().eq(8).text();
        let addressLine3 = $(this).children().eq(9).text();
        let addressLine4 = $(this).children().eq(10).text();
        let addressLine5 = $(this).children().eq(11).text();
        let contactNo = $(this).children().eq(12).text();
        let email = $(this).children().eq(13).text();
        let recentDate = $(this).children().eq(14).text();

        let customerRecentDate = recentDate.replace(/(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}).*/, "$1T$2");

        $("#txtCustomerId").val(id);
        $("#txtCustomerName").val(name);
        $("#txtCustomerGender").val(gender);
        $("#txtCustomerDOB").val(dob);
        $("#txtCustomerLoyaltyLevel").val(level);
        $("#txtCustomerLoyaltyDate").val(loyaltyDate);
        $("#txtCustomerTotalPoints").val(totalPoints);
        $("#txtCustomerAddressLine1").val(addressLine1);
        $("#txtCustomerAddressLine2").val(addressLine2);
        $("#txtCustomerAddressLine3").val(addressLine3);
        $("#txtCustomerAddressLine4").val(addressLine4);
        $("#txtCustomerAddressLine5").val(addressLine5);
        $("#txtCustomerContactNo").val(contactNo);
        $("#txtCustomerEmail").val(email);
        $("#txtCustomerRecentDate").val(customerRecentDate);

        // $("#btnSaveCustomer").attr('disabled', true);
        // $("#btnUpdateCustomer").attr('disabled', false);
        // $("#btnDeleteCustomer").attr('disabled', false);
    });
}