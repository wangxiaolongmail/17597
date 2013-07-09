db.system.js.save({_id:"admin_Record",value:function (params) {
	var pub=public();
	var C=constant();
	var params=params||{};
	var obj=_get_session(params);
	if(obj.ok){
		obj[C.RECORD]=db.user.findOne({_id:params[C.RMID]});
		return obj;
	}else{
		return obj;
	}
}})
