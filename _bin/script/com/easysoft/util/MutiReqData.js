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
dojo.provide("com.easysoft.util.MutiReqData");
dojo.declare( "com.easysoft.util.MutiReqData","com.easysoft.Widget",{
	m_necessary_url_list_index:0,
	m_necessary_url_list:[],
	create:function(){
		dojo.each(this.arr,function(k,v,i){
			this.m_necessary_url_list.push(dojo.conf.default_vm_ip+v);
		},this);
		this.requst_necessary_url();
	},
	requst_necessary_url:function(){
		if(this.m_necessary_url_list_index<this.m_necessary_url_list.length){
			this.tmp_obj = this.m_necessary_url_list[this.m_necessary_url_list_index];
			var uri = this.tmp_obj;
			dojo.requestHttp({
				uri:uri,
				onLoad:dojo.hitch(this,function(err,response){
					if(response.statusCode==$c.httpStatusCode200){
						this.requst_necessary_url();
						this.m_necessary_url_list_index++;
					}else{
						this.finish_requst_necessary_url();
					}
				})
			});
		}else{
			this.finish_requst_necessary_url();
		}
	},
	finish_requst_necessary_url:function(){
		if(this.parent[this.fname]){
			this.parent[this.fname]();
		}
	}
});