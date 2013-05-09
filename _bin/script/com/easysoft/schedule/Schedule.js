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
 * Schedule widget.
 * 
 * @author wxlwang
 */
dojo.provide("com.easysoft.schedule.Schedule");
dojo.declare( "com.easysoft.schedule.Schedule" , "" , {
	create:function(){
		dojo.global.$t=this;
		var time = Math.ceil(1000/13) ; 
		this.m_queue = []; 
		this.m_leastTime = 1; 
		this.m_waitTime = time-this.m_leastTime; 
		this.i = 0; 
		this.work();
	},
	getRandomNumber:function( count ){
		return this.i%count;
	},
	work:function(){
		this.i++;
		var start = this.getMillisecond();
		while( true ){
			var msg = this.getMsg();
			dojo.run(msg);
			var rest =  this.m_waitTime + start - this.getMillisecond() ;
			if( !(msg && rest > 0) ) break;
		}
		var rest =  this.m_waitTime + start - this.getMillisecond() ;
		var rest = rest>0?rest:0;
		var rest = rest + this.m_leastTime;
		var delay = rest;
		setTimeout( function(){dojo.global.$t.work();},delay );
	},
	getMsg:function(){ 
		return this.m_queue.shift(); 
	},
	pushMsg:function(objName , methodName , param){ 
		this.m_queue.push({objName:objName , methodName:methodName , param:param}); 
	},
	getMillisecond:function(){ 
		return dojo.getMillisecond(); 
	}
});
dojo.createObject("com.easysoft.schedule.Schedule");