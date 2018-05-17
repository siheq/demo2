#!/bin/bash

basedir=$(dirname "$0")
pwd
#MOCK_BIG_SCHEDULES_PORT=3000
#cd $basedir/mockBigSchedules
#npm start > /dev/null 2>&1 &

#TEST_APP_PORT=8081
#BIG_SCHEDULES_URL=http://localhost:${MOCK_BIG_SCHEDULES_PORT}

#PORT=${TEST_APP_PORT} NODE_ENV=testing BIG_SCHEDULES_URL=${BIG_SCHEDULES_URL} npm start > /dev/null 2>&1 &
nohup /app/node_modules/.bin/selenium-standalone start >out.txt 2>&1 &
/app/node_modules/.bin/wdio $basedir/wdio-ci.conf.js
