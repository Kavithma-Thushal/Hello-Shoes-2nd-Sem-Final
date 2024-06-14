$("#userBtnCustomer, #userBtnInventory, #userBtnSupplier, #userBtnEmployee, #userBtnSales,#userBtnUsers,#UserBtnDashboard").click(function () {
    hideAdminPages();
    switch ($(this).attr('id')) {
        case 'userBtnCustomer':
            checkUserLabel();
            $("#userFormIcon").text("Customer Management");
            cusList.css('display', 'none');
            cusMain.css('display', 'block');
            customerPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'userBtnInventory':
            checkUserLabel();
            $("#userFormIcon").text("Shoes Management");
            itmList.css('display', 'none');
            itmMain.css('display', 'block');
            inventoryPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'userBtnSupplier':
            checkUserLabel();
            $("#userFormIcon").text("Supplier Management");
            supList.css('display', 'none');
            supMain.css('display', 'block');
            supplierPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'userBtnEmployee':
            checkUserLabel();
            $("#userFormIcon").text("Employee Management");
            empList.css('display', 'none');
            empMain.css('display', 'block');
            employeePage.css('display', 'block');
            allCaptureClear();
            break;
        case 'userBtnSales':
            checkUserLabel();
            $("#userFormIcon").text("Sales Management");
            paymentPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'userBtnUsers':
            getAllUsers();
            checkUserLabel();
            $("#userFormIcon").text("User Management");
            userEditPage.css('display', 'block');
            allCaptureClear();
            break;
        case 'UserBtnDashboard':
            checkUserLabel();
            $("#userFormIcon").text("User Dashboard");
            userDashboard.css('display', 'block');
            allCaptureClear();
            break;
    }
});

$("#user-side-bar-icon").click(function () {
    let attr = $("#user-bar-icon").attr('src');

    if (attr === "assets/images/nav-toggle.png"){
        $("#user-nav-bar").css('width', "20%");
        $("#user-nav-bar").css("transition", "all 0.3s ease");
        $("#user-side-bar-icon").css("transition", "all 0.3s");
        $("#user-side-bar-icon").css('left', "97.2%");
        $("#user-bar-icon").attr('src',"assets/images/nav-togglee.png");
        $("#user-bar-icon").css({
            "width": "45px",
            "padding-right": "0px",
            "padding-top": "8px",
            "z-index": "5"
        });
        $(".user-lb-hide").css("transition", "all 0.3s");
        $(".user-lb-hide").css('font-size', "18px");
        checkUserLabel();
    }else if (attr === "assets/images/nav-togglee.png"){
        $("#user-nav-bar").css('width', "5%");
        $("#user-nav-bar").css("transition", "all 0.3s ease");
        $("#user-side-bar-icon").css("transition", "all 0.3s");
        $("#user-bar-icon").attr('src',"assets/images/nav-toggle.png");
        $("#user-bar-icon").css({
            "width": "45px",
            "padding-right": "10px",
            "padding-top": "8px",
            "z-index": "5"
        });
        $(".user-lb-hide").css("transition", "all 0.3s");
        $(".user-lb-hide").css('font-size', "0px");
        checkUserLabel();
    }

});
function checkUserLabel() {
    let attr = $("#user-bar-icon").attr('src');

    if (attr === "assets/images/nav-toggle.png"){
        $("#userFormIcon").css("transition", "all 0.3s");
        $("#userFormIcon").css('left', "8vw");

    }else if (attr === "assets/images/nav-togglee.png"){
        $("#userFormIcon").css("transition", "all 0.3s");
        $("#userFormIcon").css('left', "23vw");
    }
}