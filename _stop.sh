#!/bin/bash
shellPos=$( echo "$0" | sed -e 's/[^\/]*$//' )
cd $shellPos
source _common.sh

currentPath=`pwd`

#ps -ef | grep ${currentPath}/_start.js | grep -v grep | cut -c 9-15 | xargs kill -s 9

ps -ef | grep _start.js | grep -v grep | cut -c 9-15 | xargs kill -s 9

echo "stop server"
