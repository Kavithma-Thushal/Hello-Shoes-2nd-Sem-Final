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

/** Remove Image Preview **/
function removePreviewImage(fileInputId, previewId) {
    const fileInput = $(`#${fileInputId}`);
    fileInput.val('');

    const preview = $(`#${previewId}`);
    preview.hide();
    preview.attr('src', '#');
}

/** When Clicking the Add Shoe **/
$('#btnAddShoe').on('click', function () {
    removePreviewImage('txtShoePicture', 'shoeImagePreview');
});

/** When Clicking the Save Employee **/
$('#btnSaveEmployee').on('click', function () {
    removePreviewImage('txtEmpPicture', 'empImagePreview');
});

