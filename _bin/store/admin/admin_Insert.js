db.system.js.save({_id:"admin_Insert",value:function (params) {
	var C=constant();
	var params=params||{};
	var sess=_get_session(params);
	if(sess.ok){
		_insert(params.TABLE_NAME,params.INSERT_OBJ);
		return sess;
	}else{
		return sess;
	}
}})
