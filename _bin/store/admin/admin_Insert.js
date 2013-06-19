db.system.js.save({_id:"admin_Insert",value:function (params) {
	var C=constant();
	var params=params||{};
	var sess=_get_session(params);
	if(sess.ok){
		params.INSERT_OBJ[C._ID]=ObjectId().valueOf();
		db[params.TABLE_NAME].insert(params.INSERT_OBJ);
		return sess;
	}else{
		return sess;
	}
}})
