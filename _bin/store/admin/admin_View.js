db.system.js.save({_id:"admin_View",value:function (params) {
	var C=constant();
	var params=params||{};
	var sess=_get_session(params);
	if(sess.ok){
		var result=_get_view1(params,sess);
		return _mixin(result,sess);
	}else{
		return sess;
	}
}})
