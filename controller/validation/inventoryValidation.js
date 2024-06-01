const itm_ID_REGEX = /^[A-Za-z0-9 ]{3,}$/;
const itm_DESC_REGEX = /^[A-Za-z0-9 ]{3,}$/;
const itm_CAT_REGEX = /^[A-Za-z ]{3,}$/;
const itm_SIZE_REGEX = /^[1-9][0-9]*$/
const itm_SUP_ID_REGEX = /^S00-(0*[1-9]\d{0,2})$/;
const itm_SALE_PRICE_REGEX = /^[1-9]\d*(\.\d+)?$/;
const itm_BUY_PRICE_REGEX = /^[1-9]\d*(\.\d+)?$/;
const itm_PROFIT_REGEX = /^[1-9]\d*(\.\d+)?$/;
const itm_MARGIN_REGEX = /^[1-9]\d*(\.\d+)?$/;
const itm_STATES_REGEX = /^[A-Za-z ]{3,}$/;
const itm_QTY_REGEX = /^[1-9]\d*$/;

const itm_vArray = new Array();
itm_vArray.push({ field: $("#itmCode"), regEx: itm_ID_REGEX, error: $("#itmCodeError") });
itm_vArray.push({ field: $("#itmName"), regEx: itm_DESC_REGEX, error: $("#itmNameError") });
itm_vArray.push({ field: $("#itmCat"), regEx: itm_CAT_REGEX, error: $("#itmCatError") });
itm_vArray.push({ field: $("#itmSize"), regEx: itm_SIZE_REGEX, error: $("#itmSizeError") });
itm_vArray.push({ field: $("#itmSupId"), regEx: itm_SUP_ID_REGEX, error: $("#itmSupIdError") });
itm_vArray.push({ field: $("#itmSalePrice"), regEx: itm_SALE_PRICE_REGEX, error: $("#itmSalePriceError") });
itm_vArray.push({ field: $("#itmBuyPrice"), regEx: itm_BUY_PRICE_REGEX, error: $("#itmBuyPriceError") });
itm_vArray.push({ field: $("#itmProfit"), regEx: itm_PROFIT_REGEX, error: $("#itmProfitError") });
itm_vArray.push({ field: $("#itmProfitMargin"), regEx: itm_MARGIN_REGEX, error: $("#itmProfitMarginError") });
itm_vArray.push({ field: $("#itmStatus"), regEx: itm_STATES_REGEX, error: $("#itmStatusError") });
itm_vArray.push({ field: $("#itmQty"), regEx: itm_QTY_REGEX, error: $("#itmQtyError") });



