/**
 * @author : Kavithma Thushal
 * @project : Hello-Shoes-FrontEnd
 * @since : 2:02 PM - 4/20/2024
 **/

let baseURL = "http://localhost:8080/shoes/api/v1/";
// let jwtToken = localStorage.getItem('jwtToken');
let jwtToken = getCookie('jwtToken');

loadAllCustomers();

/** Save Customer **/
$('#btnSaveCustomer').click(function () {
    let customerObj = {
        id: $('#txtCusId').val(),
        name: $('#txtCusName').val(),
        gender: $('#txtCusGender').val(),
        dob: $('#txtCusDOB').val(),
        loyaltyLevel: $('#txtLoyaltyLevel').val(),
        loyaltyDate: $('#txtLoyaltyDate').val(),
        totalPoints: parseInt($('#txtTotalPoints').val()),
        addressLine1: $('#txtCusAddressLine1').val(),
        addressLine2: $('#txtCusAddressLine2').val(),
        addressLine3: $('#txtCusAddressLine3').val(),
        addressLine4: $('#txtCusAddressLine4').val(),
        addressLine5: $('#txtCusAddressLine5').val(),
        contactNo: $('#txtCusContactNo').val(),
        email: $('#txtCusEmail').val(),
        recentDate: new Date($('#txtRecentDate').val()).toISOString()
    };

    $.ajax({
        url: baseURL + 'customer',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(customerObj),
        headers: {
            Authorization: 'Bearer ' + jwtToken
        },
        success: function (resp) {
            successAlert(resp.message);
            loadAllCustomers();
        },
        error: function (error) {
            errorAlert(error.responseJSON.message);
        }
    });
});

/** Search Customer **/
$('#btnSearchCustomer').click(function () {
    let id = $("#txtSearchCusId").val();

    $.ajax({
        url: baseURL + 'customer/searchCustomer/' + id,
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + jwtToken
        },
        success: function (resp) {
            $("#tblCustomers").empty();
            let row = "<tr><td>" + resp.id + "</td><td>" + resp.name + "</td><td>" + resp.gender + "</td><td>" + resp.dob + "</td><td>" +
                resp.loyaltyLevel + "</td><td>" + resp.loyaltyDate + "</td><td>" + resp.totalPoints + "</td><td>" + resp.addressLine1 +
                "</td><td>" + resp.addressLine2 + "</td><td>" + resp.addressLine3 + "</td><td>" + resp.addressLine4 + "</td><td>" +
                resp.addressLine5 + "</td><td>" + resp.contactNo + "</td><td>" + resp.email + "</td><td>" + resp.recentDate + "</td></tr>"
            $("#tblCustomers").append(row);
            clearCustomerInputFields();
            customerTableListener();
        },
        error: function (error) {
            emptyMessage(error.responseJSON.message);
            loadAllCustomers();
        }
    });
});

/** Update Customer **/
$('#btnUpdateCustomer').click(function () {
    let customerObj = {
        id: $('#txtCusId').val(),
        name: $('#txtCusName').val(),
        gender: $('#txtCusGender').val(),
        dob: $('#txtCusDOB').val(),
        loyaltyLevel: $('#txtLoyaltyLevel').val(),
        loyaltyDate: $('#txtLoyaltyDate').val(),
        totalPoints: parseInt($('#txtTotalPoints').val()),
        addressLine1: $('#txtCusAddressLine1').val(),
        addressLine2: $('#txtCusAddressLine2').val(),
        addressLine3: $('#txtCusAddressLine3').val(),
        addressLine4: $('#txtCusAddressLine4').val(),
        addressLine5: $('#txtCusAddressLine5').val(),
        contactNo: $('#txtCusContactNo').val(),
        email: $('#txtCusEmail').val(),
        recentDate: new Date($('#txtRecentDate').val()).toISOString()
    };

    $.ajax({
        url: baseURL + 'customer',
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(customerObj),
        headers: {
            Authorization: 'Bearer ' + jwtToken
        },
        success: function (resp) {
            successAlert(resp.message);
            loadAllCustomers();
        },
        error: function (error) {
            errorAlert(error.responseJSON.message);
        }
    });
});

/** Delete Customer **/
$('#btnDeleteCustomer').click(function () {
    let id = $("#txtCusId").val();

    $.ajax({
        url: baseURL + 'customer/' + id,
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + jwtToken
        },
        success: function (resp) {
            successAlert(resp.message);
            loadAllCustomers();
        },
        error: function (error) {
            errorAlert(error.responseJSON.message);
        }
    });
});

/** ClearAll Customers **/
$('#btnClearAllCustomers').click(function () {
    loadAllCustomers();
});

