//存cookie
function setCookie(key,value,day){
	if(day){
		var now=new Date();
		now.setDate(now.getDate()+day);
		document.cookie=key+"="+value+";expires"+now;
	}else{
		document.cookie=key+"="+value;
	}
}

//取cookie
function getCookie(key){
	var str=document.cookie;
	if(str){
		var arr=str.split("; ");
		for( var i=0; i<arr.length; i++){
			var item=arr[i].split("=");
			if(item[0]==key){
				return JSON.parse(item[1]);
			}
		}
		//循环结束后 有cookie，但是没有key，返回一个空数组
		return[];
	}
	//如果没有cookie，也返回一个空数组
	return[];
}

//删除
function removeCookie(key){
	setCookie(key,"",-1);
}
