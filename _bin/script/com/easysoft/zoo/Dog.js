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
dojo.import("com.easysoft.Widget");
dojo.provide("com.easysoft.zoo.Dog");
dojo.declare( "com.easysoft.zoo.Dog" , "com.easysoft.Widget" , {
	postCreate:function(){ 
		this.req.url=dojo.domainParseUrl(this.req.url);
		this.bark(); 
	},
	queryString:{}, 
	queryForm:{},
	uploadForm:{},
	postData:"",
	runServer:function(){
		dojo.import(this.servletClass);
		var o=dojo.createObject(this.servletClass,
			{ 
				req:this.req , 
				res:this.res , 
				dog:this,
				queryString:this.queryString, 
				queryForm:this.queryForm, 
				uploadForm:this.uploadForm
			} 
		); 
	},
	__initQueryString:function(){
		this.queryString = dojo.querystring.parse(this.rawQueryString); 
	},
	__initQueryForm:function(){
		this.m_nread = 0;
		this.req.setEncoding('utf8');

		this.req.addListener($c.data, dojo.hitch(this,function(chunk) { 
			this.m_arrUploadData.push(chunk); 
			this.m_nread += chunk.length;
		})); 
		this.req.addListener($c.end , dojo.hitch(this,function(){
			var buffer = null;
			var buffers=this.m_arrUploadData;
			switch(buffers.length) {
				case 0: buffer = new Buffer(0);
					break;
				case 1: buffer = buffers[0];
					break;
				default:
					buffer = new Buffer(this.m_nread);
					for (var i = 0, pos = 0, l = buffers.length; i < l; i++) {
						var chunk = buffers[i];
						chunk.copy(buffer, pos);
						pos += chunk.length;
					}
				break;
			}
			this.queryForm = dojo.querystring.parse(buffer.toString(dojo.conf.default_charset));
			this.runServer(); 
		})); 
	},
	__initUploadForm:function(){
		this.m_countUploadBlock=0;
		this.m_is1stUpload=true;
		this.req.addListener($c.data, dojo.hitch(this,function(postDataChunk) { 
			this.m_countUploadBlock++;
			//console.log(this.m_countUploadBlock);
			this.m_arrUploadData.push(postDataChunk);
			
		})); 
		this.req.addListener($c.end , dojo.hitch(this,function(){
			
			var buf=this.m_arrUploadData[0];
			// first buf deal
			var indexStartPos = 0;
			var is2ndLineStart=0,is2ndLineEnd=0;
			var is3rdStart=0,is3rdEnd=0;
			for ( var i=0 , count=0 , len=buf.length; i<len && count<4 ; i++ ) {
				var c=buf[i];
				var next=buf[i+1];
				if(c==$c.ascii.CR&&next==$c.ascii.LF){
					count++;
				}
				if(is2ndLineStart===0&&count===1){
					is2ndLineStart=i;
				}
				if(is2ndLineEnd===0&&count===2){
					is2ndLineEnd=i;
				}
				if(is3rdStart===0&&count===2){
					is3rdStart=i+2;
				}
				is3rdEnd=i-2;
				indexStartPos=i;
			}
			indexStartPos++;
			indexStartPos++;
			
			var buf1=buf;
			//console.log(buf+"");
			var buf2 = new dojo.buffer.Buffer(is2ndLineEnd-is2ndLineStart);
			buf1.copy(buf2, 0, is2ndLineStart,is2ndLineEnd );
			//console.log(buf2);
			var s=buf2.toString('utf-8');
			
			var filename="untitle.txt";
			var newMap=dojo.querystring.parse(s,";");
			dojo.each(newMap,function(k,v,i){
				if(k.indexOf("filename")>=0){
					filename=v.substring(1,v.length-1);
				}
			});
			
			//var str_contentType=buf.toString('utf-8', is3rdStart, is3rdEnd);
			this.m_arrUploadData[0]=this.updateBuffer_start(buf,indexStartPos);
			
			// last buf deal
			var buf = this.m_arrUploadData[this.m_arrUploadData.length-1];
			var indexEndPos=0;
			for (var i = buf.length-1,icount=0 ; i >0 ; i-- ) {
				var c=buf[i];
				indexEndPos++;
				if(c==$c.ascii.CR){
					if(icount>0){
						break;
					}
					icount++;
				}
			}
			this.m_arrUploadData[this.m_arrUploadData.length-1]=this.updateBuffer_end(buf,indexEndPos);
			this.uploadForm.arrUploadData=this.m_arrUploadData;
			this.uploadForm.filename=filename;
			this.runServer();
		})); 
	},
	updateBuffer_start:function(buf,indexPos){
		var len=buf.length;
		var i=len-indexPos;
		var buf1 = buf;
		var buf2 = new dojo.buffer.Buffer(i);
		buf1.copy(buf2, 0, indexPos, len);
		return buf2;
	},
	updateBuffer_end:function(buf,endPos){
		var len=buf.length;
		var i=len-endPos;
		var buf1 = buf;
		var buf2 = new dojo.buffer.Buffer(i);
		buf1.copy(buf2, 0, 0, i);
		return buf2;
	},
	execRunServer:function(item,method){
		this.servletClass = item.servletClass;
		this.m_arrUploadData=[];
		this.__initQueryString();
		if(method===$c.post){ 
			if(this.req.headers[$c.c_contentType].indexOf($c.post_data_content_type)>-1){
				this.__initQueryForm(); 
			}else{
				this.__initUploadForm();
			}
		}else{ 
			this.runServer(); 
		} 
	},
	hasDynamicService:function(pathname){ 
		return dojo.each(dojo.route.dynamicServletMapping,function(k,item){ 
			var method = item.method||$c.get; 
			if( item.pathname === pathname && this.req.method.toLowerCase() === method ){ 
				this.execRunServer( item , method ); 
				return true;
			}else{ 
				return false;
			} 
		},this); 
	},
	bark : function(){ 
		var obj = dojo.url.parse(this.req.url);
		this.rawQueryString = obj.query;
		this.m_urlObject=obj;
		var pathname = obj.pathname;
		if( !this.hasDynamicService(pathname) ){
			dojo.each(dojo.route.staticServletMapping,function(k,item){ 
				if(item.pathname == pathname ){ 
					pathname=dojo.getModulePath(item.servletClass , "js" );
					return true; 
				}else{ 
					return false; 
				} 
			},this); 
			this.echo( pathname ); 
		}
	},
	echo:function(pathname){
		this.m_name=pathname;
		var o=dojo.getObject(this.m_name, false, dojo.mBuffer,"/");
		if(o){
			this.echoLast(o);
		}else{
			if(dojo.isSafePath(pathname)){
				this.findNotFile();
			}else{
				dojo.createWebFolder($c.c_widget_util_readWebFolder,{
					path:pathname,
					isModeFile:true,
					fn:dojo.hitch(this,function(err,o){
						if( err ){
							this.findNotFile();
						}else{
							var o = dojo.atm([$c.c_extname,dojo.path.extname(this.m_name),$c.c_cache,o[$c.c_cache],$c.c_Last_Modified,dojo.getTimestamp()]);
							
							dojo.setObject(this.m_name,o,d.mBuffer,"/");
							var a=dojo.route.noBufferList;
							for(var i=0;i<a.length;i++){
								var s = a[i];
								var re = new RegExp(s,"gi");
								var str = this.m_name;
								if(re.test(str)){
									dojo.setObject(str,null,d.mBuffer,"/");
									break;
								}
							}
							console.log(this.m_name);
							this.echoLast(o);
						}
					})
				});
			}
		}
	},
	findNotFile:function(err){
		this._findNotFile(this.res,err||"findNotFile");
	},
	echoLast:function(params){
		var params=params||{};
		var extname=params[$c.c_extname];
		if(!extname){
			if(params[$c.c_filename]){
				extname=dojo.path.extname(params[$c.c_filename]);
			}else{
				extname="";
			}
		}
		if(params[$c.c_Last_Modified]){
			var lastModified=this.req.headers[$c.c_IfModifiedSince];
			var header=dojo.atm([$c.c_contentType,dojo.getContentTypeByExtname(extname),$c.c_Last_Modified,params[$c.c_Last_Modified]]);
			if(lastModified&&lastModified==params[$c.c_Last_Modified]){
				this.res.writeHead( $c.httpStatusCode304 , header );
				this.res.end();
			}else{
				this.res.writeHead( $c.httpStatusCode200 , header );
				this.res.write( params[$c.c_cache]||"" , dojo.getEncodingByExtname(extname) );
				this.res.end();
			}
		}else{
			var header=dojo.atm([$c.c_contentType,dojo.getContentTypeByExtname(extname)]);
			this.res.writeHead( $c.httpStatusCode200 , header );
			this.res.write( params[$c.c_cache]||"" , dojo.getEncodingByExtname(extname) );
			this.res.end();
		}
	}
});
