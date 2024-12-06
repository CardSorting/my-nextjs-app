@echo off
echo Installing Nhost CLI globally...
call npm install -g nhost

echo Locating npm global installation directory...
for /f "tokens=*" %%i in ('npm config get prefix') do set NPM_PREFIX=%%i

echo Adding npm global path to system PATH...
setx PATH "%PATH%;%NPM_PREFIX%" /M

echo Current npm prefix: %NPM_PREFIX%
echo Installation complete! Please restart your terminal and run 'nhost --version' to verify the installation.
pause
