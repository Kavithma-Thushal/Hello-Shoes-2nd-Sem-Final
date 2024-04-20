const baseURL = "http://localhost:8080/shoes/api/v1/";

/** Save Customer **/
$('#btnSaveCustomer').click(function () {
    let cusId = $('#txtCustomerId').val();
    let cusName = $('#txtCustomerName').val();
    let cusAddress = $('#txtCustomerAddress').val();
    let cusSalary = $('#txtCustomerSalary').val();

    let customerObj = {
        id: cusId,
        name: cusName,
        address: cusAddress,
        salary: cusSalary,
    }

    $.ajax({
        url: baseURL + 'customers',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(customerObj),
        success: function (resp) {
            successAlert(resp);
        },
        error: function (resp) {
            errorAlert(resp);
        }
    });
});
