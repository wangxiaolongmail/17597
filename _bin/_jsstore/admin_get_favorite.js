db.system.js.save({_id:"admin_get_favorite",value:function (params) {
	var params=params||{};
	var page=params.page||0;
	var pageSize=params.pageSize||10;
	var recordCount=db.favorite.count();
	var cursor =db.favorite.find().limit(pageSize).skip(pageSize*page);
	var list=[];
	var metadata=[
		{field:"_id",ishidden:true},
		{field:"id",lable:"id"},
		{field:"article_title",lable:"title"},
		{field:"category",lable:"category"},
		{field:"article_url",ishidden:true},
	];
	var id=0;
	while (cursor.hasNext()) {
		id++; 
		var o=cursor.next();
		var oo=db.favorite_type.findOne( { category : o.category } );
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
	var pageCount=parseInt(recordCount/pageSize);
	return {metadata:metadata,page:page,recordCount:recordCount,pageSize:pageSize,pageCount:pageCount,list:list};
}})
