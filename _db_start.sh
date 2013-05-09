#!/bin/bash


shellPos=$( echo "$0" | sed -e 's/[^\/]*$//' )
cd $shellPos
source _common.sh

currentPath=`pwd`

port=$( echo "$currentPath" | sed -e 's/\/.*\///' )

currentPath=$( echo "$currentPath" | sed -e 's/[^\/]*$//' )

echoThis $currentPath

timestamp=`date '+%m_%d_%Y__%H_%M_%S'`

log_dir=`getLogHome`

mkdir -p $log_dir

log="${log_dir}/_start_mongo_${timestamp}.log"



echoThis "nohup ${DIR_MONGOD_DATEBASE_BIN}/mongod > $log 2>&1 & "

nohup ${DIR_MONGOD_DATEBASE_BIN}/mongod > $log 2>&1 & 


echoThis "start mongo database"
