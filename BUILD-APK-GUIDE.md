# Building APK without EAS for Expo Project

This guide explains how to build an APK for your Expo project without using Expo Application Services (EAS).

## Prerequisites

- Android Studio installed with Android SDK
- Android NDK (version specified in `android/gradle.properties`)
- Node.js and npm/yarn installed
- Java Development Kit (JDK)

## Quick Build Commands

### PowerShell (Windows)
```powershell
# Build a release APK
.\fix.build.ps1 -BuildType release

# Build with clean (removes cache)
.\fix.build.ps1 -BuildType release -CleanBuild

# Build a debug APK
.\fix.build.ps1 -BuildType debug

# Build with CMake issue fixes (recommended for expo-modules-core errors)
.\fix.build.ps1 -BuildType release -FixCMake

# Build with Kotlin compilation fixes (for expo-modules-core:compileDebugKotlin errors)
.\fix.build.ps1 -BuildType release -FixKotlin

# Build with react-native-reanimated fixes (for bundleReleaseLocalLintAar errors)
.\fix.build.ps1 -BuildType release -FixReanimated

# Build with ABI architecture fixes (for armeabi-v7a unsupported errors)
.\fix.build.ps1 -BuildType release -FixABI

# Build with Windows path fixes (for filename/directory syntax errors)
.\fix.build.ps1 -BuildType release -FixPaths

# Complete fix for all common issues
.\fix.build.ps1 -BuildType release -CleanBuild -FixCMake -FixKotlin -FixReanimated -FixExpoRun -FixABI -FixPaths

# Direct build approach (bypasses Expo CLI entirely)
.\direct-build.ps1 -BuildType release
```

### Batch file (Windows)
```batch
# Build a release APK
.\build-apk.bat release

# Build with clean
.\build-apk.bat release --clean

# Build a debug APK
.\build-apk.bat debug
```

## Build Script Features

The build scripts include several fixes and optimizations:

1. **Environment Detection**: Automatically detects Android SDK and NDK paths
2. **Cache Cleaning**: Removes problematic cache directories including CMake, Kotlin, and Reanimated caches
3. **ABI Architecture Fixes**: Corrects architecture configurations to match supported ABIs
4. **Windows Path Fixes**: Addresses Windows-specific path issues
5. **Gradle Optimization**: Sets optimal Gradle properties for building
6. **Prebuild Execution**: Runs `expo prebuild` to generate native files
7. **Direct Build Option**: Bypasses Expo CLI entirely for builds that avoid parameter issues
8. **Asset Management**: Properly bundles assets for release builds
9. **CMake Issue Fixes**: Specific handling for CMake configuration errors in expo-modules-core
10. **Kotlin Compilation Fixes**: Specific handling for Kotlin compilation errors in expo-modules-core
11. **Reanimated Lint Fixes**: Specific handling for react-native-reanimated lint errors
12. **Expo Run Fixes**: Specific handling for expo run:android issues
13. **Build Output**: Copies the final APK to the `./dist` folder for easy access

## Common Issues and Solutions

### 1. Android SDK Not Found
If the script reports "Android SDK not found", set the environment variables:
```bash
export ANDROID_HOME=/path/to/android-sdk
export ANDROID_SDK_ROOT=$ANDROID_HOME
```

### 2. Expo CLI Architecture Parameter Issues
**Problem**: `PreactNativeArchitectures=x86,armeabi-v7a` in error message
**Solution**: Use the direct build script which bypasses Expo CLI:
```powershell
.\direct-build.ps1 -BuildType debug
```

### 3. ABI Architecture Errors (Cannot build selected target ABI: armeabi-v7a, supported ABIs are: arm64-v8a, x86_64)
This error occurs because your NDK doesn't support armeabi-v7a but the project is configured for it. The script fixes this by:
- Updating `gradle.properties` to specify supported ABIs: `arm64-v8a, x86_64`
- Updating `build.gradle` to use the correct ABI filters
- Passing the correct architecture parameters to build commands

```powershell
.\fix.build.ps1 -BuildType release -FixABI -CleanBuild
```

### 4. Windows Path Issues (filename, directory name, or volume label syntax is incorrect)
This error occurs on Windows when there are path-related issues. The script addresses this by:
- Ensuring proper project path handling
- Checking for special characters in paths
- Providing guidance for Windows-specific configurations

```powershell
.\fix.build.ps1 -BuildType release -FixPaths -CleanBuild
```

### 5. CMake Configuration Errors (Task :expo-modules-core:configureCMake[arch] errors)
This is a common issue with Expo projects. The updated scripts handle this by:
- Cleaning CMake cache in `node_modules/expo-modules-core`
- Building for specific architectures first
- Using appropriate NDK versions

```powershell
.\fix.build.ps1 -BuildType release -FixCMake
```

### 6. Kotlin Compilation Errors (Task :expo-modules-core:compileDebugKotlin errors)
This common error occurs due to cache conflicts or Kotlin compiler issues. The script addresses this by:
- Cleaning Kotlin-related caches and metadata
- Setting in-process Kotlin compilation
- Disabling incremental Kotlin compilation
- Using appropriate Kotlin version settings

```powershell
.\fix.build.ps1 -BuildType release -FixKotlin -CleanBuild
```

### 7. react-native-reanimated Lint Errors (Task ':react-native-reanimated:bundleReleaseLocalLintAar' errors)
This error occurs when Gradle can't query property values in react-native-reanimated. The script addresses this by:
- Cleaning react-native-reanimated caches
- Using legacy packaging option for compatibility
- Skipping problematic lint tasks when needed

```powershell
.\fix.build.ps1 -BuildType release -FixReanimated -CleanBuild
```

