$(document).ready(function () {
  console.log(123);
  var $slider = $(".services-slider");
  var $progressBar = $(".slider-progress");
  var $progressBarLabel = $(".slider__label");
  var $serviceSliderButton = $(".service-slider__next-button");

  $slider.on("beforeChange", function (event, slick, currentSlide, nextSlide) {
    var calc = (nextSlide / (slick.slideCount - 1)) * 100;

    $progressBar
      .css("background-size", calc + "% 100%")
      .attr("aria-valuenow", calc);

    $progressBarLabel.text(calc + "% completed");
  });

  $serviceSliderButton.on("click", function () {
    console.log(123234234);
    $slider.slick("slickNext");
  });

  $slider.slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 400,
    arrows: false,
    responsive: [
      {
        breakpoint: 768, // Adjust this breakpoint as needed
        settings: {
          slidesToShow: 1,
        },
      }
    ],
  });
});

var navbarCollapse = function () {
  if ($(".all-surfaces-header").offset().top > 50) {
    $(".all-surfaces-header").addClass("all-surfaces-header--shrink");
  } else {
    $(".all-surfaces-header").removeClass("all-surfaces-header--shrink");
  }
};
// Collapse now if page is not at top
navbarCollapse();
// Collapse the navbar when page is scrolled
$(window).scroll(navbarCollapse);