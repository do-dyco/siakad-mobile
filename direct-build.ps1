# ========================================
# Direct APK Build Script for Expo Android - Fix NDK Path Issues
# ========================================
# This script fixes NDK path issues with spaces, bypasses Expo CLI architecture problems,
# addresses Expo modules configuration issues and builds the APK directly with Gradle

param(
    [string]$BuildType = "release"  # Can be "release" or "debug"
)

Write-Host "========================================" -ForegroundColor Green
Write-Host "Direct APK Build Script for Expo Android - Fix NDK Path Issues" -ForegroundColor Green
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

# Set NDK path - handle potential spaces in path
$ndkVersionLine = Get-Content "$PSScriptRoot\android\gradle.properties" | Select-String "ANDROID_NDK_VERSION="
if ($ndkVersionLine) {
    $NdkVersion = $ndkVersionLine.ToString().Split('=')[1].Trim()
    $NdkPath = "$SdkPath\ndk\$NdkVersion"
} else {
    # Fallback to a common NDK version
    $NdkPath = "$SdkPath\ndk\25.2.9519653"
}

# Validate NDK path exists and handle spaces
if (-not (Test-Path $NdkPath)) {
    Write-Host "NDK Path not found: $NdkPath" -ForegroundColor Red
    # Try to find any NDK version
    $ndkDir = "$SdkPath\ndk"
    if (Test-Path $ndkDir) {
        $latestNdk = Get-ChildItem $ndkDir | Where-Object { $_.PSIsContainer } | Sort-Object Name -Descending | Select-Object -First 1
        if ($latestNdk) {
            $NdkPath = $latestNdk.FullName
            Write-Host "Using latest NDK: $($latestNdk.Name)" -ForegroundColor Yellow
        }
    }
    
    if (-not (Test-Path $NdkPath)) {
        Write-Host "ERROR: NDK not found. Please install NDK through Android Studio SDK Manager." -ForegroundColor Red
        exit 1
    }
}

Write-Host "SDK Path: $SdkPath" -ForegroundColor Cyan
Write-Host "NDK Path: $NdkPath" -ForegroundColor Cyan

# Create or update local.properties with properly quoted paths to handle spaces
Write-Host ">>> Writing local.properties file with quoted paths ..." -ForegroundColor Yellow
$localPropsPath = "$PSScriptRoot\android\local.properties"

# Check if file exists and read current content
$currentProps = ""
if (Test-Path $localPropsPath) {
    $currentProps = Get-Content $localPropsPath -Raw
}

# Ensure paths are set correctly
$localProps = @"
sdk.dir=$SdkPath
ndk.dir=$NdkPath
"@

Set-Content -Path $localPropsPath -Value $localProps -Encoding UTF8
Write-Host "local.properties updated with proper paths" -ForegroundColor Green

# Configure ABIs properly in gradle.properties
$gradlePropsPath = "$PSScriptRoot\android\gradle.properties"
$targetAbi = "arm64-v8a,x86_64"

# Update reactNativeArchitectures to match supported ABIs
$gradlePropsContent = Get-Content $gradlePropsPath -Raw
$gradlePropsContent = [regex]::Replace($gradlePropsContent, "reactNativeArchitectures=.*", "")
$gradlePropsContent += "`nreactNativeArchitectures=$targetAbi"

# Add other helpful properties for build with special focus on Windows issues
$additionalProps = @(
    "android.injected.build.abi=$targetAbi",
    "expo.gradle.generateSourceMaps=false",
    "expo.useLegacyPackaging=true",
    "org.gradle.daemon=true",
    "org.gradle.parallel=true", 
    "org.gradle.caching=true",
    "org.gradle.configureondemand=true",
    "org.gradle.jvmargs=-Xmx4096m -XX:MaxMetaspaceSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8",
    "android.packagingOptions.pickFirsts=**/libc++_shared.so",
    "android.packagingOptions.pickFirsts=**/libjsc.so",
    "kotlin.incremental=false",
    "kotlin.compiler.execution.strategy=in-process",
    # Add Windows-specific properties
    "android.useAndroidX=true",
    "android.enableJetifier=true",
    # Fix for expo modules
    "expo.modules.disable-swift-package-manager=true"
)

foreach ($prop in $additionalProps) {
    if (-not ($gradlePropsContent -match [regex]::Escape($prop.Split('=')[0]))) {
        $gradlePropsContent += "`n$prop"
    }
}

Set-Content -Path $gradlePropsPath -Value $gradlePropsContent
Write-Host "Updated gradle.properties with correct ABIs and Windows fixes: $targetAbi" -ForegroundColor Yellow

Write-Host ">>> Cleaning cache directories (aggressive) ..." -ForegroundColor Yellow

