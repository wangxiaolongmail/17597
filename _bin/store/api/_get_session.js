db.system.js.save({_id:"_get_session",value:function (params) {
	var pub=public();
	var C=constant();
	var sid=params.sid||"0";
	if(sid.length===24){
		var lookup={sid:sid};
		var rs=db.session.findOne(lookup);
		if(rs){
			if(rs[C.IS_OPEN]){
				if(!rs[C.IS_TIMEOUT]){
					if(rs[C.REMOTE_ADDRESS]==params[C.REMOTE_ADDRESS]){
						var result={ok:false,err:"module not find"};
						var obj=_get_mdata(C.APPLICATION);
						if(obj){
							var a=obj[C.ROLE][rs[C.ROLE_NAME]][C.LEFT];
							_each(a,function(k,v,i){
								var o = v;
								if(params[C.CURRENT_URL]==o[C.MODULE_URL]){
									var newUpdateDate=(new Date()).getTime();
									if((newUpdateDate-rs[C.UPDATE_TIME])<pub.interval){
										var op={};
										op[C.UPDATE_TIME]=newUpdateDate;
										op[C.MID]="";
										db.session.update(lookup,{'$set':op});
										var op={};
										op.ok=true;
										op[C.CURRENT_MODULE]=o[C.MODULE_NAME];
										op[C.ROLE_NAME]=o[C.ROLE_NAME];
										op[C.IS_OPEN]=o[C.IS_OPEN];
										result=op;
									}else{
										var op={};
										op[C.IS_TIMEOUT]=true;
										db.session.update(lookup,{'$set':op});
										result={ok:false,err:"session timeout"};
									}
									return true;
								}
							});
						}
						return result;

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
