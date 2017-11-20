var flagName = "";
$("#uname").blur(function() {
    var reg = /^(1\d{10}|\w+[@]\w+(\.\w+)+)$/;
    var str = $(this).val();
    if (!reg.test(str)) {
        $("#login-s1").html("请输入正确的手机号或邮箱");
        flagName = false;
    } else {
        $("#login-s1").html("");
        flagName = true;
    }
})
var flagUpwd = "";
$("#upwd").blur(function() {
    var reg = /^.{6,20}$/;
    var str = $(this).val();
    if (!reg.test(str)) {
        $("#login-s2").html("密码格式输入有误，请输入6-20个字符");
        flagUpwd = false;
    } else {
        $("#login-s2").html("");
        flagUpwd = true;
    }
})
var flagQpwd = "";
$("#qpwd").blur(function() {
    var str = $(this).val();
    var str1 = $("#upwd").val();
    if (str != str1) {
        $("#login-s3").html("两次密码输入不一致，请重新输入");
        flagQpwd = false;
    } else {
        $("#login-s3").html("");
        flagQpwd = true;
    }
})

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkNum() {
    arr = [];
    for (var i = 0; i < 4; i++) {
        var code = rand(48, 122);
        if (code >= 58 && code <= 64 || code >= 91 && code <= 96) {
            i--;
        } else {
            arr[i] = String.fromCharCode(code);
        }
    }
    return arr.join("");
}
$("#sign-yan1").html(checkNum());
$("#sign-yan1").click(function() {
    $("#sign-yan1").html(checkNum());
})

var flagCheck = "";
$("#sign-yan").blur(function() {
    var str = $(this).val();
    var str1 = $("#sign-yan1").html();
    if (str != str1) {
        $("#login-s4").html("验证码错误，请重新输入");
        $("#sign-yan1").html(checkNum());
        flagCheck = false;
    } else {
        $("#login-s4").html("");
        flagCheck = true;
    }
})

$("#yan-btn").click(function() {
    $(this).val(checkNum());
})
var flagCheckP = "";
$("#sign-yan2").blur(function() {
    var str = $(this).val();
    var str1 = $("#yan-btn").val();
    if (str != str1) {
        $("#login-s5").html("验证码错误，请重新输入");
        flagCheckP = false;
    } else {
        $("#login-s5").html("");
        flagCheckP = true;
    }
})
$("#sign-btn").click(function() {
    if (flagName && flagUpwd && flagQpwd && flagCheck && flagCheckP) {
        ajax({
            url: "/sign/submit",
            type: "post",
            data: {
                username: $("#uname").val(),
                password: $("#upwd").val()
            },
            success: function(res) {
                alert(res);

                if (JSON.parse(res).err == 0) {
                    location.href = "/login";
                }
            }
        })

    }
})