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

echoThis "nohup supervisor node ${currentPath}${port}/_start.js > $log 2>&1 &" 

nohup supervisor node ${currentPath}${port}/_start.js > $log 2>&1 & 

echo "tail -f /home/wxl/82/$log" > "_logaddr.txt"

echoThis "start server"
