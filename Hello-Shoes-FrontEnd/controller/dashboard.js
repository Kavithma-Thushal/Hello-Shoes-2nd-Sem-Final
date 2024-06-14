function getAdminPanel() {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/panel/getAll",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (res, textStatus, xhr) {
                console.log(res);
                    resolve(res);
            },
            error: function (ob, textStatus, error) {
                resolve(error);
            }
        });
    });
}
function getOrderCount() {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/sales/total",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (res, textStatus, xhr) {
                resolve(res);
            },
            error: function (ob, textStatus, error) {
                resolve(error);
            }
        });
    });
}
function getCustomerCount() {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/customer/total",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (res, textStatus, xhr) {
                resolve(res);
            },
            error: function (ob, textStatus, error) {
                resolve(error);
            }
        });
    });
}
function getItemCount() {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/inventory/total",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (res, textStatus, xhr) {
                resolve(res);
            },
            error: function (ob, textStatus, error) {
                resolve(error);
            }
        });
    });
}
function setAdminPanel() {
    getAdminPanel().then(function (value) {
        if (Object.keys(value).length !== 0 ){

            searchItem(value.mostSaleItem).then(function (itm) {
                if (Object.keys(itm).length !== 0) {
                    $("#panelImg").attr('src',value.mostSaleItemPicture);
                    $("#dashItmCode").text(value.mostSaleItem);
                    $("#dashItmDesc").text(itm.itemDesc);
                    $("#dashItmSale").text("$"+itm.salePrice);
                    $("#dashItmQTY").text(value.mostSaleItemQuantity);

                    $("#totalSale").text("$"+value.totalSales);
                    $("#totalProfit").text("$"+value.totalProfit);

                    getOrderCount().then(function (count) {
                             $("#totalOrders").text(count);
                    });

                }

            });
        }else {
            $("#panelImg").attr('src',"assets/images/sport-shoe.png");
            $("#dashItmCode").text("");
            $("#dashItmDesc").text("");
            $("#dashItmSale").text("");
            $("#dashItmQTY").text("");

            $("#totalSale").text("$0.00");
            $("#totalProfit").text("$0.00");
            $("#totalOrders").text(0);
        }
    });

    getCustomerCount().then(function (count) {
        if (count !== 0 || count !== null){
            $("#totalCustomers").text(count);
        }else {
            $("#totalCustomers").text("0");
        }
    });

    getItemCount().then(function (count) {
        if (count !== 0 || count !== null){
            $("#totalItems").text(count);
        }else {
            $("#totalItems").text("0");
        }
    });

}
$("#sendOffer").click(function () {
    clearOffer();
    offer.css('display','block');
});
$("#offerCancel").click(function () {
    clearOffer();
    offer.css('display','none');
});
function clearOffer() {
    $("#subject").val("");
    $("#message").val("");
}

$("#offer-send").click(function () {
    if ($("#subject").val() !== "" && $("#message").val() !== ""){
        send();
    }else {
        swal("Error","Please add details", "error");
    }
});

function send() {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        let data = {
            subject: $("#subject").val(),
            message: $("#message").val(),
        }
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/customer/send",
            method: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function (res) {
                swal("Success", "Mails Sending Successfully", "success");
            },
            error: function (error) {
                swal("Error","Error sending mails", "error");
            }
        });
        clearOffer();
}