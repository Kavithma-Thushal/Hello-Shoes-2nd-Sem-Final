loadAllShoes();

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
                loadAllShoes();
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
                loadAllShoes();
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
            loadAllShoes();
        },
        error: function (resp) {
            errorAlert(resp);
        }
    });
});

/** LoadAll Shoes **/
function loadAllShoes() {
    $.ajax({
        url: baseURL + "shoe/loadAllShoes",
        method: "GET",
        dataType: "json",
        success: function (resp) {
            $("#tblShoes").empty();

            resp.data.forEach(function (shoe) {
                let row = $("<tr>");
                row.append($("<td>").text(shoe.code));
                row.append($("<td>").text(shoe.description));
                row.append($("<td>").append($("<img>", {
                    src: shoe.picture,
                    alt: "Shoe Image",
                    style: "max-width: 100px; max-height: 100px; border-radius:10px"
                })));
                row.append($("<td>").text(shoe.category));
                row.append($("<td>").text(shoe.size));
                row.append($("<td>").text(shoe.quantity));
                row.append($("<td>").text(shoe.supplierId));
                row.append($("<td>").text(shoe.supplierName));
                row.append($("<td>").text(shoe.unitPriceSale));
                row.append($("<td>").text(shoe.unitPriceBuy));
                row.append($("<td>").text(shoe.expectedProfit));
                row.append($("<td>").text(shoe.profitMargin));
                row.append($("<td>").text(shoe.status));

                $("#tblShoes").append(row);
            });
        },
        error: function (error) {
            console.log("Load All Shoes Error : " + error);
        }
    });
}
