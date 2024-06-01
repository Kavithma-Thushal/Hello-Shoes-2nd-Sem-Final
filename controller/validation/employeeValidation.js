const EMP_ID_REGEX = /^E00-(0*[1-9]\d{0,2})$/;
const EMP_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const EMP_GENDER_REGEX = /^[A-Z\s]*$/;
const EMP_STATUS_REGEX = /^[A-Z\s]*$/;
const EMP_DESIGNATION_REGEX = /^[A-Za-z ]{5,}$/;
const EMP_ROLE_REGEX = /^[A-Z\s]*$/;
const EMP_JOIN_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const EMP_BRANCH_REGEX = /^[A-Za-z ]{5,}$/;
const EMP_ADDRESS_BUILD_REGEX = /^[A-Za-z0-9 ]{3,}$/;
const EMP_ADDRESS_LANE_REGEX = /^[A-Za-z0-9 ]{3,}$/;
const EMP_ADDRESS_CITY_REGEX = /^[A-Za-z0-9 ]{3,}$/;
const EMP_ADDRESS_STATE_REGEX = /^[A-Za-z0-9 ]{3,}$/;
const EMP_ADDRESS_CODE_REGEX = /^[A-Za-z0-9 ]{3,}$/;
const EMP_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMP_CONTACT_REGEX = /^[^\p{L}]{10,}$/u;
const EMP_DOB_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const EMP_GUARDIAN_REGEX = /^[A-Za-z ]{5,}$/;
const EMP_GUARDIAN_CONTACT_REGEX = /^[^\p{L}]{10,}$/u;

let em_vArray = new Array();
em_vArray.push({ field: $("#empId"), regEx: EMP_ID_REGEX, error: $("#empIdError") });
em_vArray.push({ field: $("#empName"), regEx: EMP_NAME_REGEX, error: $("#empNameError") });
em_vArray.push({ field: $("#empBuildNo"), regEx: EMP_ADDRESS_BUILD_REGEX, error: $("#empBuildNoError") });
em_vArray.push({ field: $("#empLane"), regEx: EMP_ADDRESS_LANE_REGEX, error: $("#empLaneError") });
em_vArray.push({ field: $("#empCity"), regEx: EMP_ADDRESS_CITY_REGEX, error: $("#empCityError") });
em_vArray.push({ field: $("#empState"), regEx: EMP_ADDRESS_STATE_REGEX, error: $("#empStateError") });
em_vArray.push({ field: $("#empPostalCode"), regEx: EMP_ADDRESS_CODE_REGEX, error: $("#empPostalCodeError") });
em_vArray.push({ field: $("#empEmail"), regEx: EMP_EMAIL_REGEX, error: $("#empEmailError") });
em_vArray.push({ field: $("#empGender"), regEx: EMP_GENDER_REGEX, error: $("#empGenderError") });
em_vArray.push({ field: $("#empDob"), regEx: EMP_DOB_REGEX, error: $("#empDobError") });
em_vArray.push({ field: $("#empStatus"), regEx: EMP_STATUS_REGEX , error: $("#empStatusError") });
em_vArray.push({ field: $("#designation"), regEx: EMP_DESIGNATION_REGEX, error: $("#designationError") });
em_vArray.push({ field: $("#empRole"), regEx: EMP_ROLE_REGEX , error: $("#empRoleError") });
em_vArray.push({ field: $("#joinDate"), regEx: EMP_JOIN_REGEX , error: $("#joinDateError") });
em_vArray.push({ field: $("#empBranch"), regEx: EMP_BRANCH_REGEX, error: $("#empBranchError") });
em_vArray.push({ field: $("#empContactNo"), regEx: EMP_CONTACT_REGEX, error: $("#empContactNoError") });
em_vArray.push({ field: $("#guardianName"), regEx: EMP_GUARDIAN_REGEX , error: $("#guardianNameError") });
em_vArray.push({ field: $("#emergencyContact"), regEx: EMP_GUARDIAN_CONTACT_REGEX , error: $("#emergencyContactError") });

function clearEmpInputFields() {
    em_vArray.forEach(function(item) {
        item.field.val("");
        item.field.css("border", "1px solid #ced4da");
    });
    /*$("#empId,#empName,#empBuildNo,#empLane,#empCity,#empState,#empPostalCode,#empEmail,#empDob,#empGender" +
        ",#empContactNo,#empStatus,#designation,#empRole,#joinDate,#empBranch,#empContactNo,#guardianName,#emergencyContact").val("");
    $("#empId,#empName,#empBuildNo,#empLane,#empCity,#empState,#empPostalCode,#empEmail,#empDob,#empGender" +
        ",#empContactNo,#empStatus,#designation,#empRole,#joinDate,#empBranch,#empContactNo,#guardianName,#emergencyContact").css("border", "1px solid #ced4da");
    */$("#empId").focus();
    setEmpBtn();
}
//setEmpBtn();
function setEmpClBtn(){
    var any = false;
    $("#empId,#empName,#empBuildNo,#empLane,#empCity,#empState,#empPostalCode,#empEmail,#empDob,#empGender,#empContactNo,#empStatus,#designation,#empRole,#joinDate,#empBranch,#guardianName,#emergencyContact").each(function () {
        var value = $(this).val();
        if (value !== undefined && value !== null && value.trim() !== "") {
            any = true;
            return false;
        }
    });
    if (any) {
        $("#empClear").prop("disabled", false);
    } else {
        $("#empClear").prop("disabled", true);
    }
}
//setEmpClBtn();
function empEvents(e) {
    setEmpClBtn();
    let indexNo = em_vArray.indexOf(em_vArray.find((c) => c.field.attr("id") == e.target.id));

    if (e.key == "Tab") {
        e.preventDefault();
    }

    checkEmpValidations(em_vArray[indexNo]);

    setEmpBtn();

    if (e.key == "Enter") {

        if (e.target.id != em_vArray[em_vArray.length - 1].field.attr("id")) {
            if (checkEmpValidations(em_vArray[indexNo])) {
                em_vArray[indexNo + 1].field.focus();
            }
        } else {
            if (checkEmpValidations(em_vArray[indexNo])) {
                saveEmployee();
            }
        }
    }
}

