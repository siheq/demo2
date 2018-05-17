set %%2=('netstat -ano ^| findstr 0.0.0.0:8081')
echo %%2
if %%2 == '' goto step1
set BIG_SCHEDULES_URL=http://localhost:3000
set PORT=8081
set NODE_ENV=testing
:step1
call npm start