function clearItmInputFields() {
    itm_vArray.forEach(function(item) {
        item.field.val("");
        item.field.css("border", "1px solid #ced4da");
    });
    $("#itmCode").focus();
    setItmBtn();
}
//setSupBtn();
function setItmClBtn(){
    var any = false;
    $("#itmCode,#itmName,#itmCat,#itmSize,#itmSupId,#itmSalePrice,#itmBuyPrice,#itmProfit,#itmProfitMargin,#itmStatus,#itmQty").each(function () {
        var value = $(this).val();
        if (value !== undefined && value !== null && value.trim() !== "") {
            any= true;
            return false;
        }
    });
    if (any) {
        $("#itmClear").prop("disabled", false);
    } else {
        $("#itmClear").prop("disabled", true);
    }
}
//setSupClBtn();
function itmEvents(e) {
    setItmClBtn();
    let indexNo = itm_vArray.indexOf(itm_vArray.find((c) => c.field.attr("id") == e.target.id));

    if (e.key == "Tab") {
        e.preventDefault();
    }

    checkItmValidations(itm_vArray[indexNo]);

    setItmBtn();

    if (e.key == "Enter") {

        if (e.target.id != itm_vArray[itm_vArray.length - 1].field.attr("id")) {
            if (checkItmValidations(itm_vArray[indexNo])) {
                itm_vArray[indexNo + 1].field.focus();
            }
        } else {
            if (checkItmValidations(itm_vArray[indexNo])) {
                saveItem();
            }
        }
    }
}
$("#itmCode").on("keydown keyup", function (e) {
    itmEvents(e);
    searchItem($("#itmCode").val()).then(function (res){
        if (Object.keys(res).length !== 0) {
            $("#itmCode,#itmName,#itmCat,#itmSize,#itmSalePrice,#itmBuyPrice,#itmProfit,#itmProfitMargin,#itmStatus,#itmQty").css("border", "1px solid #ced4da");
            setItmBtn();
            itmCaptureClear();
            setAllItmVal(res);
        }else {
            $("#itmCode,#itmName,#itmCat,#itmSize,#itmSalePrice,#itmBuyPrice,#itmProfit,#itmProfitMargin,#itmStatus,#itmQty").css("border", "1px solid #ced4da");
            setItmBtn();
            itmCaptureClear();
            $("#itmName").val("");
            $("#itmCat").val("");
            $("#itmSize").val("");
            $("#itmSalePrice").val("");
            $("#itmBuyPrice").val("");
            $("#itmProfit").val("");
            $("#itmProfitMargin").val("");
            $("#itmStatus").val("");
            $("#itmQty").val("");
            $("#itmSupId").val("");
            $("#itmSupName").val("");
            $("#itmSupId").css("border", "1px solid #ced4da");
        }
    });
});
$("#itmName,#itmCat,#itmSize,#itmSalePrice,#itmBuyPrice,#itmProfit,#itmProfitMargin,#itmStatus,#itmQty").on("keydown keyup change", function (e) {
    itmEvents(e);
});
/*$("#cusGender, #cusDob, #loyaltyDate").on("", function(e) {
    events(e);
});*/
$("#itmSupId").on("keydown keyup", function (e) {
    let indexNo = itm_vArray.indexOf(itm_vArray.find((c) => c.field.attr("id") == e.target.id));
    if (itm_vArray[indexNo].regEx.test($("#itmSupId").val())) {
        searchSupplier($("#itmSupId").val()).then(function (res){
            if (res != null || res != undefined){
                setItmBorder(true, itm_vArray[indexNo])
                $("#itmSupName").val(res.supplierName);
            }
            if( $("#itmSupName").val() == "" || $("#itmSupName").val() == null){
                $("#itmSupIdError").text("Supplier is not Exist");
                $("#itmSupId").css("border", "2px solid red");
            }
        });
    }else {
        setItmBorder(false, itm_vArray[indexNo])
    }
    setItmBtn();
    setItmClBtn();
});
$('#itemImgFile').change(function() {
    var fileInput = $('#itemImgFile')[0];
    var file = fileInput.files[0];

    if (file && (file.type.includes('image') || file.type === 'image/gif')) {
        var reader = new FileReader();
        reader.onload = function (e) {
            stopItmWebcamStream();
            $('#itmVideo').hide();
            itmCaptureClear();
            $('#itmCapturedImage').attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
        $("#itmClear").prop("disabled", false);
        $(this).val("");
    } else {
        $('#itemImgFileError').text('Please upload an image or GIF.');
        $('#itemImgFileError').css("border", "1px solid #ced4da");
    }

});

function checkItmValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setItmBorder(true, object)
        return true;
    }
    setItmBorder(false, object)
    return false;
}



function checkAllItm() {
    for (let i = 0; i < itm_vArray.length; i++) {
        if (!checkItmValidations(itm_vArray[i])) {
            return false;
        }
    }
    return true;
}

function setProfit(){
    let salePrice = parseFloat($("#itmSalePrice").val());
    let buyPrice = parseFloat($("#itmBuyPrice").val());
    if (!isNaN(salePrice) && !isNaN(buyPrice)) {
        let profit = salePrice - buyPrice;
        let profitMargin = Math.round((profit / salePrice) * 100);
        profitMargin = profitMargin.toFixed(1);
        $("#itmProfit").val(profit);
        $("#itmProfitMargin").val(profitMargin);
    }
}

