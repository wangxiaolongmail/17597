/*
 *+--------------------------------------------------------------------------+
 *| Licensed Materials - Property of EasySoft 								 |
 *| (c) Copyright EasySoft Corporation 2011. All Rights Reserved. 			 |
 *| 																		 |
 *|  |
 *|  |
 *+--------------------------------------------------------------------------+
 */
/**
 * Index widget.
 * 
 * @author wxlwang
 */
dojo.provide("com.easysoft.service.admin.clearPageBuffer");
dojo.declare( "com.easysoft.service.admin.clearPageBuffer" , "com.easysoft.service.Service" , {
	create:function(){
		var isClear=0;
		var path=this.queryString.path;
		var o=dojo.getObject(path,false,dojo.mBuffer,"/");
		if(o){
			var obj=dojo.mpto(o[$c.c_mobject][$c.c_cache],[$c.c_article_title]);
			if(obj){
				var path=obj[$c.c_article_title];
				var ooo=dojo.getObject(path,false,dojo.mBuffer);
				if(ooo){
					if(path){
						dojo.setObject(path,"",dojo.mBuffer);
						isClear=1;
					}
				}
			}
		}
		this.template=isClear+"";
		var o = dojo.atm([$c.c_cache,this.template,$c.c_Last_Modified,dojo.getTimestamp()]);
		this.dog.echoLast(o);
	}
});