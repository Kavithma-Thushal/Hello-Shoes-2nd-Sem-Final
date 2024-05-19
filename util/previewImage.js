/**
 * @author : Kavithma Thushal
 * @project : Hello-Shoes-FrontEnd
 * @since : 2:02 PM - 4/20/2024
 **/

/** Image Preview **/
function previewImage(event, previewId) {
    const input = event.target;
    const preview = document.getElementById(previewId);

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        preview.src = '#';
        preview.style.display = 'none';
    }
}

/** Remove Preview when clicking the Add Shoe **/
$('#btnAddShoe').on('click', function () {
    const fileInput = $('#txtShoePicture');
    fileInput.val('');

    const preview = $('#shoeImagePreview');
    preview.hide();
    preview.attr('src', '#');
});
