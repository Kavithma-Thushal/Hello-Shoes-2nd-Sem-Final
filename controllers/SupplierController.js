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

/** Search Supplier Method **/
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
            checkSupplierValidity(supplierValidations);
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

/** Supplier Table Listener **/
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

/** Supplier Validations **/
let regExSupName = /^[A-Za-z ]{4,20}$/;
let regExSupAddressLine1 = /^[A-Za-z0-9/, -]{2,30}$/;
let regExSupAddressLine2 = /^[A-Za-z0-9/, -]{4,30}$/;
let regExSupAddressLine3 = /^[A-Za-z0-9/, -]{4,30}$/;
let regExSupAddressLine4 = /^[A-Za-z0-9/, -]{4,30}$/;
let regExSupAddressLine5 = /^[A-Za-z0-9/, -]{4,30}$/;
let regExSupAddressLine6 = /^[A-Za-z0-9/, -]{4,30}$/;
let regExSupContactNo1 = /^(07(0|1|2|4|5|6|7|8)|091)[0-9]{7}$/;
let regExSupContactNo2 = /^(07(0|1|2|4|5|6|7|8)|091)[0-9]{7}$/;
let regExSupEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

let supplierValidations = [];
supplierValidations.push({
    reg: regExSupName,
    field: $('#txtSupName'),
    error: 'Supplier Name must be between 4-20 characters'
});
supplierValidations.push({
    reg: regExSupAddressLine1,
    field: $('#txtSupAddressLine1'),
    error: 'Building No must be between 2-30 characters'
});
supplierValidations.push({
    reg: regExSupAddressLine2,
    field: $('#txtSupAddressLine2'),
    error: 'Main Lane must be between 4-30 characters'
});
supplierValidations.push({
    reg: regExSupAddressLine3,
    field: $('#txtSupAddressLine3'),
    error: 'Main City must be between 4-30 characters'
});
supplierValidations.push({
    reg: regExSupAddressLine4,
    field: $('#txtSupAddressLine4'),
    error: 'Main State must be between 4-30 characters'
});
supplierValidations.push({
    reg: regExSupAddressLine5,
    field: $('#txtSupAddressLine5'),
    error: 'Postal Code must be between 4-30 characters'
});
supplierValidations.push({
    reg: regExSupAddressLine6,
    field: $('#txtSupAddressLine6'),
    error: 'Origin Country must be between 4-30 characters'
});
supplierValidations.push({
    reg: regExSupContactNo1,
    field: $('#txtSupContactNo1'),
    error: 'Contact.No must match the pattern 07#-#######'
});
supplierValidations.push({
    reg: regExSupContactNo2,
    field: $('#txtSupContactNo2'),
    error: 'Contact.No must match the pattern 07#-#######'
});
supplierValidations.push({
    reg: regExSupEmail,
    field: $('#txtSupEmail'),
    error: 'Invalid Email. Please enter valid email'
});

/** Check Supplier Validity **/
$("#txtSupName,#txtSupAddressLine1,#txtSupAddressLine2,#txtSupAddressLine3,#txtSupAddressLine4,#txtSupAddressLine5,#txtSupAddressLine6,#txtSupContactNo1,#txtSupContactNo2,#txtSupEmail").on('keyup', function () {
    checkSupplierValidity(supplierValidations);
});

/** Supplier Validity Method **/
function checkSupplierValidity(object) {
    let errorCount = 0;
    for (let validation of object) {
        if (check(validation.reg, validation.field)) {
            textSuccess(validation.field, "");
        } else {
            errorCount = errorCount + 1;
            textError(validation.field, validation.error);
        }
    }
    setSupplierButtonState(errorCount);
}

/** Disable/Enable Supplier Buttons **/
function setSupplierButtonState(value) {
    if (value > 0) {
        $("#btnSaveSupplier").attr('disabled', true);
        $("#btnUpdateSupplier").attr('disabled', true);
        $("#btnDeleteSupplier").attr('disabled', true);
    } else {
        $("#btnSaveSupplier").attr('disabled', false);
        $("#btnUpdateSupplier").attr('disabled', false);
        $("#btnDeleteSupplier").attr('disabled', false);
    }
}