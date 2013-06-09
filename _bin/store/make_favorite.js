db.system.js.save({_id:"make_favorite",value:function(){
		var s="";
		var cursor =db.favorite_type.find();
		var arr=[];
		while (cursor.hasNext()) {
			var o=cursor.next();
			delete o._id;
			var aa=[];
			var a=db.favorite.find( { category : o.category } ).toArray();
			for(var i=0;i<a.length;i++){
				var op=a[i];
				delete op._id;
				aa.push(op);
			}
			o.list=aa;
			arr.push(o);
		}
		return {ok:true,list:arr};
	}
})


