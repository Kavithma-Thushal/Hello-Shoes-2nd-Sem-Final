/**
 * @author : Kavithma Thushal
 * @project : Hello-Shoes-FrontEnd
 * @since : 2:02 PM - 4/20/2024
 **/

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
