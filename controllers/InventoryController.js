/** Add Item **/
$('#btnAddItem').click(function () {
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
    };
});
