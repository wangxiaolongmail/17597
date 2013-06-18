db.system.js.save({_id:"_get_metadata",value:function (name) {
		var C=constant();
		var o={
			 "favorite":[
						{field:"_id"},
						{field:"article_title"},
						{field:C.CATEGORY},
						{field:"article_url"}
					],
			"favorite_type":[{field:"article_title"}]
         };
		if(name){
			return o[name];
		}else{
			return o;
		}
}})
