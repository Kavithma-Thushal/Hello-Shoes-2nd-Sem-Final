/** Add Item **/
$('#btnAddItem').click(function () {
    let itemObj = {
        code: $('#txtItemCode').val(),
        description: $('#txtItemDescription').val(),
        picture: $('#txtItemPicture').val(),
        category: $('#txtItemCategory').val(),
        size: $('#txtItemSize').val(),
        supplierCode: $('#txtSupplierCode').val(),
        supplierName: $('#txtSupplierName').val(),
        unitPriceSale: $('#txtUnitPriceSale').val(),
        unitPriceBuy: $('#txtUnitPriceBuy').val(),
        expectedProfit: $('#txtExpectedProfit').val(),
        profitMargin: $('#txtProfitMargin').val(),
        status: $('#txtStatus').val()
    };

    console.log("Item Added Successfully...!");

    $.ajax({
        url: baseURL + 'items',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(itemObj),
        success: function (resp) {
            successAlert(resp);
        },
        error: function (resp) {
            errorAlert(resp);
        }
    });
});
