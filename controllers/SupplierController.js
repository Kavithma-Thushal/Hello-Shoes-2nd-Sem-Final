loadAllSuppliers();

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
            loadAllSuppliers();
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
            loadAllSuppliers();
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
            loadAllSuppliers();
        },
        error: function (resp) {
            errorAlert(resp);
        }
    });
});

/** LoadAll Suppliers **/
function loadAllSuppliers() {
    $.ajax({
        url: baseURL + "supplier/loadAllSuppliers",
        method: "GET",
        dataType: "json",
        success: function (resp) {
            $("#tblSuppliers").empty();

            for (let i of resp.data) {
                let id = i.id;
                let name = i.name;
                let category = i.category;
                let addressLine1 = i.addressLine1;
                let addressLine2 = i.addressLine2;
                let addressLine3 = i.addressLine3;
                let addressLine4 = i.addressLine4;
                let addressLine5 = i.addressLine5;
                let addressLine6 = i.addressLine6;
                let contactNo1 = i.contactNo1;
                let contactNo2 = i.contactNo2;
                let email = i.email;

                let row = "<tr><td>" + id + "</td><td>" + name + "</td><td>" + category + "</td><td>" + addressLine1 + "</td><td>" +
                    addressLine2 + "</td><td>" + addressLine3 + "</td><td>" + addressLine4 + "</td><td>" + addressLine5 + "</td><td>" +
                    addressLine6 + "</td><td>" + contactNo1 + "</td><td>" + contactNo2 + "</td><td>" + email + "</td><>/tr";
                $("#tblSuppliers").append(row);
            }
            // clearInputFields();
            // checkValidity(customerValidations);
            // tableListener();
            // generateCustomerId();
        },
        error: function (error) {
            console.log("Load All Suppliers Error : " + error);
        }
    });
}