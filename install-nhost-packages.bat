@echo off
echo Installing Nhost packages...
call npm install @nhost/graphql-js @nhost/nhost-js @nhost/hasura-storage-js

echo Installation complete!
pause