$("#empName,#empBuildNo,#empLane,#empCity,#empState,#empPostalCode,#empEmail,#empDob,#empGender" +
    ",#empContactNo,#empStatus,#designation,#empRole,#joinDate,#empBranch,#empContactNo,#guardianName,#emergencyContact").on("keydown keyup change", function (e) {
    empEvents(e);
});
$("#empId").on("keydown keyup", function (e) {
    empEvents(e);
    searchEmployee($("#empId").val()).then(function (res){
        $("#empId,#empName,#empBuildNo,#empLane,#empCity,#empState,#empPostalCode,#empEmail,#empDob,#empGender" +
            ",#empContactNo,#empStatus,#designation,#empRole,#joinDate,#empBranch,#empContactNo,#guardianName,#emergencyContact").css("border", "1px solid #ced4da");
        setEmpBtn();
        empCaptureClear();
        setAllEmpVal(res);
    });
});

function checkEmpValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setEmpBorder(true, object)
        return true;
    }
    setEmpBorder(false, object)
    return false;
}

function checkAllEmp() {
    for (let i = 0; i < em_vArray.length; i++) {
        if (!checkEmpValidations(em_vArray[i])) return false;
    }
    return true;
}
function setEmpBorder(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
            let check = ob.field.attr('id');
            switch (check) {
                case "empId" : ob.error.text("emp-Id is a required field: C00-"); break
                case "empName" : ob.error.text("emp-Name is a required field: Minimum 5,Max 20,Spaces Allowed"); break
                case "empBuildNo" : ob.error.text("BuildNo is a required field: Minimum 3"); break
                case "empLane" : ob.error.text("Lane is a required field: Minimum 3"); break
                case "empCity" : ob.error.text("City is a required field: Minimum 3"); break
                case "empState" : ob.error.text("State is a required field: Minimum 3"); break
                case "empPostalCode" : ob.error.text("PostalCode is a required field: Minimum 3"); break
                case "empEmail" : ob.error.text("Email is not valid"); break;
                case "empDob" : ob.error.text("Dob is not valid"); break
                case "empContactNo" : ob.error.text("ContactNo is not valid: Minimum 10"); break
                case "empStatus":ob.error.text("Status is required field: Minimum 3");break;
                case "designation":ob.error.text("Designation is required field: Minimum 3");break;
                case "joinDate":ob.error.text("Date is not valid");break;
                case "empBranch":ob.error.text("Branch is required field: Minimum 3");break;
                case "guardianName":ob.error.text("Name is required field: Minimum 3");break;
                case "emergencyContact":ob.error.text("Contact is not valid: Minimum 10");break;

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
function setEmpBtn() {
    setEmpClBtn();
    $("#empSave").prop("disabled", true);
    $("#empDelete").prop("disabled", true);
    $("#empUpdate").prop("disabled", true);
    $("#empSearch").prop("disabled", true);
    let id = $("#empId").val();
    if ($("#empId").val() != "" && EMP_ID_REGEX.test($("#empId").val())){
        $("#empSearch").prop("disabled", false);
    }else {
        $("#empSearch").prop("disabled", true);
    }
    validEmployee(id)
        .then(function (isValid) {
            if (isValid) {
                $("#empDelete").prop("disabled", false);
                if (checkAllEmp()) {
                    $("#empUpdate").prop("disabled", false);
                    $("#empDelete").prop("disabled", false);
                } else {
                    $("#empUpdate").prop("disabled", true);
                }
            }else {
                $("#empDelete").prop("disabled", true);
                $("#empUpdate").prop("disabled", true);
                if (checkAllEmp()) {
                    $("#empSave").prop("disabled", false);
                } else {
                    $("#empSave").prop("disabled", true);
                }
            }
        })
        .catch(function () {
            $("#empDelete").prop("disabled", true);
            $("#empUpdate").prop("disabled", true);
            if (checkAllEmp()) {
                $("#empSave").prop("disabled", false);
            } else {
                $("#empSave").prop("disabled", true);
            }
        });
}

$("#empClear").click(function () {
    em_vArray.forEach(function(item) {
        item.field.val("");
        item.field.css("border", "1px solid #ced4da");
    });
    clearEmpInputFields();
    em_vArray.forEach(function(item) {
        item.error.val("");
    });
    stopEmpWebcamStream();
    $('#empVideo').hide();
    empCaptureClear();
    setEmpBtn();
    setEmpClBtn();
});

function empCaptureClear() {
    stopEmpWebcamStream();
    $('#empVideo').hide();
    $("#empCapturedImage").show();
    $('#empCaptureButton').css("background-color", "#007bff");
    $('#empCaptureButton').css("border-color", "#007bff");
    $('#empCaptureButton').text("Capture");
    $("#empCapturedImage").attr('src', "assets/images/walk.gif");

}