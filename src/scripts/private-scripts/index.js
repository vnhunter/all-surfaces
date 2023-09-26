$(function () {
  setTimeout(function () {
    $(".netrix-navbar").addClass("show");
    $(".text-signature").css("transition", "opacity 0.4s ease");
    $(".text-signature").css("opacity", 1);
  }, 1400);

  setTimeout(function () {
    $(".hero-banner h1").addClass("show");
  }, 500);

  $(".netrix-navbar-menu .nav-link").on("mouseover", function () {
    let $this = $(this);
    $this.siblings().css("width", $this.width());
  });

  $(".netrix-navbar-menu .nav-link").on("mouseout", function () {
    let $this = $(this);
    $this.siblings().css("width", 0);
  });


  $(window).scroll(function() {
    var scrollPosition = $(this).scrollTop();
    var windowHeight = $(window).height();

    $('.product-wrapper').each(function() {
      var elementOffset = $(this).offset().top;
      var triggerPoint = elementOffset - windowHeight + (windowHeight / 6);

      if (scrollPosition > triggerPoint ) {
        var opacity = (scrollPosition - triggerPoint) / (elementOffset * (4/5) - triggerPoint);
        $(this).css('opacity', opacity > 0.1 ? opacity : 0.1);
      } else {
        $(this).css('opacity', '0.1');
      }
    });
  });
});
