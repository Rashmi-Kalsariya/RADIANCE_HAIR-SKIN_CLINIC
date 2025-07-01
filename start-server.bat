@echo off
echo.
echo ========================================
echo   Radiance Hair ^& Skin Clinic Server
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js is installed
echo.

REM Check if dependencies are installed
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    echo.
    npm install
    echo.
    if errorlevel 1 (
        echo ❌ Failed to install dependencies!
        echo.
        pause
        exit /b 1
    )
    echo ✅ Dependencies installed successfully!
    echo.
)

REM Check if .env file exists and is configured
if not exist ".env" (
    echo ❌ .env file not found!
    echo Please configure your .env file with Gmail credentials.
    echo See NODEMAILER_SETUP.md for instructions.
    echo.
    pause
    exit /b 1
)

REM Check if EMAIL_PASS is configured
findstr /C:"your-gmail-app-password-here" .env >nul
if not errorlevel 1 (
    echo ❌ Please configure your Gmail App Password in .env file!
    echo Current .env contains placeholder text.
    echo See NODEMAILER_SETUP.md for setup instructions.
    echo.
    pause
    exit /b 1
)

echo ✅ Configuration looks good!
echo.
echo 🚀 Starting Radiance Clinic Server...
echo.
echo 📧 Email system: Nodemailer with Gmail
echo 🌐 Website: http://localhost:3000
echo 📬 Emails sent to: rashmikalsariya02@gmail.com
echo.
echo ⚡ Server starting in 3 seconds...
timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo   Server is running! Press Ctrl+C to stop
echo ========================================
echo.

REM Start the server
npm start

echo.
echo Server stopped.
pause
