$(".acc-left").on("click","li",function(){
	$(this).addClass("acc-on").siblings().removeClass("acc-on");
	$(".acc-right").eq($(this).index()).show().siblings().hide();
})
