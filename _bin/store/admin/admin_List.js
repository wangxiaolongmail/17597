db.system.js.save({_id:"admin_List",value:function (params) {
	var C=constant();
	var params=params||{};
	var sess=_get_session(params);
	if(sess.ok){
		var result=_get_page(params);
		return _mixin(result,sess);
	}else{
		return sess;
	}
}})
