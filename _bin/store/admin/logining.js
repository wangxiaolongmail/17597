db.system.js.save({_id:"logining",value:function (params) {
	var C=constant();
	var mdata=_get_mdata(params.mid);
	if(mdata[C.CHECK_CODE]===params[C.CHECK_CODE]){
		var op={};
		op[C.USER_NAME]=params[C.USER_NAME];
		op[C.PASSWORD]=params[C.PASSWORD];
		var rs =db.user.findOne(op);
		if (rs) {
			var a=_get_module_list(rs[C.ROLE_NAME]);
			if(a.length>0){
				var o={};
				var _id=ObjectId();
				o["_id"]=_id;
				o["sid"]=_id.valueOf();
				o[C.LOGIN_TIME]=(new Date()).getTime();
				o[C.UPDATE_TIME]=o[C.LOGIN_TIME];
				o[C.MODULE_LIST]=a;
				var op={};
				op[C.MODULE_NAME]=C.LOGOUT;
				op[C.MODULE_URL]=_get_url(C.LOGOUT);
				o[C.R_MODULE_LIST]=[op];
				o[C.IS_OPEN]=true;
				o[C.IS_TIMEOUT]=false;
				for (var key in params) { 
					if (params.hasOwnProperty(key)) { 
						o[key]=params[key];
					} 
				} 
				delete o[C.PASSWORD];
				delete o[C.STORED_METHOD];
				db.session.insert(o);
				o.ok=true;
				return o;
			}else{
				return {ok:false,err:"system module error"};
			}
		}else{
			return {ok:false,err:"user or password error"};
		}
	}else{
		return {ok:false,err:"check code error"};
	}
}})
