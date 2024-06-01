const QTY_REGEX = /^[1-9]\d*$/;
const ord_itm_ID_REGEX = /^[A-Za-z0-9 ]{5,}$/;
const ord_CUS_ID_REGEX = /^C00-(0*[1-9]\d{0,2})$/;
let o_Array = new Array();
o_Array.push({field: $("#ordItmQty"), regEx: QTY_REGEX });
o_Array.push({field: $("#OrdItm"), regEx: ord_itm_ID_REGEX });
o_Array.push({field: $("#ordCusId"), regEx: ord_CUS_ID_REGEX });

$(document).ready(function () {
    $("#btnConfirm").prop("disabled", true);
    $("#order-add-item").prop("disabled", true);
    $("#btnSubmitOrder").prop("disabled", true);
    $("#order-clear").prop("disabled", true);
    $("#order-update").prop("disabled", true);
    $("#order-delete").prop("disabled", true);

    $('#order-thead').css({
        'width': '100%',
        'display': 'flex'
    });
    $('#order-thead>th').css({
        'flex': '1',
        'max-width': 'calc(100%/7*1)'
    })
    generateOrderId();
});

$("#paymentCard").click(function () {
    purchaseBtnHide(true);
    allContainerHide();
    const role = localStorage.getItem('role');
    if (role == "USER") {
        userPage.css('display','block');
    }
    if (role == "ADMIN") {
        adminPage.css('display','block');
    }
    paymentPage.css('display','block');
    cardPage.css('display','block');
});

$("#cancel").click(function () {
    purchaseBtnHide(true);
    cardPage.css('display','none');
    const role = localStorage.getItem('role');
    if (role == "USER") {
        userPage.css('display','block');
    }
    if (role == "ADMIN") {
        adminPage.css('display','block');
    }
    paymentPage.css('display','block');
});

$("#paymentCash").click(function () {
    purchaseBtnHide(false);
});

$("#backToPayment").click(function () {
    $('#confirm-container').hide();
});

$("#confirmPassword").on("keydown keyup", function (e) {
    $("#btnConfirm").prop("disabled", true);
    if ($("#confirmPassword").val() !== "") {
        passwordCheck($("#confirmUsername").val(),$("#confirmPassword").val()).then(function (pass) {
            if (pass) {
                $("#confirmPasswordError").text("");
                $("#confirmPassword").css("border", "2px solid green");

                if ($("#confirmUsername").val() !== "") {
                    getUserDetail($("#confirmUsername").val()).then(function (res) {
                        if (res !== false) {
                            if (res.role === "ADMIN"){
                            $("#confirmUsernameError").text("");
                            $("#confirmUsername").css("border", "2px solid green");
                            $("#btnConfirm").prop("disabled", false);
                            } else {
                                $("#confirmUsernameError").text("Invalid Admin username");
                                $("#confirmUsername").css("border", "2px solid red");
                            }
                        } else {
                            $("#confirmUsernameError").text("Invalid Username");
                            $("#confirmUsername").css("border", "2px solid red");
                            $("#btnConfirm").prop("disabled", true);
                        }

                    });
                } else {
                    $("#confirmUsernameError").text("");
                    $("#confirmUsername").css("border", "1px solid #ced4da");
                }
            } else {
                $("#confirmPasswordError").text("Invalid password");
                $("#confirmPassword").css("border", "2px solid red");
                $("#btnConfirm").prop("disabled", true);
            }
        });
    }else {
        $("#confirmPasswordError").text("");
        $("#confirmPassword").css("border", "1px solid #ced4da");
    }
});

