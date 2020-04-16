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
  if (index == count - 1) {
    index = 0;
  } else{
    index ++;
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


// 回到顶部
var toTop = document.getElementsByClassName('back-top')[0];
var search = document.getElementsByClassName('search')[0];
var clientHeight = document.documentElement.clientHeight;   //获取可视区域的高度
var timer = null;
var isTop = true; //定义一个布尔值，用于判断是否到达顶部

toTop.onmouseenter = function () {
  this.children[0].src = 'images/back-top-w.png';

}
toTop.onmouseleave = function () {
  this.children[0].src = 'images/back-top.png';

}

//2. 监听窗口滚动
window.onscroll = function () {
  //获取滚动条的滚动高度
  var osTop = document.documentElement.scrollTop || document.body.scrollTop; 
  console.log(osTop);    
  if(osTop >= clientHeight){  //如果滚动高度大于可视区域高度，则显示回到顶部按钮
    toTop.style.display = 'block';
    search.classList.add('search-fix'); // 控制顶部搜索栏的显示与隐藏
  }else{ //否则隐藏
    toTop.style.display = 'none';
    search.classList.remove('search-fix');
  }

  //主要用于判断当 点击回到顶部按钮后 滚动条在回滚过程中，若手动滚动滚动条，则清除定时器
  if(!isTop){     
    clearInterval(timer);
  }
  isTop = false;
};

//3. 监听点击
toTop.onclick = function () {
  //3.1 清除定时器
  clearInterval(timer);
  
  //3.2 开启缓动动画
  timer = setInterval(function(){
    //获取滚动条的滚动高度
    var osTop = document.documentElement.scrollTop || document.body.scrollTop;
    //用于设置速度差，产生缓动的效果
    var speed = Math.floor(-osTop / 6);
    document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
    isTop =true;  //用于阻止滚动事件清除定时器
    if(osTop == 0){
      clearInterval(timer);
    }
  },30)
}


$(function() {
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