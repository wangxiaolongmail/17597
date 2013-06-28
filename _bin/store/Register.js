db.system.js.save({_id:"Register",value:function(params){
		var C=constant();
		var a=[];
		var result={
		  ok:true,
		  list:a
		};
		result[C.CURRENT_MODULE]=C.EASYSOFT+C.INDEX;
		result[C.URL+C.GO]=_get_url(C.EASYSOFT+C.GO);
		return result;
	}
})


