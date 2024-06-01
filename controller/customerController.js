$(document).ready(function () {

    cusFieldSet(true);
    $("#cusSave").prop("disabled", true);
    $("#cusDelete").prop("disabled", true);
    $("#cusUpdate").prop("disabled", true);
    $("#cusSearch").prop("disabled", true);
    $("#cusClear").prop("disabled", true);

});

$('#cusCaptureButton').click(function () {
    let text = $(this).text();
    var video = $('#cusVideo')[0];
    var canvas = $('#cusCanvas')[0];
    var capturedImage = $('#cusCapturedImage');

    var constraints = {
        video: true
    };

    if (text === "Capture") {
        $("#cusClear").prop("disabled", false);
        $(this).text("Take Picture");
        $(this).css("background-color", "#dc3545");
        $(this).css("border-color", "#dc3545");
        $(video).show();
        capturedImage.hide();

        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                videoStream = stream;
                video.srcObject = stream;
            })
            .catch((error) => {
                console.error('Error accessing webcam:', error);
            });
    } else if (text === "Take Picture") {
        $("#cusClear").prop("disabled", false);
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageDataUrl = canvas.toDataURL('image/png');
        capturedImage.attr('src', imageDataUrl);
        capturedImage.show();
        $(this).css("background-color", "#007bff");
        $(this).css("border-color", "#007bff");
        $(this).text("Capture");
        stopWebcamStream();
        $(video).hide();
    }
});

function stopWebcamStream() {
    if (videoStream) {
        const tracks = videoStream.getTracks();
        tracks.forEach(track => track.stop());
        videoStream = null;
    }
}

$('#cusAdd').click(function () {
    cusFieldSet(false);
    $(this).find("#cusId").focus();
    generateCustomerId();
    $("#cusClear").prop("disabled", false);
    //setClBtn();
});

function cusFieldSet(state) {
    var ids = ["cusId", "cusGender", "cusName", "cusDob", "cusBuildNo", "cusLane", "cusCity", "cusState", "cusPostalCode",
        "cusEmail", "cusContactNo", "loyaltyDate", "totalPoints", "lastPurchaseDate", "rating"];
    ids.forEach(function (id) {
        $("#" + id).prop('disabled', state);
    });
    $(this).find("#cusId").focus();
    //generateCustomerId();
    setClBtn();
}

function returnAllCusVal() {

    var image = $("#cusCapturedImage");
    let purchase = $("#lastPurchaseDate").val();
    if ( purchase == "No orders"){
        purchase = null;
    }
    var imageUrl = image.attr('src');
    var formData = {
        customerId: $("#cusId").val(),
        customerName: $("#cusName").val(),
        gender: $("#cusGender").val(),
        loyaltyDate: $("#loyaltyDate").val(),
        level: $("input[name='rating']:checked").val(),
        totalPoints: $("#totalPoints").val(),
        customerDob: $("#cusDob").val(),
        address: {
            buildNo: $("#cusBuildNo").val(),
            lane: $("#cusLane").val(),
            city: $("#cusCity").val(),
            state: $("#cusState").val(),
            postalCode: $("#cusPostalCode").val()
        },
        contactNo: $("#cusContactNo").val(),
        email: $("#cusEmail").val(),
        recentPurchase: purchase,
        proPic: imageUrl
    };
    return formData;
}
function setLevel(value) {
    console.log(value)
    $('#level-label').text('');
    switch (value) {
        case 'GOLD':
            $('#star4').prop('checked', true);
            $('#level-label').text('GOLD');
            break;
        case 'SILVER':
            $('#star3').prop('checked', true);
            $('#level-label').text('SILVER');
            break;
        case 'BRONZE':
            $('#star2').prop('checked', true);
            $('#level-label').text('BRONZE');
            break;
        case 'NEW':
            $('#star1').prop('checked', true);
            $('#level-label').text('NEW');
            break;
    }
}
$("input[name='rating']").change(function () {
    $("#level-label").css('left', '46%');
    var value = $("input[name='rating']:checked").val();
    if (value === "SILVER" || value === "BRONZE"){
        $("#level-label").css('left', '41%');
    }
    if (value === "GOLD"){
        $("#level-label").css('left', '45%');
    }
    $("#level-label").text(value);
})
function setAllCusVal(ar) {

    setLevel(ar.level);
    $("#cusName").val(ar.customerName);
    $("#cusGender").val(ar.gender);
    $("#loyaltyDate").val(ar.loyaltyDate);
    $("#totalPoints").val(ar.totalPoints);
    $("#cusDob").val(ar.customerDob);
    $("#cusBuildNo").val(ar.address.buildNo);
    $("#cusLane").val(ar.address.lane);
    $("#cusCity").val(ar.address.city);
    $("#cusState").val(ar.address.state);
    $("#cusPostalCode").val(ar.address.postalCode);
    $("#cusContactNo").val(ar.contactNo);
    $("#cusEmail").val(ar.email);
    if (ar.recentPurchase == null){
        ar.recentPurchase = "No orders";
    }
    $("#lastPurchaseDate").val(ar.recentPurchase);
    $("#cusCapturedImage").attr('src', ar.proPic);

}

