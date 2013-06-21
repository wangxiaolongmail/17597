db.system.js.save({_id:"logining",value:function (params) {
	var C=constant();
	var mdata=_remove_mdata(params.mid);
	if(mdata[C.CHECK_CODE]===params[C.CHECK_CODE]){
		var op={};
		op[C.USER_NAME]=params[C.USER_NAME];
		op[C.PASSWORD]=params[C.PASSWORD];
		var rs =db.user.findOne(op);
		if (rs) {
			var o={};
			var _id=ObjectId();
			o["_id"]=params[C.USER_NAME];
			o["sid"]=_id.valueOf();
			o[C.LOGIN_TIME]=(new Date()).getTime();
			o[C.UPDATE_TIME]=o[C.LOGIN_TIME];
			o[C.IS_OPEN]=true;
			o[C.IS_TIMEOUT]=false;
			o[C.ROLE_NAME]=rs[C.ROLE_NAME];
			_mixin(o,params);
			db.session.save(o);
			o.ok=true;
			return o;
		}else{
			return {ok:false,err:"user or password error"};
		}
	}else{
		return {ok:false,err:"check code error"};
	}
}})

