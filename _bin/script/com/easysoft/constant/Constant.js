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
dojo.provide("com.easysoft.constant.Constant");

dojo.declare("com.easysoft.constant.Constant", "",
	{
		create:function(){
			dojo.global.$c=this;
			this.article_path="article_path";
			this.c_article="article";
			this.c_OSSAccessKeyId="OSSAccessKeyId";
			this.c_Prefix="Prefix";
			this.c_params="params";
			this.c_index_buf="index_buf";
			this.c_headers="headers";
			this.c_responseText="responseText";
			this.c_Message="Message";
			this.c_Authorization="Authorization";
			this.c_Expires="Expires";
			this.c_Signature="Signature";
			this.c_category="category";
			this.c_path="path";
			this.c_urlPath="urlPath";
			this.c_ppath="ppath";
			this.c_expand="expand";
			this.c_start="start";
			this.c_end="end";
			this.c_exit="exit";
			this.c_content_type="content-type";
			this.c_Content_Type="Content-Type";
			this.c_undefined="undefined";
			this.c_win32="win32";
			this.c_widget_easysoft_client_Table="com.easysoft.client.control.Table";
			this.c_widget_Table="com.easysoft.client.control.Table";
			this.c_widget_util_MutiReqData ="com.easysoft.util.MutiReqData";
			this.c_widget_util_readWebFolder ="com.easysoft.util.webFolder.readWebFolder";
			this.c_widget_util_writeWebFolder="com.easysoft.util.webFolder.writeWebFolder";
			this.c_widget_util_getWebFolderList="com.easysoft.util.webFolder.getWebFolderList";
			this.c_widget_oss_ali_readWebFolder ="com.easysoft.oss.ali.webFolder.readWebFolder";
			this.c_widget_oss_ali_getWebFolderList="com.easysoft.oss.ali.webFolder.getWebFolderList";
			this.c_widget_util_getWebFileList="com.easysoft.util.webFolder.getWebFileList";
			this.c_widget_util_renameWebFolder="com.easysoft.util.webFolder.renameWebFolder";
			this.c_widget_util_addWebFolder="com.easysoft.util.webFolder.addWebFolder";
			this.c_templ_easysoft_service_Blank="com.easysoft.service.templates.Blank";
			
			this.c_url_client_dojo_min="/script/dojo-min.js";
			this.c_url_client_easysoft_admin_css_min="/theme/blue/styles/css-min.css";
			this.c_url_client_easysoft_admin_widget_min="/script/easysoft/admin/widget-min.js";
			this.c_url_001_001="/easysoft/admin/article/postSaveArticle";
			this.c_url_001_002="/easysoft/admin/article/getAddArticle";
			this.c_url_001_003="/easysoft/admin/article/getDeleteArticle";
			this.c_url_001_004="/easysoft/admin/article/getCloneArticle";
			this.c_url_001_005="/easysoft/admin/article/getPreviewArticle";
			this.c_url_001_006="/easysoft/admin/article/getHistoryArticle";
			this.c_url_001_007="/easysoft/admin/article/getArticle";
			this.c_url_001_008="/easysoft/admin/article/getArticleHistoryList";
			this.c_url_001_010="/easysoft/getCheckImg";
			this.c_url_001_011="/easysoft/admin/log/getLogList";
			this.c_url_001_012="/easysoft/clearPageBuffer";
			
			this.c_url_001_700="/easysoft/exit";
			this.c_url_001_701="/easysoft/admin/start";
			this.c_url_001_702="/easysoft/logining";
			this.c_url_001_703="/e/login";
			this.c_url_001_704="/easysoft/admin/manageDatabase";
			this.c_url_001_705="/easysoft/manageArticle";
			this.c_url_001_706="/easysoft/admin/log/memorylog";
			this.c_url_001_708="/easysoft/admin/post_KindEditor_uploading";
			this.c_url_001_707="/error";
			this.c_url_001_709="/file_manager_json";
			this.c_url_001_712="/easysoft/admin/PageBuffer";
			this.c_url_001_713="/easysoft/admin/memoryData";
			this.c_url_001_714="/e/shs";
			this.c_url_001_715="/e/backup";
			
			this.c_url_002_001="/m/ru";
			this.c_url_002_002="/m/rui";
			
			this.c_url_003_001="/wl/PSC_detail.html";
			this.c_url_003_002="/wl/login";
			this.c_url_003_003="/wl/PSC.html";
			
			this.c_url_004_001="/mobile/login";
			
			this.c_url_maodan_logining="/maodan/logining";
			this.c_url_maodan_login="/maodan/login";
			this.c_url_maodan_admin_favorite="/maodan/admin/favorite";
			this.c_url_maodan_admin_exit="/maodan/exit";
			this.c_url_maodan_admin_start="/maodan/admin/start";
			this.c_IfModifiedSince="if-modified-since";
			this.c_Last_Modified="Last-Modified";
			this.c_LastModified="LastModified";
			this.c_Key="Key";
			this.c_m_uri="m_uri";
			this.c_mobject="_mobject";
			this.c_mListobject="_mListobject";
			this.c_article_filename="article_filename";
			this.c_article_url="article_url";
			this.c_article_pri="article_pri";
			this.c_user="user";
			this.c_user_name="user_name";
			this.c_user_password="user_password";
			this.c_action_link="action_link";
			this.c_action_link_box="action_link_box";
			this.c_text="text";
			this.c_number="number";
			this.c_refresh="refresh";
			this.c_root="root";
			this.c_sid="sid";
			this.c_delete="delete";
			this.c_edit="edit";
			this.c_clone="clone";
			this.c_add="add";
			this.c_preview="preview";
			this.c_new_window="new_window";
			this.c_label="label";
			this.c_url="url";
			this.c_role="role";
			this.c_history="history";
			this.c_navIndex="navIndex";
			this.c_selected="selected";
			this.c_favorite="favorite";
			this.c_onAdd="onAdd";
			this.c_onClone="onClone";
			this.c_onClear="onClear";
			this.c_clear="clear";
			this.c_onDel="onDel";
			this.c_onRequest="onRequest";
			this.c_onEdit="onEdit";
			this.c_onRefresh="onRefresh";
			this.c_onExpand="onExpand";
			this.c_onTimer="onTimer";
			this.c_confirm_del_tip="delete?";
			this.c_confirm_add_tip="add?";
			this.c_confirm_clone_tip="clone?";
			this.c_createDeleteLink="createDeleteLink";
			this.c_createPreviewLink="createPreviewLink";
			this.c_createEditLink="createEditLink";
			this.c_createCloneLink="createCloneLink";
			this.c_createNewWindowLink="createNewWindowLink";
			this.c_createRefreshLink="createRefreshLink";
			this.c_createAddLink="createAddLink";
			this.c_createHistoryLink="createHistoryLink";
			this.c_article_title="article_title";
			this.c_article_date="article_date";
			this.c_isFolder="isFolder";
			this.c_id_page_nav="page_nav";
			this.c_id_page_body="page_body";
			this.c_id_page_footer="page_footer";
			this.c_location="location";
			this.c_id_editor="editor";
			this.c_data="data";
			this.c_Date="Date";
			this.c_cache="cache";
			this.c_extname="extname";
			this.c_filename="filename";
			this.c_statusCode="statusCode";
			this.c_srcParam="srcParam";
			this.c_regusername="regusername";
			this.attachment="attachment";
			this.ascii={
					LF:10,
					CR:13,
					SPACE:32,
					HYPHEN:45,
					COLON:58,
					A:97,
					Z:122
				};
			this.hide = "hide";
			this.lib = "com.ibm.bpo.";
			this.readonly = "readonly";
			this.value = "value";
			this.id = "id";
			this.name = "name";
			this.secondDiv = "secondDiv";
			this.thirdDiv  = ".thirdDiv";
			this.checkbox  = "checkbox";
			this.input  = "input";
			this.contentType_text_html="text/html";
			this.disabled  = "disabled";
			this.white  = "white";
			this.HPaneRadioList="HPaneRadioList";
			this.DOJO_ATTACH_POINT = "dojoAttachPoint";
			this.post_data_content_type="application/x-www-form-urlencoded";
			this.post_file_content_type="multipart/form-data";
			this.contentType="content-type";
			this.c_contentType="content-type";
			this.contentLength="content-length";
			this.setCookie='set-cookie';
			this.post="post";
			this.get="get";
			this.data="data";
			this.end="end";
			this.j_checkimg="j_checkimg";
			this.httpStatusCode200=200;
			this.httpStatusCode204=204;
			this.httpStatusCode302=302;
			this.httpStatusCode304=304;
			this.httpStatusCode400=400;
			this.httpStatusCode404=404;
			this.c_port_9080=9080;
		}
	}
);
dojo.createObject("com.easysoft.constant.Constant");