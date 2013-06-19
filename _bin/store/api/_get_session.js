db.system.js.save({_id:"_get_session",value:function (params) {
	var pub=public();
	var C=constant();
	var sid=params.sid||"0";
	if(sid.length===24){
		var rs=db.session.findOne({sid:sid});
		if(rs){
			if(rs[C.IS_OPEN]){
				if(!rs[C.IS_TIMEOUT]){
					if(rs[C.REMOTE_ADDRESS]==params[C.REMOTE_ADDRESS]){
						var a=rs[C.MODULE_LIST];
						var len=a.length;
						for(var i=0;i<len;i++){
							var o = a[i];
							if(params[C.CURRENT_URL]==o[C.MODULE_URL]){
								var newUpdateDate=(new Date()).getTime();
								if((newUpdateDate-rs[C.UPDATE_TIME])<pub.interval){
									var op={};
									op[C.UPDATE_TIME]=newUpdateDate;
									db.session.update({_id:ObjectId(sid)},{'$set':op});
									var op={};
									op.ok=true;
									op[C.R_MODULE_LIST]=rs[C.R_MODULE_LIST];
									op[C.CURRENT_MODULE]=o[C.MODULE_NAME];
									op[C.ROLE_NAME]=o[C.ROLE_NAME];
									return op;
								}else{
									var op={};
									op[C.IS_TIMEOUT]=true;
									db.session.update({_id:ObjectId(sid)},{'$set':op});
									return {ok:false,err:"session timeout"};
								}
							}
						}
					}else{
						return {ok:false,err:"ip error"};
					}
				}else{
					return {ok:false,err:"session timeouted"};
				}
			}else{
				return {ok:false,err:"session closed"};
			}
		}else{
			return {ok:false,err:"session not find"};
		}
	}else{
		return {ok:false,err:"sid error"};
	}
	return {ok:false,err:"authority error"};
}})
