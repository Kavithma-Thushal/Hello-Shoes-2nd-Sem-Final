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

function emptyMessage(resp) {
    let timerInterval
    Swal.fire({
        title: resp + ' Empty Result...!',
        html: 'I will close in <b></b> milliseconds.',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            let b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer...!')
        }
    })
}