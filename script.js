var tags = "";

$(document).ready(function () {
    interact('.draggable')
        .draggable({
            // enable inertial throwing
            inertia: true,
            // keep the element within the area of it's parent
            modifiers: [
                interact.modifiers.restrict({
                    restriction: "parent",
                    endOnly: true,
                    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
                }),
            ],
            // enable autoScroll
            autoScroll: true,

            // call this function on every dragmove event
            onmove: dragMoveListener
        });
    getUserZettels();
});

function getUserZettels(){
    var zettels = google.script.run.get_all_zets("");
    console.log(zettels);
}

function dragMoveListener(event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

$(function () {
    $('#accept').click(runTranslation);
});

function runTranslation() {
    var values = [$('#title-add-form-field').val(),
    $('#note-add-form-field').val(),
    tags.substring(0, tags.length - 2),
    $('#url-add-form-field').val(),
    $('#summary-add-form-field').val(), '1']
    google.script.run.put_in_sheet(values);
    google.script.run.serverCreate(values);
    clearForm();
}

function showError(msg, element) {
    var div = $('<div id="error" class="error">' + msg + '</div>');
    $(element).after(div);
}

function addTagBadge() {
    var value = $("#tags-add-form-field").val();
    $("#add-tags-container").append("<span class='badge badge-pill badge-primary'>" + value + "</span>");
    $("#tags-add-form-field").val("");
    tags = tags + value + ",";
}

function clearForm() {
    $('#title-add-form-field').val("");
    $('#note-add-form-field').val("");
    tags = "";
    $('#url-add-form-field').val("");
    $('#summary-add-form-field').val("");
    $('#add-tags-container').html("");
}