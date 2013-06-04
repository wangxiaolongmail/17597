db.system.js.save({_id:"admin_get_favorite",value:function (params) {
	var pub=public();
	var cst=constant();
	var params=params||{};
	var result=checking_session(params);
	if(result.ok){
		var 
		tablename="favorite",
		tablename_type="favorite_type",
		page=params.page||1,
		pageSize=params.pageSize||pub.pageSize,
		recordCount=0,
		pageRecordCount=0,
		category=params.category||cst.ALL;	
		var build=function(){
			if(category==cst.ALL){
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
				var o=cursor.next();
				var oo=db[tablename_type].findOne( { category : o.category } );
				o.category=oo.article_title;
				o.id=id;
				var obj={};
				var a=metadata;
				for(var i=0;i<a.length;i++){
					var field=a[i].field;
					obj[field]=o[field];
				}
				list.push(obj);
			}
			pageRecordCount=id;
			var pageCount=Math.ceil(recordCount/pageSize);
			var result={
				ok:true,tablename:tablename,metadata:metadata,page:page,recordCount:recordCount,
				pageSize:pageSize,pageCount:pageCount,pageRecordCount:pageRecordCount,list:list,category:category
			};
			return result;
		}
		return build();
	}else{
		return result;
	}
}})
