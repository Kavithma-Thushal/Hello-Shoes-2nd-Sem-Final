const SUP_ID_REGEX = /^S00-(0*[1-9]\d{0,2})$/;
const SUP_NAME_REGEX = /^[A-Za-z ]{3,}$/;
const SUP_ADDRESS_BUILD_REGEX = /^[A-Za-z0-9 ]{3,}$/;
const SUP_ADDRESS_LANE_REGEX = /^[A-Za-z0-9 ]{3,}$/;
const SUP_ADDRESS_CITY_REGEX = /^[A-Za-z0-9 ]{3,}$/;
const SUP_ADDRESS_STATE_REGEX = /^[A-Za-z0-9 ]{3,}$/;
const SUP_ADDRESS_CODE_REGEX = /^[A-Za-z0-9 ]{3,}$/;
const SUP_COUNTRY_REGEX = /^[A-Za-z0-9 ]{3,}$/;
const SUP_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUP_CATEGORY_REGEX = /^[A-Z\s]*$/;
const SUP_MOBILE_REGEX = /^[^\p{L}]{10,}$/u;
const SUP_LAND_NO_REGEX = /^[^\p{L}]{10,}$/u;

let sp_vArray = new Array();
sp_vArray.push({ field: $("#supId"), regEx: SUP_ID_REGEX, error: $("#supIdError") });
sp_vArray.push({ field: $("#supName"), regEx: SUP_NAME_REGEX, error: $("#supNameError") });
sp_vArray.push({ field: $("#supBuildNo"), regEx: SUP_ADDRESS_BUILD_REGEX, error: $("#supBuildNoError") });
sp_vArray.push({ field: $("#supLane"), regEx: SUP_ADDRESS_LANE_REGEX, error: $("#supLaneError") });
sp_vArray.push({ field: $("#supCity"), regEx: SUP_ADDRESS_CITY_REGEX, error: $("#supCityError") });
sp_vArray.push({ field: $("#supState"), regEx: SUP_ADDRESS_STATE_REGEX, error: $("#supStateError") });
sp_vArray.push({ field: $("#supPostalCode"), regEx: SUP_ADDRESS_CODE_REGEX, error: $("#supPostalCodeError") });
sp_vArray.push({ field: $("#supEmail"), regEx: SUP_EMAIL_REGEX, error: $("#supEmailError") });

sp_vArray.push({ field: $("#supCategory"), regEx: SUP_CATEGORY_REGEX, error: $("#supCategoryError") });
sp_vArray.push({ field: $("#supMobileNo"), regEx: SUP_MOBILE_REGEX, error: $("#supMobileNoError") });
sp_vArray.push({ field: $("#supLandNo"), regEx: SUP_LAND_NO_REGEX, error: $("#supLandNoError") });
sp_vArray.push({ field: $("#supCountry"), regEx: SUP_COUNTRY_REGEX, error: $("#supCountryError") });

function clearSupInputFields() {
    $("#supId, #supCategory, #supName, #supBuildNo, #supLane, #supCity, #supState, #supPostalCode, #supCountry, #supEmail, #supMobileNo, #supLandNo").val("");
    $("#supId, #supCategory, #supName, #supBuildNo, #supLane, #supCity, #supState, #supPostalCode, #supCountry, #supEmail, #supMobileNo, #supLandNo").css("border", "1px solid #ced4da");
    $("#supId").focus();
    setSupBtn();
}
//setSupBtn();
function setSupClBtn(){
    var any = false;
    $("#supId, #supCategory, #supName, #supBuildNo, #supLane, #supCity, #supState, #supPostalCode, #supCountry, #supEmail, #supMobileNo, #supLandNo").each(function () {
        var value = $(this).val();
        if (value !== undefined && value !== null && value.trim() !== "") {
            any= true;
            return false;
        }
    });
    if (any) {
        $("#supClear").prop("disabled", false);
    } else {
        $("#supClear").prop("disabled", true);
    }
}
//setSupClBtn();
function supEvents(e) {
    setSupClBtn();
    let indexNo = sp_vArray.indexOf(sp_vArray.find((c) => c.field.attr("id") == e.target.id));

    if (e.key == "Tab") {
        e.preventDefault();
    }

    checkSupValidations(sp_vArray[indexNo]);

    setSupBtn();

    if (e.key == "Enter") {

        if (e.target.id != sp_vArray[sp_vArray.length - 1].field.attr("id")) {
            if (checkSupValidations(sp_vArray[indexNo])) {
                sp_vArray[indexNo + 1].field.focus();
            }
        } else {
            if (checkSupValidations(sp_vArray[indexNo])) {
                saveSupplier();
            }
        }
    }
}

