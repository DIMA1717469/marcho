$(function() {
 





  $('.blog-page__slider').slick({
    prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="7px" height="14px" viewBox="0 0 7 14" version="1.1">< g id="surface1" ><path d="M 5.25 12.25 C 5.027344 12.25 4.800781 12.164062 4.632812 11.992188 L 0.257812 7.617188 C -0.0859375 7.277344 -0.0859375 6.722656 0.257812 6.382812 L 4.632812 2.007812 C 4.972656 1.664062 5.527344 1.664062 5.867188 2.007812 C 6.210938 2.347656 6.210938 2.902344 5.867188 3.242188 L 2.113281 7 L 5.871094 10.757812 C 6.210938 11.097656 6.210938 11.652344 5.871094 11.996094 C 5.699219 12.164062 5.472656 12.25 5.25 12.25 Z M 5.25 12.25 " /></></svg ></button>',
    nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="7px" height="11px" viewBox="0 0 7 11" version="1.1"><g id="surface1" ><path d="M 2.101562 10.3125 C 1.921875 10.3125 1.742188 10.246094 1.605469 10.109375 C 1.332031 9.84375 1.332031 9.40625 1.605469 9.140625 L 5.3125 5.5 L 1.605469 1.859375 C 1.332031 1.59375 1.332031 1.15625 1.605469 0.890625 C 1.878906 0.621094 2.320312 0.621094 2.59375 0.890625 L 6.796875 5.015625 C 7.070312 5.28125 7.070312 5.71875 6.796875 5.984375 L 2.59375 10.109375 C 2.457031 10.246094 2.28125 10.3125 2.101562 10.3125 Z M 2.101562 10.3125 " /></g></svg ></button>',
    infinite:false,
  });









  $('.product-tabs__top-item').on('click', function(e) {
    e.preventDefault();
    $('.product-tabs__top-item').removeClass('product-tabs__top-item--active');
    $(this).addClass('product-tabs__top-item--active');


    $('.product-tabs__content-item').removeClass('product-tabs__content-item--active');
    $($(this).attr('href')).addClass('product-tabs__content-item--active');




  });










  $('.product-slide__thumb').slick({
    asNavFor: '.product-slide__big',
    focusOnSelect: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,
    draggable: false,
  });
  $('.product-slide__big').slick({
    asNavFor: '.product-slide__thumb',
    draggable: false,
    arrows:false,
    fade:true
  });





  $('.shop-content__filter-btn').on('click', function () {
    $('.shop-content__filter-btn').removeClass('shop-content__filter-btn--active'); 
    $(this).addClass('shop-content__filter-btn--active');
  });


  $('.button-list').on('click', function () {
    $('.product-item').addClass('product-item--list');
  });

  $('.button-grid').on('click', function () {
    $('.product-item').removeClass('product-item--list');
  });




  $('.select-style, .product-one__item-num').styler();

  ////PRICE FILTER
  $('.filter-price__input').ionRangeSlider({
    type:"double",
    prefix: "$", 
    onStart:function (data){
      $('.filter-price__from').text(data.from);
      $('.filter-price__to').text(data.to);
    },
     onChange: function (data) {
     $('.filter-price__from').text(data.from);
     $('.filter-price__to').text(data.to);
  },
  })
////--------------------------------------------

$('.top-slider__inner').slick({
  dots:true,
  arrows:false,
  fade:true,
  autoplay:true,
  autoplaySpeed:2000
 });


  $(".star").rateYo({
    // rating: 3.6,
    starWidth: "24px",
    normalFill: "#ccccce",
    ratedFill: "#ffc35b",
    readOnly: true,

    starSvg: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M7.84 19.252a1 1 0 0 1-1.452-1.054l.795-4.633-3.366-3.28a1 1 0 0 1 .554-1.707l4.652-.676 2.08-4.215a1 1 0 0 1 1.794 0l2.08 4.215 4.652.676a1 1 0 0 1 .554 1.706l-3.366 3.281.795 4.633a1 1 0 0 1-1.451 1.054L12 17.065l-4.16 2.187z"/></svg> '
  });





  function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }

  function initializeClock(id, endtime) {
    const clock = document.querySelector('.promo__clock');
    const daysSpan = clock.querySelector('.promo__days');
    const hoursSpan = clock.querySelector('.promo__hours');
    const minutesSpan = clock.querySelector('.promo__minutes');
    const secondsSpan = clock.querySelector('.promo__seconds');

    function updateClock() {
      const t = getTimeRemaining(endtime);

      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
  }

  const deadline = $('.promo__clock').attr('data-time');
  initializeClock('promo__clock', deadline);



  });