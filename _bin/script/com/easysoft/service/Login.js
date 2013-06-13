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
dojo.import("com.easysoft.service.Index");
dojo.provide("com.easysoft.service.Login");
dojo.declare( "com.easysoft.service.Login" , "com.easysoft.service.Index" , {
	template_file:"login.html",
	postCreate:function(){
		var a=[],o={},op={},I18N=dojo.i18n,C=dojo.cst;
		var op=this.getbo();
		op[C.STORED_METHOD] ='login';
		this.exec(op);
    },

		
	postDraw:function(data){
		var a=[],
		I18N=dojo.i18n,
		C=dojo.cst;	
		var $ = this.getDom();
		
			a.push('<h3>'+I18N[C.SITE_NAME]+'</h3>');
			a.push('<label>'+I18N[C.USER_NAME]+':</label>');
			a.push('<input style="height:30px" class="span3" name="'+C.USER_NAME+'" type="text">');
			a.push('<label>'+I18N[C.PASSWORD]+':</label>');
			a.push('<input style="height:30px" class="span3" name="'+C.PASSWORD+'" type="password">');
			var url=data[C.MODULE_URL];
			$("form").attr("action",url).html(a.join("\n"));
		var s=$.html();
		var a=[];
		a.push("<script type='text/javascript'>");
		a.push('var node=$("input[name=\''+C.USER_NAME+'\']");');
		a.push('node.bind("focus",function(){');
			a.push('$("form").append("<label>'+I18N[C.CHECK_CODE]+':</label>")');
			a.push('$("form").append("<input style=\'height:30px\' class=\'span3\' name=\''+C.CHECK_CODE+'\'  type=\'text\' >")');
			a.push('$("form").append("<img src=\''+data[C.EASYSOFT_CHECK_CODE]+'\' />")');
			a.push('$("form").append("<button type=\'submit\' class=\'btn btn-primary\'>'+I18N[C.OK]+'</button>")');
			a.push('node.unbind("focus");');
		a.push('});');
		a.push("</script>");
		s=s+a.join("\n");
		return s;
	}
});
