db.system.js.save({_id:"admin_Add",value:function (params) {
	var C=constant();
	var params=params||{};
	var sess=_get_session(params);
	if(sess.ok){
		var result={};
		result.ok=true;
		result[C.MODULE_LIST]=sess[C.MODULE_LIST];
		result[C.R_MODULE_LIST]=sess[C.R_MODULE_LIST];
		result[C.CURRENT_MODULE]=sess[C.CURRENT_MODULE];
		return result;
	}else{
		return sess;
	}
}})