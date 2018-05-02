require('../css/app.sass');

import 'prismjs';

import '../../node_modules/bulma-tagsinput/dist/bulma-tagsinput.js'

$.when($.ready).then(function() {

    // navigation burger activation
    $('.navbar-burger').on('click', function() {
        let isActive = $(this).hasClass('is-active');
        let menuId = '#' + $(this).attr('data-target')

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
