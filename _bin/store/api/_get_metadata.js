db.system.js.save({_id:"_get_metadata",value:function (name) {
		var C=constant();
		var o={};
		o[C.FAVORITE]=[
						{field:C._ID,TYPE:C.STRING},
						{field:C.ARTICLE_TITLE,TYPE:C.STRING},
						{field:C.CATEGORY,TYPE:C.STRING},
						{field:C.ARTICLE_URL,TYPE:C.STRING},
						{field:C.ARTICLE_PRI,TYPE:C.INT}
					];
		o[C.FAVORITE_TYPE]=[{field:C.ARTICLE_TITLE,TYPE:C.STRING}];
		if(name){
			return o[name];
		}else{
			return o;
		}
}})
