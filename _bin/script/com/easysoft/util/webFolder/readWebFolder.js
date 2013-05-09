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
dojo.provide("com.easysoft.util.webFolder.readWebFolder");
dojo.declare( "com.easysoft.util.webFolder.readWebFolder","com.easysoft.Widget",{
	service:function(param){
		this.m_param=param;
		dojo.fs_exists(dojo.dir+this.m_param.path, dojo.hitch(this,function(exists){
			if(exists){
				this._myReaddirList_service();
			}else{
				this.m_param.fn("readDirList_service dojo.fs_exists err"); 
			}
		}));
	},
	_myReaddirList_service:function(){
		dojo.fs.stat(dojo.dir+this.m_param.path,dojo.hitch(this,function(err,stat){
			if(err){
				this.m_param.fn("_myReaddirList_service dojo.fs.stat err"); 
			}else{
				if(stat.isDirectory()){
					if(this.m_param.isModeFile){
						this.m_param.fn("isModeFile err"); 
					}
					var mobject=dojo.getObject(this.m_param.path+"/"+$c.c_mobject,false, d.mBuffer,"/");
					if(mobject){
						this.m_param.fn("",mobject);
					}else{
						dojo.fs.readdir(dojo.dir+this.m_param.path,dojo.hitch(this,function(err,files){
							if(err){
								this.m_param.fn("_myReaddirList_service dojo.fs.readdir err"); 
							}else{
								this.m_list=[];
								this.m_files=files;
								this.m_files_index=0;
								this._getReadDirNewList();
							}
						})); 
					}
				}else{
					dojo.fs.readFile( dojo.dir+this.m_param.path , dojo.getEncodingByExtname(dojo.path.extname(this.m_param.path)) , dojo.hitch( this , function ( err , cache ) {
						if(err){
							this.m_param.fn("_lastReadServ dojo.fs.readFile err");
						}else{
							this.m_param.fn(err,dojo.atm(["article_filename",this.m_param.path,$c.c_cache,cache]));
						}
					}));
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
						if(!stat.isDirectory()){
							this.m_list.push({article_filename:this.m_filename,urlPath:this.m_param.path+"/"+this.m_filename});
						}
						this._getReadDirNewList();
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
		this.m_list=dojo.sortByFilename(this.m_list);
		var vv = this.m_list[0];
		if(vv){
			this.m_vv=vv;
			dojo.fs.readFile( dojo.dir+vv.urlPath , dojo.conf.default_charset , dojo.hitch( this , function ( err , data ) {
				if(err){
					this.m_param.fn("_lastReadServ dojo.fs.readFile err");
				}else{
					var obj=dojo.atm([	
												$c.c_article_filename,this.m_vv.article_filename,
												$c.c_cache,data,
												$c.c_Last_Modified,dojo.getTimestamp()
											]);
					dojo.setObject(this.m_param.path+"/"+$c.c_mobject,obj,d.mBuffer,"/");
					this.m_param.fn(err,obj);
				}
			}));
		}else{
			this.m_param.fn("",dojo.atm([ $c.c_article_filename,"", $c.c_cache,"" ]));
		}
	}
});