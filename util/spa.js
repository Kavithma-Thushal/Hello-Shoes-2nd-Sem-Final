/**
 * @author : Kavithma Thushal
 * @project : Hello-Shoes-FrontEnd
 * @since : 2:02 PM - 4/20/2024
 **/

function hideAllSections() {
    $("#adminDashboardSection").css("display", "none");
    $("#customerSection").css("display", "none");
    $("#shoeSection").css("display", "none");
    $("#supplierSection").css("display", "none");
    $("#employeeSection").css("display", "none");
    $("#purchaseOrderSection").css("display", "none");
    $("#orderDetailsSection").css("display", "none");
}

function adminDashboardSection() {
    hideAllSections();
    $("#adminDashboardSection").css("display", "block");
}

function customerSection() {
    hideAllSections();
    $("#customerSection").css("display", "block");
}

function shoesSection() {
    hideAllSections();
    $("#shoeSection").css("display", "block");
}

function supplierSection() {
    hideAllSections();
    $("#supplierSection").css("display", "block");
}

function employeeSection() {
    hideAllSections();
    $("#employeeSection").css("display", "block");
}

function purchaseOrderSection() {
    hideAllSections();
    $("#purchaseOrderSection").css("display", "block");
}

function orderDetailsSection() {
    hideAllSections();
    $("#orderDetailsSection").css("display", "block");
}