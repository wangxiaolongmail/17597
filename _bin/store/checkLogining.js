function (user,password) {
	var result =db.user.findOne({user:user,password:password});
	if (result) {
	
		var loginTime=(new Date()).getTime();
		var id=ObjectId();
		db.session.insert({_id:id,user:user,loginTime:loginTime,updateTime:loginTime})
		return {ok:1,user:user,id:id.valueOf()};
	}else{
		return {ok:0};
	}
}