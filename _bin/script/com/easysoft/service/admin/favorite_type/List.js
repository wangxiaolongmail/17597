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
dojo.provide("com.easysoft.service.admin.favorite_type.List");
dojo.declare( "com.easysoft.service.admin.favorite_type.List" , "com.easysoft.service.admin.favorite.List" , {
		template_file:"favorite_list.html",
        postCreate:function(){
			var a=[],o={},op={},C=dojo.C;
			var op=this.getsbo();
			op["page"] =this.queryString.page;
			op["category"] =this.queryString.category;
			op[C.TABLE_NAME] ='favorite_type';
			op[C.STORED_METHOD] ='admin_favorite_type_List';
			this.exec(op);
        },

		postDraw:function(data){
			
			var a=[],o={},I18N=dojo.I18N,C=dojo.C;
			var $ = this.getDom();
			$("#left_bar").remove();
			$("#right_bar").removeClass("span9").addClass("span12");
			
			$("#list1").html(this.drawTable(data));
			
			$("#pager").html(this.drawPage(data));
			
			
			$(".nav-collapse").html(this.drawMainMenu(data));
			
			
			$("#select01").html("");

			$("h4").html(data.tablename);

			
			$(".btn-group").html(this.drawButton(data));
			
			var s=$.html();
			s=s.replace("/*script_body_replace*/",this.drawSelectTypeScript(data));
			return s;
		}

});
