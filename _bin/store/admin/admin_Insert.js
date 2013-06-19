db.system.js.save({_id:"admin_Insert",value:function (params) {
	var C=constant();
	var params=params||{};
	var sess=_get_session(params);
	if(sess.ok){
		var result={};
		result.ok=true;
		result[C.MODULE_LIST]=sess[C.MODULE_LIST];
		result[C.R_MODULE_LIST]=sess[C.R_MODULE_LIST];
		result[C.CURRENT_MODULE]=sess[C.CURRENT_MODULE];
		params.INSERT_OBJ[C._ID]=ObjectId().valueOf();
		db[params.TABLE_NAME].insert(params.INSERT_OBJ);
		return result;
	}else{
		return sess;
	}
}})
