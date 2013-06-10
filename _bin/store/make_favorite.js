db.system.js.save({_id:"make_favorite",value:function(){
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
		  list:arr,
		  'MODULE_LIST':[{
		      'MODULE_NAME':'FAVORITE',
		      'ROLE_NAME':'r_wxl',
		      'MODULE_URL':'/easysoft/admin/start'
		    }
		  ],
		  'CURRENT_MODULE':'FAVORITE'};

		return result;
	}
})


