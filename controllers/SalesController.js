/** Sales **/
$('#btnPurchase').click(function () {
    const saleObject = {
        orderId: $('#txtOrderId').val(),
        customerName: $('#txtCustomerNamee').val(),
        code: $('#txtItemCodee').val(),
        description: $('#txtItemDescriptionn').val(),
        size: parseInt($('#txtItemSizee').val()),
        unitPrice: parseFloat($('#txtUnitPrice').val()),
        qty: parseInt($('#txtQty').val()),
        totalPrice: parseFloat($('#txtTotalPrice').val()),
        purchaseDate: new Date($('#txtPurchaseDate').val()).toISOString(),
        paymentMethod: $('#txtPaymentMethod').val(),
        addedPoints: parseInt($('#txtAddedPoints').val()),
        cashierName: $('#txtCashierName').val()
    };

    $.ajax({
        url: baseURL + 'sales',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(saleObject),
        success: function (resp) {
            successAlert(resp);
        },
        error: function (resp) {
            errorAlert(resp);
        }
    });
});
