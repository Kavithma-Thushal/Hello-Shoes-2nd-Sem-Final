// const baseURL = "http://localhost:8080/shoes/api/v1/";

/** Add Shoe **/
$('#btnAddShoe').click(function () {
    const fileInput = $('#txtItemPicture')[0];
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
        const shoeObject = {
            code: $('#txtItemCode').val(),
            description: $('#txtItemDescription').val(),
            picture: reader.result,
            category: $('#txtItemCategory').val(),
            size: parseInt($('#txtItemSize').val()),
            quantity: parseInt($('#txtItemQuantity').val()),
            supplierId: $('#txtSupplierIdd').val(),
            supplierName: $('#txtSupplierNamee').val(),
            unitPriceSale: parseFloat($('#txtUnitPriceSale').val()),
            unitPriceBuy: parseFloat($('#txtUnitPriceBuy').val()),
            expectedProfit: parseFloat($('#txtExpectedProfit').val()),
            profitMargin: parseFloat($('#txtProfitMargin').val()),
            status: $('#txtStatus').val()
        };

        $.ajax({
            url: baseURL + 'shoe',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(shoeObject),
            success: function (resp) {
                successAlert(resp);
            },
            error: function (resp) {
                errorAlert(resp);
            }
        });
    };
});

/** Search Shoe **/
$('#btnSearchShoe').click(function () {
    let code = $("#txtItemCode").val();

    $.ajax({
        url: baseURL + 'shoe/searchShoe/' + code,
        method: 'GET',
        contentType: 'application/json',
        success: function (resp) {
            console.log("Shoe Searched Successfully...!");
        },
        error: function (resp) {
            errorAlert(resp);
        }
    });
});

/** Update Shoe **/
$('#btnUpdateShoe').click(function () {
    const fileInput = $('#txtItemPicture')[0];
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
        const itemObject = {
            code: $('#txtItemCode').val(),
            description: $('#txtItemDescription').val(),
            picture: reader.result,
            category: $('#txtItemCategory').val(),
            size: parseInt($('#txtItemSize').val()),
            quantity: parseInt($('#txtItemQuantity').val()),
            supplierId: $('#txtSupplierIdd').val(),
            supplierName: $('#txtSupplierNamee').val(),
            unitPriceSale: parseFloat($('#txtUnitPriceSale').val()),
            unitPriceBuy: parseFloat($('#txtUnitPriceBuy').val()),
            expectedProfit: parseFloat($('#txtExpectedProfit').val()),
            profitMargin: parseFloat($('#txtProfitMargin').val()),
            status: $('#txtStatus').val()
        };

        $.ajax({
            url: baseURL + 'shoe',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(itemObject),
            success: function (resp) {
                successAlert(resp);
            },
            error: function (resp) {
                errorAlert(resp);
            }
        });
    };
});

/** Delete Shoe **/
$('#btnDeleteShoe').click(function () {
    let code = $("#txtItemCode").val();

    $.ajax({
        url: baseURL + 'shoe/' + code,
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
