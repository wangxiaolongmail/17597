#!/bin/awk -f
BEGIN{
	FS="|"
}
{
	++type[$5]
}
END{
	for(key in type)
		print key,"\t",type[key]
}
