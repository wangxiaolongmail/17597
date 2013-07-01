db.system.js.save({_id:"RegisterSubmit",value:function(params){
		var C=constant();
		var mdata=_remove_mdata(params[C.MID]);
		if(mdata[C.CHECK_CODE][C.VALUE]===params[C.INSERT+C.OBJECT][C.CHECK_CODE]){
			_insert(C.USER,params[C.INSERT+C.OBJECT]);
			return {ok:true};
		}else{
			return {ok:false,err:"check code error"};
		}
		return op;
	}
})
