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
  if(!sizeSp){
    $(".js-footerPa_pc").click(function(){
      $(this).toggleClass("active");
      $(".js-footerCh_pc").slideToggle(400);
    });
  }
  if(sizeSp){
    $(".js-footerPa").click(function(){
      $(this).toggleClass("active");
      $(this).next(".js-footerCh").slideToggle(400);
    });
  }
});