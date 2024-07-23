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
});