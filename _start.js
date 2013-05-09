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
dojo.underscore = require(runPathDir+'/node_modules/underscore');
console.log("require underscore:"+dojo.underscore.VERSION);

dojo.JSON=JSON;

///dojo.process = require("process");
dojo.querystring = require("querystring");
dojo.process=process;

//dojo.mail = require("nodemailer");
console.log("require nodemailer");
dojo.mail = require(runPathDir+'/node_modules/nodemailer');

console.log("require socket.io");
dojo.socketio = require(runPathDir+'/node_modules/socket.io');


console.log("require cheerio");
dojo.cheerio = require(runPathDir+'/node_modules/cheerio');

console.log("require iconv-lite");
dojo.iconv = require(runPathDir+'/node_modules/iconv-lite');

console.log("require mongodb");
dojo.mongodb = require(runPathDir+'/node_modules/mongodb');

console.log("require canvas");
dojo.canvas = require(runPathDir+'/node_modules/canvas');

console.log("require less");
dojo.less = require(runPathDir+'/node_modules/less');



function fn_conn_db(){
	var server = new dojo.mongodb.Server('localhost',27017,{auto_reconnect:true,max_pool_size:1});
	var conn = dojo.mongodb.Db('test',server);
	conn.open(function(err,db){
		if(!err){
			console.log("--conn db success--");
			dojo.db=db;
		}else{
			console.log("--conn db err--");
		}
	});
}

fn_conn_db();

console.log("require request");
dojo.request = require(runPathDir+'/node_modules/request');

console.log("require connect");
dojo.connect = require(runPathDir+'/node_modules/connect');

console.log("require formidable");
dojo.formidable = require(runPathDir+'/node_modules/formidable');


console.log("require async");
dojo.async = require(runPathDir+'/node_modules/async');

console.log("require express");
dojo.express = require(runPathDir+'/node_modules/express');



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
dojo.createObject("com.easysoft.zoo.Elephant",{dir:dojo.dir});
console.log(dojo.os.hostname());  