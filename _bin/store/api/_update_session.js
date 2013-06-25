db.system.js.save({_id:"_update_session",value:function (o) {
	var C=constant();
	var o=o||{};
	var _id=ObjectId();
	o[C.SID]=_id.valueOf();
	o[C.LOGIN_TIME]=(new Date()).getTime();
	o[C.UPDATE_TIME]=o[C.LOGIN_TIME];
	o[C.IS_OPEN]=true;
	o[C.IS_TIMEOUT]=false;
	return o;
}})
