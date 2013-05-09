#!/bin/bash

#currentHome=$(cd "$(dirname "$0")"; pwd)
#echo $currentHome

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

log="${log_dir}/_start_${port}_${timestamp}.log"



echoThis "nohup $RUN_TIME_PATH ${currentPath}${port}/_start.js -port ${port} -EXEC_PATH ${currentPath} -DOMAIN_IP ${DOMAIN_IP} -DOMAIN_NAME ${DOMAIN_NAME} > $log 2>&1 & "

nohup $RUN_TIME_PATH ${currentPath}${port}/_start.js -port ${port} -EXEC_PATH ${currentPath} -DOMAIN_IP ${DOMAIN_IP} -DOMAIN_NAME ${DOMAIN_NAME} > $log 2>&1 & 


echoThis "start server"
