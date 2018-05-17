#!/usr/bin/env bash

MOCK_BIG_SCHEDULES_PORT=3000
lsof -i:${MOCK_BIG_SCHEDULES_PORT}
if [ $? -ne 0 ]; then
  pushd verification/test/e2e/mockBigSchedules
    MOCK_BIG_SCHEDULES_PORT=${MOCK_BIG_SCHEDULES_PORT} npm start > /dev/null 2>&1 &
  popd
fi

TEST_APP_PORT=8081
BIG_SCHEDULES_URL=http://localhost:${MOCK_BIG_SCHEDULES_PORT}
lsof -i:${TEST_APP_PORT}
if [ $? -ne 0 ]; then
  PORT=${TEST_APP_PORT} NODE_ENV=testing BIG_SCHEDULES_URL=${BIG_SCHEDULES_URL} npm start > /dev/null 2>&1 &
fi

./node_modules/.bin/wdio ./verification/test/e2e/wdio.conf.js
