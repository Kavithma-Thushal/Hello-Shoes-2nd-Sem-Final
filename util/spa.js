function hideAllSections() {
    $("#customerSection").css("display", "none");
    $("#shoesSection").css("display", "none");
    $("#supplierSection").css("display", "none");
    $("#employeeSection").css("display", "none");
}

function customerSection() {
    hideAllSections();
    $("#customerSection").css("display", "block");
}

function shoesSection() {
    hideAllSections();
    $("#shoesSection").css("display", "block");
}

function supplierSection() {
    hideAllSections();
    $("#supplierSection").css("display", "block");
}

function employeeSection() {
    hideAllSections();
    $("#employeeSection").css("display", "block");
}