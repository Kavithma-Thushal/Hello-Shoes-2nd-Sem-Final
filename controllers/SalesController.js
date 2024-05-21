/**
 * @author : Kavithma Thushal
 * @project : Hello-Shoes-FrontEnd
 * @since : 2:02 PM - 4/20/2024
 **/

generateSalesId();
salesCount();

/** Load All Customers to Combo-Box **/
function cmbLoadAllCustomers() {
    $.ajax({
        url: baseURL + "customer/loadAllCustomers",
        method: "GET",
        headers: {
            Authorization: 'Bearer ' + jwtToken
        },
        success: function (resp) {
            $("#cmbCusId").empty();

            // Add a default empty option
            $("#cmbCusId").append('<option value="" disabled selected></option>');

            for (let i of resp.data) {
                let id = i.id;
                $("#cmbCusId").append(`<option>${id}</option>`);
            }
        },
        error: function (error) {
            console.log(JSON.parse("Load All Customers to Combo-Box Error : " + error.responseText).message);
        }
    });
}

/** Customer Searching Combo-Box **/
$("#cmbCusId").click(function () {
    let id = $("#cmbCusId").val();
    $.ajax({
        url: baseURL + 'customer/searchCustomer/' + id,
        method: "GET",
        headers: {
            Authorization: 'Bearer ' + jwtToken
        },
        success: function (resp) {
            $("#customerName").val(resp.name);
            $("#loyaltyLevel").val(resp.loyaltyLevel);
            $("#loyaltyDate").val(resp.loyaltyDate);
            $("#totalPoints").val(resp.totalPoints);
            $("#recentDate").val(resp.recentDate);
        },
        error: function (error) {
            console.log(JSON.parse("Customer Combo-Box Searching Error : " + error.responseText).message);
        }
    });
});

/** Generate SalesId **/
function generateSalesId() {
    $("#txtSalesId").val("O00-001");
    $.ajax({
        url: baseURL + "sales/generateSalesId",
        method: "GET",
        headers: {
            Authorization: 'Bearer ' + jwtToken
        },
        success: function (resp) {
            let id = resp.generatedId;
            let tempId = parseInt(id.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                $("#txtSalesId").val("O00-00" + tempId);
            } else if (tempId <= 99) {
                $("#txtSalesId").val("O00-0" + tempId);
            } else {
                $("#txtSalesId").val("O00-" + tempId);
            }
        },
        error: function (error) {
            console.log("Fail to Generate Sales ID : ", error);
        }
    });
}

/** Sales Count **/
function salesCount() {
    $.ajax({
        url: baseURL + "sales/salesCount",
        method: "GET",
        headers: {
            Authorization: 'Bearer ' + jwtToken
        },
        success: function (resp) {
            $("#txtSalesCount").text(resp.count);
        },
        error: function (error) {
            console.log("Sales Count Error : ", error);
        }
    });
}