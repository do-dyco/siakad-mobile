# ========================================
# Enhanced Fix & Build Script for Expo Android APK - NDK Path Edition
# ========================================
# This script fixes NDK path issues with spaces, ABI architecture, Expo modules configuration errors,
# path issues, react-native-reanimated, CMake, Kotlin compilation errors, 
# and expo run:android issues, then creates a release APK without EAS

param(
    [string]$BuildType = "release",  # Can be "release" or "debug"
    [switch]$CleanBuild = $false,
    [switch]$SkipMetro = $false,
    [switch]$UseKeystore = $false,
    [switch]$FixCMake = $true,
    [switch]$FixKotlin = $true,
    [switch]$FixReanimated = $true,
    [switch]$FixExpoRun = $true,
    [switch]$FixABI = $true,
    [switch]$FixPaths = $true,
    [switch]$FixExpoModules = $true,
    [switch]$FixNDKPath = $true
)

Write-Host "========================================" -ForegroundColor Green
Write-Host "Enhanced APK Build Script for Expo Android - NDK Path Edition" -ForegroundColor Green
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

# Configure ABIs in gradle.properties to match supported ones
$gradlePropsPath = "$PSScriptRoot\android\gradle.properties"
$targetAbi = "arm64-v8a,x86_64"

# Update reactNativeArchitectures to match supported ABIs and force override
$gradlePropsContent = Get-Content $gradlePropsPath -Raw

# Remove any existing reactNativeArchitectures and add the correct one
$gradlePropsContent = [regex]::Replace($gradlePropsContent, "reactNativeArchitectures=.*", "")
$gradlePropsContent += "`nreactNativeArchitectures=$targetAbi"

# Add other helpful properties for Windows path issues and Expo modules
$additionalProps = @(
    "android.injected.build.abi=$targetAbi",
    "expo.gradle.generateSourceMaps=false",
    "expo.useLegacyPackaging=true",
    "expo.modules.disable-swift-package-manager=true"  # Fix for Expo modules on Windows
)

foreach ($prop in $additionalProps) {
    if (-not ($gradlePropsContent -match [regex]::Escape($prop.Split('=')[0]))) {
        $gradlePropsContent += "`n$prop"
    }
}

Set-Content -Path $gradlePropsPath -Value $gradlePropsContent
Write-Host "Updated gradle.properties with correct ABIs: $targetAbi" -ForegroundColor Yellow

# Additional Gradle optimization for Windows
$extraProps = @(
    "org.gradle.daemon=true",
    "org.gradle.parallel=true", 
    "org.gradle.caching=true",
    "org.gradle.configureondemand=true",
    "org.gradle.jvmargs=-Xmx4096m -XX:MaxMetaspaceSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8",
    "android.packagingOptions.pickFirsts=**/libc++_shared.so",
    "android.packagingOptions.pickFirsts=**/libjsc.so",
    "kotlin.incremental=false",
    "kotlin.compiler.execution.strategy=in-process",
    "kotlin.native.homepage=https://kotlinlang.org/docs/gradle.html",
    "android.useAndroidX=true",
    "android.enableJetifier=true"
)

foreach ($prop in $extraProps) {
    if (-not (Select-String -Path $gradlePropsPath -Pattern [regex]::Escape($prop) -Quiet)) {
        Add-Content -Path $gradlePropsPath -Value $prop
    }
}

# Clean cache directories if requested
if ($CleanBuild -or $FixKotlin -or $FixReanimated -or $FixExpoRun -or $FixPaths -or $FixExpoModules -or $FixNDKPath) {
    Write-Host ">>> Cleaning cache directories (NDK path fix) ..." -ForegroundColor Yellow
    
    # Remove common cache directories - be more aggressive for Expo modules
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
        "node_modules\expo\android\.cxx",
        "node_modules\expo\android\.gradle",
        "node_modules\expo\modules\.gradle",
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
}

