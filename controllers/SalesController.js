/**
 * @author : Kavithma Thushal
 * @project : Hello-Shoes-FrontEnd
 * @since : 2:02 PM - 4/20/2024
 **/

generateSalesId();
salesCount();

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