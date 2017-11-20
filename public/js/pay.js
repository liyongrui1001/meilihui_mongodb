var provArr = ["河南省", "上海市"];
var cityArr = [
    ["郑州市", "濮阳市"],
    ["浦东区", "宝山区"]
];
var countryArr = [
    [
        ["金水区", "二七区"],
        ["濮阳县", "华龙区"]
    ],
    [
        ["高桥镇", "陆家嘴街道"],
        ["罗店镇", "大场镇"]
    ]
];
$(function() {
    //地址三级联动
    for (var i = 0; i < provArr.length; i++) {
        $(".prov").append("<option value=" + provArr[i] + "_" + i + ">" + provArr[i] + "</option>");
    }
    $(".prov").change(function() {
        $(".city")[0].length = 1;
        var str = $(this).val();
        var index = str.split("_")[1];
        if (str == "") {
            return;
        }
        var _cityArr = cityArr[index];
        for (var i = 0; i < _cityArr.length; i++) {
            $(".city").append("<option value=" + _cityArr[i] + "_" + index + "_" + i + ">" + _cityArr[i] + "</option>");
        }
    })
    $(".city").change(function() {
        $(".country")[0].length = 1;
        var str = $(this).val();
        var provIndex = str.split("_")[1];
        var cityIndex = str.split("_")[2];
        if (str == "") {
            return;
        }
        var _countryArr = countryArr[provIndex][cityIndex];
        for (var i = 0; i < _countryArr.length; i++) {
            $(".country").append("<option value=" + _countryArr[i] + ">" + _countryArr[i] + "</option>");
        }
    })
    $(".pay-ti").click(function() {
        var prov = $(".prov").val().split("_")[0];
        var city = $(".city").val().split("_")[0];
        var country = $(".country").val();
        var arr = [];
        var _json = {
            "name": $(".name").val(),
            "phone": $(".phone").val(),
            "prov": prov,
            "city": city,
            "country": country,
            "add": $(".add-xiang").val(),
            "you": $(".add-you").val()
        }
        arr.push(_json);
        localStorage.setItem("add", JSON.stringify(arr));
        $(".add").html(`<div class="addres">
					<div class="add-top">
						<p>默认地址</p>
						<p><a>编辑</a><span>×</span></p>
					</div>
					<p><span class="add-name">${$(".name").val()}</span>&ensp;<span class="add-ph">${$(".phone").val()}</span></p>
					<p><span class="add-prov">${prov}</span>&ensp;<span class="add-city">${city}</span>&ensp;<span class="add-country">${country}</span>&ensp;<span class="add-add">${$(".add-xiang").val()}</span></p>
					<p class="add-num">${$(".add-you").val()}</p>
					<p style="text-align: right;"><input type="checkbox" checked /></p>
				</div>
				<span class="add-new">使用新地址</span>`);
    })

    //判断地址是否已经设置过
    var addArr = localStorage.getItem('add') ? JSON.parse(localStorage.getItem('add')) : [];
    if (addArr.length != 0) {
        $(".add").html(`<div class="addres">
					<div class="add-top">
						<p>默认地址</p>
						<p><a>编辑</a><span>×</span></p>
					</div>
					<p><span class="add-name">${addArr[0].name}</span>&ensp;<span class="add-ph">${addArr[0].phone}</span></p>
					<p><span class="add-prov">${addArr[0].prov}</span>&ensp;<span class="add-city">${addArr[0].city}</span>&ensp;<span class="add-country">${addArr[0].country}</span>&ensp;<span class="add-add">${addArr[0].add}</span></p>
					<p class="add-num">${addArr[0].you}</p>
					<p style="text-align: right;"><input type="checkbox" checked /></p>
				</div>
				<span class="add-new">使用新地址</span>`);
    }

    //加载购物清单
    var arr = localStorage.getItem('shopli') ? JSON.parse(localStorage.getItem('shopli')) : [];
    var str = "";
    for (var i in arr) {
        str += `<div class="pay-shop">
				<div class="pay-shopl">
					<img src="images/${arr[i].src}" style="width: 60px; height: 80px;" />
					<div class="pay-shoplr">
						<p style="font-weight: bold;">LA CHANSON</p>
						<p class="pay-shopn">${arr[i].name}</p>
						<p class="pay-shopc">${arr[i].color}</p>
					</div>
				</div>
				<p class="pay-shopd">${arr[i].price}</p>
				<p class="pay-shops">${arr[i].count}</p>
				<p class="pay-shopy">0.00</p>
				<p class="pay-shopx">${arr[i].count*arr[i].price}</p>
			</div>`;
    }
    $(".pay-s").html(str);
    var num = "";
    $(".pay-shopx").each(function() {
        num = Number(num) + Number($(this).html());
    })
    $(".pay-num").html(num);
    if (num >= 688) {
        $(".pay-yun").html(0);
    }
    var sum = Number($(".pay-num").html()) + Number($(".pay-yun").html());
    $(".pay-sum").html(`￥${sum}.00`);
    /*$.ajax({
    	type:"get",
    	url:"json/data.json",
    	success:function(res){
    	
    	}
    });*/
    $(".pay-btn").click(function() {
        localStorage.setItem("money", JSON.stringify($(".pay-sum").html()));
        location.href = "/payment";
    })
    var now = new Date();
    var day = now.getDate();
    $(".pay-date").html(day + 3);
})