# Fix CMake configuration issues
if ($FixCMake) {
    Write-Host ">>> Fixing CMake configuration issues ..." -ForegroundColor Yellow
    
    # Check for problematic CMake cache in expo-modules-core
    $expoModulesCoreDir = "$PSScriptRoot\node_modules\expo-modules-core"
    if (Test-Path $expoModulesCoreDir) {
        $cmakeCacheDir = "$expoModulesCoreDir\android\.cxx"
        if (Test-Path $cmakeCacheDir) {
            Write-Host "Found CMake cache in expo-modules-core, removing ..." -ForegroundColor Yellow
            Remove-Item -Recurse -Force $cmakeCacheDir -ErrorAction SilentlyContinue
        }
        
        # Also clean any CMakeFiles directories
        $cmakeFilesDirs = Get-ChildItem "$expoModulesCoreDir\android" -Directory -Recurse | Where-Object { $_.Name -eq "CMakeFiles" }
        foreach ($dir in $cmakeFilesDirs) {
            Write-Host "Removing CMakeFiles in: $($dir.FullName)" -ForegroundColor Magenta
            Remove-Item -Recurse -Force $dir.FullName -ErrorAction SilentlyContinue
        }
    }
}

# Fix Kotlin-related issues
if ($FixKotlin) {
    Write-Host ">>> Fixing Kotlin compilation issues ..." -ForegroundColor Yellow
    
    # Clean Kotlin-related caches in expo-modules-core
    $expoModulesCoreDir = "$PSScriptRoot\node_modules\expo-modules-core"
    if (Test-Path $expoModulesCoreDir) {
        # Remove any Kotlin build directories
        $kotlinBuildDirs = Get-ChildItem "$expoModulesCoreDir\android" -Directory -Recurse | Where-Object { $_.Name -eq "build" -or $_.Name -like "*kotlin*" }
        foreach ($dir in $kotlinBuildDirs) {
            Write-Host "Removing Kotlin build directory: $($dir.FullName)" -ForegroundColor Magenta
            Remove-Item -Recurse -Force $dir.FullName -ErrorAction SilentlyContinue
        }
        
        # Look for and clean .kotlin_metadata files
        $kotlinMetadataFiles = Get-ChildItem "$expoModulesCoreDir\android" -File -Recurse | Where-Object { $_.Name -like "*.kotlin_metadata" }
        foreach ($file in $kotlinMetadataFiles) {
            Write-Host "Removing Kotlin metadata file: $($file.FullName)" -ForegroundColor Magenta
            Remove-Item -Path $file.FullName -ErrorAction SilentlyContinue
        }
    }
    
    # Update Kotlin version in gradle.properties if needed
    $kotlinVersionLine = Get-Content "$PSScriptRoot\android\gradle.properties" | Select-String "kotlin.version="
    if (-not $kotlinVersionLine) {
        Add-Content -Path $gradlePropsPath -Value "kotlin.version=1.9.23"  # Use the version from your package.json
        Write-Host "Added Kotlin version to gradle.properties" -ForegroundColor Yellow
    }
}

# Fix react-native-reanimated issues
if ($FixReanimated) {
    Write-Host ">>> Fixing react-native-reanimated issues ..." -ForegroundColor Yellow
    
    # Check for react-native-reanimated directory
    $reanimatedDir = "$PSScriptRoot\node_modules\react-native-reanimated"
    if (Test-Path $reanimatedDir) {
        Write-Host "Found react-native-reanimated, checking for lint issues ..." -ForegroundColor Yellow
        
        # Clean reanimated build directories
        $reanimatedBuildDirs = Get-ChildItem "$reanimatedDir\android" -Directory -Recurse | Where-Object { $_.Name -eq "build" }
        foreach ($dir in $reanimatedBuildDirs) {
            Write-Host "Removing Reanimated build directory: $($dir.FullName)" -ForegroundColor Magenta
            Remove-Item -Recurse -Force $dir.FullName -ErrorAction SilentlyContinue
        }
        
        # Update gradle.properties to handle reanimated specific issues
        if (-not (Select-String -Path $gradlePropsPath -Pattern "expo.useLegacyPackaging" -Quiet)) {
            Add-Content -Path $gradlePropsPath -Value "expo.useLegacyPackaging=true"
            Write-Host "Added legacy packaging option for reanimated compatibility" -ForegroundColor Yellow
        }
    }
}

