function successAlert(resp) {
    Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: resp.message,
        showConfirmButton: false,
        timer: 2000
    });
}

function errorAlert(resp) {
    Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: resp.responseJSON.message,
        showConfirmButton: false,
        timer: 2000
    });
}