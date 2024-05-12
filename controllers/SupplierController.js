/**
 * @author : Kavithma Thushal
 * @project : Hello-Shoes-FrontEnd
 * @since : 2:02 PM - 4/20/2024
 **/

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
        headers: {
            Authorization: 'Bearer ' + jwtToken
        },
        success: function (resp) {
            successAlert(resp.message);
            loadAllSuppliers();
        },
        error: function (error) {
            errorAlert(error.responseJSON.message);
        }
    });
});

/** Search Supplier **/
$('#btnSearchSupplier').click(function () {
    searchSupplier();
});
$("#txtSearchSupplier").on("keypress", function (event) {
    if (event.which === 13) {
        searchSupplier();
    }
});
function searchSupplier() {
    let id = $("#txtSearchSupplier").val();

    $.ajax({
        url: baseURL + 'supplier/searchSupplier/' + id,
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + jwtToken
        },
        success: function (resp) {
            $("#tblSuppliers").empty();
            let row = "<tr><td>" + resp.id + "</td><td>" + resp.name + "</td><td>" + resp.category + "</td><td>" + resp.addressLine1 +
                "</td><td>" + resp.addressLine2 + "</td><td>" + resp.addressLine3 + "</td><td>" + resp.addressLine4 + "</td><td>" +
                resp.addressLine5 + "</td><td>" + resp.addressLine6 + "</td><td>" + resp.contactNo1 + "</td><td>" + resp.contactNo2 +
                "</td><td>" + resp.email + "</td><>/tr";
            $("#tblSuppliers").append(row);
            clearSuppliersInputFields();
            supplierTableListener();
        },
        error: function (error) {
            emptyMessage(error.responseJSON.message);
            loadAllSuppliers();
        }
    });
}

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
        headers: {
            Authorization: 'Bearer ' + jwtToken
        },
        success: function (resp) {
            successAlert(resp.message);
            loadAllSuppliers();
        },
        error: function (error) {
            errorAlert(error.responseJSON.message);
        }
    });
});

/** Delete Supplier **/
$('#btnDeleteSupplier').click(function () {
    let id = $("#txtSupId").val();

    $.ajax({
        url: baseURL + 'supplier/' + id,
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + jwtToken
        },
        success: function (resp) {
            successAlert(resp.message);
            loadAllSuppliers();
        },
        error: function (error) {
            errorAlert(error.responseJSON.message);
        }
    });
});

/** ClearAll Suppliers **/
$('#btnClearAllSuppliers').click(function () {
    loadAllSuppliers();
});

/** LoadAll Suppliers **/
function loadAllSuppliers() {
    $.ajax({
        url: baseURL + "supplier/loadAllSuppliers",
        method: "GET",
        headers: {
            Authorization: 'Bearer ' + jwtToken
        },
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
            clearSuppliersInputFields();
            // checkValidity(customerValidations);
            supplierTableListener();
            generateSupplierId();
            supplierCount();
        },
        error: function (error) {
            console.log("Load All Suppliers Error : " + error);
        }
    });
}

/** Generate SupplierId **/
function generateSupplierId() {
    $("#txtSupId").val("S00-001");
    $.ajax({
        url: baseURL + "supplier/generateSupplierId",
        method: "GET",
        headers: {
            Authorization: 'Bearer ' + jwtToken
        },
        success: function (resp) {
            let id = resp.generatedId;
            let tempId = parseInt(id.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                $("#txtSupId").val("S00-00" + tempId);
            } else if (tempId <= 99) {
                $("#txtSupId").val("S00-0" + tempId);
            } else {
                $("#txtSupId").val("S00-" + tempId);
            }
        },
        error: function (error) {
            console.log("Fail to Generate Supplier ID : ", error);
        }
    });
}

/** Supplier Count **/
function supplierCount() {
    $.ajax({
        url: baseURL + "supplier/supplierCount",
        method: "GET",
        headers: {
            Authorization: 'Bearer ' + jwtToken
        },
        success: function (resp) {
            $("#txtSupplierCount").text(resp.count);
        },
        error: function (error) {
            console.log("Supplier Count Error : ", error);
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

/** Clear Supplier Input Fields **/
function clearSuppliersInputFields() {
    $("#txtSupId").focus();
    $('#txtSupName').val("");
    $('#txtSupCategory').val("");
    $('#txtSupAddressLine1').val("");
    $('#txtSupAddressLine2').val("");
    $('#txtSupAddressLine3').val("");
    $('#txtSupAddressLine4').val("");
    $('#txtSupAddressLine5').val("");
    $('#txtSupAddressLine6').val("");
    $('#txtSupContactNo1').val("");
    $('#txtSupContactNo2').val("");
    $('#txtSupEmail').val("");

    $('#txtSearchSupplier').val("");
    $("#btnSaveSupplier").attr('disabled', true);
    $("#btnUpdateSupplier").attr('disabled', true);
    $("#btnDeleteSupplier").attr('disabled', true);
}