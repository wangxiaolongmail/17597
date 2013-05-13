#!/bin/bash

BASE_LOG_HOME=./_log



echoThis()
{
  timestamp=`date '+%m_%d_%Y %H:%M:%S'` 
  echo "[$timestamp] $@"
}

getLogHome()
{
	m_y=`date +%Y`
	m_m=`date +%m`
	m_d=`date +%d`
	log_dir="${BASE_LOG_HOME}/${m_y}.year/${m_m}.month/${m_d}.day"
	echo $log_dir
}

getYesterdayLogHome()
{
	m_y=`date -d yesterday +%Y`
	m_m=`date -d yesterday +%m`
	m_d=`date -d yesterday +%d`
	log_dir="${BASE_LOG_HOME}/${m_y}.year/${m_m}.month/${m_d}.day"
	echo $log_dir
}


RUN_TIME_PATH=node

DOMAIN_IP=42.121.96.101

DOMAIN_NAME=17597.net

SPIDER_LIST_NAME="Baiduspider|EasouSpider|Googlebot|Sosospider|360Spider|bingbot|JikeSpider|AhrefsBot|Yahoo!|Sogou|Netcraft|YandexBot|MJ12bot|AhrefsBot"

STATISTICS_NAME="all_list.log"

SPIDER_STATISTICS_NAME="spider_list.log"

GENERIC_STATISTICS_NAME="generic_list.log"

SPIDER_STATISTICS_SED_NAME="spider_stati.log"

DIR_MONGOD_DATEBASE_BIN="/usr/local/mongodb/bin"

