@if "%SCM_TRACE_LEVEL%" NEQ "4" @echo off

REM Put Ruby in Path
REM You can also use %TEMP% but it is cleared on site restart. Tools is persistent.
SET PATH=%PATH%;D:\home\site\deployments\tools\r\rubyinstaller-2.5.3-1-x32\bin

REM I am in the repository folder
pushd D:\home\site\deployments
if not exist tools md tools
cd tools 
if not exist r md r
cd r 
if exist rubyinstaller-2.5.3-1-x32 goto end

echo No Ruby, need to get it!

REM Get Ruby and Rails
REM 32bit
curl -o ruby253.zip -L https://github.com/oneclick/rubyinstaller2/releases/download/rubyinstaller-2.5.3-1/rubyinstaller-2.5.3-1-x32.7z?direct
REM Azure puts 7zip here!
echo START Unzipping Ruby
SetLocal DisableDelayedExpansion & d:\7zip\7za x -xr!*.ri -y ruby253.zip > rubyout
echo DONE Unzipping Ruby

popd

:end

REM Need to be in Reposistory
cd %DEPLOYMENT_SOURCE%
cd

call gem install bundler --no-ri --no-rdoc

ECHO Bundler install (not update!)
call bundle install

cd %DEPLOYMENT_SOURCE%
cd

ECHO Running Jekyll
call bundle exec jekyll build

REM KuduSync is after this!