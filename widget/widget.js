	if(!window.console){
		window.console={};
		window.console.log=function(){};
	}
	var C={
		A:"A",
		HIDE:"hide",
		LOADING:"loadind",
		RECT16:"rect16",
		NONE:"none",
		DISPLAY:"display",
		DIV:"div",
		TR:"tr",
		TREE_NODE_LEAF:0,
		TREE_NODE_PLUS:1,
		TREE_NODE_MINUS:2
	},CUR={
		DEFAULT:"default",
		CROSSHAIR:"crosshair",
		MOVE:"move",
		W_RESIZE:"w-resize",
		N_RESIZE:"n-resize"
	},
	_d=document;
	var 
	C_DLQ=0,
	C_JXZ=1,
	C_DYS=2,
	C_YGB=3,
	C_YWT=4,
	C_WTGB=5;
	
	var colorObj=[
		{className:"k_dlq",text:"待领取"},
		{className:"k_jxz",text:"进行中"},
		{className:"k_dys",text:"待验收"},
		{className:"k_ygb",text:"已关闭"},
		{className:"k_ywt",text:"有问题"},
		{className:"k_wtgb",text:"问题关闭"}
	];
	function _each(a,f){
		for(var i=0;i<a.length;i++) {
			f(a[i],i,a);
		}
	}
	function _in_array(s,a){
		var flag=false;
		_each(a,function(v,k){
			if(v===s){
				flag=true;
			}
		});
		return flag;
	}
	function getTaskColorClass(cellvalue){
		return colorObj[cellvalue].className;
	}

	function getTaskStr(cellvalue){
		return colorObj[cellvalue].text;
	}

	function compareData( startData , endData ){
		var arr = startData.split("-");
		var starttime = new Date(arr[0], arr[1], arr[2]);
		var starttimes = starttime.getTime();
	
		var arrs = endData.split("-");
		var lktime = new Date(arrs[0], arrs[1], arrs[2]);
		var lktimes = lktime.getTime();
	
		if (starttimes >= lktimes) 
			return false;
		else
			return true;
	}
	
	function formatDate(format,dateObj)
	{
		var dateObj=dateObj||new Date();
		var o = {
		"M+" : dateObj.getMonth()+1, //month
		"d+" : dateObj.getDate(), //day
		"h+" : dateObj.getHours(), //hour
		"m+" : dateObj.getMinutes(), //minute
		"s+" : dateObj.getSeconds(), //second
		"q+" : Math.floor((dateObj.getMonth()+3)/3), //quarter
		"S" : dateObj.getMilliseconds() //millisecond
		}
		if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
		(dateObj.getFullYear()+"").substr(4- RegExp.$1.length));
		for(var k in o)if(new RegExp("("+ k +")").test(format))
		format = format.replace(RegExp.$1,
		RegExp.$1.length==1? o[k] :
		("00"+ o[k]).substr((""+ o[k]).length));
		return format;
	}
	 function changeDate(days){
		  var today=new Date(); // 获取今天时间
		  var begin;
		  var endTime;
		  today.setTime(today.getTime()+days*24*3600*1000);
		  begin = formatDate('yyyy-MM-dd',today);
		  return begin;
	}
	function nextMonthDay(today){
		var now = today.getDate();
		var year = today.getYear();
		if (year < 2000) year += 1900; // Y2K fix
		var month = today.getMonth();
		var month=month+1;
		if(month>12){
			month=1;
			year=year+1;
		}
		var monarr = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) monarr[1] = "29";
		return monarr[month];
	}
	function lastDay(today){
		var now = today.getDate();
		var year = today.getYear();
		if (year < 2000) year += 1900; // Y2K fix
		var month = today.getMonth();
		var monarr = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) monarr[1] = "29";
		return monarr[month]-now;
	}
	function getParentNodeByClass(_node,className){
		var list=[];
		var node=_node;
		var parentNode=null;
		while(node){
			if($(node).hasClass(className)){
				parentNode=node;
				break;
			}
			list.push(node.tagName);
			node=node.parentNode;
		}
		return {parentNode:parentNode,list:list};
	}
	function findParentClass(_node,className){
		var obj=getParentNodeByClass(_node,className);
		if(obj.parentNode){
			return true;
		}else{
			return false;
		}
	}
	function getNextElement(node){    
	    if(node.nextSibling.nodeType == 1){    //判断下一个节点类型为1则是“元素”节点   
	        return node.nextSibling;    
	    }    
	    if(node.nextSibling.nodeType == 3){      //判断下一个节点类型为3则是“文本”节点  ，回调自身函数  
	        return getNextElement(node.nextSibling);    
	    }    
	    return null;
	}
	function removeNode(n)
    {
	    return n.parentNode.removeChild(n);
    }
	function insertAfterNode(newNode,reforeNode)
    {
		var nextNode=getNextElement(reforeNode);
		var pnode=reforeNode.parentNode;
		if(nextNode){
			pnode.insertBefore(newNode,nextNode);
		}else{
			pnode.appendChild(newNode);
		}
    }
	function insertBeforeNode(newNode,reforeNode)
    {
		var node=reforeNode;
		var pnode=node.parentNode;
		pnode.insertBefore(newNode,node);
    }
	function isEmptyArray(arr)
    {
		return arr.length==0?true:false;
    }
	function getNodeId(node){
		return $(node).attr("id");
	}


