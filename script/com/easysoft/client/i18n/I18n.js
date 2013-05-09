/*
 *+--------------------------------------------------------------------------+
 *| Licensed Materials - Property of EasySoft 								 |
 *| (c) Copyright EasySoft Corporation 2011. All Rights Reserved. 			 |
 *| 																		 |
 *|  |
 *|  |
 *+--------------------------------------------------------------------------+
 */
/**
 * Index widget.
 * 
 * @author wxlwang
 */
dojo.provide("com.easysoft.client.i18n.I18n");

dojo.declare("com.easysoft.client.i18n.I18n", "",
	{
		create:function(){
			dojo.global.$i18n=this;
			this._init();
			this._init2();
			this._init3();
		},
		_init2:function(){},
		_init3:function(){},
		_init:function(){
			this.i18n_username="用户名:";
			this.i18n_password="密码:";
			this.i18n_checkimg="验证码:";
			this.i18n_login="登录";
			this.i18n_login_template_1="看不清 ？";
			this.i18n_table="表";
			this.i18n_article="文章";
			this.i18n_news="新闻";
			this.i18n_favorite="收藏夹";
			this.i18n_root="根";
			this.i18n_maodan="毛蛋";
			this.i18n_easysoft="易软";
			this.i18n_sys="系统";
			this.i18n_conf="配置";
			this.i18n_templates="模版库";
			this.i18n_preview="预览";
			this.i18n_edit="编辑";
			this.i18n_delete="删除";
			this.i18n_add="增加";
			this.i18n_clone="克隆";
			this.i18n_clear="清除";
			this.i18n_history="历史";
			this.i18n_refresh="刷新";
			this.i18n_view="视图";
			this.i18n_user="用户";
			this.i18n_register_user="注册用户";
			this.i18n_manageArticle="文档管理";
			this.i18n_manageDatabase="数据库管理";
			this.i18n_log="日志";
			this.i18n_memorylog="内存日志";
			this.i18n_PageBuffer="页面缓存";
			this.i18n_memoryData="内存数据";
			this.i18n_exit="退出";
			this.i18n_new_window="新窗口";
			this.i18n_start="开始";
			this.i18n_information="消息";
			this.i18n_role="角色";
		},
		get:function(s){
			return this["i18n_"+s]||s;
		}
	}
);