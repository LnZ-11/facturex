@echo off
title Invoice App

echo ===============================
echo   Starting Invoice Application
echo ===============================

cd /d "%~dp0"

echo Building app (first time only)...
pnpm build

echo Starting server...
start http://localhost:3000
pnpm start

pause