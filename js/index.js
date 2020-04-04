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


// 轮播
var oBanner = document.getElementsByClassName('banner')[0],
    ul = document.getElementsByClassName('slide-list')[0],
    prev = document.getElementsByClassName('prev')[0],
    next = document.getElementsByClassName('next')[0],
    focuses = document.getElementsByClassName('slide-focus')[0];

var count = ul.children.length;

var index = 0;

var goIndex = function () {
  for (i = 0; i < ul.children.length; i++) {
    ul.children[i].className = 'slide-item';
    focuses.children[i].className = '';
  }
  ul.children[index].className = 'slide-item active';
  focuses.children[index].className = 'active';
}

next.onclick = function () {
  if (index < count - 1) {
    index ++;
  } else{
    index = 0
  }
  goIndex();
}
prev.onclick = function () {
  if (index == 0) {
    index = count - 1;
  } else{
    index --;
  }
  goIndex();
}
for (i = 0; i < focuses.children.length; i++) {
  focuses.children[i].onclick = function () {
    // 获取自定义属性
    var liIndex = this.getAttribute('data-index');

    // 全局变量index  和 li中的index保持一致
    index = liIndex;
    goIndex();
  }
}
var timerId = setInterval(function () {
  // 切换到下一张图片
  next.click();
}, 2000);
  
oBanner.onmouseenter = function () {
  // 清除定时器
  clearInterval(timerId);
}
oBanner.onmouseleave = function () {
  // 重新开启定时器
  timerId = setInterval(function () {
    next.click();
  }, 2000);
}


