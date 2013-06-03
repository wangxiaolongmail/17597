db.system.js.save({_id:"checkLogining",value:function (params) {
	var C=constant();
	delete params[C.STORED_METHOD];
	obj=params;
	var result =db.user.findOne(obj);
	if (result) {
		var loginTime=(new Date()).getTime();
		var id=ObjectId();
		var o={_id:id,loginTime:loginTime,updateTime:loginTime};
		o[C.USER_NAME]=obj[C.USER_NAME];
		db.session.insert(o);
		var o={ok:true,id:id.valueOf()};
		o[C.USER_NAME]=obj[C.USER_NAME];
		return o;
	}else{
		return {ok:false,err:"user or password error"};
	}
}})

