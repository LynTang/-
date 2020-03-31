$(function() {
  // 控制顶部搜索栏的显示与隐藏
  window.onscroll = function() {
    if ($(document).scrollTop() >= 500){
    $('.search').addClass('search-fix');
    } else{
      $('.search').removeClass('search-fix');
    }
  }

  // 监听 notice tab 切换
  $('.notice-head li a').mouseenter(function () {
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    var index = $(this).index('.notice-head li a');
    $('.notice-cont .mod').eq(index).show();
    $('.notice-cont .mod').not($('.notice-cont .mod').eq(index)).hide();
  });

  // 监听 dynamic tab 切换
  $('.dynamic-head li a').mouseenter(function () {
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    var index = $(this).index('.dynamic-head li a');
    $('.dynamic-cont .mod').eq(index).show();
    $('.dynamic-cont .mod').not($('.dynamic-cont .mod').eq(index)).hide();
  });
})