@echo off
echo ========================================
echo    Packager (development)
echo ========================================
cmd /C "webpack --config ./package/webpack.build.conf.js --progress"
echo ========================================
echo              Package End
echo ========================================
