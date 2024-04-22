/** Save Supplier **/
$('#btnSaveSupplier').click(function () {
    const supplierObj = {
        id: $('#txtSupplierId').val(),
        name: $('#txtSupplierName').val(),
        category: $('#txtSupplierCategory').val(),
        addressLine1: $('#txtSupplierAddressLine1').val(),
        addressLine2: $('#txtSupplierAddressLine2').val(),
        addressLine3: $('#txtSupplierAddressLine3').val(),
        addressLine4: $('#txtSupplierAddressLine4').val(),
        addressLine5: $('#txtSupplierAddressLine5').val(),
        addressLine6: $('#txtSupplierAddressLine6').val(),
        contactNo1: $('#txtSupplierContactNo1').val(),
        contactNo2: $('#txtSupplierContactNo2').val(),
        email: $('#txtSupplierEmail').val()
    };

    $.ajax({
        url: baseURL + 'suppliers',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(supplierObj),
        success: function (resp) {
            successAlert(resp);
        },
        error: function (resp) {
            errorAlert(resp);
        }
    });
});
