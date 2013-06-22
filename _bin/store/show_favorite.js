db.system.js.save({_id:"show_favorite",value:function(params){
		var C=constant();
		var a=[];
		_each(db.favorite_type.find().toArray(),function(k,v,i){
			var o=v;
			o.list=[];
			var op={};
			op[C.CATEGORY]=o._id
			_each(db.favorite.find( op ).toArray(),function(k,v,i){
				o.list.push(v);
			});
			a.push(o);

		});
		var result={
		  ok:true,
		  list:a
		};
		result[C.CURRENT_MODULE]=C.EASYSOFT+C.INDEX;
		result[C.URL+C.GO]=_get_url(C.EASYSOFT+C.GO);
		return result;
	}
})


