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
 * Widget widget.
 * 
 * @author wxlwang
 */
dojo.provide("com.easysoft.cmd.ipconfig"); 
dojo.declare( "com.easysoft.cmd.ipconfig" , "com.easysoft.Widget" , { 
	fn:function(ip){},
	getIpCmdLine:function(){
		if ($c.c_win32 == dojo.os.platform()) {  
			return "ipconfig"; 
		}  
		else {  
			return "ifconfig";
		}  
	},
	getIpHost:function(){
		if ($c.c_win32 == dojo.os.platform()) { 
			var matches = [];   
			var filterRE = /\b(IPv4|IP\s)[^:\r\r\n]+:\s+([^\s]+)/g;
			var pmHosts = [];    
			matches = this.pingResult.match(filterRE) || []; 
			var pmHost = null;  
			for (var i = 0; i < matches.length; i++) {  
				var host = matches[i].split(':')[1]; 
				host = host.replace(/(^[\s]*)|([\s]*$)/g,"");  
				pmHosts.push(host);  
			}  
			if (pmHosts.length > 0)  
				pmHost = pmHosts[0]; 
		}else {  
			var matches = [];
			var filterRE = /(inet\saddr):([^\s]+)/g;
			var pmHosts = [];    
			matches = this.pingResult.match(filterRE) || []; 
			dojo.each(matches,function(k,v,i){
				var a=v.split(":");
				pmHosts.push(a[1]);
			});
		} 
		return pmHosts;
	},
	create:function(){
		var getIPApp = undefined;  
		this.pingResult = "";
		getIPApp = dojo.child_process.spawn(this.getIpCmdLine(), null); 
		getIPApp.on($c.c_exit, dojo.hitch(this,function (code, signal) {
			this.fn(this.getIpHost()); 
		}));  
		getIPApp.stdout.on($c.c_data, dojo.hitch(this,function (data) {  
			this.pingResult = this.pingResult + data.toString();  
		})); 
	}
}); 