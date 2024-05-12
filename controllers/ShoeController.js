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
            category: $('#txtShoeCategory').val(),
            size: parseInt($('#txtShoeSize').val()),
            quantity: parseInt($('#txtShoeQuantity').val()),
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
            let row = "<tr><td>" + resp.code + "</td><td>" + resp.description + "</td><td>" + resp.picture + "</td><td>" + resp.category +
                "</td><td>" + resp.size + "</td><td>" + resp.quantity + "</td><td>" + resp.supplierId + "</td><td>" + resp.supplierName +
                "</td><td>" + resp.unitPriceSale + "</td><td>" + resp.unitPriceBuy + "</td><td>" + resp.expectedProfit + "</td><td>" +
                resp.profitMargin + "</td><td>" + "</td><td>" + resp.stockStatus + "</td></tr>"
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
            category: $('#txtShoeCategory').val(),
            size: parseInt($('#txtShoeSize').val()),
            quantity: parseInt($('#txtShoeQuantity').val()),
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
                    alt: "Shoe Image",
                    style: "max-width: 100px; max-height: 100px; border-radius:10px"
                })));
                row.append($("<td>").text(i.category));
                row.append($("<td>").text(i.size));
                row.append($("<td>").text(i.quantity));
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
            // checkValidity(customerValidations);
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

/** Shoe Table Listner **/
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
        $("#txtShoeQuantity").val(quantity);
        $("#txtSupIdd").val(supplierId);
        $("#txtSupNamee").val(supplierName);
        $("#txtUnitPriceSale").val(unitPriceSale);
        $("#txtUnitPriceBuy").val(unitPriceBuy);
        $("#txtExpectedProfit").val(expectedProfit);
        $("#txtProfitMargin").val(profitMargin);
        $("#txtStockStatus").val(stockStatus);

        // $("#btnSaveCustomer").attr('disabled', true);
        // $("#btnUpdateCustomer").attr('disabled', false);
        // $("#btnDeleteCustomer").attr('disabled', false);
    });
}

/** Clear Shoe Input Fields **/
function clearShoeInputFields() {
    $("#txtShoeDescription").focus();
    $('#txtShoeDescription').val("");
    $('#txtShoePicture').val("");
    $('#txtShoeCategory').val("");
    $('#txtShoeSize').val("");
    $('#txtShoeQuantity').val("");
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
