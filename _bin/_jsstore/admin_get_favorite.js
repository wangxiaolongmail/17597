function (params) {
	var page=params.page||0;
	var pageSize=params.pageSize||10;
	var recordCount=db.favorite.count();
	var cursor =db.favorite.find().limit(pageSize).skip(pageSize*page);
	var list=[];
	while (cursor.hasNext()) { 
		var o=cursor.next();
		var oo=db.favorite_type.findOne( { category : o.category } );
		list.push({
		  "_id":o._id,
		  "article_title" : o.article_title,
		  "category" : oo.article_title,
		  "article_url" : o.article_url
		});
	}
	var pageCount=parseInt(recordCount/pageSize);
	return {page:page,recordCount:recordCount,pageSize:pageSize,pageCount:pageCount,list:list};
}