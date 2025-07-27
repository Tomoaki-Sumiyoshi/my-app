@echo off
echo ========================================
echo Cleaning node_modules, dist, .turbo, tsconfig.tsbuildinfo...
echo ========================================

:: turbod プロセスを強制終了（存在する場合）
echo Killing turbod.exe if running...
taskkill /f /im turbod.exe >nul 2>&1
if %ERRORLEVEL% EQU 0 (
  echo turbod.exe was running and has been killed.
) else (
  echo turbod.exe not running.
)

:: TEMP に残っている turbod フォルダを削除
set TURBOD_DIR=%TEMP%\turbod
if exist "%TURBOD_DIR%" (
  echo Deleting: %TURBOD_DIR%
  rd /s /q "%TURBOD_DIR%"
) else (
  echo No turbod directory found in %TEMP%
)

:: node_modules と dist .turbo .nextを再帰的に削除
for /d /r %%d in (node_modules) do (
  if exist "%%d" (
    echo Removing %%d
    rmdir /s /q "%%d"
  )
)
for /d /r %%d in (dist) do (
  if exist "%%d" (
    echo Removing %%d
    rmdir /s /q "%%d"
  )
)
for /d /r %%d in (.turbo) do (
  if exist "%%d" (
    echo Removing %%d
    rmdir /s /q "%%d"
  )
)
for /d /r %%d in (.next) do (
  if exist "%%d" (
    echo Removing %%d
    rmdir /s /q "%%d"
  )
)

:: tsconfig.tsbuildinfo を削除
for /r %%f in (tsconfig.tsbuildinfo) do (
  if exist "%%f" (
    echo Removing %%f
    del /f /q "%%f"
  )
)

:: pnpm-lock.yaml を削除（必要に応じて有効化）
if exist pnpm-lock.yaml (
  echo Removing pnpm-lock.yaml
  del /f /q pnpm-lock.yaml
)

echo.
echo Installing dependencies...
pnpm install

@REM echo Running generate...
@REM pnpm turbo run generate

@REM echo Installing dependencies...
@REM pnpm install

@REM echo Running build...
@REM pnpm exec turbo run build

echo.
echo Done.
pause