# ================================
# Fix Expo/React Native build errors
# ================================

# Path SDK Android
$SdkPath = "C:\\Users\\Asus Vivobook\\AppData\\Local\\Android\\Sdk"
$NdkPath = "$SdkPath\\ndk\\23.1.7779620"

Write-Host ">>> Menghapus cache Reanimated .cxx ..."
Remove-Item -Recurse -Force "node_modules\react-native-reanimated\android\.cxx" -ErrorAction SilentlyContinue

Write-Host ">>> Menghapus cache Gradle ..."
Remove-Item -Recurse -Force "android\.gradle" -ErrorAction SilentlyContinue

Write-Host ">>> Membersihkan build lama ..."
cd android
cmd /c gradlew clean
cd ..

Write-Host ">>> Menulis ulang local.properties ..."
$localProps = @"
sdk.dir=$SdkPath
ndk.dir=$NdkPath
"@
Set-Content -Path "android\local.properties" -Value $localProps -Encoding UTF8

Write-Host ">>> Jalankan build release ..."
npx expo run:android --variant release
