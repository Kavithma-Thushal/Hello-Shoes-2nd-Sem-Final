function hideAllSections() {
    $("#customerSection").css("display", "none");
    $("#inventorySection").css("display", "none");
    $("#supplierSection").css("display", "none");
    $("#employeeSection").css("display", "none");
}

function customerSection() {
    hideAllSections();
    $("#customerSection").css("display", "block");
}

function inventorySection() {
    hideAllSections();
    $("#inventorySection").css("display", "block");
}

function supplierSection() {
    hideAllSections();
    $("#supplierSection").css("display", "block");
}

function employeeSection() {
    hideAllSections();
    $("#employeeSection").css("display", "block");
}