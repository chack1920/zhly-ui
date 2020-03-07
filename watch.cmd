@echo off
echo ========================================
echo    Packager (development)
echo ========================================
cmd /C "webpack --watch --config ./package/webpack.watch.conf.js --progress"
echo ========================================
echo              Package End
echo ========================================
