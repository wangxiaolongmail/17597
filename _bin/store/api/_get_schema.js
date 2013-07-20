db.system.js.save({_id:"_get_schema",value:function (name,find_field) {
		var C=constant();
		var o={};
		o[C.FAVORITE]={
			IS_PRI:true,
			List:[
					{field:C._ID,TYPE:C._ID},
					{field:C.NAME,TYPE:C.NAME,IS_REQUIRED:true},
					{field:C.CATEGORY,TYPE:C.CATEGORY,Link:C.FAVORITE_TYPE},
					{field:C.URL,TYPE:C.URL,IS_REQUIRED:true},
					{field:C.IS_HIDDEN,TYPE:C.BOOLEAN},
					{field:C.PRI,TYPE:C.PRI}
			]
		};
		o[C.FAVORITE_TYPE]={
			IS_DICT:true,
			IS_PRI:true,
			List:[
					{field:C._ID,TYPE:C._ID},
					{field:C.NAME,TYPE:C.NAME,IS_REQUIRED:true},
					{field:C.PRI,TYPE:C.PRI}
			]
		};
		o[C.DEPARTMENT]={
			IS_DICT:true,
			IS_PRI:true,
			List:[
					{field:C._ID,TYPE:C._ID},
					{field:C.NAME,TYPE:C.NAME,IS_REQUIRED:true},
					{field:C.PRI,TYPE:C.PRI}
			]
		};
		o[C.ORGANIZE]={
			IS_DICT:true,
			IS_PRI:true,
			List:[
					{field:C._ID,TYPE:C._ID},
					{field:C.NAME,TYPE:C.NAME,IS_REQUIRED:true},
					{field:C.PRI,TYPE:C.PRI}
			]
		};
		o[C.ORGANIZE_TYPE]={
			IS_DICT:true,
			IS_PRI:true,
			List:[
					{field:C._ID,TYPE:C._ID},
					{field:C.NAME,TYPE:C.NAME,IS_REQUIRED:true},
					{field:C.PRI,TYPE:C.PRI}
			]
		};
		o[C.USER]={
			IS_PRI:true,
			List:[
					{field:C.NAME,TYPE:C.NAME},
					{field:C.USER_NAME,TYPE:C.NAME,IS_REQUIRED:true},
					{field:C.PASSWORD,TYPE:C.PASSWORD,IS_REQUIRED:true},
					{field:C.CHECK_CODE,TYPE:C.CHECK_CODE,IS_REQUIRED:true},
					{field:C.PRI,TYPE:C.PRI}
			]
		};
		if(name){
			var obj=o[name];
			if(find_field && find_field===C.CATEGORY){
				var cat=null;
				_each(obj[C.LIST],function(k,v){
					if(v[C.FIELD]===C.CATEGORY){
						cat=v[C.LINK]; 
					}
				});
				return cat;
			}else{
				return obj;
			}
		}else{
			return o;
		}
}})