$("#supCategory, #supName, #supBuildNo, #supLane, #supCity, #supState, #supPostalCode, #supCountry, #supEmail, #supMobileNo, #supLandNo").on("keydown keyup change", function (e) {
    supEvents(e);
});
/*$("#cusGender, #cusDob, #loyaltyDate").on("", function(e) {
    events(e);
});*/
$("#supId").on("keydown keyup", function (e) {
    supEvents(e);
    searchSupplier($("#supId").val()).then(function (res){
        $("#supId, #supCategory, #supName, #supBuildNo, #supLane, #supCity, #supState, #supPostalCode, #supCountry, #supEmail, #supMobileNo, #supLandNo").css("border", "1px solid #ced4da");
        setSupBtn();
        setAllSupVal(res);
    });
});

function checkSupValidations(object) {
    if (object.regEx.test(object.field.val())) {
        if ($("#supMobileNo").val() !== "" && $("#supLandNo").val() !== "") {
            if ($("#supMobileNo").val() === $("#supLandNo").val()) {
                $("#supMobileNo").css("border", "2px solid red");
                $("#supMobileNoError").text("MobileNo cannot same LandNo");
                $("#supLandNo").css("border", "2px solid red");
                $("#supLandNoError").text("LandNo cannot same MobileNo");
                return false;
            } else {
                $("#supMobileNo").css("border", "2px solid green");
                $("#supMobileNoError").text("");
                $("#supLandNo").css("border", "2px solid green");
                $("#supLandNoError").text("");
            }
        }else {
            $("#supMobileNo").css("border", "1px solid #ced4da");
            $("#supMobileNoError").text("");
            $("#supLandNo").css("border", "1px solid #ced4da");
            $("#supLandNoError").text("");
        }
        setSupBorder(true, object)
        return true;
    }
    setSupBorder(false, object)
    return false;
}



function checkAllSup() {
    for (let i = 0; i < sp_vArray.length; i++) {
        if (!checkSupValidations(sp_vArray[i])) return false;
    }
    return true;
}

function setSupBorder(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
            let check = ob.field.attr('id');
            switch (check) {
                case "supId" : ob.error.text("sup-Id is a required field: S00-"); break
                case "supName" : ob.error.text("sup-Name is a required field: Minimum 5,Max 20,Spaces Allowed"); break
                case "supBuildNo" : ob.error.text("BuildNo is a required field: Minimum 3"); break
                case "supLane" : ob.error.text("Lane is a required field: Minimum 3"); break
                case "supCity" : ob.error.text("City is a required field: Minimum 3"); break
                case "supState" : ob.error.text("State is a required field: Minimum 3"); break
                case "supPostalCode" : ob.error.text("PostalCode is a required field: Minimum 3"); break
                case "supEmail" : ob.error.text("Email is not valid"); break;
                case "supCountry" : ob.error.text("Country is not valid"); break
                case "supMobileNo" : ob.error.text("MobileNo is not valid: Minimum 10"); break
                case "supLandNo" : ob.error.text("LandNo is not valid: Minimum 10"); break
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
function setSupBtn() {
    setSupClBtn();
    $("#supSave").prop("disabled", true);
    $("#supDelete").prop("disabled", true);
    $("#supUpdate").prop("disabled", true);
    $("#supSearch").prop("disabled", true);
    let id = $("#supId").val();
    if ($("#supId").val() != "" && SUP_ID_REGEX.test($("#supId").val())){
        $("#supSearch").prop("disabled", false);
    }else {
        $("#supSearch").prop("disabled", true);
    }
    validSupplier(id)
        .then(function (isValid) {
            if (isValid) {
                $("#supDelete").prop("disabled", false);
                if (checkAllSup()) {
                    $("#supUpdate").prop("disabled", false);
                    $("#supDelete").prop("disabled", false);
                } else {
                    $("#supUpdate").prop("disabled", true);
                }
            }else {
                $("#supDelete").prop("disabled", true);
                $("#supUpdate").prop("disabled", true);
                if (checkAllSup()) {
                    $("#supSave").prop("disabled", false);
                } else {
                    $("#supSave").prop("disabled", true);
                }
            }
        })
        .catch(function () {
            $("#supDelete").prop("disabled", true);
            $("#supUpdate").prop("disabled", true);
            if (checkAllSup()) {
                $("#supSave").prop("disabled", false);
            } else {
                $("#supSave").prop("disabled", true);
            }
        });
}
$("#supClear").click(function () {
    var ids = ["supId", "supCategory", "supName", "supBuildNo", "upLane",
        "supCity","supState", "supPostalCode", "supCountry", "supEmail", "supMobileNo", "supLandNo"];
    ids.forEach(function(id) {
        $("#" + id +"Error").val("");
    });
    clearSupInputFields();
    sp_vArray.forEach(function(item) {
        item.error.val("");
    });
    setSupBtn();
    setSupClBtn();
});
