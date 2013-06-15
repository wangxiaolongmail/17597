db.system.js.save({_id:"_get_metadata",value:function (name) {
		var C=constant();
		var o={
                     "favorite":[
                                {field:"_id",ishidden:true},
                                {field:"id",lable:"id"},
                                {field:"article_title",lable:C.TITLE},
                                {field:"category",lable:C.CATEGORY},
                                {field:"article_url",ishidden:true}
                        ],
			"favorite_type":[
                                {field:"id",lable:"id"},
                                {field:"article_title",lable:C.TITLE}
                        ]
              };

		var a=[]
		var OP={};
		OP[C.FIELD]=C.KEY;
		OP[C.LABLE]=C.KEY;
		a.push(OP);

		var OP={};
		OP[C.FIELD]=C.VALUE;
		OP[C.LABLE]=C.VALUE;
		a.push(OP);

		o[C.CONSTANT]=a;
		if(name){
			return o[name];
		}else{
			return o;
		}
}})

