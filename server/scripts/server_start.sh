#!/usr/bin/env bash
cd /home/ubuntu/build
sudo nohup java -jar albamung-0.0.1-SNAPSHOT.jar --spring.profiles.active=deploy > /dev/null 2> /dev/null < /dev/null &