db.system.js.save({_id:"init",value:function () {
		var pub=public();
		var C=constant();
		favorite_catlist=db.favorite_type.find({},{article_title:true,category:true}).toArray();
		favorite_catlist.unshift({article_title:pub.i18n(C.ALL),category:C.ALL});
        return {
			cst:C,
			i18n:db.i18n.find().toArray(),
			module:db.module.find().toArray(),
			favorite_catlist:favorite_catlist
        };
}})

