#!/bin/bash
a=0
while true
do

	node scraper.js 
	sleep 2
	((a=a+1))
done
