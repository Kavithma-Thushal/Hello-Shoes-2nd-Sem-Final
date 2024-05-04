var baseURL = "http://localhost:8080/shoes/api/v1/";

loadAllShoes();

/** Add Shoe **/
$('#btnAddShoe').click(function () {
    const fileInput = $('#txtShoePicture')[0];
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
        const shoeObj = {
            code: $('#txtShoeCode').val(),
            description: $('#txtShoeDescription').val(),
            picture: reader.result,
            category: $('#txtShoeCategory').val(),
            size: parseInt($('#txtShoeSize').val()),
            quantity: parseInt($('#txtShoeQuantity').val()),
            supplierId: $('#txtSupIdd').val(),
            supplierName: $('#txtSupNamee').val(),
            unitPriceSale: parseFloat($('#txtUnitPriceSale').val()),
            unitPriceBuy: parseFloat($('#txtUnitPriceBuy').val()),
            expectedProfit: parseFloat($('#txtExpectedProfit').val()),
            profitMargin: parseFloat($('#txtProfitMargin').val()),
            stockStatus: $('#txtStockStatus').val()
        };

        $.ajax({
            url: baseURL + 'shoe',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(shoeObj),
            success: function (resp) {
                successAlert(resp);
                loadAllShoes();
            },
            error: function (error) {
                errorAlert(error);
            }
        });
    };
});

/** Search Shoe **/
$('#btnSearchShoe').click(function () {
    let code = $("#txtShoeCode").val();

    $.ajax({
        url: baseURL + 'shoe/searchShoe/' + code,
        method: 'GET',
        success: function (resp) {
            alert("Shoe Searched Successfully...!");
        },
        error: function (error) {
            errorAlert(error);
        }
    });
});

/** Update Shoe **/
$('#btnUpdateShoe').click(function () {
    const fileInput = $('#txtShoePicture')[0];
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
        const shoeObj = {
            code: $('#txtShoeCode').val(),
            description: $('#txtShoeDescription').val(),
            picture: reader.result,
            category: $('#txtShoeCategory').val(),
            size: parseInt($('#txtShoeSize').val()),
            quantity: parseInt($('#txtShoeQuantity').val()),
            supplierId: $('#txtSupIdd').val(),
            supplierName: $('#txtSupNamee').val(),
            unitPriceSale: parseFloat($('#txtUnitPriceSale').val()),
            unitPriceBuy: parseFloat($('#txtUnitPriceBuy').val()),
            expectedProfit: parseFloat($('#txtExpectedProfit').val()),
            profitMargin: parseFloat($('#txtProfitMargin').val()),
            stockStatus: $('#txtStockStatus').val()
        };

        $.ajax({
            url: baseURL + 'shoe',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(shoeObj),
            success: function (resp) {
                successAlert(resp);
                loadAllShoes();
            },
            error: function (error) {
                errorAlert(error);
            }
        });
    };
});

/** Delete Shoe **/
$('#btnDeleteShoe').click(function () {
    let code = $("#txtShoeCode").val();

    $.ajax({
        url: baseURL + 'shoe/' + code,
        method: 'DELETE',
        success: function (resp) {
            successAlert(resp);
            loadAllShoes();
        },
        error: function (error) {
            errorAlert(error);
        }
    });
});

/** LoadAll Shoes **/
function loadAllShoes() {
    $.ajax({
        url: baseURL + "shoe/loadAllShoes",
        method: "GET",
        success: function (resp) {
            $("#tblShoes").empty();

            resp.data.forEach(function (i) {
                let row = $("<tr>");
                row.append($("<td>").text(i.code));
                row.append($("<td>").text(i.description));
                row.append($("<td>").append($("<img>", {
                    src: i.picture,
                    alt: "Shoe Image",
                    style: "max-width: 100px; max-height: 100px; border-radius:10px"
                })));
                row.append($("<td>").text(i.category));
                row.append($("<td>").text(i.size));
                row.append($("<td>").text(i.quantity));
                row.append($("<td>").text(i.supplierId));
                row.append($("<td>").text(i.supplierName));
                row.append($("<td>").text(i.unitPriceSale));
                row.append($("<td>").text(i.unitPriceBuy));
                row.append($("<td>").text(i.expectedProfit));
                row.append($("<td>").text(i.profitMargin));
                row.append($("<td>").text(i.stockStatus));

                $("#tblShoes").append(row);
            });
            // clearInputFields();
            // checkValidity(customerValidations);
            shoeTableListener();
            // generateCustomerId();
        },
        error: function (error) {
            console.log("Load All Shoes Error : " + error);
        }
    });
}

/** Shoe Table Listner **/
function shoeTableListener() {
    $("#tblShoes>tr").on("click", function () {
        let code = $(this).children().eq(0).text();
        let description = $(this).children().eq(1).text();
        let picture = $(this).children().eq(2).text();
        let category = $(this).children().eq(3).text();
        let size = $(this).children().eq(4).text();
        let quantity = $(this).children().eq(5).text();
        let supplierId = $(this).children().eq(6).text();
        let supplierName = $(this).children().eq(7).text();
        let unitPriceSale = $(this).children().eq(8).text();
        let unitPriceBuy = $(this).children().eq(9).text();
        let expectedProfit = $(this).children().eq(10).text();
        let profitMargin = $(this).children().eq(11).text();
        let stockStatus = $(this).children().eq(12).text();

        $("#txtShoeCode").val(code);
        $("#txtShoeDescription").val(description);
        $("#txtShoePicture").val(picture);
        $("#txtShoeCategory").val(category);
        $("#txtShoeSize").val(size);
        $("#txtShoeQuantity").val(quantity);
        $("#txtSupIdd").val(supplierId);
        $("#txtSupNamee").val(supplierName);
        $("#txtUnitPriceSale").val(unitPriceSale);
        $("#txtUnitPriceBuy").val(unitPriceBuy);
        $("#txtExpectedProfit").val(expectedProfit);
        $("#txtProfitMargin").val(profitMargin);
        $("#txtStockStatus").val(stockStatus);

        // $("#btnSaveCustomer").attr('disabled', true);
        // $("#btnUpdateCustomer").attr('disabled', false);
        // $("#btnDeleteCustomer").attr('disabled', false);
    });
}