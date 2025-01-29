@echo off
set "fileName=UpdateFile.zip"

mkdir "Software"
:: Copy content of BuildWindows into Software folder
xcopy /s /e /y "../BuildWindows" "Software"
:: Compress Software folder into UpdateFile.zip using tar
tar -a -c -f "%fileName%" Software
:: Delete Software folder
rmdir /s /q "Software"

node ./SendToGoogleDrive.js

del "%fileName%"

pause