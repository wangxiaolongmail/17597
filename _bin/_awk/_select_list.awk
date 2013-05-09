#!/bin/awk -f
BEGIN{
	#print "name   address\n------------"
}
{
	if(/request/){
		print
	}
}
END{
	#print "content already end"
}