# Fix Expo run issues by prebuilding properly
if ($FixExpoRun) {
    Write-Host ">>> Fixing Expo run issues ..." -ForegroundColor Yellow
    
    # Clean .expo directory
    $expoDir = "$PSScriptRoot\.expo"
    if (Test-Path $expoDir) {
        Write-Host "Removing .expo directory ..." -ForegroundColor Magenta
        Remove-Item -Recurse -Force $expoDir -ErrorAction SilentlyContinue
    }
    
    # Clean any cached prebuild files
    $androidDir = "$PSScriptRoot\android"
    if (Test-Path $androidDir) {
        # Clean any build artifacts that could interfere
        $buildFiles = Get-ChildItem "$androidDir" -Directory | Where-Object { $_.Name -eq "build" }
        foreach ($dir in $buildFiles) {
            Write-Host "Removing Android build directory: $($dir.FullName)" -ForegroundColor Magenta
            Remove-Item -Recurse -Force $dir.FullName -ErrorAction SilentlyContinue
        }
    }
    
    # Clear npm cache (which might help with Expo CLI issues)
    Write-Host "Clearing npm cache ..." -ForegroundColor Yellow
    npm cache clean --force 2>$null
}

# Fix ABI architecture issues - more aggressive approach
if ($FixABI) {
    Write-Host ">>> Fixing ABI architecture configuration (aggressive) ..." -ForegroundColor Yellow
    
    # Update app/build.gradle to force correct ABIs
    $buildGradlePath = "$PSScriptRoot\android\app\build.gradle"
    $buildGradleContent = Get-Content $buildGradlePath -Raw
    
    # Look for the defaultConfig section and update ndk block
    if ($buildGradleContent -match "defaultConfig\s*{") {
        $defaultConfigMatch = [regex]::Match($buildGradleContent, "defaultConfig\s*{([^}]*(\}[^}]*)*)\}")
        if ($defaultConfigMatch.Success) {
            $defaultConfigBlock = $defaultConfigMatch.Value
            $defaultConfigInner = $defaultConfigMatch.Groups[1].Value
            
            # Check if ndk block exists
            if ($defaultConfigInner -match "ndk\s*{") {
                # Replace the entire ndk block with correct ABIs
                $newDefaultConfigBlock = [regex]::Replace($defaultConfigBlock, "ndk\s*{[^}]*}", "ndk {\n            abiFilters `"arm64-v8a`", `"x86_64`"\n        }")
                $buildGradleContent = $buildGradleContent.Replace($defaultConfigBlock, $newDefaultConfigBlock)
            } else {
                # Add ndk block with correct ABIs
                $newDefaultConfigBlock = $defaultConfigBlock.TrimEnd('}') + "        ndk {\n            abiFilters `"arm64-v8a`", `"x86_64`"\n        }\n    }"
                $buildGradleContent = $buildGradleContent.Replace($defaultConfigBlock, $newDefaultConfigBlock)
            }
        } else {
            # If we couldn't find the defaultConfig block with proper regex, try a simpler approach
            $buildGradleContent = $buildGradleContent -replace "defaultConfig\s*{", "defaultConfig {\n        ndk {\n            abiFilters `'arm64-v8a`', `'x86_64`'\n        }\n    "
        }
    } else {
        # Add defaultConfig with correct ABIs if it doesn't exist
        $androidBlockMatch = [regex]::Match($buildGradleContent, "android\s*{([^}]*(\}[^}]*)*)\}")
        if ($androidBlockMatch.Success) {
            $androidBlock = $androidBlockMatch.Value
            # Add defaultConfig inside the android block
            $newAndroidBlock = $androidBlock -replace "android\s*{", "android {\n    defaultConfig {\n        ndk {\n            abiFilters `'arm64-v8a`', `'x86_64`'\n        }\n    }\n    "
            $buildGradleContent = $buildGradleContent.Replace($androidBlock, $newAndroidBlock)
        }
    }
    
    Set-Content -Path $buildGradlePath -Value $buildGradleContent
    Write-Host "Updated build.gradle with correct ABI configuration (aggressive)" -ForegroundColor Yellow
    
    # Now also try to override any architecture settings in Gradle properties that Expo might use
    $gradleUserPropsPath = "$PSScriptRoot\android\gradle.properties"
    $gradleUserProps = Get-Content $gradleUserPropsPath -Raw
    
    # Ensure the react native architectures settings are correct
    if ($gradleUserProps -match "reactNativeArchitectures=") {
        $gradleUserProps = [regex]::Replace($gradleUserProps, "reactNativeArchitectures=.*", "reactNativeArchitectures=arm64-v8a,x86_64")
    } else {
        $gradleUserProps += "\nreactNativeArchitectures=arm64-v8a,x86_64"
    }
    
    Set-Content -Path $gradleUserPropsPath -Value $gradleUserProps
    Write-Host "Forced reactNativeArchitectures to arm64-v8a,x86_64 in gradle.properties" -ForegroundColor Yellow
}

