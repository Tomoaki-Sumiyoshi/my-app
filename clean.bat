@echo off
echo Cleaning node_modules, dist, .turbo, tsconfig.tsbuildinfo...

:: node_modules と dist .turboを再帰的に削除
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

:: tsconfig.tsbuildinfo を再帰的に削除
for /r %%f in (tsconfig.tsbuildinfo) do (
  if exist "%%f" (
    echo Removing %%f
    del /f /q "%%f"
  )
)

:: ルートの pnpm-lock.yaml 削除（必要ならコメント外す）
if exist pnpm-lock.yaml (
  echo Removing pnpm-lock.yaml
  del /f /q pnpm-lock.yaml
)

echo Installing dependencies...
pnpm install

@REM echo Running build...
@REM pnpm exec turbo run build

echo Done.
pause