$("#confirmUsername").on("keydown keyup", function (e) {

    $("#btnConfirm").prop("disabled", true);
    if ($("#confirmUsername").val() !== "") {
        getUserDetail($("#confirmUsername").val()).then(function (res) {
            if (res !== false) {
                if (res.role === "ADMIN") {
                    $("#confirmUsernameError").text("");
                    $("#confirmUsername").css("border", "2px solid green");
                    passwordCheck($("#confirmUsername").val(), $("#confirmPassword").val()).then(function (pass) {
                        if (pass) {
                            $("#confirmPasswordError").text("");
                            $("#confirmPassword").css("border", "2px solid green");
                            $("#btnConfirm").prop("disabled", false);

                        } else {
                            $("#confirmPasswordError").text("Invalid password");
                            $("#confirmPassword").css("border", "2px solid red");
                            $("#btnConfirm").prop("disabled", true);
                        }
                    });
                } else {
                    $("#confirmUsernameError").text("Invalid Admin username");
                    $("#confirmUsername").css("border", "2px solid red");
                }
            }else
                {
                    $("#confirmUsernameError").text("Invalid Username");
                    $("#confirmUsername").css("border", "2px solid red");
                }
        });
    } else {
        $("#confirmUsernameError").text("");
        $("#confirmUsername").css("border", "1px solid #ced4da");
    }
});

$("#btnConfirm").click(function () {

    if ($("#order-update").prop("disabled") !== true){
        if (cardPage.css('display') == "none"){
            if (cashValidate()) {
                updateOrder("Cash");
            } else {
                swal("Error", "Insufficient Credit : Check Cash!", "error");
            }
        }else if(cardPage.css('display') == "block"){
            updateOrder("Card");
        }

    }else if ($("#order-update").prop("disabled") === true && $("#order-delete").prop("disabled") !== true){
        deleteOrder();
    }
});

$("#order-clear,.order-nav").click(function () {
    clearAll();
});

$("#orderIdAdd").click(function () {
    generateOrderId();
});

$("#OrdItm").on("keydown keyup", function (e) {
    if ($("#OrdItm").val() !== "") {
        let indexNo = o_Array.indexOf(o_Array.find((c) => c.field.attr("id") == e.target.id));
        if (o_Array[indexNo].regEx.test($("#OrdItm").val())) {
            searchItem($("#OrdItm").val()).then(function (res) {
                console.log(res)
                if (res != null || res != undefined) {
                    if (res.status == "Not Available") {
                        $("#OrdItmError").text("Item is not ");
                        $("#OrdItm").css("border", "2px solid red");
                    } else {
                        $("#OrdItm").css("border", "2px solid green");
                        $("#OrdItmError").text("");
                        $("#OrdItmDes").val(res.itemDesc);
                        $("#ordItmSize").val(res.size);
                        $("#ordItmPrice").val(res.salePrice);
                        $("#qtyOnHand").val(res.qty);
                        setAddItemBtn();
                    }
                }
                if ($("#OrdItmDes").val() == "" || $("#OrdItmDes").val() == null) {
                    $("#OrdItmError").text("Item is not Exist or Available");
                    $("#OrdItm").css("border", "2px solid red");
                }
            });
        } else {
            $("#OrdItmError").text("itm-Code is a required field: Minimum 5");
            $("#OrdItm").css("border", "2px solid red");
        }
        setOrderBtn();
        setOrdClBtn();
    }else {
        $("#OrdItmError").text("");
        $("#OrdItm").css("border", "1px solid #ced4da");
    }
});

$("#ordCusId").on("keydown keyup", function (e) {
    if ($("#ordCusId").val() !== "") {
    let indexNo = o_Array.indexOf(o_Array.find((c) => c.field.attr("id") == e.target.id));
    if (o_Array[indexNo].regEx.test($("#ordCusId").val())) {
        searchCustomer($("#ordCusId").val()).then(function (res){
            if (res != null || res != undefined){
                $("#ordCusId").css("border", "2px solid green");
                $("#ordCusIdError").text("");
                $("#ordCusName").val(res.customerName);
                if (res.loyaltyDate == null && res == undefined){
                    $("#ordPointsError").text("No Register at Loyalty");
                }else {
                    $("#ordPointsError").text("");
                }
                setAddItemBtn();
            }
            if( $("#ordCusName").val() == "" || $("#ordCusName").val() == null){
                $("#ordCusIdError").text("Customer is not Exist");
                $("#ordCusId").css("border", "2px solid red");
            }
        });
    }else {
        $("#ordCusIdError").text("Cus-Id is a required field: C00-");
        $("#ordCusId").css("border", "2px solid red");
    }
    setOrderBtn();
    setOrdClBtn();
}else {
    $("#ordCusIdError").text("");
    $("#ordCusId").css("border", "1px solid #ced4da");
}
});

