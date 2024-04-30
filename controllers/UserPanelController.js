$('#btnSaveTotalSales').click(function () {
    const fileInput = $('#txtMostSaleItemPic')[0];
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
        const adminPanelObject = {
            totalSales: parseInt($('#txtTotalSales').val()),
            totalProfit: parseFloat($('#txtTotalProfit').val()),
            mostSaleItem: $('#txtMostSaleItem').val(),
            mostSaleItemPic: reader.result,
            mostSaleItemQty: parseInt($('#txtMostSaleItemQty').val())
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
    };
});
