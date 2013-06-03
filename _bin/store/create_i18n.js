db.system.js.save({_id:"create_i18n",value:function () {
	var cst=constant();
	db.i18n.remove();
	db.i18n.insert({_id:cst.ALL,cn:"全部"});
	db.i18n.insert({_id:cst.ADD,cn:"新增"});
	db.i18n.insert({_id:cst.TITLE,cn:"标题"});
	db.i18n.insert({_id:cst.CATEGORY,cn:"类别"});
	db.i18n.insert({_id:cst.DELETE,cn:"删除"});
	db.i18n.insert({_id:cst.EDIT,cn:"编辑"});
	db.i18n.insert({_id:cst.USER_NAME,cn:"用户名"});
	db.i18n.insert({_id:cst.PASSWORD,cn:"密码"});
	db.i18n.insert({_id:cst.LOGIN,cn:"登录"});
	db.i18n.insert({_id:cst.SITE_NAME,cn:"17597.net"});
	db.i18n.insert({_id:cst.OK,cn:"确定"});
}})