(function($,_w,_d){
	
	var output={},data=null;
	output.create=_create;
	output.getHtml=_getHtml;
	_w.$cl=output;
	
	function _create( param ){
		_init(param);
		initFrame();
	}
	function _init(param){
		data=param;
	}
	function _getHtml(val){
		var a=[];
		a.push('<div class="k_box"><div class="k_sz '+getTaskColorClass(val)+'"></div></div>');
		a.push('<span>'+getTaskStr(val)+'</span>');
		return a.join("");
	}
	function initFrame(){
		var result=data.result;
		var a=[];

		a.push('<div class="taskQmFooter">');
		a.push('<div class="inner">');
			a.push('<div class="taskall">');
			var taskall="当前任务总数:<span class='txtLight'>"+result.allTask+"</span>个";
				taskall+="&nbsp;";
				taskall+="其中线索型任务<span class='txtLight'>"+result.xsTask+"</span>个";
				taskall+="/作业型任务<span class='txtLight'>"+result.zyTask+"</span>个";
			a.push(taskall);
			a.push('</div>');
			var list=[];
			list.push({type:C_DLQ,text:result.dlqTask+"个"});
			list.push({type:C_DYS,text:result.dysTask+"个"});
			list.push({type:C_YWT,text:result.ywtTask+"个"});
			list.push({type:C_JXZ,text:result.jxzTask+"个"});
			list.push({type:C_YGB,text:result.ygbTask+"个"});
			list.push({type:C_WTGB,text:result.wtgbTask+"个&nbsp;&nbsp;"});
			a.push('<div class="tasklist">');
			_each(list,function(item){
				a.push('<div class="k_box"><div class="k_sz '+colorObj[item.type].className+'"></div></div>');
				a.push('<div class="k_text">'+colorObj[item.type].text+item.text+'</div>');
			});
			a.push('<div>');
		a.push('<div>');
		a.push('<div>');
		$(".taskQmFooterWrap").empty().append(a.join(""));
	}
})($,window,document);

