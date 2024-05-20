/**
 * @author : Kavithma Thushal
 * @project : Hello-Shoes-FrontEnd
 * @since : 2:02 PM - 4/20/2024
 **/

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