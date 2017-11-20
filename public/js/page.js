	//alert(location.href)
	function lxfEndtime() {
	    $(".lxftime").each(function() {
	        var lxfday = $(this).attr("lxfday"); //用来判断是否显示天数的变量
	        var endtime = new Date($(this).attr("endtime")).getTime(); //取结束日期(毫秒值)
	        var nowtime = new Date().getTime(); //今天的日期(毫秒值)
	        var youtime = endtime - nowtime; //还有多久(毫秒值)
	        var seconds = youtime / 1000;
	        var minutes = Math.floor(seconds / 60);
	        var hours = Math.floor(minutes / 60);
	        var days = Math.floor(hours / 24);
	        var CDay = days;
	        var CHour = hours % 24;
	        var CMinute = minutes % 60;
	        var CSecond = Math.floor(seconds % 60); //"%"是取余运算，可以理解为60进一后取余数，然后只要余数。
	        if (endtime <= nowtime) {
	            $(this).html("已过期") //如果结束日期小于当前日期就提示过期啦
	        } else {
	            if (days == 0) {
	                $(this).html(CHour + "<span>时</span>" + CMinute + "<span>分</span>" + CSecond + "<span>秒</span>"); //输出没有天数的数据
	            } else {
	                $(this).html(days + "<span>天</span>" + CHour + "<span>时</span>" + CMinute + "<span>分</span>" + CSecond + "<span>秒</span>"); //输出有天数的数据
	            }
	        }
	    });
	    setTimeout("lxfEndtime()", 1000);
	};
	window.onload = function() {

	}
	$(".shop-jian").click(function() {
	    var num = Number($(".shop-number").val());
	    if (num == 1) {
	        $(".shop-number").val(1);
	    } else {
	        $(".shop-number").val(num - 1);
	    }
	})
	$(".shop-jia").click(function() {
	    var num = Number($(".shop-number").val());
	    $(".shop-number").val(num + 1);
	})
	$(".shop-mlb").on("click", "li", function() {
	    $(".shop-tul").find("img").eq($(this).index()).show().siblings().hide();
	    //$(".shop-tu").attr("src",$(this).find("img").attr("src"));
	})
	var index = 0;
	$(".shop-l").click(function() {
	    index--;
	    if (index <= 0) {
	        index = 0;
	    }
	    $(".shop-tul").find("img").eq(index).show().siblings().hide();
	})
	$(".shop-r").click(function() {
	    index++;
	    if (index >= 2) {
	        index = 2;
	    }
	    $(".shop-tul").find("img").eq(index).show().siblings().hide();
	})
	$(".shop-mai").click(function() {
	    var shopcount = $(".shop-number").val();
	    var brr = [];
	    var ajson = {
	        id: $(this).prev().data("id"),
	        name: $(this).prev().data("name"),
	        src: $(this).prev().data("src"),
	        price: $(this).prev().data("price"),
	        color: $(this).prev().data("color"),
	        count: shopcount
	    }
	    brr.push(ajson);
	    localStorage.setItem("shopli", JSON.stringify(brr));
	    location.href = "/pay";
	})
	var st = "";
	var flag = false;
	$(".shop-gou").click(function() {
	        var shopcount = $(".shop-number").val();
	        var arr = [];
	        var flag = true; //可以向数组中添加数据
	        var _json = {
	                id: $(this).next().data("id"),
	                name: $(this).next().data("name"),
	                src: $(this).next().data("src"),
	                price: $(this).next().data("price"),
	                price: $(this).next().data("price"),
	                color: $(this).next().data("color"),
	                count: shopcount
	            }
	            //当再次点击按钮时，cookie信息被覆盖  解决 ： 先取出cookie数据 存入到数组中，然后在把新增的商品存入到数组中
	        var cookieInfo = localStorage.getItem('shoplist') ? JSON.parse(localStorage.getItem('shoplist')) : [];
	        if (cookieInfo.length != 0) { //表示cookie中有数据
	            arr = cookieInfo;
	            //点击相同商品时，需要做商品数量的累加    用当前点击的商品编号id   和  取出来的cookie的 数据中商品id做比较 发现有相等的，count++
	            for (var i in arr) {
	                if (_json.id == arr[i].id) {
	                    arr[i].count = Number(arr[i].count) + Number(shopcount);
	                    flag = false;
	                    break;
	                }
	            }

	        }


	        if (flag) {
	            arr.push(_json);
	        }

	        localStorage.setItem("shoplist", JSON.stringify(arr));

	        st = `<div class="nav-cd">`;

	        var sum = "";
	        var count = "";
	        for (var i in arr) {
	            st += `<div class="nav-cdt">
				<img src="images/${arr[i].src}"  />
				<div class="nav-cdtr">
					<p class="nav-cdtrn">${arr[i].name}</p>
					<p class="nav-cdtry">${arr[i].color}</p>
					<span class="nav-cdtrnum">${arr[i].count}</span>×
					<span class="nav-cdtrpri">${arr[i].price}</span>
					<span data-id=${arr[i].id}  data-name=${arr[i].name} data-src=${arr[i].src} data-color=${arr[i].color} data-price=${arr[i].price}   style="display:none" class="nav-s"></span>
					<a class="nav-cshan">删除</a>
				</div>
			</div>`;
	            count = Number(count) + Number(arr[i].count);
	            sum = Number(sum + arr[i].count * arr[i].price);
	        }
	        st += `<p class="nav-cdc">购物袋小计：￥<span class="nav-carsum">${sum}</span></p>
			<div class="nav-cdd">
				<input type="button" value="结算" class="nav-carjie" />	
			</div>
		</div>`;
	        $(".nav-car").html(st)
	        $(".nav-rs").html(count);
	        $(".nav-rp").html(sum);
	        //console.log( document.cookie );
	        $(".nav-car").show();
	        var _arr = localStorage.getItem('shoplist') ? JSON.parse(localStorage.getItem('shoplist')) : [];
	        $(".nav-carjie").click(function() {
	            var crr = [];
	            $(".nav-cdt").each(function() {
	                var bjson = {
	                    id: $(this).parent().parent().find(".nav-s").eq($(this).index()).data("id"),
	                    name: $(this).parent().parent().find(".nav-s").eq($(this).index()).data("name"),
	                    src: $(this).parent().parent().find(".nav-s").eq($(this).index()).data("src"),
	                    price: $(this).parent().parent().find(".nav-s").eq($(this).index()).data("price"),
	                    color: $(this).parent().parent().find(".nav-s").eq($(this).index()).data("color"),
	                    count: $(this).parent().parent().find(".nav-cdtrnum").eq($(this).index()).html()
	                }
	                crr.push(bjson);
	            })

	            localStorage.setItem("shopli", JSON.stringify(crr));
	            location.href = "/pay";
	        })
	        $(".nav-cshan").click(function() {

	            var c = confirm("确定要删除吗？")
	            if (c) {
	                $(this).parent().parent().remove();
	                var id = $(this).prev().data("id");
	                $(".nav-rs").html(count);
	                $(".nav-rp").html(sum);

	                for (var i in _arr) {
	                    if (id == _arr[i].id) {
	                        _arr.splice(i, 1);
	                        if (_arr.length == 0) {
	                            $(".nav-car").html(`<p class="nav-cp">购物袋暂无商品</p>`);
	                            $(".nav-rs").html(0);
	                            $(".nav-rp").html(0);
	                        }
	                        localStorage.setItem("shoplist", JSON.stringify(_arr));

	                    }
	                }

	            }
	        })

	    })
	    //     window.onload = function() {
	    //         var str = location.href;
	    //         var arr = str.split("?")[1];
	    //         var id = arr.split("=")[1];
	    //         var data = {
	    //             arr: [],
	    //             zhe: ""
	    //         }
	    //         ajaxGet("json/data.json", function(res) {
	    //             var arr = JSON.parse(res).list;
	    //             for (var i in arr) {
	    //                 if (id == arr[i].id) {
	    //                     data.arr = arr[i];
	    //                 }
	    //             }
	    //             var zhe = ((data.arr.price / data.arr.yuan) * 10).toFixed(1);
	    //             data.zhe = zhe;
	    //             var html = template("list", data);
	    //             $(".shop").html(html);
	    //             var str = template("bottom", data);
	    //             $(".shop-xiang").html(str);

	//         $(".shop-jian").click(function() {
	//             var num = Number($(".shop-number").val());
	//             if (num == 1) {
	//                 $(".shop-number").val(1);
	//             } else {
	//                 $(".shop-number").val(num - 1);
	//             }
	//         })
	//         $(".shop-jia").click(function() {
	//             var num = Number($(".shop-number").val());
	//             $(".shop-number").val(num + 1);
	//         })
	//         $(".shop-mlb").on("click", "li", function() {
	//             $(".shop-tul").find("img").eq($(this).index()).show().siblings().hide();
	//             //$(".shop-tu").attr("src",$(this).find("img").attr("src"));
	//         })
	//         var index = 0;
	//         $(".shop-l").click(function() {
	//             index--;
	//             if (index <= 0) {
	//                 index = 0;
	//             }
	//             $(".shop-tul").find("img").eq(index).show().siblings().hide();
	//         })
	//         $(".shop-r").click(function() {
	//             index++;
	//             if (index >= 2) {
	//                 index = 2;
	//             }
	//             $(".shop-tul").find("img").eq(index).show().siblings().hide();
	//         })
	//         $(".shop-mai").click(function() {
	//             var shopcount = $(".shop-number").val();
	//             var brr = [];
	//             var ajson = {
	//                 id: $(this).prev().data("id"),
	//                 name: $(this).prev().data("name"),
	//                 src: $(this).prev().data("src"),
	//                 price: $(this).prev().data("price"),
	//                 color: $(this).prev().data("color"),
	//                 count: shopcount
	//             }
	//             brr.push(ajson);
	//             localStorage.setItem("shopli", JSON.stringify(brr));
	//             location.href = "/pay";
	//         })
	//         var st = "";
	//         var flag = false;
	//         $(".shop-gou").click(function() {

	//             var shopcount = $(".shop-number").val();
	//             var arr = [];
	//             var flag = true; //可以向数组中添加数据
	//             var _json = {
	//                     id: $(this).next().data("id"),
	//                     name: $(this).next().data("name"),
	//                     src: $(this).next().data("src"),
	//                     price: $(this).next().data("price"),
	//                     price: $(this).next().data("price"),
	//                     color: $(this).next().data("color"),
	//                     count: shopcount
	//                 }
	//                 //当再次点击按钮时，cookie信息被覆盖  解决 ： 先取出cookie数据 存入到数组中，然后在把新增的商品存入到数组中
	//             var cookieInfo = localStorage.getItem('shoplist') ? JSON.parse(localStorage.getItem('shoplist')) : [];
	//             if (cookieInfo.length != 0) { //表示cookie中有数据
	//                 arr = cookieInfo;
	//                 //点击相同商品时，需要做商品数量的累加    用当前点击的商品编号id   和  取出来的cookie的 数据中商品id做比较 发现有相等的，count++
	//                 for (var i in arr) {
	//                     if (_json.id == arr[i].id) {
	//                         arr[i].count = Number(arr[i].count) + Number(shopcount);
	//                         flag = false;
	//                         break;
	//                     }
	//                 }

	//             }


	//             if (flag) {
	//                 arr.push(_json);
	//             }

	//             localStorage.setItem("shoplist", JSON.stringify(arr));

	//             st = `<div class="nav-cd">`;

	//             var sum = "";
	//             var count = "";
	//             for (var i in arr) {
	//                 st += `<div class="nav-cdt">
	// 						<img src="images/${arr[i].src}"  />
	// 						<div class="nav-cdtr">
	// 							<p class="nav-cdtrn">${arr[i].name}</p>
	// 							<p class="nav-cdtry">${arr[i].color}</p>
	// 							<span class="nav-cdtrnum">${arr[i].count}</span>×
	// 							<span class="nav-cdtrpri">${arr[i].price}</span>
	// 							<span data-id=${arr[i].id}  data-name=${arr[i].name} data-src=${arr[i].src} data-color=${arr[i].color} data-price=${arr[i].price}   style="display:none" class="nav-s"></span>
	// 							<a class="nav-cshan">删除</a>
	// 						</div>
	// 					</div>`;
	//                 count = Number(count) + Number(arr[i].count);
	//                 sum = Number(sum + arr[i].count * arr[i].price);
	//             }
	//             st += `<p class="nav-cdc">购物袋小计：￥<span class="nav-carsum">${sum}</span></p>
	// 					<div class="nav-cdd">
	// 						<input type="button" value="结算" class="nav-carjie" />	
	// 					</div>
	// 				</div>`;
	//             $(".nav-car").html(st)
	//             $(".nav-rs").html(count);
	//             $(".nav-rp").html(sum);
	//             //console.log( document.cookie );
	//             $(".nav-car").show();
	//             var _arr = localStorage.getItem('shoplist') ? JSON.parse(localStorage.getItem('shoplist')) : [];
	//             $(".nav-carjie").click(function() {
	//                 var crr = [];
	//                 $(".nav-cdt").each(function() {
	//                     var bjson = {
	//                         id: $(this).parent().parent().find(".nav-s").eq($(this).index()).data("id"),
	//                         name: $(this).parent().parent().find(".nav-s").eq($(this).index()).data("name"),
	//                         src: $(this).parent().parent().find(".nav-s").eq($(this).index()).data("src"),
	//                         price: $(this).parent().parent().find(".nav-s").eq($(this).index()).data("price"),
	//                         color: $(this).parent().parent().find(".nav-s").eq($(this).index()).data("color"),
	//                         count: $(this).parent().parent().find(".nav-cdtrnum").eq($(this).index()).html()
	//                     }
	//                     crr.push(bjson);
	//                 })

	//                 localStorage.setItem("shopli", JSON.stringify(crr));
	//                 location.href = "/pay";
	//             })
	//             $(".nav-cshan").click(function() {

	//                 var c = confirm("确定要删除吗？")
	//                 if (c) {
	//                     $(this).parent().parent().remove();
	//                     var id = $(this).prev().data("id");
	//                     $(".nav-rs").html(count);
	//                     $(".nav-rp").html(sum);

	//                     for (var i in _arr) {
	//                         if (id == _arr[i].id) {
	//                             _arr.splice(i, 1);
	//                             if (_arr.length == 0) {
	//                                 $(".nav-car").html(`<p class="nav-cp">购物袋暂无商品</p>`);
	//                                 $(".nav-rs").html(0);
	//                                 $(".nav-rp").html(0);
	//                             }
	//                             localStorage.setItem("shoplist", JSON.stringify(_arr));

	//                         }
	//                     }

	//                 }
	//             })

	//         })
	//     })
	// }

	$(function() {
	    lxfEndtime(); //倒计时

	})