# Fix Windows path issues
if ($FixPaths) {
    Write-Host ">>> Fixing Windows path issues ..." -ForegroundColor Yellow
    
    # Check if the project path has special characters or spaces
    $projectPath = Get-Location
    Write-Host "Current project path: $projectPath" -ForegroundColor Cyan
    
    # Try to detect long path issues on Windows (Windows 10 version 1607+)
    $longPathEnabled = $true
    try {
        $registryPath = "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem"
        $longPathValue = Get-ItemProperty -Path $registryPath -Name "LongPathsEnabled" -ErrorAction Stop
        $longPathEnabled = $longPathValue.LongPathsEnabled -eq 1
    } catch {
        Write-Host "Could not check LongPathsEnabled registry setting" -ForegroundColor Yellow
    }
    
    if (-not $longPathEnabled) {
        Write-Host "Long paths not enabled on this system. Consider enabling them for better compatibility." -ForegroundColor Yellow
        Write-Host "Run as Administrator: `REG ADD HKLM\SYSTEM\CurrentControlSet\Control\FileSystem /v LongPathsEnabled /t REG_DWORD /d 1 /f`" -ForegroundColor Yellow
    }
    
    # Ensure proper file permissions and no special characters in file paths
    $appDir = "$PSScriptRoot\android\app"
    if (Test-Path $appDir) {
        $sourceDirs = Get-ChildItem "$appDir\src" -Directory
        foreach ($dir in $sourceDirs) {
            # Check for special characters in directory names
            if ($dir.Name -match "[^a-zA-Z0-9_-]") {
                Write-Host "Warning: Directory with special characters found: $($dir.Name)" -ForegroundColor Yellow
            }
        }
    }
}

# Fix Expo modules configuration issues
if ($FixExpoModules) {
    Write-Host ">>> Fixing Expo modules configuration issues ..." -ForegroundColor Yellow
    
    # Check for the Expo modules plugin file
    $expoPluginGradlePath = "$PSScriptRoot\node_modules\expo-modules-core\android\ExpoModulesCorePlugin.gradle"
    if (Test-Path $expoPluginGradlePath) {
        Write-Host "Found ExpoModulesCorePlugin.gradle, verifying it exists..." -ForegroundColor Yellow
        
        # Check for potential Windows path issues in the file
        try {
            $pluginContent = Get-Content $expoPluginGradlePath -Raw
            Write-Host "ExpoModulesCorePlugin.gradle content verified, size: $pluginContent.Length chars" -ForegroundColor Yellow
        } catch {
            Write-Host "Warning: Could not read ExpoModulesCorePlugin.gradle: $_" -ForegroundColor Yellow
        }
    } else {
        Write-Host "Warning: ExpoModulesCorePlugin.gradle not found at expected path." -ForegroundColor Yellow
    }
    
    # Additional fixes for Expo modules
    # Ensure react block is properly configured in app/build.gradle
    $buildGradlePath = "$PSScriptRoot\android\app\build.gradle"
    $buildGradleContent = Get-Content $buildGradlePath -Raw
    
    # Ensure the react block exists and is properly configured to work with Expo modules
    if ($buildGradleContent -notmatch "react\s*{") {
        # Find a good place to add the react configuration
        if ($buildGradleContent -match "react {\s*entryFile") {
            # It exists but might need updating
        } else {
            # Add react block if it doesn't exist properly
            if ($buildGradleContent -match "apply plugin:") {
                # Find the react configuration block or add it
                $reactConfig = @"
    
// React Native configuration for Expo
react {
    // Use Expo CLI to bundle the app, this ensures the Metro config
    // works correctly with Expo projects.
    cliFile = file(["node", "--print", "require.resolve('@expo/cli', { paths: [require.resolve('expo/package.json')] })"].execute(null, rootDir).text.trim())
    bundleCommand = "export:embed"
}
"@
                $buildGradleContent += $reactConfig
            }
        }
    }
    
    Set-Content -Path $buildGradlePath -Value $buildGradleContent
    Write-Host "Updated build.gradle with proper Expo modules configuration" -ForegroundColor Yellow
}

