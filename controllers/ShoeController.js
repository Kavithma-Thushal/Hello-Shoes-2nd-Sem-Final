// const baseURL = "http://localhost:8080/shoes/api/v1/";

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

/** LoadAll Shoes **/
function loadAllShoes() {
    $.ajax({
        url: baseURL + "shoe/loadAllShoes",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            $("#tblShoes").empty();

            for (let i of resp.data) {
                let code = i.code;
                let description = i.description;
                // let picture = i.picture;
                let category = i.category;
                let size = i.size;
                let quantity = i.quantity;
                let supplierId = i.supplierId;
                let supplierName = i.supplierName;
                let unitPriceSale = i.unitPriceSale;
                let unitPriceBuy = i.unitPriceBuy;
                let expectedProfit = i.expectedProfit;
                let profitMargin = i.profitMargin;
                let status = i.status;

                let row = "<tr><td>" + code + "</td><td>" + description + /*"</td><td>" + picture +*/ "</td><td>" + category + "</td><td>" + size +
                    "</td><td>" + quantity + "</td><td>" + supplierId + "</td><td>" + supplierName + "</td><td>" + unitPriceSale + "</td><td>" +
                    unitPriceBuy + "</td><td>" + expectedProfit + "</td><td>" + profitMargin + "</td><td>" + status + "</td></tr>"
                $("#tblShoes").append(row);
            }
            // clearInputFields();
            // checkValidity(customerValidations);
            // tableListener();
            // generateCustomerId();
        },
        error: function (error) {
            console.log("Load All Shoes Error : " + error);
        }
    });
}