db.system.js.save({_id:"admin_List",value:function (params) {
	var C=constant();
	var params=params||{};
	var sess=_get_session(params);
	if(sess.ok){
		var result=_get_page(params);
		result.ok=true;
		result[C.MODULE_LIST]=sess[C.MODULE_LIST];
		result[C.R_MODULE_LIST]=sess[C.R_MODULE_LIST];
		result[C.CURRENT_MODULE]=sess[C.CURRENT_MODULE];
		var op={};
		op[C.ADD]=_get_url(C.EASYSOFT_ADMIN_FAVORITE_ADD);
		result[C.MODULE_URL]=op;
		return result;
	}else{
		return sess;
	}
}})
