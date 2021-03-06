// app.jsx global script, used on every pages

import '../css/app.sass';

import 'prismjs';
import '../../node_modules/bulma-extensions/bulma-tagsinput/dist/bulma-tagsinput.js';

$.when($.ready).then(function() {

  // navigation bar activation
  $('.navbar-burger').on('click', function() {
    let menuId = '#' + $(this).attr('data-target');
    $(this).toggleClass('is-active');
    $(menuId).toggleClass('is-active');
  })

});
