var baseURL = "http://localhost:8080/shoes/api/v1/";

loadAllSuppliers();

/** Save Supplier **/
$('#btnSaveSupplier').click(function () {
    let supplierObj = {
        id: $('#txtSupId').val(),
        name: $('#txtSupName').val(),
        category: $('#txtSupCategory').val(),
        addressLine1: $('#txtSupAddressLine1').val(),
        addressLine2: $('#txtSupAddressLine2').val(),
        addressLine3: $('#txtSupAddressLine3').val(),
        addressLine4: $('#txtSupAddressLine4').val(),
        addressLine5: $('#txtSupAddressLine5').val(),
        addressLine6: $('#txtSupAddressLine6').val(),
        contactNo1: $('#txtSupContactNo1').val(),
        contactNo2: $('#txtSupContactNo2').val(),
        email: $('#txtSupEmail').val()
    };

    $.ajax({
        url: baseURL + 'supplier',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(supplierObj),
        success: function (resp) {
            successAlert(resp);
            loadAllSuppliers();
        },
        error: function (error) {
            errorAlert(error);
        }
    });
});

/** Search Supplier **/
$('#btnSearchSupplier').click(function () {
    let id = $("#txtSupId").val();

    $.ajax({
        url: baseURL + 'supplier/searchSupplier/' + id,
        method: 'GET',
        success: function (resp) {
            alert("Supplier Searched Successfully...!");
        },
        error: function (error) {
            errorAlert(error);
        }
    });
});

/** Update Supplier **/
$('#btnUpdateSupplier').click(function () {
    let supplierObject = {
        id: $('#txtSupId').val(),
        name: $('#txtSupName').val(),
        category: $('#txtSupCategory').val(),
        addressLine1: $('#txtSupAddressLine1').val(),
        addressLine2: $('#txtSupAddressLine2').val(),
        addressLine3: $('#txtSupAddressLine3').val(),
        addressLine4: $('#txtSupAddressLine4').val(),
        addressLine5: $('#txtSupAddressLine5').val(),
        addressLine6: $('#txtSupAddressLine6').val(),
        contactNo1: $('#txtSupContactNo1').val(),
        contactNo2: $('#txtSupContactNo2').val(),
        email: $('#txtSupEmail').val()
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
        error: function (error) {
            errorAlert(error);
        }
    });
});

/** Delete Supplier **/
$('#btnDeleteSupplier').click(function () {
    let id = $("#txtSupId").val();

    $.ajax({
        url: baseURL + 'supplier/' + id,
        method: 'DELETE',
        success: function (resp) {
            successAlert(resp);
            loadAllSuppliers();
        },
        error: function (error) {
            errorAlert(error);
        }
    });
});

/** LoadAll Suppliers **/
function loadAllSuppliers() {
    $.ajax({
        url: baseURL + "supplier/loadAllSuppliers",
        method: "GET",
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
            supplierTableListener();
            // generateCustomerId();
        },
        error: function (error) {
            console.log("Load All Suppliers Error : " + error);
        }
    });
}

/** Supplier Table Listner **/
function supplierTableListener() {
    $("#tblSuppliers>tr").on("click", function () {
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let category = $(this).children().eq(2).text();
        let addressLine1 = $(this).children().eq(3).text();
        let addressLine2 = $(this).children().eq(4).text();
        let addressLine3 = $(this).children().eq(5).text();
        let addressLine4 = $(this).children().eq(6).text();
        let addressLine5 = $(this).children().eq(7).text();
        let addressLine6 = $(this).children().eq(8).text();
        let contactNo1 = $(this).children().eq(9).text();
        let contactNo2 = $(this).children().eq(10).text();
        let email = $(this).children().eq(11).text();

        $("#txtSupId").val(id);
        $("#txtSupName").val(name);
        $("#txtSupCategory").val(category);
        $("#txtSupAddressLine1").val(addressLine1);
        $("#txtSupAddressLine2").val(addressLine2);
        $("#txtSupAddressLine3").val(addressLine3);
        $("#txtSupAddressLine4").val(addressLine4);
        $("#txtSupAddressLine5").val(addressLine5);
        $("#txtSupAddressLine6").val(addressLine6);
        $("#txtSupContactNo1").val(contactNo1);
        $("#txtSupContactNo2").val(contactNo2);
        $("#txtSupEmail").val(email);

        // $("#btnSaveCustomer").attr('disabled', true);
        // $("#btnUpdateCustomer").attr('disabled', false);
        // $("#btnDeleteCustomer").attr('disabled', false);
    });
}