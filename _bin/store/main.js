db.system.js.save({_id:"main",value:function (params) {
	var C=constant();
	var result;
	switch(params[C.STORED_METHOD]) 
	{   
		 case "get_view_favorite":   
				result=get_view_favorite(params);   
				break;  
		 case "admin_Index":   
				result=admin_Index(params);   
				break;
		 case "admin_favorite_List":   
				result=admin_favorite_List(params);   
				break;
		 case "checkLogining":   
				result=checkLogining(params);   
				break;
		 case "logout":   
				result=logout(params);   
				break;
		 default:  
				result={ok:false,err:C.STORED_METHOD+" is undefined"};    
	}
	return result;
}})

