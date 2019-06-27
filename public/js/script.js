let tab;

$(function () {
    tab = new mdc.tabBar.MDCTabBar(document.querySelector('.mdc-tab-bar'));

    let sections = $('.mdc-layout-grid');
    let curr = 0;

    function changeStateOnScroll() {
        let cur_pos = $(this).scrollTop();
        sections.each(function() {
            let top = $(this).offset().top - 200,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom && curr !== $(this).attr('data-id')) {
                curr = $(this).attr('data-id');
                tab.tabList_[0].foundation_.deactivate();
                tab.tabList_[1].foundation_.deactivate();
                tab.tabList_[2].foundation_.deactivate();
                tab.tabList_[3].foundation_.deactivate();
                tab.tabList_[curr].foundation_.activate();
            }
        });
    }


    $(window).on('scroll', function () {
        changeStateOnScroll()
    });
    changeStateOnScroll();

    let placeMove = {
        0: '.description',
        1: '.notre-equipe',
        2: '.contact',
        3: '.faq'
    }
    function moveTo(idx) {
        $('html,body').animate({
            scrollTop: $(placeMove[idx]).offset().top - 150
        }, 'slow');
    }

    tab.listen("MDCTabBar:activated", function(t) {
        console.log(t);
        moveTo(t.detail.index)
    });

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