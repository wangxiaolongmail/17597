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
 * dojos widget.
 * 
 * @author wxlwang
 */
;(function(){
	var d = dojo;
	d.mixin(d,{
		BIN:"bin",
		CONFIG:"config",
		CHECH_IMG:"checkImg",
		sessionList:{},
		sessionMaxage:20,
		DATABASE:"database",
		log_list:[],
		mBuffer:{}
	});
	function _log(o){
		console.log(o);
		d.log_list.push({"information":o});
	};
	function _getRealLocalPath(basePath,moduleName,ext){ 
		return dojo.dir+basePath+dojo.getModulePath( moduleName , ext ); 
	};
	function _readSync ( moduleName , ext ){
		var ext = ext || d.EXT_JS;
		var path   = dojo.getModulePath( moduleName , ext ); 
		if( moduleName.indexOf("com.")===0 ){ 
			var basePath = "/_"+d.BIN+"/"+d.SCRIPT+"/"; 
		}else if(moduleName.indexOf("theme.")===0){
			var basePath = "/";
		}else{ 
			var basePath = "/_"+d.CONFIG+"/"; 
		} 
		path = _getRealLocalPath(basePath,moduleName,ext);
		var text= dojo.fs.readFileSync( path , d.UTF8 ); 
		return text;
	};
	function _importTemplate ( moduleName ){ 
		if( !!!d.loadedTemplates[moduleName] ){ 
			_log("importTemplate:"+moduleName);
			var text = _readSync( moduleName , d.EXT_HTML ); 
			d.loadedTemplates[moduleName] = text; 
		}else{ 
			var text = d.loadedTemplates[moduleName];
		} 
		return text; 
	};
	function _requireTemplate(moduleName){
		return _importTemplate ( moduleName );
	}
	function _import ( moduleName ){
		if( !!!d.loadedModules[moduleName] ){ 
			d.loadedModules[moduleName] = true;
			_log( "import:"+moduleName );
			var text=_readSync( moduleName , d.EXT_JS ); 
			eval( text ); 
		}
	}
	function _require( moduleName ){ 
		_import(moduleName);
	}
	function _getSessionId(){
		return dojo.getTimestamp();
	}
	function _getEncodingByExtname( extname ){
		var flag =  dojo.hasArray( dojo.binary_extname.split("|") , extname||"" ); 
		return flag?dojo.conf.default_binary:dojo.conf.default_charset; 
	}
	function _isSafeFile(v){
		if(v[0]&&v[0]==="_")
			return true;
		else
			return false;
	}
	function _isSafePath(pathname){
		return dojo.each(pathname.split("/"),function(k,v,i){
			return _isSafeFile(v);
		});
	}
	function _objUploadFile(hash){
		var moduleName="com.easysoft.util.UploadFile";
		dojo.import(moduleName);
		var obj=dojo.createObject(moduleName);
		obj.service(hash);
	}
	
	function _fs_exists( path , fn ){
		if(dojo.fs.exists){
			dojo.fs.exists(path, fn);
		}else{
			dojo.path.exists(path, fn);
		}
	}
	function _createWebFolder(widgetName,hash){
		dojo.import(widgetName);
		var obj=dojo.createObject(widgetName);
		obj.service(hash);
	}
	function _requestHttp(param)
	{
		var opts = {},
		data = param.data || "",
		method = param.method || "GET",
		headers = param.headers || {},
		callback = param.onLoad||function(){},
		uri = param.uri;
		//console.log(method+":"+uri);
		if(uri.indexOf("http")!=0){
			uri="http://"+uri;
		}
		var curl = dojo.url.parse(uri);
		var web=curl.protocol=="http:"? dojo.http: dojo.https;
		//澶勭悊璇锋眰澶�
		//"Content-Type":"text/html; charset=utf-8",
		var header = {
			"Accept":"*/*",
			"Accept-Language":"zh-CN",
			"Connection":"Keep-Alive",
			"Cookie":"",
			"Referer":"",
			"User-Agent":"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C)"
		};
		var header ={};
		for(var key in header){
			if(!headers[key])headers[key] = header[key];
		}
		if(method.toLowerCase() == "post") {
			headers["Content-Length"] = data.length;
			headers["Content-Type"] = "application/x-www-form-urlencoded";
		}
		if(method.toLowerCase() == "put") {
			headers["Content-Length"] = data.length;
		}
		if(method.toLowerCase() == "delete") {
			headers["Content-Length"] = data.length;
		}
		//缁勭粐鍙傛暟
		opts.path = curl.path;
		opts.host = curl.host;
		opts.port = curl.protocol=="http:"? 80: 443;
		opts.method = method;
		opts.headers = headers;
		//console.log(opts);
		//璇锋眰寮�濮�
		web.request(opts,function(res){
			var chunk=[];
			//璇诲彇鏁版嵁
			res.on("data",function(d){
				chunk.push(d);
			}).on("end",function(){
				//璁剧疆澶�
				header["Referer"]=uri;
				if(res.headers["set-cookie"]) {
					if(header['Cookie']==''){
						header['Cookie']=res.headers["set-cookie"];
					}else{
						header['Cookie']+=','+res.headers["set-cookie"];
					}
				}
					callback("",dojo.atm([$c.c_params,dojo.clone(param),$c.c_headers,dojo.clone(res[$c.c_headers]),$c.c_responseText,chunk.join(""),$c.c_statusCode,res.statusCode]));
				
			});
		}).on("error",function(e){
			//console.log("Got error: " + e.message);
			callback(e,{});
		}).end(data);
	}
	function _md5(s){
		return dojo.crypto.createHash("md5").update(s).digest('hex');
	}
	function _sha1(k,s){
		return dojo.crypto.createHmac("sha1",k).update(s).digest("base64");
	}
	function _getClientIp(req) {
		var ipAddress;
		var forwardedIpsStr = req.header('x-forwarded-for'); 
		if (forwardedIpsStr) {
			var forwardedIps = forwardedIpsStr.split(',');
			ipAddress = forwardedIps[0];
		}
		if (!ipAddress) {
			ipAddress = req.connection.remoteAddress;
		}
		return ipAddress;
	};
	function _getLastModified(){
		return ''+d.getTimestamp();
	}
	function _prepareData(obj,fname,arr){
		dojo.createObject($c.c_widget_util_MutiReqData,{
			arr:arr,
			parent:obj,
			fname:fname
		});
	}
	function _sendMail( obj , fn ){
		
		var smtpTransport = dojo.mail.createTransport("SMTP", {

			host: "smtp.163.com",

			secureConnection: false,

			port: 25,

			auth: {

				user: "net17597@163.com",

				pass: "ws123456"

			}

		});

		
		var stss=obj.title||"no title";
		var buf = new dojo.buffer.Buffer( stss,'binary');
		var s = dojo.iconv.decode(buf, 'GBK'); //return unicode string from GBK encoded bytes

		//var s = dojo.iconv.encode(str, 'GBK');//return GBK encoded bytes from unicode string
		
		var mailOptions = {

				from: "wangxiaolongmail@163.com", //这儿有一个限制，不能像.NET那样随便起显示名了，所以这儿要和auth里面的user，以及envelope里面的from都保持一致              

				to: "13718717517@139.com",

				subject: s,

				generateTextFromHTML: true,

				html: "test" //此处的toString很有必要，如果要引用附件中的嵌入式图片时不加这个方法会报错。此处也可以引用另一个组件node-email-templates以通过邮件模板（ejs页面模板）来生产内容。

		}
		console.log("------------" );
		console.log("send mail..." );
		var fn=fn||function(){};
		smtpTransport.sendMail( mailOptions, fn );
		/*
		smtpTransport.sendMail(mailOptions, function (error, response) {

			if (error) {

            	console.log(error );

			} else {

				console.log("Message sent: " + response.message );

			}

		});
		*/
	}
	dojo.prepareData=_prepareData;
	dojo.getLastModified=_getLastModified;
	dojo.getClientIp=_getClientIp;
	dojo.sha1=_sha1;
	dojo.md5=_md5;
	dojo.log=_log;
	d.requestHttp=_requestHttp;
	d.createWebFolder=_createWebFolder;
	d.objUploadFile=_objUploadFile;
	d.fs_exists=_fs_exists;
	d.isSafeFile=_isSafeFile;
	d.isSafePath=_isSafePath;
	d.getEncodingByExtname=_getEncodingByExtname;
	d.require = _require;
	d.getSessionId = _getSessionId;
	d.import=_import;
	d.importTemplate=_importTemplate;
	d.requireTemplate=_requireTemplate;
	d.getRealLocalPath=_getRealLocalPath;
	d.sendMail=_sendMail;
})();
