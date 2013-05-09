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
dojo.provide("com.easysoft.util.webFolder.getWebFileList");
dojo.declare( "com.easysoft.util.webFolder.getWebFileList","com.easysoft.Widget",{
	_initParam:function(param){
		var path=param.path;
		this.m_mapping=param.mapping||[];
		this.urlPath=path;
		this.m_path=dojo.dir+param.path;
		var extname=dojo.EXT_HTML;
		this.m_fn=param.fn;
		this.m_extname=param.extname||extname;
	},
	service:function(param){
		console.log("getWebFileList");
		this._initParam(param);
		dojo.fs_exists(this.m_path, dojo.hitch(this,function(exists){
			if(exists){
				this._myReaddirList_service();
			}else{
				this.m_fn("readDirList_service dojo.fs_exists err"); 
			}
		}));
	},
	_myReaddirList_service:function(){
		dojo.fs.stat(this.m_path,dojo.hitch(this,function(err,stat){
			if(err){
				this.m_fn("_myReaddirList_service dojo.fs.stat err"); 
			}else{
				if(stat.isDirectory()){
					dojo.fs.readdir(this.m_path,dojo.hitch(this,function(err,files){
						if(err){
							this.m_fn("_myReaddirList_service dojo.fs.readdir err"); 
						}else{
							this.m_list=[];
							this.m_files=files;
							this.m_files_index=0;
							this._getReadDirNewList();
						}
					})); 
				}else{
					this.m_fn("",[]);
				}
			}
		}));
	},
	_getReadDirNewList:function(){
		if(this.m_files_index<this.m_files.length){
			var name = this.m_files[this.m_files_index];
			this.filePath=this.m_path+"/"+name;
			this.article_filename=name;
			this.m_files_index++;
			if(dojo.isSafeFile(name)){
				this._getReadDirNewList();
			}else{
				dojo.fs.stat(this.filePath,dojo.hitch(this,function(err,stat){
					if(err){
						this._getReadDirNewList();
					}else{
						if(stat.isDirectory()){
							this._getReadDirNewList();
						}else{
							var filename=dojo.path.basename(this.filePath);
							this.m_tmpObject={article_filename:this.article_filename,isDirectory:stat.isDirectory(),urlPath:this.urlPath+"/"+filename,filename:filename,filePath:this.filePath};
							dojo.fs.readFile( this.filePath , dojo.conf.default_charset , dojo.hitch( this , function ( err , data ) {
								if(err){
									this._getReadDirNewList();
								}else{
									this.m_list.push(this.m_tmpObject);
									var obj=dojo.mpto(data,this.m_mapping);
									dojo.mixin(this.m_tmpObject,obj);
									this._getReadDirNewList();
								}
							}));
						}
					}
				}));
			}
		}else{ 
			this._lastReadDirServ();
		}
	},
	_lastReadDirServ:function(){
		var a=dojo.sortByFilename(this.m_list);
		a.shift();
		this.m_fn(null,a);
	}
});