# Fix NDK path issues
if ($FixNDKPath) {
    Write-Host ">>> Fixing NDK path issues with spaces ..." -ForegroundColor Yellow
    
    # Verify the NDK path exists and is properly set
    if (Test-Path $NdkPath) {
        Write-Host "NDK found at: $NdkPath" -ForegroundColor Green
    } else {
        Write-Host "ERROR: NDK not found at expected path: $NdkPath" -ForegroundColor Red
        Write-Host "Please install NDK through Android Studio SDK Manager" -ForegroundColor Red
        exit 1
    }
    
    # Update the local.properties file to ensure it has the correct path
    $localPropsPath = "$PSScriptRoot\android\local.properties"
    $currentProps = Get-Content $localPropsPath -Raw
    
    # Replace or add the correct NDK path with proper formatting
    if ($currentProps -match "ndk.dir=") {
        $currentProps = [regex]::Replace($currentProps, "ndk.dir=.*", "ndk.dir=$NdkPath")
    } else {
        $currentProps += "`nndk.dir=$NdkPath"
    }
    
    Set-Content -Path $localPropsPath -Value $currentProps
    Write-Host "Updated local.properties with correct NDK path" -ForegroundColor Yellow
}

# Clear old assets
Write-Host ">>> Clearing old assets ..." -ForegroundColor Yellow
$assetsDir = "$PSScriptRoot\android\app\src\main\assets"
if (Test-Path $assetsDir) {
    Remove-Item -Path "$assetsDir\*" -Recurse -Force -ErrorAction SilentlyContinue
}

# IMPORTANT: Prebuild the project to generate native files with clean state
# This is crucial for fixing expo run:android issues
Write-Host ">>> Running expo prebuild to generate native files (clean) ..." -ForegroundColor Yellow
Write-Host "This step is critical for fixing 'expo run:android' issues ..." -ForegroundColor Yellow

# Use --clean flag to ensure fresh native files
& npx expo prebuild --platform android --clean --skip-dependency-update
if ($LASTEXITCODE -ne 0) {
    Write-Host "Warning: expo prebuild failed, but continuing..." -ForegroundColor Yellow
}

# Check if dependencies are properly installed
Write-Host ">>> Verifying dependencies are installed ..." -ForegroundColor Yellow

# Check if node_modules have proper structure
$packageLockExists = Test-Path "package-lock.json"
$yarnLockExists = Test-Path "yarn.lock"

