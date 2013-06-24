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
dojo.import("com.easysoft.service.Login");
dojo.provide("com.easysoft.service.Logining");
dojo.declare( "com.easysoft.service.Logining" , "com.easysoft.service.Login" , {
	postCreate:function(){
		var a=[],op={};
		var op=this.getbo();
		op[C.ROLE_NAME] =this.role_name;
		op[C.USER_NAME] = this.queryForm[C.USER_NAME];
		op[C.PASSWORD] =dojo.md5(this.queryForm[C.PASSWORD]);
		op[C.STORED_METHOD] ='logining';
		this.exec(op);
	},
	postDraw:function(data){
		///easysoft/loginingCheckCode
if(data[C.IS+C.CHECK_CODE]){
console.log("2");
		this.redirect("/easysoft/loginingCheckCode");

}else{
console.log("1");
		var a=[],op={};
		var a=this.getMenuList(data)[dojo.C.LEFT];
		if(a.length>0){
			var url=a[0][C.MODULE_URL];
			this.redirect(url+"?sid="+data.sid);
			dojo.sendMail({title:data[C.USER_NAME]+" loging system successful"});
		}else{
console.log("3");

			this._findNotFile();
		}
}
/*
		var a=[],op={};
		var a=this.getMenuList(data)[dojo.C.LEFT];
		if(a.length>0){
			var url=a[0][C.MODULE_URL];
			this.redirect(url+"?sid="+data.sid);
			dojo.sendMail({title:data[C.USER_NAME]+" loging system successful"});
		}else{
			this._findNotFile();
		}
*/
	}
});
