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
dojo.provide("com.easysoft.util.UploadFile");
dojo.declare( "com.easysoft.util.UploadFile","com.easysoft.Widget",{
	copyFile:function(){
		var filename=this.uploadForm.filename;
		var timeStamp=dojo.getTimestamp();
		this.m_uploadFilename=timeStamp+"_"+filename;
		this.m_tmpUploadFilename="_"+this.m_uploadFilename;
		this.m_strUploadPath=this.m_path+"/";
		this.m_arrUploadData=this.uploadForm.arrUploadData;
		dojo.fs.open(this.m_strUploadPath+this.m_tmpUploadFilename,"w+",0666,dojo.hitch(this,function(err,fd){
			if (err) {
				this.m_fn(true);
			}else{
				this.m_fd=fd;
				this.m_iSaveCount=0;
				this.saveUploadFile(null,0);
			}
		}));
	},
	service:function(param){
		this.m_urlPath=param.path;
		this.m_path=dojo.dir+this.m_urlPath;
		this.m_fn=param.fn;
		this.uploadForm=param.uploadForm;
		console.log("service");
		console.log(this.m_path);
		dojo.fs_exists(this.m_path, dojo.hitch(this,function(exists){
			if(exists){
				this.copyFile();
			}else{
				dojo.fs.mkdir(this.m_path,0755,dojo.hitch(this,function(){
					this.copyFile();
				}));
			}
		}));
	},
	saveUploadFile:function(err, written){
		if(err) {
			this.m_fn(true);
		}else{
			if(this.m_iSaveCount<this.m_arrUploadData.length){
				var buf=this.m_arrUploadData[this.m_iSaveCount];
				this.m_iSaveCount++;
				dojo.fs.write(this.m_fd,buf,0,buf.length,null,dojo.hitch(this,this.saveUploadFile));
			}else{
				dojo.fs.close(this.m_fd,dojo.hitch(this,function(){
					dojo.fs.rename(this.m_strUploadPath+this.m_tmpUploadFilename,this.m_strUploadPath+this.m_uploadFilename,dojo.hitch(this,function(err){
						if(err){
							this.m_fn(true);
						}else{
							this.m_fn(false,{"error":0,"message":".....","url":this.m_urlPath+"/"+this.m_uploadFilename});
						}
					}));
				}));
			}
		}
	}
});