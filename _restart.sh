#!/bin/bash
shellPos=$( echo "$0" | sed -e 's/[^\/]*$//' )
cd $shellPos


pwd

chmod +x _stop.sh
chmod +x _start.sh
chmod +x _db_stop.sh
chmod +x _db_start.sh


./_stop.sh

#sleep 10

./_db_stop.sh
sleep 5


./_db_start.sh
#sleep 10


./_start.sh
