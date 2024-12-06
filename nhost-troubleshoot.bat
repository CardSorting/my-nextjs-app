@echo off
echo Checking npm installation...
call npm --version

echo Checking global npm directory...
call npm config get prefix

echo Attempting to install Nhost CLI...
call npm install -g nhost-cli

echo Checking installed global packages...
call npm list -g --depth=0

echo Attempting to find Nhost CLI executable...
where nhost
where nhost-cli

pause