if ($yarnLockExists) {
    Write-Host "Using yarn to install dependencies..." -ForegroundColor Yellow
    yarn install
} elseif ($packageLockExists) {
    Write-Host "Using npm ci to install dependencies..." -ForegroundColor Yellow
    npm ci
} else {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

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

# If using a custom keystore, update the build configuration
if ($UseKeystore -and $BuildType -eq "release") {
    Write-Host ">>> Setting up release signing configuration ..." -ForegroundColor Yellow
    
    # Check if there's a keystore file available
    $keystorePath = "$PSScriptRoot\android\app\your-upload-key.keystore"
    if (Test-Path $keystorePath) {
        # Update gradle file to use release signing
        $buildGradlePath = "$PSScriptRoot\android\app\build.gradle"
        $buildGradleContent = Get-Content $buildGradlePath -Raw
        
        # If a signing config doesn't already exist for release, add it
        if ($buildGradleContent -notmatch "signingConfigs\s*{\s*release") {
            $signingConfig = @"
    signingConfigs {
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
        release {
            storeFile file('your-upload-key.keystore')
            storePassword System.getenv("SIGNING_STORE_PASSWORD") ?: findProperty("MYAPP_UPLOAD_STORE_PASSWORD") ?: ""
            keyAlias System.getenv("SIGNING_KEY_ALIAS") ?: findProperty("MYAPP_UPLOAD_KEY_ALIAS") ?: ""
            keyPassword System.getenv("SIGNING_KEY_PASSWORD") ?: findProperty("MYAPP_UPLOAD_KEY_PASSWORD") ?: ""
        }
    }
"@
            $buildGradleContent = $buildGradleContent -replace "signingConfigs\s*{[^}]*}", $signingConfig
            Set-Content -Path $buildGradlePath -Value $buildGradleContent
        }
    }
}

# For yarn android (expo run:android), we need to try multiple approaches to force correct ABI
Write-Host ">>> Building APK ($BuildType) - trying multiple approaches to fix NDK path issues..." -ForegroundColor Yellow

# Set environment variables to override architecture settings (for Expo CLI)
$env:EXPO_ANDROID_ARCHITECTURES = "arm64-v8a,x86_64"
$env:EXPO_DEBUG = "true"

# Try expo run:android with explicit environment variable and architecture override
Write-Host "Executing: npx expo run:android --variant $BuildType --device --build-cache=false with correct ABI settings" -ForegroundColor Cyan

# Use a more direct approach to set the architectures
$expoCommand = "npx expo run:android --variant $BuildType --no-build-cache --clear"
$expoProcess = Start-Process -FilePath "cmd.exe" -ArgumentList "/c", "$expoCommand > final-expo-build.log 2>&1 && exit %ERRORLEVEL%" -Wait -PassThru -NoNewWindow

if ($expoProcess.ExitCode -eq 0) {
    Write-Host "Expo build completed successfully!" -ForegroundColor Green
    Write-Host "APK location will be shown in the Expo build output above." -ForegroundColor Green
} else {
    Write-Host "Expo build failed with exit code: $($expoProcess.ExitCode)" -ForegroundColor Red
    
    # Check if the error is related to ABI, Expo modules, NDK path or other issues specifically
    if (Test-Path "final-expo-build.log") {
        $logContent = Get-Content "final-expo-build.log" -Raw
        $abiError = $logContent -match "armeabi-v7a|Cannot build selected target ABI"
        $pathError = $logContent -match "filename.*directory.*name.*or.*volume label syntax is incorrect"
        $expoModulesError = $logContent -match "ExpoModulesCorePlugin.gradle|Could not get unknown property.*release"
        $ndkError = $logContent -match "CXX1102|ndk.dir|NDK and couldn't be used"
        
        if ($abiError) {
            Write-Host "ABI architecture error detected in Expo build log." -ForegroundColor Red
        }
        if ($pathError) {
            Write-Host "Windows path error detected in Expo build log." -ForegroundColor Red
        }
        if ($expoModulesError) {
            Write-Host "Expo modules configuration error detected in Expo build log." -ForegroundColor Red
        }
        if ($ndkError) {
            Write-Host "NDK path error detected in Expo build log." -ForegroundColor Red
        }
    }
    
    # If Expo run fails due to NDK path issues, try direct Gradle build with forced parameters
    Write-Host "`nTrying direct Gradle build to fix NDK path and bypass other issues..." -ForegroundColor Yellow
    Set-Location "$PSScriptRoot\android"
    
    # Use the correct architecture parameters and force NDK path
    $gradleTask = "assemble$($BuildType[0].ToString().ToUpper())$($BuildType.Substring(1))"
    # Force the correct architectures via command line parameters
    $gradleParams = "--no-daemon --info -PreactNativeArchitectures=arm64-v8a,x86_64"
    
    # Add Windows-specific parameters to handle path issues and force correct NDK path
    $gradleParams += " -Dorg.gradle.jvmargs=`"-Xmx4096m`" -Dfile.encoding=`"UTF-8`""
    $gradleParams += " -Pndk.dir=`"$NdkPath`""
    $gradleParams += " -Psdk.dir=`"$SdkPath`""
    
    if ($FixKotlin) {
        $gradleParams += " -Pkotlin.compiler.execution.strategy=in-process -Dkotlin.daemon.jvm.options=-Xmx2048m"
    }
    
    if ($FixReanimated) {
        # Skip lint for reanimated if there are issues
        $gradleParams += " -x lint -x bundleReleaseLocalLintAar"
    }
    
    Write-Host "Executing: gradlew $gradleTask $gradleParams" -ForegroundColor Cyan
    $gradleProcess = Start-Process -FilePath "cmd.exe" -ArgumentList "/c", "gradlew $gradleTask $gradleParams > final-build.log 2>&1 && exit %ERRORLEVEL%" -Wait -PassThru -NoNewWindow
    
    if ($gradleProcess.ExitCode -eq 0) {
        Write-Host "Direct Gradle build completed successfully!" -ForegroundColor Green
        
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
        } else {
            Write-Host "Could not locate the generated APK. Check the build output above." -ForegroundColor Red
        }
    } else {
        Write-Host "Both Expo and Gradle builds failed." -ForegroundColor Red
        Write-Host "Check the logs: final-build.log and final-expo-build.log" -ForegroundColor Red
        
        if (Test-Path "final-build.log") {
            Write-Host "`n=== Gradle Build Errors ===" -ForegroundColor Red
            $gradleErrors = Select-String -Path "final-build.log" -Pattern "error|Error|ERROR|FAILED|Cannot query the value of this property|dependencies|lintAar|compileDebugKotlin|filename.*directory.*name.*or.*volume label syntax is incorrect|compileDebugJavaWithJavac|armeabi-v7a|Cannot build selected target ABI|Could not get unknown property|ExpoModulesCorePlugin.gradle|CXX1102|ndk.dir|NDK and couldn't be used|expo-modules-autolinking" -CaseSensitive -SimpleMatch | Select-Object -First 15
            if ($gradleErrors) {
                $gradleErrors | ForEach-Object { Write-Host $_.Line -ForegroundColor Red }
            } else {
                Write-Host "No specific errors found in final-build.log" -ForegroundColor Yellow
            }
        }
        
        if (Test-Path "final-expo-build.log") {
            Write-Host "`n=== Expo Build Errors ===" -ForegroundColor Red
            $expoErrors = Select-String -Path "final-expo-build.log" -Pattern "error|Error|ERROR|FAILED|Cannot build selected target ABI|armeabi-v7a|filename.*directory.*name.*or.*volume label syntax is incorrect|compileDebugJavaWithJavac|Could not get unknown property|ExpoModulesCorePlugin.gradle|CXX1102|ndk.dir|NDK and couldn't be used|expo-modules-autolinking" -CaseSensitive -SimpleMatch | Select-Object -First 15
            if ($expoErrors) {
                $expoErrors | ForEach-Object { Write-Host $_.Line -ForegroundColor Red }
            } else {
                Write-Host "No specific errors found in final-expo-build.log" -ForegroundColor Yellow
            }
        }
    }
    
    Set-Location "$PSScriptRoot"
}

