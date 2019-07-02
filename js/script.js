let tab;

$(function () {
    tab = new mdc.tabBar.MDCTabBar(document.querySelector('.mdc-tab-bar'));

    let sections = $('.mdc-layout-grid');
    let curr = 0;

    function changeStateOnScroll() {
        let cur_pos = $(this).scrollTop();
        sections.each(function() {
            let top = $(this).offset().top - 400,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom && curr !== $(this).attr('data-id')) {
                curr = $(this).attr('data-id');
                tab.tabList_[0].deactivate();
                tab.tabList_[1].deactivate();
                tab.tabList_[2].deactivate();
                tab.tabList_[3].deactivate();
                tab.tabList_[curr].activate();
            }
        });
    }


    $(window).on('scroll', function () {
        if (!isMoving)
            changeStateOnScroll()
    });
    changeStateOnScroll();

    let placeMove = {
        0: '.description',
        1: '.notre-equipe',
        2: '.contact',
        3: '.faq'
    };

    let isMoving = false;

    function moveTo(idx) {
        isMoving = true;
        console.log("bouge");
        $('html,body').animate({
            scrollTop: $(placeMove[idx]).offset().top - 150
        }, 'slow', function () {
            console.log("fini");
            isMoving = false;
        });
    }

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