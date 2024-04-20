/** Save Customer **/
$('#btnSaveCustomer').click(function () {
    let cusId = $('#txtCustomerId').val();
    let cusName = $('#txtCustomerName').val();
    let cusAddress = $('#txtCustomerAddress').val();

    let customerObj = {
        id: cusId,
        name: cusName,
        address: cusAddress,
    }

    $.ajax({
        url: 'http://localhost:8080/shoes/api/v1/customers',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(customerObj),
        success: function (data) {
            alert("Customer Saved Successfully...!");
        },
        error: function (xhr, status, error) {
            alert("Customer Saved Error...!");
        }
    });
});
