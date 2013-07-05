db.system.js.save({_id:"admin_Update",value:function (params) {
	var C=constant();
	var params=params||{};
	var sess=_get_session(params);
	if(sess.ok){
		if(params[C.METHOD]===C.GET){
			var obj=db[params[C.TABLE_NAME]].findOne({_id:params[C.RMID]});
			sess[C.UPDATE+C.OBJECT]=obj;
		}else{
		}
		return sess;
	}else{
		return sess;
	}
}})