$("#itmBuyPrice").on("input", function() {
    setProfit();
});

$("#itmSalePrice").on("input", function() {
    setProfit();
});
function setItmBorder(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
            let check = ob.field.attr('id');
            switch (check) {
                case "itmCode" : ob.error.text("itm-Code is a required field: Minimum 5"); break
                case "itmName" : ob.error.text("itm-Name is a required field: Minimum 3"); break
                case "itmCat" : ob.error.text("itmCat is a required field: Minimum 3"); break
                case "itmSize" : ob.error.text("itm-Size is required"); break
                case "itmSalePrice" : ob.error.text("Price is a required field: Pattern 100.00 or 100"); break
                case "itmBuyPrice" : ob.error.text("Price is a required field: Pattern 100.00 or 100"); break
                case "itmProfit" : ob.error.text("Price is a required in Pattern: 100.00"); break
                case "itmProfitMargin" : ob.error.text("Profit Margin is not valid"); break;
                case "itmStatus" : ob.error.text("Status is Minimum 2,Max"); break
                case "itmSupId" : ob.error.text("sup-Id is a required field: S00-"); break
                case "itmQty" : ob.error.text("Qty is required minimum 1"); break
            }
        } else {
            ob.field.css("border", "1px solid #ced4da");
            ob.error.text("");
        }
    } else {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid green");
            ob.error.text("");
        } else {
            ob.field.css("border", "1px solid #ced4da");
            ob.error.text("");
        }
    }

}
function setItmBtn() {
    setItmClBtn();
    $("#itmSave").prop("disabled", true);
    $("#itmDelete").prop("disabled", true);
    $("#itmUpdate").prop("disabled", true);
    $("#itmSearch").prop("disabled", true);
    let id = $("#itmCode").val();
    if ($("#itmCode").val() != "" && itm_ID_REGEX.test($("#itmCode").val())){
        $("#itmSearch").prop("disabled", false);
    }else {
        $("#itmSearch").prop("disabled", true);
    }
    validItem(id)
        .then(function (isValid) {
            if (isValid) {
                $("#itmDelete").prop("disabled", false);
                if (checkAllItm()) {
                    $("#itmUpdate").prop("disabled", false);
                    $("#itmDelete").prop("disabled", false);
                } else {
                    $("#itmUpdate").prop("disabled", true);
                }
            }else {
                $("#itmDelete").prop("disabled", true);
                $("#itmUpdate").prop("disabled", true);
                if (checkAllItm()) {
                    $("#itmSave").prop("disabled", false);
                } else {
                    $("#itmSave").prop("disabled", true);
                }
            }
        })
        .catch(function () {
            $("#itmDelete").prop("disabled", true);
            $("#itmUpdate").prop("disabled", true);
            if (checkAllItm()) {
                $("#itmSave").prop("disabled", false);
            } else {
                $("#itmSave").prop("disabled", true);
            }
        });
}
$("#itmClear").click(function () {
    $("#itmNameError").text("");
    clearItmInputFields();
    itm_vArray.forEach(function(item) {
        item.error.val("");
        item.error.text("");
    });
    $("#itmSupName").val("");
    stopItmWebcamStream();
    $('#itmVideo').hide();
    itmCaptureClear();
    setItmBtn();
    setItmClBtn();
});
function itmCaptureClear() {
    stopItmWebcamStream();
    $('#itmVideo').hide();
    $("#itmCapturedImage").show();
    $('#itmCaptureButton').css("background-color", "#007bff");
    $('#itmCaptureButton').css("border-color", "#007bff");
    $('#itmCaptureButton').text("Capture");
    $("#itmCapturedImage").attr('src', "assets/images/walk.gif");

}
