const baseURL = "http://localhost:8080/shoes/api/v1/";

/** Save Customer **/
$('#btnSaveCustomer').click(function () {
    const customerObject = {
        id: $('#txtCustomerId').val(),
        name: $('#txtCustomerName').val(),
        gender: $('#txtCustomerGender').val(),
        loyaltyDate: parseInt($('#txtCustomerLoyaltyDate').val()),
        level: $('#txtCustomerLevel').val(),
        totalPoints: $('#txtCustomerTotalPoints').val(),
        dob: $('#txtCustomerDOB').val(),
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
        url: baseURL + 'customers',
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
