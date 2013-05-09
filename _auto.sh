#!/bin/bash
shellPos=$( echo "$0" | sed -e 's/[^\/]*$//' )
cd $shellPos
source _common.sh

log_dir=`getLogHome`

if [ -d $log_dir ];then

	log_yesterdaydir=`getYesterdayLogHome`
	log_dir=$log_yesterdaydir
	mkdir -p $log_dir
	if [ -f $log_dir/$STATISTICS_NAME ];then
		:
	else
		echo "-----------------------" >> $log_dir/cron.log
		echoThis "not exist ${STATISTICS_NAME} dir" >> $log_dir/cron.log
		for file in `ls $log_dir`
		do
			filename=$log_dir/$file
			num=`ls $filename|grep "_.*\.log"|wc -l`
			echoThis "num:$num" >> $log_dir/cron.log
				if [ $num = 1 ];then
						echoThis "run ./_track.sh" >> $log_dir/cron.log
						chmod +x ./_track.sh
						./_track.sh $log_dir $filename
				else
					echoThis "$file is error" >> $log_dir/cron.log
				fi
		done
	fi

else
	mkdir -p $log_dir
	
	echo "-----------------------" >> ${log_dir}/cron.log
	echoThis "not exist log dir" >> ${log_dir}/cron.log
	
	echoThis `pwd` >> ${log_dir}/cron.log
	cmd=./_restart.sh
	echoThis "run:${cmd}" >> ${log_dir}/cron.log
	$cmd
	
fi
