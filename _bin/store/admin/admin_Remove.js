db.system.js.save({_id:"admin_Remove",value:function (params) {
	var C=constant();
	var params=params||{};
	var sess=_get_session(params);
	if(sess.ok){
		_remove(params[C.TABLE_NAME],{_id:params[C.RMID]});
		return sess;
	}else{
		return sess;
	}
}})
