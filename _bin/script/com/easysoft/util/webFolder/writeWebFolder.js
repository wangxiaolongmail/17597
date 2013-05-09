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
dojo.provide("com.easysoft.util.webFolder.writeWebFolder");
dojo.declare( "com.easysoft.util.webFolder.writeWebFolder","com.easysoft.Widget",{
	service:function(param){
		this.m_param=param;
		dojo.fs_exists(dojo.dir+this.m_param.path, dojo.hitch(this,function(exists){
			if(exists){
				dojo.fs.stat(dojo.dir+this.m_param.path,dojo.hitch(this,function(err,stat){
					if(err){
						this.m_param.fn("write_service dojo.fs.stat err"); 
					}else{
						var newFilename=dojo.getDefaultFileName()+dojo.EXT_HTML;
						this.m_uploadFilename=newFilename;
						this.m_tmpUploadFilename="_"+this.m_uploadFilename;
						dojo.fs.writeFile(dojo.dir+this.m_param.path+"/"+this.m_tmpUploadFilename,this.m_param.data,dojo.conf.default_charset,dojo.hitch(this,this._lastWrite));
					}
				}));
			}else{
				this.m_param.fn("write_service dojo.fs_exists err"); 
			}
		}));
	},
	_lastWrite_rename:function(){
		dojo.fs.rename(dojo.dir+this.m_param.path+"/"+this.m_tmpUploadFilename,dojo.dir+this.m_param.path+"/"+this.m_uploadFilename,dojo.hitch(this,function(err){
			dojo.setObject(this.m_param.path+"/"+$c.c_mobject,"",d.mBuffer,"/");
			dojo.setObject(dojo.getPPath(this.m_param.path)+"/"+$c.c_mListobject,"",d.mBuffer,"/");
			this.m_param.fn(err); 
		}));
	},
	_lastWrite:function(err){
		if(err){
			this.m_param.fn("_lastWrite err");
		}else{
			dojo.fs_exists(dojo.dir+this.m_param.path+"/"+this.m_uploadFilename, dojo.hitch(this,function(exists){
				if(exists){
					dojo.fs.unlink(dojo.dir+this.m_param.path+"/"+this.m_uploadFilename,dojo.hitch(this,function(err){
						if(err){
							this.m_param.fn("_lastWrite dojo.fs.unlink err");
						}else{
							this._lastWrite_rename();
						}
					}));
				}else{
					this._lastWrite_rename();
				}
			}));
		}
	}
});