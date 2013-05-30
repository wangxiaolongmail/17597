db.system.js.save({_id:"stored_manager",value:function (params) {
	switch(params.stored_method) 
	{   
		 case "admin_get_favorite":   
				 return admin_get_favorite(params);   
				break;
		 default:  
				 return {ok:false,err:"stored_method error"};    
	}  
}})
