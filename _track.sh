#!/bin/bash
shellPos=$( echo "$0" | sed -e 's/[^\/]*$//' )
cd $shellPos
source _common.sh

log_dir=$1
file_name=$2
echo $* >> $log_dir/cron.log
echoThis "----------_statistics.sh-------------" >> $log_dir/cron.log

awk -f _bin/_awk/_select_list.awk $file_name >> $log_dir/$STATISTICS_NAME

rm -f $log_dir/$SPIDER_STATISTICS_NAME
rm -f $log_dir/$GENERIC_STATISTICS_NAME
awk -v LOG_FOLDER=$log_dir -v GENERIC_LOG_FILE=$GENERIC_STATISTICS_NAME -v SPIDER_LOG_FILE=$SPIDER_STATISTICS_NAME -v SPIDER_LIST_NAME=$SPIDER_LIST_NAME -f _bin/_awk/_check_list.awk $log_dir/$STATISTICS_NAME

rm -f $log_dir/SPIDER_STATISTICS_NAME
awk -v SPIDER_LIST_NAME=$SPIDER_LIST_NAME -f _bin/_awk/_spider_statistics2.awk $log_dir/$SPIDER_STATISTICS_NAME >> $log_dir/$SPIDER_STATISTICS_SED_NAME