function searchOrder(id) {
    console.log(id);
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/sales/search/"+id,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (res) {
                console.log(res);
                resolve(res);
            },
            error: function (ob, textStatus, error) {
                resolve(error);
            }
        });
    });
}

function placeOrder(payment,method) {
    const cahier = localStorage.getItem('cashier');
    let order = {
        orderNo: "",
        total: 0.0,
        paymentMethod: "",
        totalPoints: 0,
        cashier: cahier,
        customerName: {
            customerId: "",
            customerName: ""
        },
        saleDetails: [
        ]
    }

    let cusId = $("#ordCusId").val();
    let oId = $("#orderId").val();
    let cusPoints = $("#ordPoints").val();
    let cusName = $("#ordCusName").val();
    let total = 0.00;


    $('#order-table>tr').each(function () {
        let code = $(this).children().eq(1).text();
        let qty = $(this).children().eq(5).text();
        let price = $(this).children().eq(6).text();
        let orderDetails = {
            orderDetailPK: {
                orderNo: oId,
                itemCode: code
            },
            itmQTY: parseInt(qty),
            itmTotal: parseFloat(price)
        };
        total += price;
        order.saleDetails.push(orderDetails);
    });
    order.orderNo = oId;
    order.paymentMethod = payment;
    order.totalPoints = cusPoints;
    order.customerName.customerId = cusId;
    order.customerName.customerName = cusName;
    order.total= total;

    console.log(order)
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    $.ajax({
        url: "http://localhost:8080/helloshoes/api/v1/sales",
        method: method,
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        data: JSON.stringify(order),
        contentType: "application/json",
        success: function (res, textStatus, jsXH) {
            console.log(res);
            swal("Saved", "Order Added Successfully", "success");
            generateOrderId();
        },
        error: function (ob, textStatus, error) {
            swal("Error","Error Order Not Added", "error");
        }
    });
}

$("#order-update").click(function () {

    const role = localStorage.getItem('role');
    if (role == "USER") {
        $('#confirm-container').show();
    }
    if (role == "ADMIN") {
        if (cashValidate()) {
            updateOrder("Cash");
        } else {
            swal("Error", "Insufficient Credit : Check Cash!", "error");
        }
    }

});

$("#order-delete").click(function () {

    const role = localStorage.getItem('role');
        if (role == "USER") {
            $('#confirm-container').show();
        }
        if (role == "ADMIN") {
            deleteOrder();
        }
});

function updateOrder(payment) {
    let id = $("#orderId").val();
    searchOrder(id).then(function (isValid) {
        if (Object.keys(isValid).length !== 0) {
            swal("Do you really want to update this Order.?", {
                buttons: {
                    cancel1: {
                        text: "Cancel",
                        className: "custom-cancel-btn",
                    },
                    ok: {
                        text: "OK",
                        value: "confirm",
                        className: "custom-ok-btn",
                    }
                },
            }).then((value) => {
                if (value === "confirm") {

                    if (itemValidate()) {
                        if(payment == "Card"){
                            placeOrder(payment,"PUT");
                            clearAll();
                            purchaseBtnHide(true);
                            generateOrderId();
                        }else if (payment == "Cash"){
                            if (cashValidate()) {
                                placeOrder(payment,"PUT");
                                clearAll();
                                purchaseBtnHide(true);
                                generateOrderId();
                            } else {
                                swal("Error", "Insufficient Credit : Check Cash!", "error");
                            }
                        }

                    } else {
                        swal("Error", "Please Add Items to Place Order", "error");
                    }
                    setOrderBtn();
                    setOrdClBtn();
                }
            });

        } else {
            swal("Error", "No such Order..please check the ID", "error");
        }
    });
}

