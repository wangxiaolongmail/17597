db.system.js.save({_id:"_get_schema",value:function (name) {
		var C=constant();
		var o={};
		o[C.FAVORITE]={
			LIST:[
					{field:C._ID,TYPE:C.STRING},
					{field:C.NAME,TYPE:C.STRING},
					{field:C.CATEGORY,TYPE:C.STRING,Link:C.FAVORITE_TYPE},
					{field:C.URL,TYPE:C.STRING},
					{field:C.PRI,TYPE:C.INT}
				]
		};
		o[C.FAVORITE_TYPE]={
			IS_DICT:true,
			LIST:[
					{field:C.NAME,TYPE:C.STRING}
			]
		};
		if(name){
			return o[name];
		}else{
			return o;
		}
}})
