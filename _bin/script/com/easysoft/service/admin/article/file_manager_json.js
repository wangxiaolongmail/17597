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
dojo.import("com.easysoft.service.Service");
dojo.provide("com.easysoft.service.admin.article.file_manager_json");
dojo.declare( "com.easysoft.service.admin.article.file_manager_json" , "com.easysoft.service.Service" , {
	templatePath:$c.c_templ_easysoft_service_Blank,
	create:function(){  
		this.attachSession(); 
		this.postMixInProperties();
	},
	do1:function(){
		var a= dojo.fs.readdirSync(this.m_path); 
		var list=[];
		var total_count=0;
		dojo.each(a,function(k,v,i){
			var filePath=this.m_path+"/"+v;
			var state = dojo.fs.statSync(filePath);
			var timestamp=dojo.getTimestamp( new Date(state.mtime) , "YYYY-MM-DD HH:MM:SS" );
			//console.log(state);
			var filetype=dojo.path.extname(v);
			if(dojo.hasArray(dojo.image_extname.split("|"),filetype)){
				total_count++;
				list.push({
					is_dir:false,
					has_file:false,
					filesize:state.size,
					dir_path:"",
					is_photo:true,
					filetype:filetype,
					filename:v,
					datetime:timestamp
				});
			}
		},this);
		this.m_out.file_list=list;
		this.m_out.total_count=total_count;
		this.result=dojo.toString(this.m_out);
	},
	postMixInProperties:function(){
		var current_url = this.queryString[$c.article_path]+"/image";
		this.m_path=dojo.dir+current_url;
		this.m_out={
			"moveup_dir_path": "",
			"current_dir_path": "",
			"current_url": current_url+"/",
			"total_count": 0,
			"file_list": []
		};
		dojo.fs_exists(this.m_path, dojo.hitch(this,function(exists){
			if(exists){
				this.do1();
			}else{
				this.result=dojo.toString(this.m_out);
			}
			this.attachTemplate();
			this.buildRendering();
			this.postCreate();
			this.echo(); 
		}));
	}
});