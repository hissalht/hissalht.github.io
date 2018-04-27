require('../css/app.sass');

$.when($.ready).then(function() {

    // navigation burger activation
    $('.navbar-burger').on('click', function() {
        isActive = $(this).hasClass('is-active');
        menuId = '#' + $(this).attr('data-target')

        if(isActive) {
            $(this).removeClass('is-active');
            $(menuId).removeClass('is-active');
        } else {
            $(this).addClass('is-active');
            $(menuId).addClass('is-active');
        }
        $(this).attr('aria-expanded', !isActive);

    });

});