/** LoadAll Customers **/
function loadAllCustomers() {
    $.ajax({
        url: baseURL + "customer/loadAllCustomers",
        method: "GET",
        headers: {
            Authorization: 'Bearer ' + jwtToken
        },
        success: function (resp) {
            $("#tblCustomers").empty();

            for (let i of resp.data) {
                let id = i.id;
                let name = i.name;
                let gender = i.gender;
                let dob = i.dob;
                let loyaltyLevel = i.loyaltyLevel;
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

                let row = "<tr><td>" + id + "</td><td>" + name + "</td><td>" + gender + "</td><td>" + dob + "</td><td>" + loyaltyLevel + "</td><td>" +
                    loyaltyDate + "</td><td>" + totalPoints + "</td><td>" + addressLine1 + "</td><td>" + addressLine2 + "</td><td>" +
                    addressLine3 + "</td><td>" + addressLine4 + "</td><td>" + addressLine5 + "</td><td>" + contactNo + "</td><td>" + email +
                    "</td><td>" + recentDate + "</td></tr>"
                $("#tblCustomers").append(row);
            }
            clearCustomerInputFields();
            // checkValidity(customerValidations);
            customerTableListener();
            generateCustomerId();
            customerCount();
        },
        error: function (error) {
            console.log("Load All Customers Error : " + error);
        }
    });
}

/** Customer Count **/
function customerCount() {
    $.ajax({
        url: baseURL + "customer/customerCount",
        method: "GET",
        headers: {
            Authorization: 'Bearer ' + jwtToken
        },
        success: function (resp) {
            $("#txtCustomerCount").text(resp.count);
        },
        error: function (error) {
            console.log("Customer Count Error : ", error);
        }
    });
}

/** Generate CustomerId **/
function generateCustomerId() {
    $("#txtCusId").val("C00-001");
    $.ajax({
        url: baseURL + "customer/generateCustomerId",
        method: "GET",
        headers: {
            Authorization: 'Bearer ' + jwtToken
        },
        success: function (resp) {
            let id = resp.generatedId;
            let tempId = parseInt(id.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                $("#txtCusId").val("C00-00" + tempId);
            } else if (tempId <= 99) {
                $("#txtCusId").val("C00-0" + tempId);
            } else {
                $("#txtCusId").val("C00-" + tempId);
            }
        },
        error: function (error) {
            console.log("Fail to Generate Customer ID : ", error);
        }
    });
}

/** Customer Table Listner **/
function customerTableListener() {
    $("#tblCustomers>tr").on("click", function () {
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let gender = $(this).children().eq(2).text();
        let dob = $(this).children().eq(3).text();
        let loyaltyLevel = $(this).children().eq(4).text();
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

        $("#txtCusId").val(id);
        $("#txtCusName").val(name);
        $("#txtCusGender").val(gender);
        $("#txtCusDOB").val(dob);
        $("#txtLoyaltyLevel").val(loyaltyLevel);
        $("#txtLoyaltyDate").val(loyaltyDate);
        $("#txtTotalPoints").val(totalPoints);
        $("#txtCusAddressLine1").val(addressLine1);
        $("#txtCusAddressLine2").val(addressLine2);
        $("#txtCusAddressLine3").val(addressLine3);
        $("#txtCusAddressLine4").val(addressLine4);
        $("#txtCusAddressLine5").val(addressLine5);
        $("#txtCusContactNo").val(contactNo);
        $("#txtCusEmail").val(email);
        $("#txtRecentDate").val(customerRecentDate);

        // $("#btnSaveCustomer").attr('disabled', true);
        // $("#btnUpdateCustomer").attr('disabled', false);
        // $("#btnDeleteCustomer").attr('disabled', false);
    });
}

/** Clear Input Fields **/
function clearCustomerInputFields() {
    $("#txtCusName").focus();
    $('#txtCusName').val("");
    $('#txtCusGender').val("");
    $('#txtCusDOB').val("");
    $('#txtLoyaltyLevel').val("");
    $('#txtLoyaltyDate').val("");
    $('#txtTotalPoints').val("");
    $('#txtCusAddressLine1').val("");
    $('#txtCusAddressLine2').val("");
    $('#txtCusAddressLine3').val("");
    $('#txtCusAddressLine4').val("");
    $('#txtCusAddressLine5').val("");
    $('#txtCusContactNo').val("");
    $('#txtCusEmail').val("");
    $('#txtRecentDate').val("");

    $("#btnSaveCustomer").attr('disabled', true);
    $("#btnUpdateCustomer").attr('disabled', true);
    $("#btnDeleteCustomer").attr('disabled', true);
}

function getCookie(token) {
    var value = `; ${document.cookie}`;
    var parts = value.split(`; ${token}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
