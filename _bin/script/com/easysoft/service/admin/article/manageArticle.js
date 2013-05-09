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
dojo.provide("com.easysoft.service.admin.article.manageArticle");
dojo.declare( "com.easysoft.service.admin.article.manageArticle" , "com.easysoft.service.admin.Index" , {
	m_page_body_widget_name:"com.easysoft.client.admin.article.manageArticle",
	str_body_param_list:dojo.toString({path:dojo.conf.default_article})
});
dojo.provide("com.easysoft.service.admin.article.historyArticle");
dojo.declare( "com.easysoft.service.admin.article.historyArticle" , "com.easysoft.service.admin.Index" , {
	templatePath:"com.easysoft.service.admin.article.templates.manageArticleHistory",
	m_page_body_widget_name:"com.easysoft.client.admin.article.manageArticleHistory"
});