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
 * 
 * @author wangxiaolongmail@163.com
 * 
 */

(function(){
	var data={},grid={};
	function createFrame(){
		var gridNode=$dr.create("div",{className:data.className},data.node);
		var thead=$dr.create("div",{className:"thead"},gridNode);
		$dr.each(data.schema,function(v,k){
			var tr=$dr.create("div",{className:"th",innerHTML:v.title},thead);
		});
	}
	function main(params){
		data=params;
		createFrame();
	}
	grid.main=main;
	window.$grid=grid;
})();