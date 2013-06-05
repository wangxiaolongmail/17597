db.system.js.save({_id:"checkLogining",value:function (params) {
	var C=constant();
	delete params[C.STORED_METHOD];
	obj=params;
	var result =db.user.findOne(obj);
	if (result) {
		var loginTime=(new Date()).getTime();
		var id=ObjectId();
		var o={_id:id,loginTime:loginTime,updateTime:loginTime};
		o[C.USER_NAME]=obj[C.USER_NAME];
		var op={};
		op[C.GROUP_NAME]=result[C.GROUP_NAME];
		var cursor=db.authority.find(op);
		var a=[];
		var aa={};
		while (cursor.hasNext()) {
			var item=cursor.next();
			var op={};
			op[C.MODULE_NAME]=item[C.MODULE_NAME];
			item[C.MODULE_URL]=db.module.findOne( op )[C.MODULE_URL];
			delete item._id;
			a.push(item);
			aa[item[C.MODULE_URL]]=1;
		}
		if(a.length>0){
			o[C.MODULE_LIST]=a;
			o[C.MODULE_URL_LIST]=aa;
			db.session.insert(o);
			var o={ok:true,id:id.valueOf()};
			o[C.USER_NAME]=obj[C.USER_NAME];
			o[C.MODULE_LIST]=a;
			o[C.MODULE_URL_LIST]=aa;
			return o;
		}else{
			return {ok:false,err:"system module error"};
		}
	}else{
		return {ok:false,err:"user or password error"};
	}
}})

