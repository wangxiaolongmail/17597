db.system.js.save({_id:"_get_schema",value:function (name) {
		var C=constant();
		var o={};
		o[C.FAVORITE]={
			IS_PRI:true,
			LIST:[
					{field:C._ID,TYPE:C.STRING},
					{field:C.NAME,TYPE:C.STRING,IS_REQUIRED:true},
					{field:C.CATEGORY,TYPE:C.CATEGORY,Link:C.FAVORITE_TYPE},
					{field:C.URL,TYPE:C.URL,IS_REQUIRED:true},
					{field:C.PRI,TYPE:C.INT}
			]
		};
		o[C.FAVORITE_TYPE]={
			IS_DICT:true,
			IS_PRI:true,
			LIST:[
					{field:C.NAME,TYPE:C.STRING},
					{field:C.PRI,TYPE:C.INT}
			]
		};
		if(name){
			return o[name];
		}else{
			return o;
		}
}})
