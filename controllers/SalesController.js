/** Sales **/
$('#btnPurchase').click(function () {
    const saleObject = {
        orderId: $('#txtOrderId').val(),
        customerName: $('#txtCustomerNamee').val(),
        code: $('#txtItemCodee').val(),
        description: $('#txtItemDescriptionn').val(),
        size: $('#txtItemSizee').val(),
        unitPrice: $('#txtUnitPrice').val(),
        qty: $('#txtQty').val(),
        totalPrice: $('#txtTotalPrice').val(),
        purchaseDate: new Date($('#txtPurchaseDate').val()).toISOString(),
        paymentMethod: $('#txtPaymentMethod').val(),
        addedPoints: $('#txtAddedPoints').val(),
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
