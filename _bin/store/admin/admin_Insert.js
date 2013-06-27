db.system.js.save({_id:"admin_Insert",value:function (params) {
	var C=constant();
	var params=params||{};
	var sess=_get_session(params);
	if(sess.ok){
		_insert(params.TABLE_NAME,params[C.INSERT+C.OBJECT]);
		var o=_get_schema(params.TABLE_NAME);
		sess.o=o;
		return sess;
	}else{
		return sess;
	}
}})
