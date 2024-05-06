function successAlert(resp) {
    Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: resp,
        showConfirmButton: false,
        timer: 2000
    });
}

function errorAlert(resp) {
    Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: resp,
        showConfirmButton: false,
        timer: 2000
    });
}