function deleteOrder(){
    let id = $("#orderId").val();
    searchOrder(id).then(function (isValid) {
        if (Object.keys(isValid).length === 0) {
            swal("Error", "No such Order..please check the ID", "error");
            clearAll();
        } else {

            swal("Do you want to delete this Order.?", {
                buttons: {
                    cancel1: {
                        text: "Cancel",
                        className: "custom-cancel-btn",
                    },
                    ok: {
                        text: "OK",
                        value: "confirm",
                        className: "custom-ok-btn",
                    }
                },
            }).then((value) => {
                if (value === "confirm") {
                    performAuthenticatedRequest();
                    const accessToken = localStorage.getItem('accessToken');
                    $.ajax({
                        url: "http://localhost:8080/helloshoes/api/v1/sales?orderId=" + id,
                        method: "DELETE",
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        },
                        success: function (res) {
                            console.log(res);
                            swal("Deleted", "Order Delete Successfully", "success");
                            clearAll();
                            setOrderBtn();
                            setOrdClBtn();
                            generateOrderId();
                        },
                        error: function (ob, textStatus, error) {
                            swal("Error","Error Order Not Delete", "error");
                        }
                    });
                }
            });
        }
    });
}

$("#order-add-item").click(function () {
    let id = $("#OrdItm").val();
    let name = $("#OrdItmDes").val();
    let size = $("#ordItmSize").val();
    let price = $("#ordItmPrice").val();
    let qty = $("#ordItmQty").val();
    let total = parseFloat(price) * parseFloat(qty);
    let allTotal = 0;
    let itemExists = false;
    let points = 0.0;
    $('#order-table>tr').each(function (e) {
        let check = $(this).children().eq(1).text();
        if (id === check) {
            let liQty = $(this).children().eq(5).text();
            let upQty = parseInt(liQty) + parseInt(qty);

            $(this).children().eq(2).text(name);
            $(this).children().eq(3).text(size);
            $(this).children().eq(5).text(upQty);
            $(this).children().eq(6).text(upQty * parseFloat(price));
            itemExists = true;
            return false;
        }
    });

    if (!itemExists) {
        let row = `<tr>
                     <td><img class="rounded mx-auto d-block" src="assets/images/delete3.gif" alt="Card" style="width: 1.5vw; z-index: 5;" /></td>
                     <td>${id}</td>
                     <td>${name}</td>
                     <td>${size}</td>
                     <td>${price}</td>
                     <td>${qty}</td>
                     <td>${total}</td>
                    </tr>`;

        $("#order-table").append(row);
        $('#order-table').css({
            'width ': '101.8%',
            'max-height': '80px',
            'overflow-y': 'auto',
            'display': 'table-caption'
        });
        $('#order-table>tr>td').css({
            'flex': '1',
            'max-width': 'calc(100%/7*1)',
            'text-align': 'center'
        });
        if ($("#order-table>tr").length > 1) {
            $('#order-table>tr').css({
                'width': '100%',
                'display': 'flex'
            });
        } else {
            $('#order-table>tr').css({
                'width': '98.2%',
                'display': 'flex'
            });
        }
        bindRemove();

    }
    $('#order-table>tr').each(function (e) {
        let full = $(this).children().eq(6).text();
        allTotal += parseFloat(full);
    });
    $("#total").text(allTotal);
    $("#subtotal").text(allTotal);
    points += Math.round(allTotal / 800);
    searchCustomer($("#ordCusId").val()).then(function (res){
        if (res != null || res != undefined){
            if (res.loyaltyDate == null && res == undefined){
                $("#ordPointsError").text("No Register at Loyalty");
            }else {
                $("#ordPointsError").text("");
                if (allTotal > 800){
                            $("#ordPoints").val(points);
                }
            }
        }
        if( $("#ordCusName").val() == "" || $("#ordCusName").val() == null){
            $("#ordCusIdError").text("Customer is not Exist");
            $("#ordCusId").css("border", "2px solid red");
        }
    });


});

