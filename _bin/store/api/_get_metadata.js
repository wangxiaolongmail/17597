db.system.js.save({_id:"_get_metadata",value:function (name) {
		var C=constant();
		var o={};
		o[C.FAVORITE]=[
						{field:C._ID,TYPE:C.STRING},
						{field:C.NAME,TYPE:C.STRING},
						{field:C.CATEGORY,TYPE:C.STRING},
						{field:C.URL,TYPE:C.STRING},
						{field:C.PRI,TYPE:C.INT}
					];
		o[C.FAVORITE_TYPE]=[{field:C.NAME,TYPE:C.STRING}];
		if(name){
			return o[name];
		}else{
			return o;
		}
}})
