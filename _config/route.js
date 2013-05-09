;(function(){
	dojo.domainParseUrl=function(url){
		if(url.indexOf("/wz/")==0){
			var a=url.split("/");
			s="/wz?i="+a[2];
			url=s;
		}
		if(url.indexOf("/go/")==0){
			var a=url.split("/");
			if(a.length>3){
				s="/go?i="+a[2]+"&ti="+a[3];
			}else{
				s="/go?i="+a[2];
			}
			url=s;
		}
		return url;
	};
	dojo.route={
		dynamicServletMapping:[
			{ pathname:"/",servletClass:"com.easysoft.service.Index" },
			{ pathname:$c.c_url_001_709,servletClass:"com.easysoft.service.admin.article.file_manager_json"},
			{ pathname:$c.c_url_maodan_login,servletClass:"com.maodan.service.Login"},
			{ pathname:$c.c_url_maodan_logining,servletClass:"com.maodan.service.Logining",method:"post"},
			{ pathname:$c.c_url_maodan_admin_start,servletClass:"com.maodan.service.admin.Start"},
			{ pathname:$c.c_url_maodan_admin_exit,servletClass:"com.maodan.service.admin.Exit"},
			{ pathname:$c.c_url_maodan_admin_favorite,servletClass:"com.maodan.service.admin.favorite.Favorite"},
			
			{ pathname:$c.c_url_001_010,servletClass:"com.easysoft.service.CheckImg" },
			{ pathname:$c.c_url_001_001,servletClass:"com.easysoft.service.admin.article.saveArticle",method:"post"},
			{ pathname:$c.c_url_001_008,servletClass:"com.easysoft.service.admin.article.getArticleHistoryList"},
			{ pathname:$c.c_url_001_007,servletClass:"com.easysoft.service.admin.article.getArticle"},
			{ pathname:$c.c_url_001_006,servletClass:"com.easysoft.service.admin.article.historyArticle"},
			{ pathname:$c.c_url_001_002,servletClass:"com.easysoft.service.admin.article.addArticle"},
			{ pathname:$c.c_url_001_004,servletClass:"com.easysoft.service.admin.article.cloneArticle"},
			{ pathname:$c.c_url_001_003,servletClass:"com.easysoft.service.admin.article.deleteArticle"},
			{ pathname:$c.c_url_001_005,servletClass:"com.easysoft.service.admin.article.previewArticle"},
			{ pathname:$c.c_url_001_011,servletClass:"com.easysoft.service.admin.log.getLogList"},
			{ pathname:$c.c_url_001_700,servletClass:"com.easysoft.service.admin.Exit"},
			{ pathname:$c.c_url_001_701,servletClass:"com.easysoft.service.admin.Index"},
			{ pathname:$c.c_url_001_702,servletClass:"com.easysoft.service.Logining",method:"post"},
			{ pathname:$c.c_url_001_703,servletClass:"com.easysoft.service.Login"},
			{ pathname:$c.c_url_001_704,servletClass:"com.easysoft.service.admin.article.manageDatabase"},
			{ pathname:$c.c_url_001_705,servletClass:"com.easysoft.service.admin.article.manageArticle"},
			{ pathname:$c.c_url_001_706,servletClass:"com.easysoft.service.admin.log.MemoryLog"},
			{ pathname:$c.c_url_001_707,servletClass:"com.easysoft.service.Error"},
			{ pathname:$c.c_url_001_708,servletClass:"com.easysoft.service.admin.article.KindEditorUploading",method:"post"},
			{ pathname:$c.c_url_001_712,servletClass:"com.easysoft.service.admin.PageBuffer"},
			{ pathname:$c.c_url_001_713,servletClass:"com.easysoft.service.admin.memoryData"},
			{ pathname:$c.c_url_001_714,servletClass:"com.easysoft.service.StopHttpServer"},
			{ pathname:$c.c_url_001_715,servletClass:"com.easysoft.service.Backup"},
			
			{ pathname:$c.c_url_002_001,servletClass:"com.maodan.service.registerUser"},
			{ pathname:$c.c_url_002_002,servletClass:"com.maodan.service.registerUsering",method:"post"},
			
			{ pathname:$c.c_url_003_001,servletClass:"com.worklight.service.Index"},
			{ pathname:$c.c_url_003_002,servletClass:"com.worklight.service.Login"},
			{ pathname:$c.c_url_003_003,servletClass:"com.worklight.service.PscLogin"},
			
			
			{ pathname:$c.c_url_004_001,servletClass:"com.mobile.service.Login"},
			
			
			
			{ pathname:$c.c_url_client_dojo_min,servletClass:"com.easysoft.service.dojo_min"},
			{ pathname:$c.c_url_client_easysoft_admin_widget_min,servletClass:"com.easysoft.service.admin.widget_min"},
			{ pathname:$c.c_url_client_easysoft_admin_css_min,servletClass:"com.easysoft.service.css_min"},
			{ pathname:$c.c_url_001_012,servletClass:"com.easysoft.service.admin.clearPageBuffer"}
		],
		staticServletMapping:[
		]
	};
})();