/*
	$dn.create({
		id:"#taskQmTable",
		tr:"ui-row-ltr",
		treeWrap:".tree-wrap",
		treeIconPlus:"tree-plus",
		treeIconMinus:"tree-minus",
		getVCL:function(){
			return [];
		},
		fn:function(params){
			$.ajax({
				url: "<c:url value='/js/extends/widget/dragResp.json'/>",
				async:false,
				type: "POST",
				data:params,
				cache:false,
				dataType:"json",
				success:function(data, textStatus, jqXHR){
					if(data.status=="success"){
						setTimeout(function(){$dn.finish(true);},500);
					}else{
						$dn.finish(false);
					}
				},
				error:function(){$dn.finish(false);}
			});
		}
	});
*/
(function($,_w,_d){
	
	var output={},data=null;
	output.create=_create;
	output.finish=_finish;
	_w.$dn=output;
	
	function _create( param ){
		initFrame();
		_init(param);
		addEvent();
	}
	function _init(param){
		data=param;
		data.node=null;
		data.seleted_node=null;
		data.isDown=false;
		data.isOpen=true;
		data.jBody=$(data.id);
		if($.browser.msie){
			data.jBody[0].onselectstart=function(){return false;};
		}else{
			data.jBody.css({
				"-moz-user-select":"none",
				"-webkit-user-select":"none",
				"user-select":"none"
			});
		}
		data.jMove=$("#move");
		data.nMoveTr=$('<tr class="moveTr"><td colspan="99"></td></tr>')[0];
	}
	function initFrame(){
		$("body").append("<div class='move hide' id='move'><table></table></div>"); 
	}
	function findNode(node){
		var obj=getParentNodeByClass(node,data.tr);
		return obj.parentNode;
	}
	function hasAnchor(node){
		var obj=getParentNodeByClass(node,data.tr);
		if(_in_array(C.A,obj.list)){
			return true;
		}else{
			return false;
		}
	}
	function findTreeChildNodeList(node,vnlist){
		var a=[];
		for(var i=0;i<999;i++){
			node=getNextElement(node);
			if($(node).css(C.DISPLAY)==C.NONE){
				a.push(node);
			}else{
				if( _in_array(getNodeId(node),vnlist) ){
					a.push(node);
				}else{
					break;
				}
			}
		}
		return a;
	}
	function getLastChild(node){

	}
	function setNodePad(node,width){
		var tmp=getTreeWrapNode(node);
		tmp.css({width:width});
		var left=width==0?width:width-18;
		$(C.DIV,tmp).css({left:left});
	}
	function isFamily(){
		return false;
	}
	function isTreeNodeState(node){
		var tmp=$(C.DIV,getTreeWrapNode(node));
		if(tmp.hasClass(data.treeIconPlus)){
			return C.TREE_NODE_PLUS;
		}else if(tmp.hasClass(data.treeIconMinus)){
			return C.TREE_NODE_MINUS;
		}else{
			return C.TREE_NODE_LEAF;
		}
	}
	function getTreeWrapNode(node){
		return $(data.treeWrap,$(node));
	}
	function adjustNodeLeft(){
		var src_width=getTreeWrapNode(data.node).width();
		var dest_width=getTreeWrapNode(data.seleted_node).width();
		var diff=dest_width-src_width;
		if( diff != 0 ){
			var width=dest_width;
			setNodePad(data.node,width);
			_each(data.src_childNodeList,function(node){
				setNodePad(node,width+18);
			});
		}
	}
	function findNewPos(){
		//debugger;
		var i=isTreeNodeState(data.seleted_node);
		if(i>0){
			removeNode(data.nMoveTr);
			var list=findTreeChildNodeList(data.seleted_node,data.dest_visibleChildList);
			if(!isEmptyArray(list)){
				var node=list.pop();
				insertAfterNode(data.nMoveTr,node);
				data.seleted_node=node;
			}else{
				insertAfterNode(data.nMoveTr,data.seleted_node);
			}
		}
	}
	function moveNewPos(){
		var newNode=removeNode(data.node);
		insertBeforeNode(newNode,data.nMoveTr);
		_each(data.src_childNodeList,function(item){
			insertBeforeNode(item,data.nMoveTr);
		});
		removeNode(data.nMoveTr);
	}
	function changeNodeOrder(){
		data.src_childNodeList=findTreeChildNodeList(data.node,data.src_visibleChildList);
		adjustNodeLeft();
		findNewPos();
		moveNewPos();
	}
	function _cleanup(){
		data.isDown=false;
		data.isOpen=true;
		data.jMove.addClass(C.HIDE);
		data.node=null;
		data.seleted_node=null;
	}
	function _finish(flag){
		if(flag){
			changeNodeOrder();
		}
		_cleanup();
	}
	function buildHtml(tr){
		var list=tr.children();
		var text=list.eq(3).text();
		var className=list.eq(2).attr("class");
		return "<table><tr>" +
			   "<td width='3' class='"+className+"'></td>" +
			   "<td width='18' class='hide'><div class='"+C.LOADING+" "+C.RECT16+"'></div></td>" +
			   "<td style='overflow:hidden;padding:0 3px'>"+text+"</td>" +
			   "</tr></table>";
	}
	function isPrepareSubmit(){
		data.src_visibleChildList  = data.getVCL(getNodeId(data.node));
		data.dest_visibleChildList = data.getVCL(getNodeId(data.seleted_node));
		if(_in_array(data.destId,data.src_visibleChildList)){
			return false;
		}else{
			return true;
		}
	}
	function getNextNodeId(node){
		var nextElement=getNextElement(node);
		if(nextElement){
			var order=getNodeId(nextElement);
		}else{
			var order="";
		}
	}
	function addEvent(){
		data.jBody.mousemove(function(e){
			if(!data.isDown) return;
			var n=findNode(e.target);
			if(n){
				if(data.seleted_node!=n ){
					data.seleted_node=n;
					var str=buildHtml($(data.node));
					data.jMove.removeClass(C.HIDE).empty().append(str).css({left:e.pageX,top:e.pageY});
					insertAfterNode(data.nMoveTr,data.seleted_node);
				}
			}
		});
		data.jBody.mousedown(function(e){
			if(data.isDown){
				return;
			};
			data.jPos=$(data.posId).position();
			data.node=null;
			data.seleted_node=null;
			var n=findNode(e.target);
			if(n){
				data.isDown=true;
				data.node=n;
				data.seleted_node=n;
				data.jBody.css({cursor:CUR.MOVE});
			}
		});
		$(_d).mouseup(function(e){
			data.jBody.css({cursor:CUR.DEFAULT});
			data.isDown=false;
			//console.log(hasAnchor(e.target));
			if(data.seleted_node!=null&&data.seleted_node!=data.node){
				data.isOpen=false;
				$(C.TR,data.jMove).children().eq(1).removeClass(C.HIDE);
				data.destId=getNodeId(data.seleted_node);
				data.srcId=getNodeId(data.node);
				if(isPrepareSubmit()){
					data.fn({srcId:data.srcId,destId:data.destId,pos:"2"});
				}else{
					_cleanup();
				}
			}
		});
	}
	
})($,window,document);


