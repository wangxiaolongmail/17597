function(){
	var s="";
	var cursor =db.favorite_type.find();
	db.view_favorite_type.drop();
	var arr=[];
	while (cursor.hasNext()) { 
		var o=cursor.next();
		o.list=db.favorite.find( { category : o.category } ).toArray();
		arr.push(o);
	}
	db.view.insert({"favorite":arr});
}