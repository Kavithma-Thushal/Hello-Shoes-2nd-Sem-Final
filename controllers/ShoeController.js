/**
 * @author : Kavithma Thushal
 * @project : Hello-Shoes-FrontEnd
 * @since : 2:02 PM - 4/20/2024
 **/

loadAllShoes();

/** Add Shoe **/
$('#btnAddShoe').click(function () {
    const fileInput = $('#txtShoePicture')[0];
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
        let shoeObj = {
            code: $('#txtShoeCode').val(),
            description: $('#txtShoeDescription').val(),
            picture: reader.result,
            shoeCategory: $('#txtShoeCategory').val(),
            size: parseInt($('#txtShoeSize').val()),
            qtyOnHand: parseInt($('#txtShoeQtyOnHand').val()),
            supplierId: $('#txtSupIdd').val(),
            supplierName: $('#txtSupNamee').val(),
            unitPriceSale: parseFloat($('#txtUnitPriceSale').val()),
            unitPriceBuy: parseFloat($('#txtUnitPriceBuy').val()),
            expectedProfit: parseFloat($('#txtExpectedProfit').val()),
            profitMargin: parseFloat($('#txtProfitMargin').val()),
            stockStatus: $('#txtStockStatus').val()
        };

        $.ajax({
            url: baseURL + 'shoe',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(shoeObj),
            headers: {
                Authorization: 'Bearer ' + jwtToken
            },
            success: function (resp) {
                successAlert(resp.message);
                loadAllShoes();
            },
            error: function (error) {
                errorAlert(error.responseJSON.message);
            }
        });
    };
});

/** Search Shoe **/
$('#btnSearchShoe').click(function () {
    searchShoe();
});
$("#txtSearchShoe").on("keypress", function (event) {
    if (event.which === 13) {
        searchShoe();
    }
});

/** Search Shoe Method **/
function searchShoe() {
    let code = $("#txtSearchShoe").val();

    $.ajax({
        url: baseURL + 'shoe/searchShoe/' + code,
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + jwtToken
        },
        success: function (resp) {
            $("#tblShoes").empty();
            let row = $("<tr>");
            row.append($("<td>").text(resp.code));
            row.append($("<td>").text(resp.description));
            row.append($("<td>").append($("<img>", {
                src: resp.picture,
                style: "max-width: 100px; max-height: 100px; border-radius:10px"
            })));
            row.append($("<td>").text(resp.shoeCategory));
            row.append($("<td>").text(resp.size));
            row.append($("<td>").text(resp.qtyOnHand));
            row.append($("<td>").text(resp.supplierId));
            row.append($("<td>").text(resp.supplierName));
            row.append($("<td>").text(resp.unitPriceSale));
            row.append($("<td>").text(resp.unitPriceBuy));
            row.append($("<td>").text(resp.expectedProfit));
            row.append($("<td>").text(resp.profitMargin));
            row.append($("<td>").text(resp.stockStatus));
            $("#tblShoes").append(row);

            clearShoeInputFields();
            shoeTableListener();
        },
        error: function (error) {
            emptyMessage(error.responseJSON.message);
            loadAllShoes();
        }
    });
}

/** Update Shoe **/
$('#btnUpdateShoe').click(function () {
    const fileInput = $('#txtShoePicture')[0];
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
        let shoeObj = {
            code: $('#txtShoeCode').val(),
            description: $('#txtShoeDescription').val(),
            picture: reader.result,
            shoeCategory: $('#txtShoeCategory').val(),
            size: parseInt($('#txtShoeSize').val()),
            qtyOnHand: parseInt($('#txtShoeQtyOnHand').val()),
            supplierId: $('#txtSupIdd').val(),
            supplierName: $('#txtSupNamee').val(),
            unitPriceSale: parseFloat($('#txtUnitPriceSale').val()),
            unitPriceBuy: parseFloat($('#txtUnitPriceBuy').val()),
            expectedProfit: parseFloat($('#txtExpectedProfit').val()),
            profitMargin: parseFloat($('#txtProfitMargin').val()),
            stockStatus: $('#txtStockStatus').val()
        };

        $.ajax({
            url: baseURL + 'shoe',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(shoeObj),
            headers: {
                Authorization: 'Bearer ' + jwtToken
            },
            success: function (resp) {
                successAlert(resp.message);
                loadAllShoes();
            },
            error: function (error) {
                errorAlert(error.responseJSON.message);
            }
        });
    };
});