(function($,_w,_d){
	
	var output={},data=null;
	output.create=_create;
	_w.$tab=output;
	
	function _create( param ){
		initFrame();
		_init(param);
		addEvent();
	}
	function _init(param){
		data=param;
	}
	function initFrame(){
	}
	function addEvent(){
	}
	
})($,window,document);

(function($,_w,_d){
	
	var output={},data=null;
	output.create=_create;
	_w.$pd=output;
	function _create( param ){
		_init(param);
		initFrame();
		initMenu();
		addEvent();
	}
	function _init(param){
		data=param;
		data.isMore3Month=false;
		data.list=[
   			{key:"v_all",value:"全部"},
   			{key:"v_1_week",value:"最近一周"},
   			{key:"v_2_week",value:"最近二周"},
   			{key:"v_1_month",value:"最近一个月"},
   			{key:"v_2_month",value:"最近二个月"},
   			{key:"v_custom",value:"自定义"}
   		];
	}
	function initFrame(){
		var a=[];
		a.push('<div class="popupPane"  style="margin-top:3px;">');
	        a.push('<input type="hidden" name="flag" value="" />');
	        a.push('<input type="hidden" name="start_date" value="" />');
	        a.push('<input type="hidden" name="end_date" value="" />');
	        a.push('<div class="input">');
	            a.push('<table width="100%" border="0">');
	              a.push('<tr>');
	                a.push('<td class="text"></td>');
	                a.push('<td><div class="i_down"></div></td>');
	              a.push('</tr>');
	             a.push('</table>');
	        a.push('</div>');
	        a.push('<div class="pane hide">');
	            a.push('<div class="inner">');
	                a.push('<div class="duty"></div>');
	                a.push('<table width="100%" border="0">');
	                  a.push('<tr>');
	                    a.push('<td>&nbsp;</td>');
	                    a.push('<td>');
	                        a.push('<div class="btn blue save">查询</div>');
	                        a.push('<div class="pad"></div>');
	                        a.push('<div class="btn cancel">取消</div>');
	                    a.push('</td>');
	                  a.push('</tr>');
	                a.push('</table>');
	            a.push('</div>');
	        a.push('</div>');
	        a.push('<div class="pane2 hide">');
	            a.push('<div class="inner f_left">');
	            a.push('从');
	            a.push('</div>');
	            a.push('<div class="inner f_left">');
	                a.push('<input type="text" class="Wdate" id="d4321" onFocus="');
	                a.push('WdatePicker({maxDate:\'#F{$dp.$D(\\\'d4322\\\',{d:0});}\'})');
	                a.push('"/>');
	            a.push('</div>');
	            a.push('<div class="inner f_left">');
	            a.push('到');
	            a.push('</div>');
	            a.push('<div class="inner f_left">');
	                a.push('<input type="text" class="Wdate" id="d4322" onFocus="');
	                a.push('WdatePicker({minDate:\'#F{$dp.$D(\\\'d4321\\\',{d:0});}\'})');
	                a.push('"/>');
	            a.push('</div>');
	        a.push('</div>');
	    a.push('</div>');
	    $("."+data.wrap).append(a.join(""));
	}
	function submit_date(flag,start_date,end_date){
		if(data.isMore3Month){
			data.fn2();
		}else{
			data.fn();
		}
	}
	function setValue(val){
		$(".popupPane .text").empty().append(val);
	}
	function makeDate(){
		var flag=$(".popupPane input[name='flag']").val();
		var dd=new Date();
		var weekNum = dd.getDay();
		if(weekNum == 0) {
		  weekNum = 7;
		}
		var monthNum = dd.getDate();
		var dateStart1Week = 1 - weekNum;
		data.isMore3Month=false;
		if(flag=="v_1_week"){
			var dateEnd1Week = 7 - weekNum;
			var start_date=changeDate(dateStart1Week);
			var end_date=changeDate(dateEnd1Week);
		}else if(flag=="v_2_week"){
			var dateStart1Week = dateStart1Week;
			var dateEnd1Week = 14 - weekNum;
			var start_date=changeDate(dateStart1Week);
			var end_date=changeDate(dateEnd1Week);
		}else if(flag=="v_1_month"){
			var dateStart = -1*monthNum+1;
			var dateEnd = lastDay(dd);
			var start_date=changeDate(dateStart);
			var end_date=changeDate(dateEnd);
		}else if(flag=="v_2_month"){
			var dateStart = -1*monthNum+1;
			var dateEnd = lastDay(dd)+nextMonthDay(dd);
			var start_date=changeDate(dateStart);
			var end_date=changeDate(dateEnd);
		}else if(flag=="v_custom"){
			var start_date=$("#d4321").val();
			var end_date=$("#d4322").val();
			judge3Month(start_date,end_date);
		}else{
			var start_date="";
			var end_date="";
		}
		var s=start_date+","+end_date;
		$('#startEndDate').val(s);
		s=s.replace(/\-/g,"/");
		s=s.replace(",","-");
		if(s!="-"){
			setValue(s);
		}else{
			setValue("全部");
		}
	}
	function judge3Month(start_date,end_date){
		var startTime = (new Date(start_date)).getTime(); //得到毫秒数  
		var end_date = (new Date(end_date)).getTime(); //得到毫秒数  
		var stage=end_date-startTime;
		var dest=90*24*60*60*1000;
		if(stage>dest){
			data.isMore3Month=true;
		}else{
			data.isMore3Month=false;
		}
	}
	function setFlagValue(name,value){
		$("input[name='"+name+"']").val(value);
	}
	function getFlag(){
		return $(".popupPane input[name='flag']").val();
	}
	function initMenu(){
		var inner=$(".popupPane .pane .duty");
		var list=data.list;
		var a=[];
		a.push('<table width="100%" border="0">');
		_each(list,function(v){
			a.push('<tr class="col">');
			a.push('<td align="center"><input type="radio" name="taskRadio" value="'+v.key+'" /></td>');
			a.push('<td class="option">'+v.value+'</td>');
			a.push('</tr>');
		});
		a.push("</table>");
		inner.append(a.join(""));
		var opt=$(".popupPane .option").first().text();
		$(".popupPane .text").empty().append(opt);
		var opt=$(".popupPane input[type='radio']").first().attr("checked","checked");
		setFlagValue('flag',opt.val());
	}
	function hide(){
		$(".popupPane .pane").addClass(C.HIDE);
		$(".popupPane .pane2").addClass(C.HIDE);
	}
	function addEvent(){
		$('.popupPane .input').bind("click",function(event){
			var pos=$(this).position();
			var pane=$(".popupPane .pane");
			var pane2=$(".popupPane .pane2");
			var height=$('.popupPane .input').height();
			var width=$('.popupPane .input').width();
			pane.css({width:width,left:pos.left,top:pos.top+height+1});
			var flag=getFlag();
			if(pane.hasClass(C.HIDE)){
				pane.removeClass(C.HIDE);
				if(flag=="v_custom"){
					pane2.removeClass(C.HIDE);
				}else{
					pane2.addClass(C.HIDE);
				}
			}else{
				hide();
			}
		});
		$(".popupPane .pane .col").bind("click",function(){
			var val=$("input",$(this)).attr("checked","checked").val();
			var opt=$(".option",$(this)).text();
			if(val=="v_custom"){
				var pos=$(".popupPane .pane").position();
				var width=$(".popupPane .pane").width();
				var height=$(".popupPane .pane").height();
				$(".popupPane .pane2").removeClass(C.HIDE).css({height:height,left:pos.left+width,top:pos.top});
				
				var start_date=$("#d4321").val();
				if(!start_date){
					var start_date=formatDate('yyyy-MM-dd');
					var start_date=$("#d4321").val(start_date);
				}
				var start_date=$("#d4322").val();
				if(!start_date){
					var start_date=changeDate(1);
					var start_date=$("#d4322").val(start_date);
				}
			}else{
				$(".popupPane .pane2").addClass(C.HIDE);
			}
			setFlagValue('flag',val);
		});
		$(".popupPane .save").bind("click",function(){
			hide();
			makeDate();
			submit_date();
		});
		$(".popupPane .cancel").bind("click",function(){
			hide();
		});
		$(_d).bind("click",function(event){
			if(!findParentClass(event.target,"popupPane")){
				hide();
			}
		});
	}
})($,window,document);
