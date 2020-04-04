function $(id) {
    return typeof id === "string" ? document.getElementById(id) : null;
}


/**
 * 获取页面滚动的头部距离和左边距离
 * scroll().top scroll().left
 * @returns {{top: number, left: number}}
 */
function scroll() {
    if (window.pageYOffset !== null){ //ie9以上和最新浏览器
        return {
            top: window.pageYOffset,
            left: window.pageXOffset,
        }
    }else if (document.compatMode === "CSS1Compat"){ //W3C标准（严格模式）
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft,
        }
    }
    //怪异模式
    return {
        top: document.body.scrollTop,
        left: document.body.scrollLeft,
    }
}


/**
 * 获取屏幕（可视区域）的宽度和高度
 * @returns {{width: number, height: number}}
 */
function client() {
    if (window.innerWidth){
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }else if (document.compatMode === "CSS1Compat"){
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }
    return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
    }
}

/**
 * 匀速动画函数
 * @param {object}obj
 * @param {number}target
 * @param {number}speed
 */
function constant(obj, target, speed) {
    //1. 清除定时器
    clearInterval(obj.timer);

    //2. 判断方向
    var dir = obj.offsetLeft < target ? speed : -speed;

    //3. 设置定时器
    obj.timer = setInterval(function () {
        obj.style.left = obj.offsetLeft + dir + 'px';

        if (Math.abs(target - obj.offsetLeft) < Math.abs(dir)){
            clearInterval(obj.timer);
            obj.style.left = target + 'px'; //处理偏差
        }
    },20)
}

/**
 * 缓动动画函数
 * @param obj
 * @param json
 * @param fn
 */
function buffer(obj, json, fn) {
    //1. 清除定时器
    clearInterval(obj.timer);

    //2.设置定时器
    var begin = 0, target = 0, speed = 0;
    obj.timer = setInterval(function () {
        //2.0 旗帜
        var flag = true; //作个标识

        for (var key in json) {
            //2.1 获取初始值
            if ("opacity" === key){ //透明度
                begin = Math.round(parseFloat(getCSSAttrValue(obj, key)) * 100) || 100;
                target = parseInt(parseFloat(json[key]) * 100);
            }else if ("scrollTop" === key){ //scrollTop的获取方式和其他key不同
                begin = Math.ceil(obj.scrollTop);
                target = parseInt(json[key]);
            }else { //其他key
                begin = parseInt(getCSSAttrValue(obj, key)) || 0;
                target = parseInt(json[key]);
            }

            //2.2 求出步长
            speed = (target - begin) * 0.2;

            //2.3 判断方向并取整
            speed = (target > begin) ? Math.ceil(speed) : Math.floor(speed);

            //2.4 动
            if ("opacity" === key){ //透明度
                // W3C 浏览器
                obj.style.opacity = (begin + speed) / 100;
                // IE 浏览器
                obj.style.filter = 'alpha(opacity:' + (begin + speed) + ')';
            }else if ("scrollTop" === key){
                obj.scrollTop = begin + speed;
            }else if ("zIndex" === key){
                obj.style[key] = json[key];
            }else { //其他key
                obj.style[key] = begin + speed + 'px';
            }

            if (begin !== target) { //处理偏差
                flag = false;
            }
        }

        //3. 清除定时器
        if (flag) {
            clearInterval(obj.timer);

            //3.0 判断也没有回调函数
            if (fn) {
                fn();
            }
        }
    }, 20)
}

/**
 * 获取CSS的样式值
 * @param {object}obj
 * @param {string}attr
 * @returns {*}
 */
function getCSSAttrValue(obj, attr) {
    if (obj.currentStyle){
        return obj.currentStyle[attr];
    }else {
        return window.getComputedStyle(obj, null)[attr];
    }
}


// 处理浏览器兼容性
// 获取第一个子元素
function getFirstElementChild(element) {
    var node, nodes = element.childNodes, i = 0;
    while (node = nodes[i++]) {
        if (node.nodeType === 1) {
            return node;
        }
    }
    return null;
}

// 处理浏览器兼容性
// 获取下一个兄弟元素
 function getNextElementSibling(element) {
    var el = element;
    while (el = el.nextSibling) {
      if (el.nodeType === 1) {
          return el;
      }
    }
    return null;
  }

// 处理innerText和textContent的兼容性问题
// 设置标签之间的内容
function setInnerText(element, content) {
  // 判断当前浏览器是否支持 innerText
  if (typeof element.innerText === 'string') {
    element.innerText = content;
  } else {
    element.textContent = content;
  }
}

// 获取页面滚动距离的浏览器兼容性问题
// 获取页面滚动出去的距离
function getScroll() {
    var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    return {
        scrollLeft: scrollLeft,
        scrollTop: scrollTop
    }
}
  
// 获取鼠标在页面的位置，处理浏览器兼容性
function getPage(e) {
    var pageX = e.pageX || e.clientX + getScroll().scrollLeft;
    var pageY = e.pageY || e.clientY + getScroll().scrollTop;
    return {
        pageX: pageX,
        pageY: pageY
    }
}
   
//格式化日期对象，返回yyyy-MM-dd HH:mm:ss的形式
function formatDate(date) {
    // 判断参数date是否是日期对象
    // instanceof  instance 实例(对象)   of 的
    // console.log(date instanceof Date);
    if (!(date instanceof Date)) {
        console.error('date不是日期对象')
        return;
    }

    var year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;

    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}
  
// 获取两个日期的时间差
function getInterval(start, end) {
    // 两个日期对象，相差的毫秒数
    var interval = end - start;
    // 求 相差的天数/小时数/分钟数/秒数
    var day, hour, minute, second;

    // 两个日期对象，相差的秒数
    // interval = interval / 1000;
    interval /= 1000;

    day = Math.round(interval / 60 / 60 / 24);
    hour = Math.round(interval / 60 / 60 % 24);
    minute = Math.round(interval / 60 % 60);
    second = Math.round(interval % 60);

    return {
        day: day,
        hour: hour,
        minute: minute,
        second: second
    }
}