Write-Host "========================================" -ForegroundColor Green
Write-Host "Build process completed!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Provide next steps if successful
if ($expoProcess.ExitCode -eq 0 -or $gradleProcess.ExitCode -eq 0) {
    Write-Host "`nNext steps:" -ForegroundColor Green
    Write-Host "1. Find your APK in the './dist' folder or as shown in the build output" -ForegroundColor Green
    Write-Host "2. Install it on your Android device or emulator" -ForegroundColor Green
    Write-Host "3. Test all functionality before distributing" -ForegroundColor Green
} else {
    Write-Host "`nBuild failed. You may need to:" -ForegroundColor Red
    Write-Host "1. Update your project path to avoid special characters or long paths" -ForegroundColor Red
    Write-Host "2. Enable long paths on Windows if needed" -ForegroundColor Red
    Write-Host "3. Use Android Studio to build the project" -ForegroundColor Red
    Write-Host "4. Check the troubleshooting section in BUILD-APK-GUIDE.md" -ForegroundColor Red
    Write-Host "5. Try the direct build script to bypass Expo modules issues:" -ForegroundColor Red
    Write-Host "   .\direct-build.ps1 -BuildType debug" -ForegroundColor Red
    Write-Host "6. Make sure NDK is installed via Android Studio SDK Manager" -ForegroundColor Red
    Write-Host "7. Verify your SDK and NDK paths are correct" -ForegroundColor Red
}