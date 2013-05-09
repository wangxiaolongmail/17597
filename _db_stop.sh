#!/bin/bash
shellPos=$( echo "$0" | sed -e 's/[^\/]*$//' )
cd $shellPos
source _common.sh

currentPath=`pwd`

#ps -ef | grep mongod | grep -v grep | cut -c 9-15 | xargs kill -s 9

#echo "stop mongod database server"

cd ${DIR_MONGOD_DATEBASE_BIN}
./mongo admin --eval "db.shutdownServer()"
if [ "$?" == "0" ];then
	echo  " ---`date +%y-%m-%d-%H-%M-%S` ----mongd stop ok" 
else
	echo "please check the log"
fi