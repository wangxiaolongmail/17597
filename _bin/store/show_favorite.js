db.system.js.save({_id:"show_favorite",value:function(params){
		var C=constant();
		var s="";
		var cursor =db.favorite_type.find();
		var arr=[];
		while (cursor.hasNext()) {
			var o=cursor.next();
			o._id=o._id.valueOf();
			var aa=[];
			var a=db.favorite.find( { category : o.category } ).toArray();
			for(var i=0;i<a.length;i++){
				var op=a[i];
				op._id=op._id.valueOf();
				aa.push(op);
			}
			o.list=aa;
			arr.push(o);
		}
		var result={
		  ok:true,
		  list:arr
		};
		result[C.CURRENT_MODULE]=C.EASYSOFT+C.INDEX;
		result[C.URL+C.GO]=_get_url(C.EASYSOFT+C.GO);
		return result;
	}
})