$("#txtDiscount").on("keydown keyup input", function (e) {
    let total = parseFloat($("#total").text());
    if (total > 0) {
        let discount = $(this).val();
        let fullAm = (total / 100 * discount);
        total -= fullAm;
        $("#subtotal").text(total);
        setAndTriggerValue($("#subtotal"), total);
    }

});

$("#txtCash").on("keydown keyup input", function () {
    if ($("#txtCash").val() !== ""){
        if (cashValidate()){
            setBalance();
            $("#btnSubmitOrder").prop("disabled", false);
        }else {
            $("#btnSubmitOrder").prop("disabled", true);
        }
    }else {
        $("#txtCash").css("border", "1px solid #ced4da");
    }

});

$("#subtotal").on("input", function () {
    cashValidate();
});

function setBalance() {
    let subtotalText = $("#subtotal").text();
    let cashText = $("#txtCash").val();
    let subtotal = parseFloat(subtotalText);
    let cash = parseFloat(cashText);
    if (!isNaN(subtotal) && !isNaN(cash)) {
        let balance = cash - subtotal;
        $("#txtBalance").val(balance.toFixed(2));
    } else {
        $("#txtBalance").val("0");
    }
}

function generateOrderId() {
    loadOrderId().then(function (id) {
        $("#orderId").val(id);
    }).catch(function (error) {
        console.error("Error loading Employee Id:", error);
    });
}