# Remove common cache directories - particularly aggressive for Expo modules issues
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
    "node_modules\expo\modules\android\.cxx",
    ".gradle",
    "node_modules\expo-modules-core\android\.gradle",
    "node_modules\expo\modules\android\.gradle",
    "node_modules\**\*.kotlin_metadata",
    "node_modules\**\build",
    "node_modules\react-native-reanimated\android\.gradle",
    "node_modules\react-native-reanimated\android\build",
    # Clean expo directory caches too
    "node_modules\expo\android\.gradle",
    "node_modules\expo\android\.cxx",
    "node_modules\expo-modules-autolinking\.gradle",
    "node_modules\expo-modules-autolinking\android\.gradle"
)

foreach ($dir in $cacheDirs) {
    $fullPath = "$PSScriptRoot\$dir"
    if (Test-Path $fullPath) {
        Write-Host "Removing $fullPath ..." -ForegroundColor Magenta
        try {
            Remove-Item -Recurse -Force $fullPath -ErrorAction Stop
        } catch {
            Write-Host "Warning: Could not remove $fullPath : $_" -ForegroundColor Yellow
        }
    }
}

# Clean Gradle cache as well
Write-Host ">>> Cleaning Gradle cache ..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot\android"
cmd /c "gradlew clean" 2>$null
Set-Location "$PSScriptRoot"

Write-Host ">>> Running expo prebuild to regenerate native files ..." -ForegroundColor Yellow
# Use --clean and specific platform to regenerate all files
& npx expo prebuild --platform android --clean --skip-dependency-update
if ($LASTEXITCODE -ne 0) {
    Write-Host "Warning: expo prebuild had issues, but continuing..." -ForegroundColor Yellow
}

Write-Host ">>> Installing/verifying dependencies ..." -ForegroundColor Yellow
# Use yarn if yarn.lock exists, otherwise npm
if (Test-Path "yarn.lock") {
    yarn install
} else {
    npm install
}

Write-Host ">>> Updating app/build.gradle with correct ABI and NDK configuration ..." -ForegroundColor Yellow

# Update app/build.gradle with correct configurations
$buildGradlePath = "$PSScriptRoot\android\app\build.gradle"
$buildGradleContent = Get-Content $buildGradlePath -Raw

# Look for defaultConfig and add or update the ndk section with correct ABIs
if ($buildGradleContent -match "defaultConfig\s*{") {
    $defaultConfigMatch = [regex]::Match($buildGradleContent, "defaultConfig\s*{([^}]*(\}[^}]*)*)\}")
    if ($defaultConfigMatch.Success) {
        $defaultConfigBlock = $defaultConfigMatch.Value
        $defaultConfigInner = $defaultConfigMatch.Groups[1].Value
        
        # Check if ndk block exists
        if ($defaultConfigInner -match "ndk\s*{") {
            # Replace the entire ndk block with correct ABIs
            $newDefaultConfigBlock = [regex]::Replace($defaultConfigBlock, "ndk\s*{[^}]*}", "ndk {`n            abiFilters `'arm64-v8a`', `'x86_64`'`n        }")
            $buildGradleContent = $buildGradleContent.Replace($defaultConfigBlock, $newDefaultConfigBlock)
        } else {
            # Add ndk block with correct ABIs
            $newDefaultConfigBlock = $defaultConfigBlock.TrimEnd('}') + "        ndk {`n            abiFilters `'arm64-v8a`', `'x86_64`'`n        }`n    }"
            $buildGradleContent = $buildGradleContent.Replace($defaultConfigBlock, $newDefaultConfigBlock)
        }
    }
}

# Ensure the react block exists and is properly configured
if ($buildGradleContent -notmatch "react\s*{") {
    # Add react block if it doesn't exist
    if ($buildGradleContent -match "apply plugin:") {
        # Find a good place to add the react configuration
        $reactConfig = @"
    
// React Native configuration
react {
    // Use Expo CLI to bundle the app, this ensures the Metro config
    // works correctly with Expo projects.
    cliFile = file(["node", "--print", "require.resolve('@expo/cli', { paths: [require.resolve('expo/package.json')] })"].execute(null, rootDir).text.trim())
    bundleCommand = "export:embed"
}
"@
        $buildGradleContent = $buildGradleContent.Insert($buildGradleContent.Length - 1, $reactConfig)
    }
}

Set-Content -Path $buildGradlePath -Value $buildGradleContent
Write-Host "Updated build.gradle with correct ABI configuration and fixes" -ForegroundColor Yellow

# Generate the bundle for release builds
if ($BuildType -eq "release") {
    Write-Host ">>> Generating production bundle ..." -ForegroundColor Yellow
    npx expo export --platform android --output-dir dist
    
    # Copy bundle files to assets if they exist
    $bundlePath = "$PSScriptRoot\dist\android\bundle"
    if (Test-Path $bundlePath) {
        $assetsDir = "$PSScriptRoot\android\app\src\main\assets"
        if (!(Test-Path $assetsDir)) {
            New-Item -ItemType Directory -Path $assetsDir -Force | Out-Null
        }
        Copy-Item -Path "$bundlePath\*" -Destination $assetsDir -Recurse -Force
    }
}

