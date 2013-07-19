;(function(){
	dojo.domainParseUrl=function(url){
		if(url.indexOf("/wz/")==0){
			var a=url.split("/");
			s="/wz?i="+a[2];
			url=s;
		}
		if(url.indexOf("/go/")==0){
			var a=url.split("/");
			if(a.length>3){
				s="/go?i="+a[2]+"&ti="+a[3];
			}else{
				s="/go?i="+a[2];
			}
			url=s;
		}
		return url;
	};
	dojo.route={
		dynamicServletMapping:[],
		staticServletMapping:[],
		noBufferList:[
			"/wy/\.\+.\.\+",
			"/svg/\.\+.\.\+"
		]
	};
	
})();