/** Delete Shoe **/
$('#btnDeleteShoe').click(function () {
    let code = $("#txtShoeCode").val();

    $.ajax({
        url: baseURL + 'shoe/' + code,
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + jwtToken
        },
        success: function (resp) {
            successAlert(resp.message);
            loadAllShoes();
        },
        error: function (error) {
            errorAlert(error.responseJSON.message);
        }
    });
});

/** ClearAll Shoes **/
$('#btnClearAllShoes').click(function () {
    loadAllShoes();
});

/** LoadAll Shoes **/
function loadAllShoes() {
    $.ajax({
        url: baseURL + "shoe/loadAllShoes",
        method: "GET",
        headers: {
            Authorization: 'Bearer ' + jwtToken
        },
        success: function (resp) {
            $("#tblShoes").empty();

            resp.data.forEach(function (i) {
                let row = $("<tr>");
                row.append($("<td>").text(i.code));
                row.append($("<td>").text(i.description));
                row.append($("<td>").append($("<img>", {
                    src: i.picture,
                    style: "max-width: 100px; max-height: 100px; border-radius:10px"
                })));
                row.append($("<td>").text(i.shoeCategory));
                row.append($("<td>").text(i.size));
                row.append($("<td>").text(i.qtyOnHand));
                row.append($("<td>").text(i.supplierId));
                row.append($("<td>").text(i.supplierName));
                row.append($("<td>").text(i.unitPriceSale));
                row.append($("<td>").text(i.unitPriceBuy));
                row.append($("<td>").text(i.expectedProfit));
                row.append($("<td>").text(i.profitMargin));
                row.append($("<td>").text(i.stockStatus));

                $("#tblShoes").append(row);
            });
            clearShoeInputFields();
            checkShoeValidity(shoeValidations);
            shoeTableListener();
            generateShoeCode();
            shoeCount();
        },
        error: function (error) {
            console.log("Load All Shoes Error : " + error);
        }
    });
}

/** Generate ShoeCode **/
function generateShoeCode() {
    $("#txtShoeCode").val("I00-001");
    $.ajax({
        url: baseURL + "shoe/generateShoeCode",
        method: "GET",
        headers: {
            Authorization: 'Bearer ' + jwtToken
        },
        success: function (resp) {
            let id = resp.generatedId;
            let tempId = parseInt(id.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                $("#txtShoeCode").val("I00-00" + tempId);
            } else if (tempId <= 99) {
                $("#txtShoeCode").val("I00-0" + tempId);
            } else {
                $("#txtShoeCode").val("I00-" + tempId);
            }
        },
        error: function (error) {
            console.log("Fail to Generate Shoe Code : ", error);
        }
    });
}

/** Shoe Count **/
function shoeCount() {
    $.ajax({
        url: baseURL + "shoe/shoeCount",
        method: "GET",
        headers: {
            Authorization: 'Bearer ' + jwtToken
        },
        success: function (resp) {
            $("#txtShoeCount").text(resp.count);
        },
        error: function (error) {
            console.log("Shoe Count Error : ", error);
        }
    });
}

/** Shoe Table Listener **/
function shoeTableListener() {
    $("#tblShoes>tr").on("click", function () {
        let code = $(this).children().eq(0).text();
        let description = $(this).children().eq(1).text();
        let picture = $(this).children().eq(2).text();
        let category = $(this).children().eq(3).text();
        let size = $(this).children().eq(4).text();
        let quantity = $(this).children().eq(5).text();
        let supplierId = $(this).children().eq(6).text();
        let supplierName = $(this).children().eq(7).text();
        let unitPriceSale = $(this).children().eq(8).text();
        let unitPriceBuy = $(this).children().eq(9).text();
        let expectedProfit = $(this).children().eq(10).text();
        let profitMargin = $(this).children().eq(11).text();
        let stockStatus = $(this).children().eq(12).text();

        $("#txtShoeCode").val(code);
        $("#txtShoeDescription").val(description);
        $("#txtShoePicture").val(picture);
        $("#txtShoeCategory").val(category);
        $("#txtShoeSize").val(size);
        $("#txtShoeQtyOnHand").val(quantity);
        $("#txtSupIdd").val(supplierId);
        $("#txtSupNamee").val(supplierName);
        $("#txtUnitPriceSale").val(unitPriceSale);
        $("#txtUnitPriceBuy").val(unitPriceBuy);
        $("#txtExpectedProfit").val(expectedProfit);
        $("#txtProfitMargin").val(profitMargin);
        $("#txtStockStatus").val(stockStatus);

        $("#btnAddShoe").attr('disabled', true);
        $("#btnUpdateShoe").attr('disabled', false);
        $("#btnDeleteShoe").attr('disabled', false);
    });
}

