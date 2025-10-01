# ========================================
# Enhanced APK Build Script for Expo React Native - CMake Edition
# ========================================
# This script fixes common build issues including CMake configuration errors and creates a release APK

param(
    [string]$BuildType = "release",  # Can be "release" or "debug"
    [switch]$CleanBuild = $false,
    [switch]$SkipMetro = $false,
    [switch]$FixCMake = $true
)

Write-Host "========================================" -ForegroundColor Green
Write-Host "Enhanced APK Build Script for Expo React Native - CMake Edition" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Detect Android SDK path from environment or common locations
$SdkPath = $env:ANDROID_HOME
if (-not $SdkPath) {
    $SdkPath = $env:ANDROID_SDK_ROOT
}
if (-not $SdkPath) {
    # Look for common SDK locations
    $commonPaths = @(
        "$env:LOCALAPPDATA\Android\Sdk",
        "$env:USERPROFILE\AppData\Local\Android\Sdk",
        "$env:ProgramFiles\Android\android-sdk",
        "${env:ProgramFiles(x86)}\Android\android-sdk"
    )
    
    foreach ($path in $commonPaths) {
        if (Test-Path $path) {
            $SdkPath = $path
            Write-Host "Found Android SDK at: $SdkPath" -ForegroundColor Yellow
            break
        }
    }
}

if (-not $SdkPath) {
    Write-Host "ERROR: Android SDK not found. Please set ANDROID_HOME or ANDROID_SDK_ROOT environment variable." -ForegroundColor Red
    exit 1
}

# Set NDK path
$NdkVersion = (Get-Content "$PSScriptRoot\android\gradle.properties" | Select-String "ANDROID_NDK_VERSION=").ToString().Split('=')[1].Trim()
$NdkPath = "$SdkPath\ndk\$NdkVersion"

if (-not (Test-Path $NdkPath)) {
    # If specific NDK version not found, try to find any NDK version
    $ndkDir = "$SdkPath\ndk"
    if (Test-Path $ndkDir) {
        $latestNdk = Get-ChildItem $ndkDir | Where-Object { $_.PSIsContainer } | Sort-Object Name -Descending | Select-Object -First 1
        if ($latestNdk) {
            $NdkPath = $latestNdk.FullName
            Write-Host "Using latest NDK version: $($latestNdk.Name)" -ForegroundColor Yellow
        }
    }
}

Write-Host "SDK Path: $SdkPath" -ForegroundColor Cyan
Write-Host "NDK Path: $NdkPath" -ForegroundColor Cyan

# Create or update local.properties
Write-Host ">>> Writing local.properties file ..." -ForegroundColor Yellow
$localProps = @"
sdk.dir=$SdkPath
ndk.dir=$NdkPath
"@
$localPropsPath = "$PSScriptRoot\android\local.properties"
Set-Content -Path $localPropsPath -Value $localProps -Encoding UTF8
Write-Host "local.properties updated successfully" -ForegroundColor Green

# Update gradle.properties with memory and performance settings
Write-Host ">>> Optimizing gradle.properties ..." -ForegroundColor Yellow
$gradlePropsPath = "$PSScriptRoot\android\gradle.properties"
$gradleProps = Get-Content $gradlePropsPath -Raw
$newProps = @(
    "org.gradle.daemon=true",
    "org.gradle.parallel=true",
    "org.gradle.caching=true",
    "org.gradle.configureondemand=true",
    "android.enableJetifier=true",
    "android.useAndroidX=true",
    "# Increase heap size for large projects",
    "org.gradle.jvmargs=-Xmx4096m -XX:MaxMetaspaceSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8",
    "android.packagingOptions.pickFirsts=**/libc++_shared.so",
    "android.packagingOptions.pickFirsts=**/libjsc.so"
)

foreach ($prop in $newProps) {
    if (-not (Select-String -Path $gradlePropsPath -Pattern [regex]::Escape($prop) -Quiet)) {
        Add-Content -Path $gradlePropsPath -Value $prop
    }
}

# Clean cache directories if requested
if ($CleanBuild) {
    Write-Host ">>> Cleaning cache directories ..." -ForegroundColor Yellow
    
    # Remove common cache directories
    $cacheDirs = @(
        "node_modules\react-native-reanimated\android\.cxx",
        "node_modules\react-native\android\.cxx", 
        "android\.gradle",
        "android\app\.gradle",
        ".expo",
        "android\build",
        "android\app\build",
        "node_modules\.cache",
        "node_modules\expo-modules-core\android\.cxx",
        "node_modules\expo\modules\android\.cxx"
    )
    
    foreach ($dir in $cacheDirs) {
        $fullPath = "$PSScriptRoot\$dir"
        if (Test-Path $fullPath) {
            Write-Host "Removing $fullPath ..." -ForegroundColor Magenta
            Remove-Item -Recurse -Force $fullPath -ErrorAction SilentlyContinue
        }
    }
    
    # Clean Gradle cache as well
    Write-Host ">>> Cleaning Gradle cache ..." -ForegroundColor Yellow
    Set-Location "$PSScriptRoot\android"
    cmd /c "gradlew clean" 2>$null
    Set-Location "$PSScriptRoot"
}

