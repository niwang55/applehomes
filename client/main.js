function checkScroll() {
  var startY = $('.top-banner').height(); //The point where the navbar changes in px

  if ($(window).scrollTop() > startY) {
    $('.top-banner').addClass('scrolled');
  } else {
    $('.top-banner').removeClass('scrolled');
  }
}

if ($('.top-banner').length > 0) {
  $(window).on('scroll load resize', function() {
    checkScroll();
  });
}