getAllCustomers();

$("#cusSave").click(function () {

    if (checkAll()) {
        var image = $("#cusCapturedImage");
        var imageUrl = image.attr('src');
        if (!imageUrl) {
            //alert("Error");
            swal("Error", "Take Customer Photo.!", "error");
        } else {
            saveCustomer();
        }
    } else {
        alert("Error");
        swal("Error", "Error Customer Save.!", "error");
    }
});

function generateCustomerId() {
    loadCusId().then(function (id) {
        $("#cusId").val(id);
    }).catch(function (error) {
        console.error("Error loading customer Id:", error);
    });
}

function loadCusId() {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        var ar;
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/customer/getGenId",
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

function bindTrrEvents() {
    $('#customerTable>tr').click(function () {

        let customerId = $(this).children().eq(0).text();
        let customerName = $(this).children().eq(1).text();
        let gender = $(this).children().eq(2).text();
        let loyaltyDate = $(this).children().eq(3).text();
        let level = $(this).children().eq(4).text();
        let totalPoints = $(this).children().eq(5).text();
        let customerDob = $(this).children().eq(6).text();
        let buildNo = $(this).children().eq(7).text();
        let lane = $(this).children().eq(8).text();
        let city = $(this).children().eq(9).text();
        let state = $(this).children().eq(10).text();
        let postalCode = $(this).children().eq(11).text();
        let contactNo = $(this).children().eq(12).text();
        let email = $(this).children().eq(13).text();
        let recentPurchase = $(this).children().eq(14).text();


        $("#cusId").val(customerId);
        $("#cusName").val(customerName);
        $("#cusGender").val(gender);
        $("#loyaltyDate").val(loyaltyDate);
        $("#totalPoints").val(totalPoints);
        $("#cusDob").val(customerDob);
        $("#cusBuildNo").val(buildNo);
        $("#cusLane").val(lane);
        $("#cusCity").val(city);
        $("#cusState").val(state);
        $("#cusPostalCode").val(postalCode);
        $("#cusContactNo").val(contactNo);
        $("#cusEmail").val(email);
        $("#lastPurchaseDate").val(recentPurchase);

        searchCustomer(customerId).then(function (res){
            captureClear();
            setLevel(res.level);
            $("#cusCapturedImage").attr('src', res.proPic);

        });
        $("#cusListLabelSp").text(customerId);
        $("#cusListLabel").text(" selected, Back to view details");
        setBtn();
    });
}

$("#cusDelete").click(function () {
    let id = $("#cusId").val();

    validCustomer(id).then(function (isValid) {
        if (isValid == false) {
            swal("Error", "No such Customer..please check the ID", "error");
            clearCustomerInputFields();
        } else {

            swal("Do you want to delete this customer.?", {
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
                        url: "http://localhost:8080/helloshoes/api/v1/customer?cusId=" + id,
                        method: "DELETE",
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        },
                        success: function (res) {
                            console.log(res);
                            swal("Deleted", "Customer Delete Successfully", "success");
                            clearCus();
                            clearCustomerInputFields();
                            captureClear();
                            getAllCustomers();
                            setBtn();
                        },
                        error: function (ob, textStatus, error) {
                            swal("Error","Error Customer Not Delete", "error");
                        }
                    });
                }
            });
        }
    });

});