# Fix CMake configuration issues
if ($FixCMake) {
    Write-Host ">>> Fixing CMake configuration issues ..." -ForegroundColor Yellow
    
    # Clean problematic CMake cache in expo-modules-core
    $expoModulesCoreDir = "$PSScriptRoot\node_modules\expo-modules-core"
    if (Test-Path $expoModulesCoreDir) {
        $cmakeCacheDir = "$expoModulesCoreDir\android\.cxx"
        if (Test-Path $cmakeCacheDir) {
            Write-Host "Found CMake cache in expo-modules-core, removing ..." -ForegroundColor Yellow
            Remove-Item -Recurse -Force $cmakeCacheDir -ErrorAction SilentlyContinue
        }
        
        # Clean CMakeFiles directories
        $cmakeFilesDirs = Get-ChildItem "$expoModulesCoreDir\android" -Directory -Recurse | Where-Object { $_.Name -eq "CMakeFiles" }
        foreach ($dir in $cmakeFilesDirs) {
            Write-Host "Removing CMakeFiles in: $($dir.FullName)" -ForegroundColor Magenta
            Remove-Item -Recurse -Force $dir.FullName -ErrorAction SilentlyContinue
        }
    }
}

# Prepare bundle for release build
if ($BuildType -eq "release") {
    Write-Host ">>> Creating assets bundle for release ..." -ForegroundColor Yellow
    
    # Clear old bundles
    Remove-Item -Path "$PSScriptRoot\android\app\src\main\assets\*" -ErrorAction SilentlyContinue
    
    # Bundle the app using Expo CLI
    Write-Host "Running npx expo export for Android..." -ForegroundColor Cyan
    npx expo export --platform android --output-dir dist
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Warning: Expo export failed, proceeding with build anyway..." -ForegroundColor Yellow
    }
}

# Install dependencies
Write-Host ">>> Ensuring dependencies are installed ..." -ForegroundColor Yellow
npm install

# Build the APK
Write-Host ">>> Building APK ($BuildType) ..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot\android"

$gradleTask = "assemble$($BuildType[0].ToString().ToUpper())$($BuildType.Substring(1))"
Write-Host "Executing: gradlew $gradleTask --no-daemon" -ForegroundColor Cyan

# Execute the build command with CMake-specific handling
if ($FixCMake) {
    Write-Host "Building with CMake issue fixes..." -ForegroundColor Yellow
    # Try building for specific architecture first to avoid CMake issues
    $abiTask = $gradleTask -replace "$", "Arm64-v8a"
    cmd /c "gradlew $abiTask --no-daemon --info" 2>$null
}

$buildResult = cmd /c "gradlew $gradleTask --no-daemon --info" 2>&1
$buildResult | Out-Default

# Check if build was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "Build completed successfully!" -ForegroundColor Green
    
    # Locate the generated APK
    $apkPath = Get-ChildItem -Path "app\build\outputs\apk\$BuildType" -Filter "*.apk" -Recurse | Select-Object -First 1
    if ($apkPath) {
        Write-Host "APK generated at: $($apkPath.FullName)" -ForegroundColor Green
        Write-Host "APK file size: $( [math]::Round($apkPath.Length/1MB, 2) ) MB" -ForegroundColor Green
        
        # Copy APK to project root for easy access
        $destPath = "..\dist\app-$BuildType.apk"
        if (!(Test-Path "..\dist")) {
            New-Item -ItemType Directory -Path "..\dist" -Force | Out-Null
        }
        Copy-Item $apkPath.FullName $destPath
        Write-Host "APK copied to: $PSScriptRoot\$destPath" -ForegroundColor Green
    } else {
        Write-Host "Could not locate the generated APK. Check the build output above." -ForegroundColor Red
    }
} else {
    Write-Host "Build failed with exit code: $LASTEXITCODE" -ForegroundColor Red
    Write-Host "Check the build output above for error details." -ForegroundColor Red
    exit 1
}

# Return to project root
Set-Location "$PSScriptRoot"

Write-Host "========================================" -ForegroundColor Green
Write-Host "Build process completed!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green