function loadOrderId() {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        var ar;
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/sales/getGenId",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function (res) {
                console.log(res);
                ar = res;
                resolve(ar);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

$("#btnSubmitOrder,#card-payment").click(function () {
    let oId = $("#orderId").val();
    if ($(this).attr('id') == "btnSubmitOrder"){
        searchOrder(oId).then(function (order) {
            if (Object.keys(order).length === 0) {
                if (itemValidate()) {
                    if (cashValidate()) {
                            placeOrder("Cash","POST");
                            clearAll();
                            generateOrderId();

                    } else {
                        swal("Error", "Insufficient Credit : Check Cash!", "error");
                    }
                } else {
                    swal("Error", "Please Add Items to Place Order", "error");
                }
            }else {
                swal("Error", "Order Already Registered", "error");
            }
        });
    }else if ($(this).attr('id') == "card-payment"){

        if ($("#order-update").prop("disabled") !== true){
                updateOrder("Card");
        }else if ($("#order-update").prop("disabled") === true){

            searchOrder(oId).then(function (order) {
                if (Object.keys(order).length === 0) {
                    if (itemValidate()) {
                        if ($("#cardNum").val() !== "" && $("#bankName").val() !== "" && $("#cardMonth").val() !== "" && $("#cardYear").val() !== ""  && $("#verifyNum").val() !== "" ){
                            placeOrder("Card","POST");
                            clearAll();
                            purchaseBtnHide(true);
                            generateOrderId();
                        } else {
                            swal("Error", "Please Add Card Details to Place Order", "error");
                        }
                    } else {
                        swal("Error", "Please Add Items to Place Order", "error");
                    }
                }else {
                    swal("Error", "Order Already Registered", "error");
                }
            });

        }
    }

});

$("#orderId").on("keyup input change", async function (e) {
    if ($("#orderId").val() !== "") {
        $("#order-table").empty();
        if (e.keyCode === 13) {
            let id = $("#orderId").val();
            let order = await searchOrder(id);
            if (Object.keys(order).length !== 0) {
                $("#order-table").empty();
                $("#ordCusId").val(order.customerName.customerId);
                $("#ordCusName").val(order.customerName.customerName);
                $("#ordDate").val(order.purchaseDate);

                let code;
                let qty;
                let unitPrice;
                let itemName;
                let size;

                if (order.saleDetails.length !== 0) {
                    for (var info of order.saleDetails) {
                        if (info.orderDetailPK.orderNo == id) {
                            code = info.orderDetailPK.itemCode;
                            qty = info.itmQTY;
                            unitPrice = info.inventory.salePrice;
                            size = info.inventory.size;
                            itemName = info.inventory.itemDesc;


                            let total = parseFloat(unitPrice) * parseFloat(qty);
                            let row = `<tr>
                     <td><img class="rounded mx-auto d-block" src="assets/images/delete3.gif" alt="Card" style="width: 1.5vw; z-index: 5;" /></td>
                     <td>${code}</td>
                     <td>${itemName}</td>
                     <td>${size}</td>
                     <td>${unitPrice}</td>
                     <td>${qty}</td>
                     <td>${total}</td>
                    </tr>`;
                            $("#order-table").append(row);
                            $('#order-table').css({
                                'width ': '101.8%',
                                'max-height': '80px',
                                'overflow-y': 'auto',
                                'display': 'table-caption'
                            });
                            $('#order-table>tr>td').css({
                                'flex': '1',
                                'max-width': 'calc(100%/7*1)',
                                'text-align': 'center'
                            });
                            if ($("#order-table>tr").length > 1) {
                                $('#order-table>tr').css({
                                    'width': '100%',
                                    'display': 'flex'
                                });
                            } else {
                                $('#order-table>tr').css({
                                    'width': '98.2%',
                                    'display': 'flex'
                                });
                            }
                            bindRemove(order.saleDetails);
                            tableChange(order.saleDetails);
                        }
                    }
                }
                $("#order-delete").prop("disabled", false);
                setOrdUpdateBtn();
            }

        }
        let allTotal = 0.0
        $('#order-table>tr').each(function (e) {
            let full = $(this).children().eq(6).text();
            allTotal += parseFloat(full);
        });
        $("#total").text(allTotal);
        $("#subtotal").text(allTotal);
        setOrdClBtn();
    }else {
        $("#btnSubmitOrder").prop("disabled", true);
        $("#order-delete").prop("disabled", true);
        $("#order-update").prop("disabled", true);
    }
});

function tableChange(details) {

    $("#order-table").on("DOMNodeInserted DOMNodeRemoved", "tr",async function (event) {

        if (event.type === "DOMNodeInserted") {
            if ($("#orderId").val() !== "") {
                let id = $("#orderId").val();
                let order = await searchOrder(id);
                if (Object.keys(order).length !== 0) {
                    let code;
                    let tableItm;
                    if (Object.keys(details).length !== 0) {

                        for (var info of details) {
                            $('#order-table>tr').each(function (e) {
                                code = info.orderDetailPK.itemCode;
                                tableItm = $(this).children().eq(1).text();
                                if (code !== tableItm) {
                                    $("#btnSubmitOrder").prop("disabled", true);
                                    $("#order-update").prop("disabled", false);
                                }
                            });
                        }
                    }
                    let allTotal = 0.0
                    $('#order-table>tr').each(function (e) {
                        let full = $(this).children().eq(6).text();
                        allTotal += parseFloat(full);
                    });
                    $("#total").text(allTotal);
                    $("#subtotal").text(allTotal);
                }
            }
        }
    });

}

function bindRemove(details) {
    $('#order-table>tr>td:nth-child(1)').click(function () {
        let row = $(this).closest('tr');
        row.remove();

        $('#order-table').css({
            'width ': '101.8%',
            'max-height': '80px',
            'overflow-y': 'auto',
            'display': 'table-caption'
        });
        $('#order-table>tr>td').css({
            'flex': '1',
            'max-width': 'calc(100%/7*1)',
            'text-align': 'center'
        });
        if ($("#order-table>tr").length > 1) {
            $('#order-table>tr').css({
                'width': '100%',
                'display': 'flex'
            });
        } else {
            $('#order-table>tr').css({
                'width': '98.2%',
                'display': 'flex'
            });
        }
        if ($("#order-table>tr").length > 0) {
            let code;
            let tableItm;
            if (details != null || details != undefined) {
                if (Object.keys(details).length !== 0) {
                    for (var info of details) {
                        $('#order-table>tr').each(function (e) {
                            code = info.orderDetailPK.itemCode;
                            tableItm = $(this).children().eq(1).text();
                            if (code == tableItm) {
                                $("#btnSubmitOrder").prop("disabled", true);
                                $("#order-update").prop("disabled", true);
                                 setOrdUpdateBtn();
                            }else {
                                setOrdUpdateBtn();
                                $("#order-update").prop("disabled", false);
                            }
                        });
                    }
                }
            }
            let allTotal = 0.0
            $('#order-table>tr').each(function (e) {
                let full = $(this).children().eq(6).text();
                allTotal += parseFloat(full);
            });
            $("#total").text(allTotal);
            $("#subtotal").text(allTotal);
        } else {
            $("#btnSubmitOrder").prop("disabled", true);
            $("#order-update").prop("disabled", true);
        }
    });

}

async function setOrdUpdateBtn() {
    let id = $("#orderId").val();
    let order = await searchOrder(id);
    if ($("#order-table>tr").length != order.saleDetails.length) {
        $("#btnSubmitOrder").prop("disabled", true);
        $("#order-update").prop("disabled", false);

        //updateAddedItemTable(order);
    }else {
        $("#btnSubmitOrder").prop("disabled", false);
        $("#order-update").prop("disabled", true);
    }
    setOrdClBtn();
}

function setOrdClBtn(){
    var empty = true;
    $("#orderId,#OrdItmDes, #OrdItm, #ordItmPrice, #ordItmSize, #ordItmQty, #ordDate, #ordCusId, #ordCusName, #ordPoints,#txtCash").each(function() {
        if ($(this).val() !== "") {
            empty = false;
            return true;
        }
    });
    $("#order-clear").prop("disabled", empty);
}

function clearAll() {
    purchaseBtnHide(true);
    $("#orderId,#OrdItmDes, #OrdItm, #ordItmPrice, #ordItmSize, #ordItmQty, #ordDate, #ordCusId, #ordCusName, #ordPoints,#txtCash,#txtDiscount,#txtBalance,#confirmUsername,#confirmPassword,#qtyOnHand").val("");
    $("#orderId,#OrdItmDes, #OrdItm, #ordItmPrice, #ordItmSize, #ordItmQty, #ordDate, #ordCusId, #ordCusName, #ordPoints,#txtCash,#confirmUsername,#confirmPassword").css("border", "1px solid #ced4da");

    $("#ordItmQty").text("");
    $("#OrdItmError").text("");
    $("#ordItmQtyError").text("");
    $("#ordPointsError").text("");
    $("#total,#subtotal").text("0");
    $("#order-add-item").prop("disabled", true);
    $("#btnSubmitOrder").prop("disabled", true);
    $("#order-update").prop("disabled", true);
    $("#order-clear").prop("disabled", true);
    $("#order-delete").prop("disabled", true);
    $("#order-table").empty();
    $("#btnConfirm").prop("disabled", true);
}

function checkCard() {
    var any = false;
    $("#cardNum,#bankName,#cardMonth,#cardYear,#verifyNum").each(function () {
        var value = $(this).val();
        if (value !== undefined && value !== null && value.trim() !== "") {
            any = true;
            return false;
        }
    });
    if (any && $("#verifyNum").length < 4) {
        $("#card-payment").prop("disabled", false);
    } else {
        $("#card-payment").prop("disabled", true);
    }
}

function checkAll() {
    for (let i = 0; i < $("#cardNum,#bankName,#cardMonth,#cardYear,#verifyNum").length; i++) {
        if (!checkValidations(c_vArray[i])) return false;
    }
    return true;
}
