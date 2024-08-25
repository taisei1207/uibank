// スマホ判定
var window_default_w = jQuery(window).width();
var breakpoint = 767;
var sizeSp = false;
if(window_default_w>breakpoint){
	sizeSp = false;
}else{
	sizeSp = true;
}

// footer sp
$(function(){
  $(".js-qanda-btn").click(function(){
    $(this).toggleClass("active");
    $(this).prev().toggleClass("active");
    $(this).parent().next().slideToggle(400);
  });

  // fixedArrow
$(function(){
  var $fnavi = $(".js-fixedNavi");
  $(window).scroll(function(){
    var currentPos = $(this).scrollTop();
    if (currentPos > 200){
      $fnavi.addClass("active");
    }else{
      $fnavi.removeClass("active");
    }
  });
});
});