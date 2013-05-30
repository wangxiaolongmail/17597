db.system.js.save({_id:"admin_get_favorite",value:function (params) {
	var pub=public();
	var params=params||{};
	var sid=params.sid||"0";
	var session=checking_session(sid);
	if(session){
		var 
		tablename="favorite",
		tablename_type="favorite_type",
		page=params.page||1,
		pageSize=params.pageSize||pub.pageSize,
		category=params.category||"all";	
		var build=function(){
			if(category=="all"){
				var option={};
			}else{
				var option={category:category};
			}
			var cursor =db[tablename].find(option).limit(pageSize).skip(pageSize*(page-1));
			var list=[];
			var metadata=pub.metadata[tablename];
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
			var recordCount=id;
			var pageCount=parseInt(recordCount/pageSize);
			var catlist =db[tablename_type].find({},{article_title:true,category:true}).toArray();
			var result={
				ok:true,tablename:tablename,metadata:metadata,page:page,recordCount:recordCount,
				pageSize:pageSize,pageCount:pageCount,list:list,catlist:catlist,category:category
			};
			return result;
		}
		if(pub.isCache){
			var seek={tablename:tablename,page:page,pageSize:pageSize,recordCount:recordCount};
			var rs=db.cache.findOne(seek);
			if(rs){
				var result=rs.result;
				result.cacheid=rs._id;
				return result;
			}else{
				var result=build();
				seek.result=result;
				db.cache.save(seek);
				return result;
			}
		}else{
			return build();
		}
	}else{
		return {ok:false,err:"session out"};
	}
}})
