db.system.js.save({_id:"make_favorite",value:function(params){
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
		var a=_get_module_list(params[C.ROLE_NAME]);
		result[C.MODULE_LIST]=a;
		result[C.CURRENT_MODULE]=C.EASYSOFT_INDEX;

			var op={};
			op[C.MODULE_NAME]=C.EASYSOFT_LOGIN;
			op[C.MODULE_URL]=getUrlName(C.EASYSOFT_LOGIN);
			result[C.R_MODULE_LIST]=[op];

		return result;
	}
})