$("#cusUpdate").click(function () {
    let id = $("#cusId").val();
    validCustomer(id).then(function (isValid) {
        if (isValid) {
            swal("Do you really want to update this customer.?", {
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
                    var data = returnAllCusVal();
                    performAuthenticatedRequest();
                    const accessToken = localStorage.getItem('accessToken');
                    console.log(data)
                    $.ajax({
                        url: "http://localhost:8080/helloshoes/api/v1/customer",
                        method: "PUT",
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        },
                        data: JSON.stringify(data),
                        contentType: "application/json",
                        success: function (res) {
                            console.log(res);
                            swal("Updated", "Customer Update Successfully", "success");
                            clearCus();
                            captureClear();
                            getAllCustomers();
                            setBtn();
                        },
                        error: function (ob, textStatus, error) {
                            //alert(textStatus+" : Error Customer Not Update");
                            swal("Error", textStatus + "Error Customer Not Update", "error");
                        }
                    });
                }
            });

        } else {
            swal("Error", "No such Customer..please check the ID", "error");

        }
    });

});

function saveCustomer() {
    let id = $("#cusId").val();
    validCustomer(id).then(function (isValid) {
        console.log(isValid)
        if (!isValid) {
            console.log(isValid);
            var formData = returnAllCusVal();
            performAuthenticatedRequest();
            const accessToken = localStorage.getItem('accessToken');
            console.log(formData);
            console.log(accessToken);
            $.ajax({
                url: "http://localhost:8080/helloshoes/api/v1/customer",
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                data: JSON.stringify(formData),
                contentType: "application/json",
                success: function (res, textStatus, jsXH) {
                    console.log(res);
                    // alert("Customer Added Successfully");
                    swal("Saved", "Customer Added Successfully", "success");
                    clearCus();
                    getAllCustomers();
                    generateCustomerId();
                    setBtn();
                },
                error: function (ob, textStatus, error) {
                    //alert(textStatus + " : Error Customer Not Added")
                    swal("Error", "Error Customer Not Added", "error");
                }
            });


        } else {
            //alert("Customer already exits.!");
            swal("Error", "Customer already exits.!", "error");
            clearCustomerInputFields();
        }
    });
}

function getAllCustomers() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    $("#customerTable").empty();
    $.ajax({
        url: "http://localhost:8080/helloshoes/api/v1/customer/getAll",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (res) {
            console.log(res);
            for (var r of res) {
                if (r.recentPurchase == null){
                    r.recentPurchase = "No orders";
                }
                let row = `<tr>
                    <th scope="row">${r.customerId}</th>
                    <td>${r.customerName}</td>
                    <td>${r.gender}</td>
                    <td>${r.loyaltyDate}</td>
                    <td>${r.level}</td>
                    <td>${r.totalPoints}</td>
                    <td>${r.customerDob}</td>
                    <td>${r.address.buildNo}</td>
                    <td>${r.address.lane}</td>
                    <td>${r.address.city}</td>
                    <td>${r.address.state}</td>
                    <td>${r.address.postalCode}</td>
                    <td>${r.contactNo}</td>
                    <td>${r.email}</td>
                    <td>${r.recentPurchase}</td>
                    </tr>`;
                $("#customerTable").append(row);
                bindTrrEvents();
            }
        }
    });
}

function validCustomer(id) {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/customer/search/" + id,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (res, textStatus, xhr) {
                console.log(res);
                if (xhr.status === 200) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            },
            error: function (ob, textStatus, error) {
                resolve(false);
            }
        });
    });
}

function searchCustomer(id) {
    console.log(id);
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/customer/search/" + id,
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

$('#cusSearch').click(function () {
    let id = $("#cusId").val();
    searchCustomer(id).then(function (res) {
        captureClear();
        setAllCusVal(res);
        $("#cusCapturedImage").attr('src', res.proPic);
    });
    setClBtn();
    setBtn();
});
$('#backToCus').click(function () {
    cusList.css('display', 'none');
    cusMain.css('display', 'block');
    customerPage.css('display', 'block');
});
