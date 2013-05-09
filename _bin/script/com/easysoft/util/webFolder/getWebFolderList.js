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
dojo.provide("com.easysoft.util.webFolder.getWebFolderList");
dojo.declare( "com.easysoft.util.webFolder.getWebFolderList","com.easysoft.Widget",{
	service:function(param){
		this.m_param=param;
		this.m_list=[];
		var mobject=dojo.getObject(this.m_param.path+"/"+$c.c_mListobject,false,d.mBuffer,"/");
		if(mobject){
			this.m_param.fn("",mobject);
		}else{
			dojo.fs_exists(dojo.dir+this.m_param.path, dojo.hitch(this,function(exists){
				if(exists){
					this._myReaddirList_service();
				}else{
					this.m_param.fn("service dojo.fs_exists err"); 
				}
			}));
		}
	},
	_myReaddirList_service:function(){
		dojo.fs.stat(dojo.dir+this.m_param.path,dojo.hitch(this,function(err,stat){
			if(err){
				this.m_param.fn("_myReaddirList_service dojo.fs.stat err"); 
			}else{
				if(stat.isDirectory()){
					dojo.fs.readdir(dojo.dir+this.m_param.path,dojo.hitch(this,function(err,files){
						if(err){
							this.m_param.fn("_myReaddirList_service dojo.fs.readdir err"); 
						}else{
							this.m_files=files;
							this.m_files_index=0;
							this._getReadDirNewList();
						}
					})); 
				}else{
					this.m_param.fn("",[]);
				}
			}
		}));
	},
	_getReadDirNewList:function(){
		if(this.m_files_index<this.m_files.length){
			this.m_filename=this.m_files[this.m_files_index];
			this.m_files_index++;
			if(!dojo.isSafeFile(this.m_filename)){
				dojo.fs.stat(dojo.dir+this.m_param.path+"/"+this.m_filename,dojo.hitch(this,function(err,stat){
					if(err){
						console.log("_getReadDirNewList dojo.fs.stat err");
					}else{
						if(dojo.isWebFolder(stat.isDirectory(),this.m_filename)){
							this.m_tmpObject={urlPath:this.m_param.path+"/"+this.m_filename};
							dojo.createWebFolder($c.c_widget_util_readWebFolder,{
								path:this.m_tmpObject.urlPath,
								fn:dojo.hitch(this,function(err,o){
									if( err ){
										console.log(this.m_tmpObject.urlPath);
										console.log("getWebFolderList.js>_getReadDirNewList>dojo.createWebFolder>"+err);
										this._getReadDirNewList();
									}else{
										this.m_list.push(this.m_tmpObject);
										var obj=dojo.mpto(o[$c.c_cache],this._getMappingByPath(this.m_param.path));
										dojo.mixin(this.m_tmpObject,obj);
										this.m_tmpObject[$c.c_article_filename]=o[$c.c_article_filename];
										this._getReadDirNewList();
									}
								})
							});
						}else{
							this._getReadDirNewList();
						}
					}
				}));
			}else{
				this._getReadDirNewList();
			}
		}else{ 
			this._lastReadDirServ();
		}
	},
	_lastReadDirServ:function(){
		var a=this.m_list;
		var a=a.sort(function(x,y){
			var i1=parseInt(x[$c.c_article_pri]||0);
			var i2=parseInt(y[$c.c_article_pri]||0);
			if( i1 < i2 ){
				return 1;
			}else{
				return -1;
			}
		});
		var o=dojo.atm([$c.c_cache,a,$c.c_Last_Modified,dojo.getTimestamp()]);
		dojo.setObject(this.m_param.path+"/"+$c.c_mListobject,o,d.mBuffer,"/");
		this.m_param.fn(null,o);
	},
	_getMappingByPath:function(path){
		if(path.indexOf(dojo.conf.default_article)>=0){
			if(path.indexOf("/"+$c.c_favorite)>=0){
				return [$c.c_article_title,$c.c_category,$c.c_article_url,$c.c_article_pri];
			}else if(path.indexOf("/"+$c.c_article)>=0){
				return [$c.c_article_title,$c.c_category];
			}else{
			}
		}else{
			if(path.indexOf("/"+$c.c_user)>=0){
				return [$c.c_article_title,$c.c_user_name,$c.c_user_password];
			}else{
			}
		}
		return [$c.c_article_title];
	}
});