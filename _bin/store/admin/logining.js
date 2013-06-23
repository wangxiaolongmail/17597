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
	}else{
		var op={};
		op[C.IS+C.CHECK_CODE]=true;
	}
	op.ok=true;
	return op;
}})

