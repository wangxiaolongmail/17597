db.system.js.save({_id:"Register",value:function(params){
		var C=constant();
		var op={};
		var o={};
		o[C.CHECK_CODE]=_create_check_code();
		op[C.MID]=_push_mdata(o);
		op.ok=true;
		return op;
	}
})


