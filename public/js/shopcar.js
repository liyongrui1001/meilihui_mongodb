$(".car-bt").on("click", "li", function() {
    $(this).addClass("car-on").siblings().removeClass("car-on");
    $(".car-bb").eq($(this).index()).show().siblings().hide();
})
$(function() {
    var arr = localStorage.getItem('shoplist') ? JSON.parse(localStorage.getItem('shoplist')) : [];
    if (arr.length == 0) {
        $(".car-bb").eq(0).html(`<p class="car-bbp">您还没有可购买的商品，赶快将心仪的商品加入购物袋吧~</p>`);
    } else {
        var str = `<div class="car-bbt">
					<p>
						<input type="checkbox" name="qx" class="qx" />&ensp;&ensp;全选
					</p>
					<p style="width: 200px;">商品信息</p>
					<p>单价</p>
					<p>数量</p>
					<p>优惠</p>
					<p>小计</p>
					<p>操作</p>
				</div>
				<div  class="car-bbtb">
					<input type="checkbox" name="pp" class="pp" />&ensp;&ensp;品牌直发
				</div>`;
        for (var i in arr) {
            str += `<div class="car-bbc">
					<p class="car-bbc1">
						<input type="checkbox" class="check" />&ensp;&ensp;
						<img src="images/${arr[i].src}" style="width: 75px; height: 100px; border: 1px gray solid;" />
					</p>
					<p style="width: 200px;">商品信息</p>
					<p>￥<span class="car-pri">${arr[i].price}</span></p>
					<p class="car-num">
						<input type="button" value="-" class="car-ji"/>
						<input type="text" value="${arr[i].count}" class="car-number"/>
						<input type="button" value="+" class="car-ji"/>
					</p>
					<p>￥<span class="car-you">0.00</span></p>
					<p>￥<span class="car-pr">${arr[i].count*arr[i].price}</span></p>
					<p><input type="button" value="删除" class="car-bbshan" /></p>
					<span data-id=${arr[i].id}  data-name=${arr[i].name} data-src=${arr[i].src} data-color=${arr[i].color} data-price=${arr[i].price}   style="display:none" class="car-sp"></span>
				</div>`;
        }
        str += `<div class="car-bbcb">
				<p class="car-bbcbl">
					<input type="checkbox" name="qx" class="qx" />&ensp;&ensp;全选
					已选<span class="car-bbnum">0</span>件
					<input type="button" value="删除" class="car-bbcshan" />
				</p>
				<p class="car-bbcbr">
					总价：（不含运费）：<span class="car-bbcnum">￥<span class="car-price">0.00</span></span>
					<a><input type="button" value="结算" class="car-bbjie" /></a>
				</p>
			</div>`;
        $(".car-bb").eq(0).html(str);
    }
    //结算
    function jiesuan() {
        var money = 0;
        var shopcount = 0;
        $(".check:checked").each(function() {
            shopcount = shopcount + parseInt($(this).parent().parent().find(".car-number").val())
            money += parseInt($(this).parent().parent().find(".car-pr").html())
        })
        $(".car-bbnum").html(shopcount);
        $(".car-price").html(money);
        $(".nav-rs").html(shopcount);
        $(".nav-rp").html(money);
    }
    //点击复选框 结算
    $(".check").click(function() {
            jiesuan();
            jisuan();
        })
        //全选
    $(".qx").click(function() {
        $(".check").prop("checked", $(this).prop("checked"));
        $(".qx").prop("checked", $(this).prop("checked"));
        $(".pp").prop("checked", $(this).prop("checked"));
        jiesuan();
        jisuan();

    })
    $(".pp").click(function() {
            $(".check").prop("checked", $(this).prop("checked"));
            $(".qx").prop("checked", $(this).prop("checked"));
            jiesuan();
            jisuan();
        })
        //删除
    $(".car-bbshan").click(function() {
        var c = confirm("确定要删除吗？");
        if (c) {
            var id = $(this).parent().next().data("id");
            $(this).parent().parent().remove();
            for (var i in arr) {
                if (id == arr[i].id) {
                    arr.splice(i, 1);
                    localStorage.setItem("shoplist", JSON.stringify(arr));
                }
            }
            jiesuan();
            jisuan();
        }
    })
    $(".car-bbcshan").click(function() {
            var c = confirm("确定要全部删除吗？");
            if (c) {
                if ($(".qx").prop("checked")) {
                    $(this).parent().parent().parent().find(".car-bbc").remove();
                    arr.splice(0, arr.length);
                    removeCookie("shoplist");
                    jiesuan();
                    jisuan();
                }
            }
        })
        //加减操作
    $(".car-ji").click(function() {
            var sign = $(this).val();
            var id = $(this).parent().parent().find(".car-sp").data("id"); //获取当前要删除的商品编号

            //取出数量
            var num = $(this).parent().find(".car-number").val();
            if (sign == "-" && num == 1) {
                return;
            }
            for (var i in arr) {
                if (id == arr[i].id) {
                    sign == "+" ? arr[i].count++ : arr[i].count--;
                    localStorage.setItem("shoplist", JSON.stringify(arr));
                    $(this).parent().find(".car-number").val(arr[i].count);
                    $(this).parent().parent().find(".car-pr").html((arr[i].count * arr[i].price));
                }
            }
            jiesuan();
            jisuan();
        })
        //计算
    function jisuan() {
        var pr = 688 - $(".car-price").html();
        if (pr > 0) {
            $(".car-cc").html(`再购<span class="car-ccs">${pr}</span>元立享满688元免运费	<a href="/list" style="text-decoration: underline;">去凑单&gt;</a>`);
        } else {
            $(".car-cc").html(`免运费&ensp;&ensp;<a href="/list">再逛逛&gt;</a>`);
        }
    }
    $(".car-bbjie").click(function() {
        var crr = [];
        $(".check:checked").each(function() {
            var bjson = {
                id: $(this).parent().parent().find(".car-sp").data("id"),
                name: $(this).parent().parent().find(".car-sp").data("name"),
                src: $(this).parent().parent().find(".car-sp").data("src"),
                price: $(this).parent().parent().find(".car-sp").data("price"),
                color: $(this).parent().parent().find(".car-sp").data("color"),
                count: $(this).parent().parent().find(".car-number").val()
            }
            crr.push(bjson);
        })
        localStorage.setItem("shopli", JSON.stringify(crr));
        location.href = "/pay";
    })
})