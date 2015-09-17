(function(){
  redrawDotNav();
  
  /* Scroll event handler */
    $(window).bind('scroll',function(e){
      parallaxScroll();
    redrawDotNav();
    });
    
  /* Next/prev and primary nav btn click handlers */
  $('a.manned-flight').click(function(){
      $('html, body').animate({
        scrollTop:549
      }, 1000, function() {
        parallaxScroll(); // Callback is required for iOS
    });
      return false;
  });
    $('a.frameless-parachute').click(function(){
      $('html, body').animate({
        scrollTop:$('#frameless-parachute').offset().top
      }, 1000, function() {
        parallaxScroll(); // Callback is required for iOS
    });
      return false;
    });
    $('a.english-channel').click(function(){
      $('html, body').animate({
        scrollTop:$('#english-channel').offset().top
      }, 1000, function() {
        parallaxScroll(); // Callback is required for iOS
    });
      return false;
    });
  $('a.about').click(function(){
      $('html, body').animate({
        scrollTop:$('#about').offset().top
      }, 1000, function() {
        parallaxScroll(); // Callback is required for iOS
    });
      return false;
    });
    
    /* Show/hide dot lav labels on hover */
    $('nav#primary a').hover(
      function () {
      $(this).prev('h1').show();
    },
    function () {
      $(this).prev('h1').hide();
    }
  );
    

/* Scroll the background layers */
function parallaxScroll(){
  var $global              = $(document),
      $height              = $global.innerHeight(),
      scrolled             = $(window).scrollTop(),
      current_scroll       = scrolled / $height * 100;

     var scrollPercent = (scrolled / ($(document).height()-$(window).height())) * 100;

     $(".show-scroll-info > span").html( Math.round(scrollPercent)+'%');
  
    console.log(scrolled);
  if(scrolled > 1700 && scrolled < 2000){
    $("#bg3-4").css({
      'transform': 'rotate(-30deg)'
    });
  } else if(scrolled > 1000 && scrolled < 1366){
    $("#bg1-4").animate({
      width: '50%',
    });
  } else if(scrolled > 2300){
    $("#bg1-5").animate({
      opacity: 1,
    });
  } else {
     $("#bg3-4").css({
      'transform': 'rotate(0deg)'
    });
  }
  $('#parallax-bg1').css('top',(0-(scrolled * 0.85))+'px');
  $('#parallax-bg2').css('top',(0-(scrolled * 0.25))+'px');
  $('#parallax-bg3').css('top',(0-(scrolled * 1.5))+'px');
}

/* Set navigation dots to an active state as the user scrolls */
function redrawDotNav(){

  var $frameless_parachute = $('#frameless-parachute').offset().top,
      $english_channel     = $('#english-channel').offset().top,
      $about               = $('#about').offset().top,
      $scroll              = $(document).scrollTop();

  var section1Top = 0,
      section2Top = $frameless_parachute - (($english_channel - $frameless_parachute / 2),
      section3Top = $english_channel - (($about - $english_channel) / 2),
      section4Top = $about - ($(document).height() - $about) / 2);


  $('nav#primary a').removeClass('active');
  if( $scroll >= section1Top &&
      $scroll < section2Top) {
        $('nav#primary a.manned-flight').addClass('active');
  } 
  else if ( $scroll >= section2Top && $scroll < section3Top) {
              $('nav#primary a.frameless-parachute').addClass('active');
  }
  else if ( $scroll >= section3Top && $scroll < section4Top) {
              $('nav#primary a.english-channel').addClass('active');
  } 
  else if ($scroll >= section4Top) {
    $('nav#primary a.about').addClass('active');
  }
}
  
})();