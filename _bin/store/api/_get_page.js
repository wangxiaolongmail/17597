db.system.js.save({_id:"_get_page",value:function (params,sess) {
		var pub=public();
		var C=constant();
		var 
		tablename=params[C.TABLE_NAME],
		tablename_type=params[C.TABLE+C.TYPE],
		page=params[C.PAGE]||1,
		pageSize=params.pageSize||pub.pageSize,
		recordCount=0,
		pageRecordCount=0,
		category=params[C.CATEGORY]||"";	
		if(category==""){
			var option={USER_NAME:sess[C.USER_NAME]};
		}else{
			var option={category:category,USER_NAME:sess[C.USER_NAME]};
		}
		recordCount=db[tablename].find(option).count();
		var list =db[tablename].find(option).limit(pageSize).skip(pageSize*(page-1)).toArray();
		pageRecordCount=pageSize;
		var pageCount=Math.ceil(recordCount/pageSize);
		var result={
			tablename:tablename,page:page,recordCount:recordCount,
			pageSize:pageSize,pageCount:pageCount,pageRecordCount:pageRecordCount,list:list,category:category
		};
		return result;
}})
