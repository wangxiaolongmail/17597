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
 * Test widget.
 * 
 * @author wxlwang
 */
dojo.provide("com.easysoft.client.test.Test_Upload"); 
dojo.declare( "com.easysoft.client.test.Test_Upload" , "com.easysoft.client.control.Control" , {
	templatePath:"com.easysoft.client.test.templates.Test_Upload", 
	isCreateTemplate:true,
	
	__createTemplateDom:function(){
		/*
		<div>
			Test Upload
			<br/>
			<div dojoAttachPoint="nodeIframeWrap"></div>
			<br/>
			<div dojoAttachPoint="nodeInputWrap"></div>
			<a dojoAttachPoint="nodeBrowse" >browse</a>
			<a dojoAttachPoint="nodeSubmit" >submit</a>
		</div>
		*/
		var dom=dojo.create("div",{value:""},null);
		this.nodeMap.nodeIframeWrap=dojo.create("div",null,dom);
		this.nodeMap.nodeInputWrap=dojo.create("div",null,dom);
		this.nodeMap.nodeBrowse=dojo.create("a",{innerHTML:"browse"},dom);
		this.nodeMap.nodeSubmit=dojo.create("a",{innerHTML:"submit"},dom);
		return dom;
	},
	postCreate:function(){
		this.nodefilename=dojo.create("input",{value:""},this.nodeMap.nodeInputWrap);
		this.onInit();
		this.bindEvent("nodeBrowse","click",this.onBrowse);
		this.bindEvent("nodeSubmit","click",this.onSubmit);
	},
	onBrowse:function(){
		var doc = dojo.iframeDoc(this.nodeiframe);
		var inputfile=dojo.byId("inputfile",doc);
		inputfile.click();
		if(dojo.isIE){
			var arr = inputfile.value.split("\\");
			this.nodefilename.value=arr[arr.length-1];
		}else{
			if(!this.down){
			this.down=true;
				dojo.bindEvent(inputfile,"change",dojo.hitch(this,function(){
					this.nodefilename.value=inputfile.value;
				}));
			}
		}
	},
	onInit:function(){
		this.down=false;
		this.nodeiframe=dojo.create("iframe",{src:"/upload"},this.nodeMap.nodeIframeWrap);
		this.nodefilename.value="";
	},
	onSubmit:function(){
		if(this.nodefilename.value==""){
			return;
		}
		var doc = dojo.iframeDoc(this.nodeiframe);
		var inputsubmit=dojo.byId("inputsubmit",doc);
		var uploadform=dojo.byId("uploadform",doc);
		uploadform.action="/uploading?f="+this.nodefilename.value;
		inputsubmit.click();
		//setTimeout(dojo.hitch(this,this.onTimer),1000);
		this.onInit();
	},
	onTimer:function(){
	}
});