$('#link-notre-equipe').on('click', function () {
    alert("works");
    $('body').animate({
        scrollTop: $(".notre-equipe").offset().top
    }, 'slow');
});

$('#link-contact').on('click', function () {
    alert("works");
    $('body').animate({
        scrollTop: $(".contact").offset().top
    }, 'slow');
});

$('#link-faq').on('click', function () {
    alert("works");
    $('body').animate({
        scrollTop: $(".faq").offset().top
    }, 'slow');
});

function linkcontact() {
    alert("zzz");
    $('html,body').animate({
        scrollTop: $(".notre-equipe").offset().top
    }, 'slow');
}
