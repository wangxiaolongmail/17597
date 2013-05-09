#!/bin/sh


echo "zip db start..."

timestamp=`date '+%Y_%m_%d#%H#%M#%S'` 

zip -r ./_bak/_bak_s_${timestamp}.zip ./s
zip -r ./_bak/_bak_d_${timestamp}.zip ./_d

echo "zip db end"
