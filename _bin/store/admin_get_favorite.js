db.system.js.save({_id:"admin_get_favorite",value:function (params) {
	var pub=public();
	var C=constant();
	var params=params||{};
	var sess=checking_session(params);
	if(sess.ok){
		var 
		tablename="favorite",
		tablename_type="favorite_type",
		page=params.page||1,
		pageSize=params.pageSize||pub.pageSize,
		recordCount=0,
		pageRecordCount=0,
		category=params.category||C.ALL;	
		var build=function(){
			if(category==C.ALL){
				var option={};
			}else{
				var option={category:category};
			}
			recordCount=db[tablename].find(option).count();
			var cursor =db[tablename].find(option).limit(pageSize).skip(pageSize*(page-1));
			var list=[];
			var metadata=pub.metadata(tablename);
			var id=0;
			while (cursor.hasNext()) {
				id++; 
				var item=cursor.next();
				var o=db[tablename_type].findOne( { category : item.category } );
				item.category=o.article_title;
				item.id=id;
				var new_item={};
				var a=metadata;
				var len=a.length;
				for(var i=0;i<len;i++){
					var o=a[i];
					var field=o.field;
					new_item[field]=item[field];
				}
				list.push(new_item);
			}
			pageRecordCount=id;
			var pageCount=Math.ceil(recordCount/pageSize);
			var result={
				ok:true,tablename:tablename,metadata:metadata,page:page,recordCount:recordCount,
				pageSize:pageSize,pageCount:pageCount,pageRecordCount:pageRecordCount,list:list,category:category
			};
			result[C.MODULE_LIST]=sess[C.MODULE_LIST];
			result[C.CURRENT_MODULE]=sess[C.CURRENT_MODULE];
			return result;
		}
		return build();
	}else{
		return sess;
	}
}})
