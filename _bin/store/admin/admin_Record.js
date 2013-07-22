db.system.js.save({_id:"admin_Record",value:function (params) {
	var pub=public();
	var C=constant();
	var params=params||{};
	var session=_get_session(params);
	if(session.ok){
		session[C.RECORD]=db.user.findOne({_id:session[C.USER_NAME]});
		return session;
	}else{
		return session;
	}
}})
