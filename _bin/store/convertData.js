function(){
	var s="";
	var cursor =db.favorite.find();
	while (cursor.hasNext()) { 
		var o=cursor.next();
		db.favorite2.insert({
		  "_id":o._id,
		  "article_title" : o.article_title,
		  "category" : o.category,
		  "article_url" : o.article_url,
		  "article_pri" : o.article_pri
		});
	}
}