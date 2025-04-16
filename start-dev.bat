@echo off
set BACKEND_DIR=JobTrackerAPI
set FRONTEND_DIR=job-tracker-client

echo Starting .NET backend...
start "Backend" cmd /k "cd /d %~dp0%BACKEND_DIR% && dotnet run"

timeout /t 5

echo Starting Angular frontend...
cd %FRONTEND_DIR%
call npm install
call ng serve