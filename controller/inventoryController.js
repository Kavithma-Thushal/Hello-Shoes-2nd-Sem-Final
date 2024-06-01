$(document).ready(function () {
    $("#itmSave").prop("disabled", true);
    $("#itmDelete").prop("disabled", true);
    $("#itmUpdate").prop("disabled", true);
    $("#itmSearch").prop("disabled", true);
    $("#itmClear").prop("disabled", true);

});
$('#itmCaptureButton').click(function () {
    let text = $(this).text();
    var video = $('#itmVideo')[0];
    var canvas = $('#itmCanvas')[0];
    var capturedImage = $('#itmCapturedImage');

    var constraints = {
        video: true
    };

    if (text === "Capture") {
        $("#itmClear").prop("disabled", false);
        $(this).text("Take Picture");
        $(this).css("background-color", "#dc3545");
        $(this).css("border-color", "#dc3545");
        $(video).show();
        capturedImage.hide();

        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                itmVideoStream = stream;
                video.srcObject = stream;
            })
            .catch((error) => {
                console.error('Error accessing webcam:', error);
            });
    } else if (text === "Take Picture") {
        $("#itmClear").prop("disabled", false);
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageDataUrl = canvas.toDataURL('image/png');
        capturedImage.attr('src', imageDataUrl);
        capturedImage.show();
        $(this).css("background-color", "#007bff");
        $(this).css("border-color", "#007bff");
        $(this).text("Capture");
        stopItmWebcamStream();
        $(video).hide();
    }
});

function stopItmWebcamStream() {
    if (itmVideoStream) {
        const tracks = itmVideoStream.getTracks();
        tracks.forEach(track => track.stop());
        itmVideoStream = null;
    }
}

function returnAllItmVal() {
    var image = $("#itmCapturedImage");
    var imageUrl = image.attr('src');
    var formData = {
        itemCode: $("#itmCode").val(),
        itemDesc: $("#itmName").val(),
        itemPicture: imageUrl,
        category: $("#itmCat").val(),
        size: parseInt($("#itmSize").val()),
        supplier: { supplierCode: $("#itmSupId").val() },
        salePrice: parseFloat($("#itmSalePrice").val()),
        buyPrice: parseFloat($("#itmBuyPrice").val()),
        expectedProfit: parseFloat($("#itmProfit").val()),
        profitMargin: parseFloat($("#itmProfitMargin").val()),
        status: $("#itmStatus").val(),
        qty: $("#itmQty").val(),
    };

    return formData;
}
function setAllItmVal(ar) {
    console.log(ar)
    $("#itmName").val(ar.itemDesc);
    $("#itmCat").val(ar.category);
    $("#itmSize").val(ar.size);
    $("#itmSupId").val(ar.supplier.supplierCode);
    $("#itmSupName").val(ar.supplier.supplierName);
    $("#itmSalePrice").val(ar.salePrice);
    $("#itmBuyPrice").val(ar.buyPrice);
    $("#itmProfit").val(ar.expectedProfit);
    $("#itmProfitMargin").val(ar.profitMargin);
    $("#itmStatus").val(ar.status);
    $("#itmQty").val(ar.qty);
    $("#itmCapturedImage").attr('src', ar.itemPicture);
}

$("#itmSave").click(function () {

    if (checkAllItm()) {
        var image = $("#itmCapturedImage");
        var imageUrl = image.attr('src');
        if (!imageUrl || imageUrl === 'assets/images/walk.gif') {

            swal("Error", "Take Item Photo.!", "error");
        } else {
            saveItem();
        }
    } else {
        alert("Error");
        swal("Error", "Error Item Save.!", "error");
    }
});

$("#itmDelete").click(function () {
    let id = $("#itmCode").val();

    validItem(id).then(function (isValid) {
        if (isValid == false) {
            swal("Error", "No such Item..please check the ID", "error");
            clearItmInputFields();
        } else {

            swal("Do you want to delete this Item.?", {
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
                        url: "http://localhost:8080/helloshoes/api/v1/inventory?itmId=" + id,
                        method: "DELETE",
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        },
                        success: function (res) {
                            console.log(res);
                            swal("Deleted", "Item Delete Successfully", "success");
                            clearItmInputFields();
                            itmCaptureClear();
                            getAllItems("/getAll");
                        },
                        error: function (ob, textStatus, error) {
                            swal("Error", textStatus + "Error Item Not Delete", "error");
                        }
                    });
                }
            });
        }
    });

});

$("#itmUpdate").click(function () {
    let id = $("#itmCode").val();
    validItem(id).then(function (isValid) {
        if (isValid) {
            swal("Do you really want to update this Item.?", {
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
                    var data = returnAllItmVal();
                    performAuthenticatedRequest();
                    const accessToken = localStorage.getItem('accessToken');
                    console.log(data)
                    $.ajax({
                        url: "http://localhost:8080/helloshoes/api/v1/inventory",
                        method: "PUT",
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        },
                        data: JSON.stringify(data),
                        contentType: "application/json",
                        success: function (res) {
                            console.log(res);
                            swal("Updated", "Item Update Successfully", "success");
                            itmCaptureClear();
                            getAllItems("/getAll");
                        },
                        error: function (ob, textStatus, error) {
                            console.log(ob ,textStatus, error)
                            swal("Error", textStatus + "Error Item Not Update", "error");
                        }
                    });
                }
            });

        } else {
            swal("Error", "No such Item..please check the ID", "error");

        }
    });

});

