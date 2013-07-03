db.system.js.save({_id:"RegisterSubmit",value:function(params){
		var C=constant();
		var mdata=_remove_mdata(params[C.MID]);
		if(mdata[C.CHECK_CODE][C.VALUE]===params[C.INSERT+C.OBJECT][C.CHECK_CODE]){
			var o=params[C.INSERT+C.OBJECT];
			o[C.ROLE_NAME]=C.REGISTER;
			_insert(C.USER,o);
			return {ok:true};
		}else{
			return {ok:false,err:"check code error"};
		}
		return op;
	}
})
