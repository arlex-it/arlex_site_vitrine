$(function () {
    $('#link-notre-equipe').on('click', function () {
        $('html,body').animate({
            scrollTop: $(".notre-equipe").offset().top - 150
        }, 'slow');
    });

    $('#link-contact').on('click', function () {
        $('html,body').animate({
            scrollTop: $(".contact").offset().top - 150
        }, 'slow');
    });

    $('#link-faq').on('click', function () {
        $('html,body').animate({
            scrollTop: $(".faq").offset().top - 150
        }, 'slow');
    });
});