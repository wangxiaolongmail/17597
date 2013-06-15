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
console.log("require underscore");
dojo.underscore = require('underscore');
console.log("require underscore:"+dojo.underscore.VERSION);

dojo.JSON=JSON;

dojo.querystring = require("querystring");
dojo.process=process;

console.log("require nodemailer");
dojo.mail = require('nodemailer');

console.log("require socket.io");
dojo.socketio = require('socket.io');


console.log("require cheerio");
dojo.cheerio = require('cheerio');

console.log("require iconv-lite");
dojo.iconv = require('iconv-lite');

console.log("require mongodb");
dojo.mongodb = require('mongodb');

console.log("require canvas");
dojo.canvas = require('canvas');

console.log("require less");
dojo.less = require('less');




console.log("require request");
dojo.request = require('request');

console.log("require connect");
dojo.connect = require('connect');

console.log("require formidable");
dojo.formidable = require('formidable');


console.log("require async");
dojo.async = require('async');

console.log("require express");
dojo.express = require('express');



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
	var server = new dojo.mongodb.Server('localhost',27017,{auto_reconnect:true,max_pool_size:1});
	var conn = dojo.mongodb.Db('test',server);
	conn.open(function(err,db){
		if(!err){
			console.log("--conn db success--");
			dojo.db=db;
			var cmd = "main({'stored_method':'init'})";
			console.log('dojo.db.eval("'+cmd+'");');
			dojo.db.eval(cmd, function(err,obj){
					dojo.favorite_catlist=obj.favorite_catlist;
					dojo.cst=obj.cst;
					var C=obj.cst;
					var a=obj.i18n;
					dojo.i18n={};
					for(var i=0;i<a.length;i++){
						var o=a[i];
						dojo.i18n[o._id]=o.cn;
					}	
					var a=obj.module;
					for(var i=0;i<a.length;i++){
						var o=a[i];
						var op={};
						op[C.SERVLET_CLASS]=o[C.SERVLET_CLASS];
						op[C.PATH_NAME]=o[C.MODULE_URL];
						op[C.METHOD]=o[C.METHOD];
						dojo.route.dynamicServletMapping.push(op);	
					}
					dojo.fi18n=function(name){
						return dojo.i18n[name]||name;
					}
					dojo[C.METADATA]=obj[C.METADATA];
					dojo.debugInitData=obj;

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