### 8. Expo Run Errors (expo run:android issues)
This error occurs when the Expo CLI has issues building the project. The script addresses this by:
- Cleaning the `.expo` directory
- Running a proper prebuild with `--clean` flag
- Clearing npm cache
- Using correct architecture parameters

```powershell
.\fix.build.ps1 -BuildType release -FixExpoRun -CleanBuild
```

### 9. Memory Issues During Build
The script configures Gradle to use up to 4GB of RAM. If you continue to have issues, ensure your system has enough memory available.

### 10. Build Tools Version Issues
Make sure your Android SDK has the build tools version specified in `android/build.gradle`.

## Direct Build Approach (Bypassing Expo CLI)

If you continue to have issues with Expo CLI (like the persistent architecture parameters problem), use the direct build script:

```powershell
.\direct-build.ps1 -BuildType debug
```

This approach:
- Bypasses Expo CLI entirely
- Goes directly to Gradle for building
- Uses correct architecture parameters (`-PreactNativeArchitectures=arm64-v8a,x86_64`)
- Avoids parameter passing issues from Expo CLI

## Build for Specific Architectures

To avoid ABI issues, the scripts now build for supported architectures: `arm64-v8a` and `x86_64`. You can also build directly for a specific architecture:

```bash
cd android
./gradlew assembleReleaseArm64-v8a
```

## Release vs Debug Builds

- **Debug APK**: For testing and development, includes debugging tools
- **Release APK**: Optimized for production, smaller file size, includes code minification

## Keystore Setup for Production

If you want to sign your APK with a custom keystore:

1. Place your keystore file at `android/app/[your-keystore-name].keystore`
2. Run the script with the `UseKeystore` parameter:
```powershell
.\fix.build.ps1 -BuildType release -UseKeystore
```

## Generated File Locations

- APK files are copied to the `./dist/` folder
- Build logs are temporarily stored in various log files during build

## Troubleshooting

1. If builds persistently fail, try cleaning everything:
   ```powershell
   .\fix.build.ps1 -CleanBuild
   ```

2. For Expo CLI architecture parameter issues (the persistent problem):
   ```powershell
   .\direct-build.ps1 -BuildType debug
   ```

3. For ABI-related errors:
   ```powershell
   .\fix.build.ps1 -FixABI -CleanBuild
   ```

4. For Windows path-related errors:
   ```powershell
   .\fix.build.ps1 -FixPaths -CleanBuild
   ```

5. For CMake-related errors (common with expo-modules-core):
   ```powershell
   .\fix.build.ps1 -FixCMake -CleanBuild
   ```

6. For Kotlin compilation errors:
   ```powershell
   .\fix.build.ps1 -FixKotlin -CleanBuild
   ```

7. For react-native-reanimated lint errors:
   ```powershell
   .\fix.build.ps1 -FixReanimated -CleanBuild
   ```

8. For expo run:android errors:
   ```powershell
   .\fix.build.ps1 -FixExpoRun -CleanBuild
   ```

9. For all common issues:
   ```powershell
   .\fix.build.ps1 -FixCMake -FixKotlin -FixReanimated -FixExpoRun -FixABI -FixPaths -CleanBuild
   ```

10. Check your project dependencies:
    ```bash
    npm install
    ```

11. Ensure all Expo plugins are properly configured:
    ```bash
    npx expo prebuild --clean
    ```

12. If using a custom keystore, ensure the environment variables are set:
    - `SIGNING_STORE_PASSWORD`
    - `SIGNING_KEY_PASSWORD`
    - `SIGNING_KEY_ALIAS`

## Alternative Build Process

If the scripts don't work, you can manually build using:

1. Clean previous builds:
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

2. Clean caches for problematic modules:
   ```bash
   rm -rf node_modules/expo-modules-core/android/.cxx
   rm -rf node_modules/react-native-reanimated/android/build
   ```

3. Update ABI configurations:
   Add to `android/gradle.properties`:
   ```
   reactNativeArchitectures=arm64-v8a,x86_64
   ```

4. Prebuild the project:
   ```bash
   npx expo prebuild --platform android --clean
   ```

5. Build the APK directly with Gradle:
   ```bash
   cd android
   ./gradlew assembleRelease -PreactNativeArchitectures=arm64-v8a,x86_64
   # or for debug:
   # ./gradlew assembleDebug -PreactNativeArchitectures=arm64-v8a,x86_64
   ```

The APK will be located in `android/app/build/outputs/apk/`.

## ABI-Specific Troubleshooting

If you continue to have ABI issues:

1. Check your NDK version supports the required architectures
2. Update your `gradle.properties`:
   ```
   reactNativeArchitectures=arm64-v8a,x86_64
   ```
3. Update your `app/build.gradle` defaultConfig:
   ```
   ndk {
       abiFilters "arm64-v8a", "x86_64"
   }
   ```

## Windows Path-Specific Troubleshooting

If you continue to have path issues on Windows:

1. Ensure your project directory path doesn't contain special characters
2. Enable long paths on Windows (for Windows 10 version 1607+):
   ```cmd
   REG ADD HKLM\SYSTEM\CurrentControlSet\Control\FileSystem /v LongPathsEnabled /t REG_DWORD /d 1 /f
   ```
3. Move your project to a path with a shorter overall length
4. Run the command prompt as Administrator when building

## Reanimated-Specific Troubleshooting

If you continue to have react-native-reanimated lint issues:

1. Skip the lint task:
   ```bash
   ./gradlew assembleRelease -x lint -x bundleReleaseLocalLintAar
   ```

2. Enable legacy packaging:
   Add to `android/gradle.properties`:
   ```
   expo.useLegacyPackaging=true
   ```

3. Clean reanimated cache:
   ```bash
   rm -rf node_modules/react-native-reanimated/android/build
   ```