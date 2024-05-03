// const baseURL = "http://localhost:8080/shoes/api/v1/";

/** Save Supplier **/
$('#btnSaveSupplier').click(function () {
    const supplierObject = {
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
        url: baseURL + 'supplier',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(supplierObject),
        success: function (resp) {
            successAlert(resp);
        },
        error: function (resp) {
            errorAlert(resp);
        }
    });
});

/** Search Supplier **/
$('#btnSearchSupplier').click(function () {
    let id = $("#txtSupplierId").val();

    $.ajax({
        url: baseURL + 'supplier/searchSupplier/' + id,
        method: 'GET',
        contentType: 'application/json',
        success: function (resp) {
            console.log("Supplier Searched Successfully...!");
        },
        error: function (resp) {
            errorAlert(resp);
        }
    });
});

/** Update Supplier **/
$('#btnUpdateSupplier').click(function () {
    const supplierObject = {
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
        url: baseURL + 'supplier',
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(supplierObject),
        success: function (resp) {
            successAlert(resp);
        },
        error: function (resp) {
            errorAlert(resp);
        }
    });
});

/** Delete Supplier **/
$('#btnDeleteSupplier').click(function () {
    let id = $("#txtSupplierId").val();

    $.ajax({
        url: baseURL + 'supplier/' + id,
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