/** Clear Shoe Input Fields **/
function clearShoeInputFields() {
    $('#txtShoeDescription').val("");
    $('#txtShoePicture').val("");
    $('#txtShoeCategory').val("");
    $('#txtShoeSize').val("");
    $('#txtShoeQtyOnHand').val("");
    $('#txtSupIdd').val("");
    $('#txtSupNamee').val("");
    $('#txtUnitPriceSale').val("");
    $('#txtUnitPriceBuy').val("");
    $('#txtExpectedProfit').val("");
    $('#txtProfitMargin').val("");
    $('#txtStockStatus').val("");

    $('#txtSearchShoe').val("");
    $("#btnAddShoe").attr('disabled', true);
    $("#btnUpdateShoe").attr('disabled', true);
    $("#btnDeleteShoe").attr('disabled', true);
}

/** Shoe Validations **/
let regExShoeDescription = /^[A-Za-z0-9/, -]{4,30}$/;
let regExShoeSize = /^\d{2}$/;
let regExShoeQtyOnHand = /^\d+$/;
let regExSupIdd = /^(S00-)[0-9]{3}$/;
let regExSupNamee = /^[A-Za-z ]{4,20}$/;
let regExUnitPrice_Sale = /^\d{2,}(\.\d{2})?$/;
let regExUnitPrice_Buy = /^\d{2,}(\.\d{2})?$/;
let regExExpectedProfit = /^\d{2,}(\.\d{2})?$/;
let regExProfitMargin = /^\d{2,}(\.\d{2})?$/;

let shoeValidations = [];
shoeValidations.push({
    reg: regExShoeDescription,
    field: $('#txtShoeDescription'),
    error: 'Shoe Description must be between 4-20 characters'
});
shoeValidations.push({
    reg: regExShoeSize,
    field: $('#txtShoeSize'),
    error: 'Shoe Size must have integer value'
});
shoeValidations.push({
    reg: regExShoeQtyOnHand,
    field: $('#txtShoeQtyOnHand'),
    error: 'Shoe Qty On Hand must have integer value'
});
shoeValidations.push({
    reg: regExSupIdd,
    field: $('#txtSupIdd'),
    error: 'Supplier ID must match the pattern S00-001'
});
shoeValidations.push({
    reg: regExSupNamee,
    field: $('#txtSupNamee'),
    error: 'Supplier Name must be between 4-30 characters'
});
shoeValidations.push({
    reg: regExUnitPrice_Sale,
    field: $('#txtUnitPriceSale'),
    error: 'Unit Price-Sale must have double value'
});
shoeValidations.push({
    reg: regExUnitPrice_Buy,
    field: $('#txtUnitPriceBuy'),
    error: 'Unit Price-Buy must have double value'
});
shoeValidations.push({
    reg: regExExpectedProfit,
    field: $('#txtExpectedProfit'),
    error: 'Exted Profit must have double value'
});
shoeValidations.push({
    reg: regExProfitMargin,
    field: $('#txtProfitMargin'),
    error: 'Profit Margin must have double value'
});

/** Check Shoe Validations **/
$("#txtShoeDescription,#txtShoeSize,#txtShoeQtyOnHand,#txtSupIdd,#txtSupNamee,#txtUnitPriceSale,#txtUnitPriceBuy,#txtExpectedProfit,#txtProfitMargin").on('keyup', function () {
    checkShoeValidity(shoeValidations);
});

/** Shoe Validations Method **/
function checkShoeValidity(object) {
    let errorCount = 0;
    for (let validation of object) {
        if (check(validation.reg, validation.field)) {
            textSuccess(validation.field, "");
        } else {
            errorCount = errorCount + 1;
            textError(validation.field, validation.error);
        }
    }
    setShoeButtonState(errorCount);
}

/** Disable/Enable Shoe Buttons **/
function setShoeButtonState(value) {
    if (value > 0) {
        $("#btnAddShoe").attr('disabled', true);
        $("#btnUpdateShoe").attr('disabled', true);
        $("#btnDeleteShoe").attr('disabled', true);
    } else {
        $("#btnAddShoe").attr('disabled', false);
        $("#btnUpdateShoe").attr('disabled', false);
        $("#btnDeleteShoe").attr('disabled', false);
    }
}
