db.system.js.save({_id:"Logining2",value:function (params) {
	var C=constant();
	var mdata=_remove_mdata(params[C.MID]);
	if(mdata[C.CHECK_CODE][C.VALUE]===params[C.CHECK_CODE]){
		var op={};
		op[C.USER_NAME]=mdata[C.USER_NAME];
		op[C.PASSWORD]=mdata[C.PASSWORD];
		var rs =db.user.findOne(op);
		if (rs) {
			var o=_update_session();
			_mixin(o,params);
			_mixin(o,mdata);
			o[C._ID]=mdata[C.USER_NAME];
			o[C.ROLE_NAME]=rs[C.ROLE_NAME];
			db.session.save(o);
			o.ok=true;
			delete params[C.ROLE_NAME];
			return o;
		}else{
			return {ok:false,err:"user or password error"};
		}
	}else{
		return {ok:false,err:"check code error"};
	}
}})



