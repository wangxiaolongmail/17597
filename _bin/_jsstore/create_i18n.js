db.system.js.save({_id:"create_i18n",value:function () {
	var cst=constant();
	db.i18n.remove();
	db.i18n.insert({_id:cst.ALL,cn:"全部"});
	db.i18n.insert({_id:cst.TITLE,cn:"标题"});
	db.i18n.insert({_id:cst.CATEGORY,cn:"类别"});
	db.i18n.insert({_id:cst.DELETE,cn:"删除"});
}})

