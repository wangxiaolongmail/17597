db.system.js.save({_id:"_get_metadata",value:function (name) {
		var C=constant();
		var o={
			 "favorite":[
						{field:"_id",ishidden:true},
						{field:"article_title",lable:C.TITLE},
						{field:C.CATEGORY,lable:C.CATEGORY},
						{field:"article_url",ishidden:true}
			],
			"favorite_type":[
                        {field:"article_title",lable:C.TITLE}
            ]
              };
		if(name){
			return o[name];
		}else{
			return o;
		}
}})
