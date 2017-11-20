var money = localStorage.getItem('money') ? JSON.parse(localStorage.getItem('money')) : [];
$(".money").html(money);
var timer = setInterval(auto, 1000);
var minute = 30;
var second = 0;

function auto() {
    if (second == 0) {
        second = 60;
        minute -= 1;
    }
    second--;
    second < 10 ? "0" + second : second;
    $(".minute").html(minute);
    $(".second").html(second);
}
$(".paym-n").click(function() {
    var src = $(this).attr("src");
    $(".paym-p").attr("src", src);
})