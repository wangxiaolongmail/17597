db.system.js.save({_id:"Login",value:function (params) {
	var C=constant();
	var op={};
	op[C.USER_NAME]=params[C.USER_NAME];
	op[C.USER+C.AGENT]=params[C.USER+C.AGENT];
	op[C.PASSWORD]=params[C.PASSWORD];
	op[C.REMOTE+C.ADDRESS]=params[C.REMOTE+C.ADDRESS];
	var obj=db.session.findOne(op);
	if(obj){
		var op={};
		op[C.IS+C.CHECK_CODE]=false;
		_update_session(obj);
		db.session.save(obj);
		_mixin(op,obj);
		delete params[C.ROLE_NAME];
	}else{
		var op={};
		op[C.IS+C.CHECK_CODE]=true;
		var o={};
		o[C.USER_NAME]=params[C.USER_NAME];
		o[C.PASSWORD]=params[C.PASSWORD];
		o[C.CHECK_CODE]=_create_check_code();
		op[C.MID]=_push_mdata(o);
	}
	op.ok=true;
	return op;
}})

