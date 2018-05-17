set %%1=('netstat -ano ^| findstr 0.0.0.0:3000')
if %%1 == '' goto step2
:step1
for /f "tokens=5" %%a in ('netstat -ano ^| findstr 0.0.0.0:3000') do taskkill /pid %%a /f /t
:step2
echo 'Already Killed'
