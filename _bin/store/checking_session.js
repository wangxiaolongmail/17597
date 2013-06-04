//db.eval("checking_session({sid:'5163d29313cef65a28000001'})");
db.system.js.save({_id:"checking_session",value:function (params) {
	var pub=public();
	var C=constant();
	var sid=params.sid||"0";
	if(sid.length===24){
		var rs=db.session.findOne({_id:ObjectId(sid)});
		if(rs){
			var a=rs[C.MODULE_LIST];
			var len=a.length;
			for(var i=0;i<len;i++){
				var o = a[i];
				if(params[C.CURRENT_URL]==o[C.MODULE_URL]){
					var newUpdateDate=(new Date()).getTime();
					if((newUpdateDate-rs.updateTime)<pub.interval){
						db.session.update({_id:ObjectId(sid)},{'$set':{'updateTime':newUpdateDate}});
						rs.ok=true;
						rs[C.CURRENT_MODULE]=o[C.MODULE_NAME];
						return rs;
					}else{
						return {ok:false,err:"session out"};
					}
				}
			}
		}else{
			return {ok:false,err:"session closed"};
		}
	}else{
		return {ok:false,err:"sid error"};
	}
	return {ok:false,err:"authority error"};
}})
