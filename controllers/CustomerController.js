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
