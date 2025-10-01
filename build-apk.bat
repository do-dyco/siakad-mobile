@echo off
setlocal enabledelayedexpansion

echo ========================================
echo Enhanced APK Build Script for Expo React Native - CMake Edition
echo ========================================

REM Detect Android SDK path from environment or common locations
set "SDK_PATH=%ANDROID_HOME%"
if not defined SDK_PATH (
    set "SDK_PATH=%ANDROID_SDK_ROOT%"
)
if not defined SDK_PATH (
    REM Look for common SDK locations
    if exist "%LOCALAPPDATA%\Android\Sdk" set "SDK_PATH=%LOCALAPPDATA%\Android\Sdk"
    if exist "%USERPROFILE%\AppData\Local\Android\Sdk" set "SDK_PATH=%USERPROFILE%\AppData\Local\Android\Sdk"
    if exist "%PROGRAMFILES%\Android\android-sdk" set "SDK_PATH=%PROGRAMFILES%\Android\android-sdk"
    if exist "%PROGRAMFILES(X86)%\Android\android-sdk" set "SDK_PATH=%PROGRAMFILES(X86)%\Android\android-sdk"
)

if not defined SDK_PATH (
    echo ERROR: Android SDK not found. Please set ANDROID_HOME or ANDROID_SDK_ROOT environment variable.
    exit /b 1
)

echo SDK Path: %SDK_PATH%

REM Set NDK path
for /f "tokens=2 delims==" %%a in ('findstr ANDROID_NDK_VERSION= android\gradle.properties') do set "NDK_VERSION=%%a"
set "NDK_PATH=%SDK_PATH%\ndk\!NDK_VERSION!"

REM If specific NDK version not found, try to find any NDK version
if not exist "!NDK_PATH!" (
    if exist "%SDK_PATH%\ndk" (
        for /d %%i in ("%SDK_PATH%\ndk\*") do (
            if "!NDK_PATH!"=="" (
                set "NDK_PATH=%%i"
                echo Using latest NDK: %%i
            )
        )
    )
)

echo NDK Path: !NDK_PATH!

REM Create or update local.properties
echo Writing local.properties file ...
echo sdk.dir=!SDK_PATH! > android\local.properties
echo ndk.dir=!NDK_PATH! >> android\local.properties
echo local.properties updated successfully

REM Get build type from argument or default to release
set "BUILD_TYPE=release"
if not "%1"=="" set "BUILD_TYPE=%1"

echo Building APK in !BUILD_TYPE! mode...

REM Clean cache if requested
if "%2"=="--clean" (
    echo Cleaning cache directories...
    if exist node_modules\react-native-reanimated\android\.cxx rmdir /s /q node_modules\react-native-reanimated\android\.cxx 2>nul
    if exist android\.gradle rmdir /s /q android\.gradle 2>nul
    if exist android\build rmdir /s /q android\build 2>nul
    if exist android\app\build rmdir /s /q android\app\build 2>nul
    if exist .expo rmdir /s /q .expo 2>nul
    if exist node_modules\expo-modules-core\android\.cxx rmdir /s /q node_modules\expo-modules-core\android\.cxx 2>nul
    
    REM Clean Gradle
    cd android
    call gradlew clean
    cd ..
)

REM Fix CMake issues by cleaning CMake cache
echo Cleaning CMake configuration files...
if exist "node_modules\expo-modules-core\android\.cxx" rmdir /s /q "node_modules\expo-modules-core\android\.cxx" 2>nul
for /d /r "node_modules\expo-modules-core\android" %%i in (CMakeFiles) do if exist "%%i" rmdir /s /q "%%i" 2>nul

REM Install dependencies
echo Ensuring dependencies are installed...
call npm install

REM Build the APK
echo Building APK (!BUILD_TYPE! build)...
cd android
set "GRADLE_TASK=assemble"
if "!BUILD_TYPE!"=="debug" (set "GRADLE_TASK=assembleDebug") else (set "GRADLE_TASK=assembleRelease")

REM For CMake issues, try specific architecture build first
echo Building for arm64-v8a architecture first to avoid CMake issues...
if "!BUILD_TYPE!"=="debug" (
    call gradlew assembleDebugArm64-v8a --no-daemon --info 2>nul
) else (
    call gradlew assembleReleaseArm64-v8a --no-daemon --info 2>nul
)

echo Running: gradlew !GRADLE_TASK! --no-daemon
call gradlew !GRADLE_TASK! --no-daemon --info
set "BUILD_RESULT=!ERRORLEVEL!"

REM Check if build was successful
if !BUILD_RESULT! EQU 0 (
    echo Build completed successfully!
    
    REM Locate and copy the generated APK
    for /r %%f in (app\build\outputs\apk\!BUILD_TYPE!\*.apk) do (
        echo APK generated at: %%f
        for %%a in (%%f) do (
            echo APK file size: %%~za bytes
            if not exist "..\dist" mkdir "..\dist" 2>nul
            copy "%%f" "..\dist\app-!BUILD_TYPE!.apk"
            echo APK copied to: !cd!\..\dist\app-!BUILD_TYPE!.apk
        )
        goto :found_apk
    )
    :found_apk
) else (
    echo Build failed with exit code: !BUILD_RESULT!
    echo Check the build output above for error details.
    exit /b !BUILD_RESULT!
)

cd ..
echo ========================================
echo Build process completed!
echo ========================================