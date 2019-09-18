let tab;
let scroll;

let isMoving = false;
let placeMove = {
    0: '.description',
    1: '.notre-equipe',
    2: '.contact',
    3: '.faq'
};

function moveTo(idx) {
    isMoving = true;
    // scroll.scroll({
    //     y: "+=" + ($(placeMove[idx]).offset().top - 150)
    // }, 600, undefined, function() {
    //     console.log("lol");
    //     isMoving = false;
    // });
    $('html,body').animate({
        scrollTop: $(placeMove[idx]).offset().top - 150
    }, 'slow', function () {
        isMoving = false;
    });
}
$(function () {
    // let menu = new mdc.menu.MDCMenu(document.querySelector('.mdc-menu'));
    tab = new mdc.tabBar.MDCTabBar(document.querySelector('.mdc-tab-bar'));

    // scroll = $("body").overlayScrollbars({
    //     scrollbars : {
    //         visibility       : "auto",
    //         autoHide         : "move",
    //         autoHideDelay    : 800,
    //         dragScrolling    : true,
    //         clickScrolling   : false,
    //         touchSupport     : true,
    //         snapHandle       : false
    //     },
    //     callbacks: {
    //         onScroll: function () {
    //             changeStateOnScroll()
    //         }
    //     }
    // }).overlayScrollbars();

    let sections = $('.mdc-layout-grid');
    let btns = [
        $('.go-description'),
        $('.go-team'),
        $('.go-contact'),
        $('.go-faq')
    ];
    let curr = 0;

    function changeStateOnScroll() {
        let cur_pos = $(this).scrollTop();
        sections.each(function() {
            let top = $(this).offset().top - 400,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom && curr !== $(this).attr('data-id')) {
                curr = $(this).attr('data-id');
                for (btn of btns) {
                    btn.removeClass('mdc-tab--active');
                    btn.find('.mdc-tab-indicator').removeClass('mdc-tab-indicator--active');
                }
                btns[curr].addClass('mdc-tab--active');
                btns[curr].find('.mdc-tab-indicator').addClass('mdc-tab-indicator--active');
            }
        });
    }

    // $('.arlex-open-lang').click(function () {
    //     menu.setAnchorCorner(8);
    //     menu.setAnchorElement(buttonEl);
    //     menu.open = !menu.open;
    // });

    $(window).on('scroll', function () {
        if (!isMoving)
            changeStateOnScroll()
    });
    changeStateOnScroll();

    tab.listen("MDCTabBar:activated", function(t) {
        moveTo(t.detail.index)
    });

    let btnContent = $('form button').html();
    let isSending = false;
    const key = '021540ea-d925-455a-ba1e-9ec0d98508fe';

    $('form').on('submit', function () {
        event.preventDefault();
        if (isSending)
            return;
        let name = $('#username-input').val();
        let subject = $('#subject-input').val();
        let content = $('#textarea').val();
        let email = $('#email-input').val();

        if (subject.trim() === "" || name.trim() === "" || content.trim() === "" || email.trim() === "")
            return false;
        isSending = true;
        let progress = '<progress class="pure-material-progress-circular"/>';
        $('form button').html(progress);

        let msg = `<h3>${name} vous a envoyé un message</h3>
            <h2>Sujet: ${subject}</h2>
            <p>${content}</p>
            </br>`;

        Email.send({
            SecureToken : key,
            To : 'contact@arlex.fr',
            From : email,
            Subject : subject,
            Body : msg
        }).then(
            message => {
                isSending = false;
                if (message === "OK") {
                    $(this).trigger("reset");
                    $('.arlex-info')[0].innerText = 'Merci pour votre message !';
                } else {
                    $('.arlex-info')[0].innerText = 'Une erreur est survenue veuillez réessayer. (' + message + ')';
                }
                $('form button').html(btnContent);
            }
        );
    })
});