function saveItem() {
    let id = $("#itmCode").val();
    validItem(id).then(function (isValid) {
        console.log(isValid)
        if (!isValid) {
            console.log(isValid);
            var formData = returnAllItmVal();
            performAuthenticatedRequest();
            const accessToken = localStorage.getItem('accessToken');
            console.log(formData);
            console.log(accessToken);
            $.ajax({
                url: "http://localhost:8080/helloshoes/api/v1/inventory",
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                data: JSON.stringify(formData),
                contentType: "application/json",
                success: function (res, textStatus, jsXH) {
                    console.log(res);
                    swal("Saved", "Item Added Successfully", "success");
                    getAllItems("/getAll");
                    setItmBtn();
                },
                error: function (ob, textStatus, error) {
                    swal("Error", textStatus + " : Error Item Not Added", "error");
                }
            });


        } else {
            swal("Error", "Employee already exits.!", "error");
            clearItmInputFields();
        }
    });
}
$("#itmFilter").on("change", function (e) {
    let val = $("#itmFilter").val();
    getAllItems("/"+val);
});
function getAllItems(val) {
    console.log(val);
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    $("#itemTable").empty();
    $.ajax({
        url: "http://localhost:8080/helloshoes/api/v1/inventory/getAll"+val,
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (res) {
            console.log(res);
            for (var r of res) {
                let status = r.status === "Not Available" ? "background-color: antiquewhite;" : "";
                let low = r.status === "Low" ? "blinking" : "";
                let row = `<tr>
                    <th style="${status}" class="${low}" scope="row">${r.itemCode}</th>
                    <td style="${status}" class="${low}" >${r.itemDesc}</td>             
                    <td style="${status}" class="${low}" >${r.category}</td>            
                    <td style="${status}" class="${low}" >${r.size}</td>                
                    <td style="${status}" class="${low}" >${r.qty}</td>                
                    <td style="${status}" class="${low}" >${r.supplier.supplierCode}</td>            
                    <td style="${status}" class="${low}" >${r.supplierName}</td>           
                    <td style="${status}" class="${low}" >${r.salePrice}</td>           
                    <td style="${status}" class="${low}" >${r.buyPrice}</td>            
                    <td style="${status}" class="${low}" >${r.expectedProfit}</td>      
                    <td style="${status}" class="${low}" >${r.profitMargin}</td>        
                    <td style="${status}" class="${low}" >${r.status}</td>              
                </tr>`;

                $("#itemTable").append(row);
                bindItmTrrEvents();
            }
            if (mode){
                $('#itemTable > tr').each(function() {
                    let bgColor = $(this).find('th').css('background-color');
                    let hasClass = $(this).find('th').hasClass('blinking')
                    if (bgColor === "rgb(250, 235, 215)" || hasClass) {
                        $(this).find('th').css('color', '#454545');
                        $(this).find('td').css('color', '#454545');
                    }
                });
            }

        }
    });
}
function bindItmTrrEvents() {
    $('#itemTable>tr').click(function () {
        var itemCode = $(this).children().eq(0).text();
        var itemDesc = $(this).children().eq(1).text();
        var category = $(this).children().eq(2).text();
        var size = $(this).children().eq(3).text();
        var qty = $(this).children().eq(4).text();
        var supplierCode = $(this).children().eq(5).text();
        var supplierName = $(this).children().eq(6).text();
        var salePrice = $(this).children().eq(7).text();
        var buyPrice = $(this).children().eq(8).text();
        var expectedProfit = $(this).children().eq(9).text();
        var profitMargin = $(this).children().eq(10).text();
        var status = $(this).children().eq(11).text();

        $("#itmCode").val(itemCode);
        $("#itmName").val(itemDesc);
        $("#itmCat").val(category);
        $("#itmSize").val(size);
        $("#itmQty").val(qty);
        $("#itmSupId").val(supplierCode);
        $("#itmSupName").val(supplierName);
        $("#itmSalePrice").val(salePrice);
        $("#itmBuyPrice").val(buyPrice);
        $("#itmProfit").val(expectedProfit);
        $("#itmProfitMargin").val(profitMargin);
        $("#itmStatus").val(status);
        setItmBtn();
        searchItem(itemCode).then(function (res){
            itmCaptureClear();
            $("#itmCapturedImage").attr('src', res.itemPicture);
        });
        $("#inventoryListLabelSp").text(itemCode);
        $("#inventoryListLabel").text(" selected, Back to view details");
    });
}
function validItem(id) {
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/inventory/search/" + id,
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

function searchItem(id) {
    console.log(id);
    return new Promise(function (resolve, reject) {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        $.ajax({
            url: "http://localhost:8080/helloshoes/api/v1/inventory/search/" + id,
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

$('#itmSearch').click(function () {
    let id = $("#itmCode").val();
    searchItem(id).then(function (res) {
        setAllItmVal(res);
        itmCaptureClear();
        $("#itmCapturedImage").attr('src', res.proPic);
    });
    setItmClBtn();
    setItmBtn();
});
$('#backToItm').click(function () {
    itmList.css('display', 'none');
    itmMain.css('display', 'block');
    inventoryPage.css('display', 'block');
    $("#inventoryListLabel").text("")
});
