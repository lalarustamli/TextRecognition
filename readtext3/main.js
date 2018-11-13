$('.open').click(function () {
    Webcam.set({
        width: 555,
        height: 320,
        image_format: 'jpeg',
        jpeg_quality: 90
    });
    Webcam.attach('.video');
    $('.camera').find('img').css('display','none');
    $('.top,.bottom').css('display','block');
    $(this).replaceWith('<button class="btn take_snapshot yellow_btn">Şəkil çək</button>');
    $('.info').show();
    snapShot();
    info();
});

function info(){
    $('.take_snapshot').click(function () {
        var $info = $('.info');
        if ($info.text() === "Ön hissəni çəkin"){
            $info.text("Arxa hissəni çəkin");
        }
        else {
            $info.text("Ön hissəni çəkin");
            $info.hide();
        }
        $('.ok').removeAttr('disabled');
    });
}

info();

function snapShot(){
    $('.take_snapshot').click(function () {
        Webcam.snap( function(data_uri) {
            if($('#results').find('img').length !== 2){
                $('#results').append('<div class="col-md-6 col-sm-6"><img src="'+data_uri+'" class="img-responsive"><input type="hidden" value="'+data_uri+'" name="front"></div>');
            }
            if($('#results').find('img').length === 2){
                $('.video').remove();
                $('.top,.bottom').hide();
                $('#results .col-md-6:last-child').find('input[type=hidden]').attr('name','back');
                Webcam.reset();
            }
        });
    });
}

snapShot();

$(".edit").click(function() {
    var columnHeadings = $("thead th").map(function() {
        return $(this).text();
    }).get();
    columnHeadings.pop();
    var columnValues = $(this).parent().siblings().map(function() {
        return $(this).text();
    }).get();
    var modalBody = $('<div id="modalContent"></div>');
    var modalForm = $('<form role="form" name="modalForm" action="" method="post"></form>');
    $.each(columnHeadings, function(i, columnHeader) {
        var formGroup = $('<div class="form-group"></div>');
        formGroup.append('<div class="row"><label for="'+columnHeader+'" class="col-md-3 col-sm-3">'+columnHeader+':</label><div class="col-md-9 col-sm-9"><input class="form-control" name="'+columnHeader+i+'" id="'+columnHeader+i+'" value="'+columnValues[i]+'"></div></div>');
        modalForm.append(formGroup);
    });
    modalBody.append(modalForm);
    $('#editModal .modal-body').html(modalBody);
});