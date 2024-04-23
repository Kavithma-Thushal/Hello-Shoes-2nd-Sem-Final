/** Add Item **/
$('#btnAddItem').click(function () {
    const itemObject = {
        code: $('#txtItemCode').val(),
        description: $('#txtItemDescription').val(),
        picture: $('#txtItemPicture').val(),
        category: $('#txtItemCategory').val(),
        size: $('#txtItemSize').val(),
        supplierId: $('#txtSupplierIdd').val(),
        supplierName: $('#txtSupplierNamee').val(),
        unitPriceSale: $('#txtUnitPriceSale').val(),
        unitPriceBuy: $('#txtUnitPriceBuy').val(),
        quantity: $('#txtItemQuantity').val(),
        expectedProfit: $('#txtExpectedProfit').val(),
        profitMargin: $('#txtProfitMargin').val(),
        status: $('#txtStatus').val()
    };

    $.ajax({
        url: baseURL + 'items',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(itemObject),
        success: function (resp) {
            successAlert(resp);
        },
        error: function (resp) {
            errorAlert(resp);
        }
    });
});
