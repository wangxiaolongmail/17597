db.system.js.save({_id:"admin_favorite_type_List",value:function (params) {
	var pub=public();
	var C=constant();
	var params=params||{};
	var sess=checking_session(params);
	if(sess.ok){
		var 
		tablename=params[C.TABLE_NAME],
		page=params.page||1,
		pageSize=params.pageSize||pub.pageSize,
		recordCount=0,
		pageRecordCount=0;	
		var build=function(){
			var option={};
			recordCount=db[tablename].find(option).count();
			var a=db[tablename].find(option).limit(pageSize).skip(pageSize*(page-1)).toArray();
			var list=[];
			var id=0;
			for(var i=0;i<a.length;i++){
				id++;
				var item=a[i];
				delete item._id
				list.push(item);
			}
			pageRecordCount=id;
			var pageCount=Math.ceil(recordCount/pageSize);
			var metadata=_get_metadata(tablename);
			var result={
				ok:true,tablename:tablename,metadata:metadata,page:page,recordCount:recordCount,
				pageSize:pageSize,pageCount:pageCount,pageRecordCount:pageRecordCount,list:list
			};
			result[C.MODULE_LIST]=sess[C.MODULE_LIST];
			result[C.R_MODULE_LIST]=sess[C.R_MODULE_LIST];
			result[C.CURRENT_MODULE]=sess[C.CURRENT_MODULE];
			return result;
		}
		return build();
	}else{
		return sess;
	}
}})
