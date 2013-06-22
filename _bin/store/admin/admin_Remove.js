db.system.js.save({_id:"admin_Remove",value:function (params) {
	var C=constant();
	var params=params||{};
	var sess=_get_session(params);
	if(sess.ok){
		_remove(params);
		return sess;
	}else{
		return sess;
	}
}})
