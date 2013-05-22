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




echoThis "nohup mongod --dbpath=/home/wxl/database/data --logpath=/home/wxl/database/log.txt --logappend  --port=27017 --fork > $log 2>&1 & "

nohup mongod --dbpath=/home/wxl/database/data --logpath=/home/wxl/database/log.txt --logappend  --port=27017 --fork > $log 2>&1 & 


echoThis "start mongo database"
