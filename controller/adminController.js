let btnDashboard = $('#btnDashboard');
let btnCustomer = $('#btnCustomer');
let btnInventory = $('#btnInventory');
let btnSupplier = $('#btnSupplier');
let btnEmployee = $('#btnEmployee');
let btnSales = $('#btnSales');
let btnAdmin = $('#btnAdminPanel');
let btnUser = $('#btnUsers');

let btnAllCus = $('#getAllCus');
let btnAllItm = $('#getAllItm');
let btnAllEmp = $('#getAllEmp');
let btnAllSup = $('#getAllSup');

let btnBackCus = $('#backCus');
let btnBackItm = $('#backItm');
let btnBackEmp = $('#backEmp');
let btnBackSup = $('#backSup');

let empList = $('#employee-list');
let supList = $('#supplier-list');
let itmList = $('#inventory-list');
let cusList = $('#customer-list');

let empMain = $('#employee-main');
let supMain = $('#supplier-main');
let itmMain = $('#inventory-main');
let cusMain = $('#customer-main');


function hideAdminPages(){
    customerPage.css('display','none');
    employeePage.css('display','none');
    supplierPage.css('display','none');
    inventoryPage.css('display','none');
    paymentPage.css('display','none');
    adminEditPage.css('display','none');
    userEditPage.css('display','none');
    $("#formIcon").text("");
    $("#inventoryListLabel").text("")
    $("#inventoryListLabelSp").text("");
    $("#supListLabel").text("")
    $("#supListLabelSp").text("");
    $("#cusListLabel").text("")
    $("#cusListLabelSp").text("");
    $("#empListLabel").text("")
    $("#empListLabelSp").text("");
}
function hideMainPages(){
    empMain.css('display','none');
    supMain.css('display','none');
    itmMain.css('display','none');
    cusMain.css('display','none');
    $("#inventoryListLabel").text("")
    $("#inventoryListLabelSp").text("");
    $("#supListLabel").text("")
    $("#supListLabelSp").text("");
    $("#cusListLabel").text("")
    $("#cusListLabelSp").text("");
    $("#empListLabel").text("")
    $("#empListLabelSp").text("");
}
function hideAllLoadPages(){
    empList.css('display','none');
    supList.css('display','none');
    itmList.css('display','none');
    cusList.css('display','none');
}

$("#getAllCus, #getAllItm, #getAllEmp, #getAllSup").click(function () {
    hideMainPages();
    switch ($(this).attr('id')) {
        case 'getAllCus':
            cusList.css('display', 'block');
            getAllCustomers();
            allCaptureClear();
            break;
        case 'getAllItm':
            itmList.css('display', 'block');
            getAllItems("/getAll");
            allCaptureClear();
            break;
        case 'getAllEmp':
            empList.css('display', 'block');
            getAllEmployees();
            allCaptureClear();
            break;
        case 'getAllSup':
            supList.css('display', 'block');
            getAllSuppliers();
            allCaptureClear();
            break;
    }
});
$("#btnCustomer, #btnInventory, #btnSupplier, #btnEmployee, #btnSales,#btnAdminPanel,#btnUsers,#btnDashboard").click(function () {
    hideAdminPages();
    switch ($(this).attr('id')) {
        case 'btnCustomer':
            checkLabel();
            $("#formIcon").text("Customer page");
            cusList.css('display', 'none');
            cusMain.css('display', 'block');
            customerPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'btnInventory':
            checkLabel();
            $("#formIcon").text("Inventory page");
            itmList.css('display', 'none');
            itmMain.css('display', 'block');
            inventoryPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'btnSupplier':
            checkLabel();
            $("#formIcon").text("Supplier page");
            supList.css('display', 'none');
            supMain.css('display', 'block');
            supplierPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'btnEmployee':
            checkLabel();
            $("#formIcon").text("Employee page");
            empList.css('display', 'none');
            empMain.css('display', 'block');
            employeePage.css('display', 'block');
            allCaptureClear();
            break;
        case 'btnAdminPanel':
            checkLabel();
            $("#formIcon").text("Admin page");
            adminEditPage.css('display', 'block');
            getAllAdmins();
            allCaptureClear();
            break;
        case 'btnSales':
            checkLabel();
            $("#formIcon").text("Sales page");
            paymentPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'btnUsers':
            checkLabel();
            $("#formIcon").text("Users page");
            userEditPage.css('display', 'block');
            getAllUsers();
            allCaptureClear();
            break;
        case 'btnDashboard':
            checkLabel();
            $("#formIcon").text("Admin Panel");
            adminDashboard.css('display', 'block');
            setAdminPanel();
            allCaptureClear();
            break;
    }
});
function allCaptureClear() {
    if (videoStream) {
        stopWebcamStream();
        $('#cusVideo').hide();
        captureClear();
    }else if (empVideoStream) {
        empCaptureClear();
    }else if (itmVideoStream) {
        itmCaptureClear();
    }
}

$("#side-bar-icon").click(function () {
    let attr = $("#bar-icon").attr('src');

    if (attr === "assets/images/nav-toggle.png") {
        $("#nav-bar").css('width', "20%");
        $("#nav-bar").css("transition", "all 0.3s ease");
        $("#side-bar-icon").css("transition", "all 0.3s");
        $("#side-bar-icon").css('left', "97.2%");
        $("#bar-icon").attr('src', "assets/images/nav-togglee.png");
        $("#bar-icon").css({
            "width": "45px",
            "padding-right": "0px",
            "padding-top": "8px",
            "z-index": "5"
        });
        $(".lb-hide").css("transition", "all 0.3s");
        $(".lb-hide").css('font-size', "18px");
        checkLabel();
    } else if (attr === "assets/images/nav-togglee.png") {
        $("#nav-bar").css('width', "5%");
        $("#nav-bar").css("transition", "all 0.3s ease");
        $("#side-bar-icon").css("transition", "all 0.3s");
        /*$("#side-bar-icon").css('left', "2.7%");*/
        $("#bar-icon").attr('src', "assets/images/nav-toggle.png");
        $("#bar-icon").css({
            "width": "45px",
            "padding-right": "10px",
            "padding-top": "8px",
            "z-index": "5"
        });
        $(".lb-hide").css("transition", "all 0.3s");
        $(".lb-hide").css('font-size', "0px");
        checkLabel();
    }

});

function checkLabel() {
    let attr = $("#bar-icon").attr('src');

    if (attr === "assets/images/nav-toggle.png") {
        $("#formIcon").css("transition", "all 0.3s");
        $("#formIcon").css('left', "8vw");

    } else if (attr === "assets/images/nav-togglee.png") {
        $("#formIcon").css("transition", "all 0.3s");
        $("#formIcon").css('left', "23vw");
    }
}