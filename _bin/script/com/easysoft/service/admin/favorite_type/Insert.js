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
dojo.provide("com.easysoft.service.admin.favorite_type.Insert");
dojo.declare( "com.easysoft.service.admin.favorite_type.Insert" , "com.easysoft.service.admin.favorite_type.Add" , {
        postCreate:function(){
			var a=[],o={},op={};
			var op=this.getsbo();
			var obj={};
			var a=SCHEMA[this.table_name][C.LIST];
			dojo.each(a,function(k,v,i){
				var field=v[C.FIELD];
				var type=v[C.TYPE];
				if(field!=C._ID){
					if(type==C.INT){
						obj[field]= parseInt(this.queryForm[field]);
					}else{
						obj[field]= this.queryForm[field];
					}
				}
			},this);
			op[C.INSERT+C.OBJECT] =obj;
			op[C.TABLE_NAME] =this.table_name;
			op[C.STORED_METHOD] ='admin_Insert';
			this.exec(op);
        },
	postDraw:function(data){
			if(data[C.IS_DICT]){
				dojo.mixin(DICT,data[C.DICT]);
			}
			var a=[],o={};
			var $ = this.getDom();
			$(".nav-collapse").html(this.drawMainMenu(data));
			
			$("#apbody").html("hello");
			
			var s=$.html();
			return s;
		}
});
