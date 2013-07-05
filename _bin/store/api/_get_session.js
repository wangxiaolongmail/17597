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
					if(rs[C.REMOTE+C.ADDRESS]==params[C.REMOTE+C.ADDRESS]){
						var result={ok:false,err:"module not find"};
						var obj=db[C.APPLICATION].findOne({_id:C.EASYSOFT});
						if(obj){
							var a=obj[C.ROLE][rs[C.ROLE_NAME]][C.LEFT];
							_each(a,function(k,v,i){
								var o = v;
								if(params[C.CURRENT_URL]==o[C.URL]){
									var newUpdateDate=(new Date()).getTime();
									if((newUpdateDate-rs[C.UPDATE_TIME])<pub.interval){
										var op={};
										op[C.UPDATE_TIME]=newUpdateDate;
										op[C.MID]="";
										db.session.update(lookup,{'$set':op});
										var op={};
										op.ok=true;
										op[C.URL_NAME]=o[C.URL_NAME];
										op[C.ROLE_NAME]=o[C.ROLE_NAME];
										op[C.USER_NAME]=rs[C.USER_NAME];
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
