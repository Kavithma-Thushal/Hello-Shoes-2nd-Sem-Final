/** Admin Panel **/
$('#btnSaveTotalSales').click(function () {
    const adminPanelObject = {
        totalSales: $('#txtTotalSales').val(),
        totalProfit: $('#txtTotalProfit').val(),
        mostSaleItem: $('#txtMostSaleItem').val(),
        mostSaleItemPic: $('#txtMostSaleItemPic').val(),
        mostSaleItemQty: $('#txtMostSaleItemQty').val()
    };

    $.ajax({
        url: baseURL + 'adminPanel',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(adminPanelObject),
        success: function (resp) {
            successAlert(resp);
        },
        error: function (resp) {
            errorAlert(resp);
        }
    });
});
