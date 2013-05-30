//db.eval("checking_session({sid:'5163d29313cef65a28000001'})");
db.system.js.save({_id:"checking_session",value:function (sid) {
	var pub=public();
	var sid=sid||"0";
	var rs=db.session.findOne({_id:ObjectId(sid)});
	if(rs){
		var newUpdateDate=(new Date()).getTime();
		if((newUpdateDate-rs.updateTime)>pub.interval){
			return false;
		}else{
			db.session.update({_id:ObjectId(sid)},{'$set':{'updateTime':newUpdateDate}});
			return rs;
		}
	}else{
		return false;
	}
}})
