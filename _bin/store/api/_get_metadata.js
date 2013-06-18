db.system.js.save({_id:"_get_metadata",value:function (name) {
		var C=constant();
		var o={
			 "favorite":[
						{field:C._ID},
						{field:C.ARTICLE_TITLE},
						{field:C.CATEGORY},
						{field:C.ARTICLE_URL},
						{field:C.ARTICLE_PRI}
					],
			"favorite_type":[{field:C.ARTICLE_TITLE}]
         };
		if(name){
			return o[name];
		}else{
			return o;
		}
}})
