db.system.js.save({_id:"logining",value:function (params) {
	var C=constant();
	var op={};
	op[C.USER_NAME]=params[C.USER_NAME];
	op[C.USER_AGENT]=params[C.USER_AGENT];
	op[C.PASSWORD]=params[C.PASSWORD];
	op[C.REMOTE_ADDRESS]=params[C.REMOTE_ADDRESS];
	var obj=db.session.findOne(op);
	if(obj){
		var op={};
		op[C.IS+C.CHECK_CODE]=false;
		var _id=ObjectId();
		obj["sid"]=_id.valueOf();
		obj[C.LOGIN_TIME]=(new Date()).getTime();
		obj[C.UPDATE_TIME]=obj[C.LOGIN_TIME];
		obj[C.IS_OPEN]=true;
		obj[C.IS_TIMEOUT]=false;
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

