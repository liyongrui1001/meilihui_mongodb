//图片公共特效
$(".img-t").hover(function() {
    $(this).find($(".img-zhe")).show();
    $(this).find($(".img-zi")).show();
    $(this).find($(".img-m")).stop().animate({ "left": -10, "top": -10, "width": 340, "height": 212, }, 500);
}, function() {
    $(this).find($(".img-zhe")).hide();
    $(this).find($(".img-zi")).hide();
    $(this).find($(".img-m")).stop().animate({ "left": 0, "top": 0, "width": 320, "height": 192, }, 500);
})