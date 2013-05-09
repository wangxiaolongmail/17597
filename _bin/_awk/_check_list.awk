#!/bin/awk -f
BEGIN{
	spider_count=0
	generic_count=0
}
{
	len=split(SPIDER_LIST_NAME,arr,"|");
	flag=0
	for(i=1;i<=len;i++){
		regex=arr[i]
		gsub(/./,"[&]",regex)
		gsub(/\\/,"&&",regex)
		if(match($0,regex)){
			spider_count++
			print (spider_count,arr[i],$0) > LOG_FOLDER"/"SPIDER_LOG_FILE
			flag=1
			break;
		}
	}
	if(flag == 0){
		generic_count++
		print (generic_count,$0) > LOG_FOLDER"/"GENERIC_LOG_FILE
	}
}
END{
	print ("") > LOG_FOLDER"/"generic_count".generic.cnt"
	print ("") > LOG_FOLDER"/"spider_count".spider.cnt"
}
