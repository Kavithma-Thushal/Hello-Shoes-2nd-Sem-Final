/** Purchase Sale **/
$('#btnPurchaseSale').click(function () {
    const saleobj = {
        orderId: $('#txtOrderId').val(),
        customerName: $('#txtCustomerNamee').val(),
        code: $('#txtItemCodee').val(),
        description: $('#txtItemDescriptionn').val(),
        size: $('#txtItemSizee').val(),
        unitPrice: $('#txtUnitPrice').val(),
        qty: $('#txtQty').val(),
        totalPrice: $('#txtTotalPrice').val(),
        purchaseDate: $('#txtPurchaseDate').val(),
        paymentMethod: $('#txtPaymentMethod').val(),
        addedPoints: $('#txtAddedPoints').val(),
        cashierName: $('#txtcashierName').val()
    };

    $.ajax({
        url: baseURL + 'sales',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(saleobj),
        success: function (resp) {
            successAlert(resp);
        },
        error: function (resp) {
            errorAlert(resp);
        }
    });
});
