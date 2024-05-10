function hideAllSections() {
    $("#adminDashboardSection").css("display", "none");
    $("#customerSection").css("display", "none");
    $("#shoeSection").css("display", "none");
    $("#supplierSection").css("display", "none");
    $("#employeeSection").css("display", "none");
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