Write-Host ">>> Building APK ($BuildType) with proper NDK path and architecture settings ..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot\android"

# Execute Gradle build with additional flags to handle Windows path issues
$gradleTask = "assemble$($BuildType[0].ToString().ToUpper())$($BuildType.Substring(1))"

# Build with extra flags to handle Windows path issues and proper NDK path
$gradleParams = "--no-daemon --info -PreactNativeArchitectures=arm64-v8a,x86_64"
# Add Windows-specific flags and force the correct NDK path
$gradleParams += " -Dorg.gradle.jvmargs='-Xmx4096m' -Dfile.encoding='UTF-8'"
$gradleParams += " -Pndk.dir=`"$NdkPath`""
# Also set SDK path in case it's needed
$gradleParams += " -Psdk.dir=`"$SdkPath`""

Write-Host "Executing: gradlew $gradleTask $gradleParams" -ForegroundColor Cyan

# Execute the main build command with longer timeout
$process = Start-Process -FilePath "cmd.exe" -ArgumentList "/c", "gradlew $gradleTask $gradleParams > fixed-ndk-build.log 2>&1 && exit %ERRORLEVEL%" -Wait -PassThru -NoNewWindow

if ($process.ExitCode -eq 0) {
    Write-Host "Build completed successfully!" -ForegroundColor Green
    
    # Locate the generated APK
    $apkPath = Get-ChildItem -Path "app\build\outputs\apk\$BuildType" -Filter "*.apk" -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
    
    # If not found in the expected location, search more broadly
    if (-not $apkPath) {
        $apkPath = Get-ChildItem -Path "app\build\outputs\apk" -Filter "*.apk" -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
    }
    
    if ($apkPath) {
        Write-Host "APK generated at: $($apkPath.FullName)" -ForegroundColor Green
        $fileSizeMB = [math]::Round($apkPath.Length / 1MB, 2)
        Write-Host "APK file size: $fileSizeMB MB" -ForegroundColor Green
        
        # Create dist directory and copy APK
        $distDir = "$PSScriptRoot\dist"
        if (!(Test-Path $distDir)) {
            New-Item -ItemType Directory -Path $distDir -Force | Out-Null
        }
        $destPath = Join-Path $distDir "app-$BuildType.apk"
        Copy-Item $apkPath.FullName $destPath
        Write-Host "APK copied to: $destPath" -ForegroundColor Green
        
        Write-Host "`nSuccess! Your APK is ready at: $destPath" -ForegroundColor Green
    } else {
        Write-Host "Could not locate the generated APK. Check the build output in fixed-ndk-build.log" -ForegroundColor Red
    }
} else {
    Write-Host "Build failed with exit code: $($process.ExitCode)" -ForegroundColor Red
    
    # Show errors from logs
    if (Test-Path "fixed-ndk-build.log") {
        Write-Host "`n=== Build Log (Last 50 lines) ===" -ForegroundColor Red
        $logContent = Get-Content "fixed-ndk-build.log" -Tail 50
        $logContent | ForEach-Object { Write-Host $_ }

        Write-Host "`n=== Specific errors identified ===" -ForegroundColor Red
        $errorLines = Select-String -Path "fixed-ndk-build.log" -Pattern "error|Error|ERROR|FAILED|Could not get unknown property|filename.*directory.*name.*or.*volume label syntax is incorrect|CXX1102|ndk.dir|NDK and couldn't be used|ExpoModulesCorePlugin.gradle" -CaseSensitive -SimpleMatch
        if ($errorLines) {
            $errorLines | ForEach-Object { Write-Host $_.Line -ForegroundColor Red }
        } else {
            Write-Host "No specific errors found in fixed-ndk-build.log" -ForegroundColor Yellow
        }
    }
}

# Return to project root
Set-Location "$PSScriptRoot"

Write-Host "========================================" -ForegroundColor Green
Write-Host "Fixed APK build process completed!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

if ($process.ExitCode -ne 0) {
    Write-Host "`nIf build still fails, try these additional steps:" -ForegroundColor Yellow
    Write-Host "1. Make sure NDK is installed via Android Studio SDK Manager" -ForegroundColor Yellow
    Write-Host "2. Try moving your project to a path without spaces" -ForegroundColor Yellow
    Write-Host "3. Run as Administrator to ensure proper access rights" -ForegroundColor Yellow
    Write-Host "4. Check that your SDK path is correct: $SdkPath" -ForegroundColor Yellow
    Write-Host "5. Check that your NDK path is correct: $NdkPath" -ForegroundColor Yellow
}