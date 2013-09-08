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
console.log("input params list:");
var input_port,DOMAIN_IP,DOMAIN_NAME,EXEC_PATH;
var a=process.argv;
var runPath="";
for(var i=0;i<a.length;i++,i++){
	console.log(i + ': ' + a[i]);
	console.log((i+1) + ': ' + a[i+1]);
	if(i==0){
		runPath=a[i]
	}
	if(i>=2){
		item=a[i];
		if(item=="-port"){
			input_port=a[i+1];
		}
		if(item=="-DOMAIN_IP"){
			DOMAIN_IP=a[i+1];
		}
		if(item=="-DOMAIN_NAME"){
			DOMAIN_NAME=a[i+1];
		}
		if(item=="-EXEC_PATH"){
			EXEC_PATH=a[i+1];
		}
	}
}

function tryRequire(name){

	try{
		console.log("require "+name);
		dojo[name] = require(name);
	}catch(err) {
		console.log(err.name);
		console.log(err.message);
	}finally {}

}

require("./_bin/script/dojo").dojo; 
var dojo = global.dojo;
var cst={};
dojo.fs = require("fs");
dojo.http = require("http");
dojo.https = require("https");
dojo.buffer = require("buffer");
dojo.path = require("path");
dojo.url = require("url");
dojo.child_process = require('child_process');
dojo.crypto = require("crypto");
dojo.os = require('os');
var runPathDir=dojo.path.dirname(runPath);
console.log(runPathDir);

dojo.JSON=JSON;

dojo.querystring = require("querystring");
dojo.process=process;

tryRequire('underscore');
tryRequire('nodemailer');
tryRequire('socket.io');
tryRequire('cheerio');
tryRequire('iconv-lite');
tryRequire('mongodb');
tryRequire('canvas');
tryRequire('less');
tryRequire('request');
tryRequire('connect');
tryRequire('formidable');
tryRequire('async');
tryRequire('express');



dojo.dir=__dirname;
dojo.__filename=__filename;
require("./_bin/script/dojos");
dojo.import("mime");
dojo.import("conf");
dojo.import("com.easysoft.zoo.Elephant");
console.log('This platform is ' + dojo.process.platform);
console.log('Version: ' + dojo.process.version);
dojo.conf.port=input_port||dojo.conf.port;
dojo.conf.DOMAIN_IP=DOMAIN_IP||dojo.conf.DOMAIN_IP;
dojo.conf.DOMAIN_NAME=DOMAIN_NAME||dojo.conf.DOMAIN_NAME;
dojo.conf.EXEC_PATH=EXEC_PATH||dojo.conf.EXEC_PATH;
console.log('Port: ' + dojo.conf.port);
console.log('__filename: ' + dojo.__filename);

function fn_conn_db(){
	var server = new dojo.mongodb.Server('17597.net',27017,{auto_reconnect:true,max_pool_size:1});
	var conn = dojo.mongodb.Db('test',server);
	conn.open(function(err,db){
		if(!err){
			console.log("--conn db success--");
			dojo.db=db;
			var cmd = "main({'stored_method':'init'})";
			console.log('dojo.db.eval("'+cmd+'");');
			dojo.db.eval(cmd, function(err,obj){
				dojo.route.dynamicServletMapping=obj.dynamicServletMapping;
				dojo.debugInitData=obj;
				global.C=obj.C;
				global.I18N=obj.I18N;
				global.URL=obj.URL;
				global.SCHEMA=obj[C.SCHEMA];
				global.ROLE=obj[C.ROLE];
				global.DICT=obj[C.DICT];
				global.PRI=obj[C.PRI];
			});
			dojo.createObject("com.easysoft.zoo.Elephant",{dir:dojo.dir});
		}else{
			console.log("--conn db err--");
			setTimeout(function(){
				console.log("=============exit=============");
			},3000);
		}
	});
}

fn_conn_db();
console.log(dojo.os.hostname());  
