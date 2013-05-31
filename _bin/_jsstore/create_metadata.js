db.system.js.save({_id:"create_metadata",value:function () {
		var cst=constant();
		db.metadata.remove();
		db.metadata.insert({
                        _id:"favorite",
			value:[
                                {field:"_id",ishidden:true},
                                {field:"id",lable:"id"},
                                {field:"article_title",lable:cst.TITLE},
                                {field:"category",lable:cst.CATEGORY},
                                {field:"article_url",ishidden:true}
                        ]
                });
}})

