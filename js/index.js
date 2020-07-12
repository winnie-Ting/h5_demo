$(function () {
  toggleTool()
  addCurrent()
  // 节流阀 （互斥锁）
  // 点击li的时候，不再触发页面滚动时给li添加current
  var flag = true

  // 当页面向上滚动的高度大于今日推荐，电梯导航出现
  function toggleTool() {
    var heightTop = $('.recommend').offset().top
    if ($(document).scrollTop() >= heightTop) {
      $('.fixedtool').fadeIn()
    } else {
      $('.fixedtool').fadeOut()
    }
  }

  function addCurrent() {
    $('.floor .w').each(function (i, el) {
      var scrollHeight = $(document).scrollTop()
      var offsetTop = $(el).offset().top
      if (scrollHeight >= offsetTop) {
        $('.fixedtool li').eq(i).addClass('current').siblings().removeClass()
      }
    })
  }
  // 页面滚动
  $(window).scroll(function () {
    if (flag) {
      toggleTool()
      // 页面滚动到什么区域，对应的电梯导航增加样式
      addCurrent()
    }
  })
  // 点击电梯导航可以滚动页面到相应区域
  $('.fixedtool li').click(function () {
    flag = false
    var index = $(this).index()
    $(this).addClass('current').siblings().removeClass()
    // console.log(index);
    var current = $('.floor .w').eq(index).offset().top
    $('body,html').stop().animate({
        scrollTop: current
      },
      function () {
        return flag = true
      })
  })
})