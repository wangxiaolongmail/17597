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
dojo.provide("com.easysoft.service.admin.favorite.Save");
dojo.declare( "com.easysoft.service.admin.favorite.Save" , "com.easysoft.service.admin.favorite.Add" , {
        postCreate:function(){
			var a=[],o={},op={},C=dojo.C;
			var op=this.getsbo();
			var obj={};
			var a=dojo[C.METADATA][this.table_name];
			dojo.each(a,function(k,v,i){
				var field=v[C.FIELD];
				if(field!=C._ID){
					obj[field]= this.queryForm[field];
				}
			},this);
			console.log(obj);
			op[C.INSERT_OBJ] =obj;
			op[C.TABLE_NAME] =this.table_name;
			op[C.CAT_TABLE_NAME] =C.FAVORITE_TYPE;
			op[C.STORED_METHOD] ='admin_Save';
			this.exec(op);
        },
		postDraw:function(data){
			var a=[],o={},I18N=dojo.I18N,C=dojo.C;
			var $ = this.getDom();
			$(".nav-collapse").html(this.drawMainMenu(data));
			
			$("#apbody").html("hello");
			
			var s=$.html();
			return s;
		}
});
