db.system.js.save({_id:"logout",value:function (params) {
	var C=constant();
	var sid=params["sid"];
	var obj =db.session.findOne({sid:sid});
	if (obj) {
		var op={};
		op[C.IS_OPEN]=false;
		op[C.UPDATE_TIME]=(new Date()).getTime();
		db.session.update({_id:ObjectId(sid)},{'$set':op});
	}
	return {ok:true};
}})

