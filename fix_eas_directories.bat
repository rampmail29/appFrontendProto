@echo off
setlocal ENABLEEXTENSIONS

REM Listado de carpetas a procesar
set "base_dir=src"
set "folders=assets context screens navigation services"

echo 🚀 Iniciando reestructuración de carpetas en %base_dir%

for %%F in (%folders%) do (
    set "original_dir=%base_dir%\%%F"
    set "temp_dir=%base_dir%\%%F_temp"

    if exist "%base_dir%\%%F" (
        echo 🔁 Renombrando %%F a %%F_temp
        rename "%base_dir%\%%F" "%%F_temp"
    )

    echo 📁 Creando %%F limpio
    mkdir "%base_dir%\%%F"

    if exist "%base_dir%\%%F_temp" (
        echo 📂 Moviendo archivos de %%F_temp a %%F
        move "%base_dir%\%%F_temp\*" "%base_dir%\%%F" > nul
        rmdir /s /q "%base_dir%\%%F_temp"
    )
)

REM Forzar detección de cambios en Git
echo ⚙️ Configurando Git para case-sensitive
git config core.ignorecase false

echo ✅ Añadiendo y haciendo commit de los cambios...
git add -A
git commit -m "Reestructura carpetas para corregir permisos y case sensitivity en EAS"
git push origin main

echo 🎉 Listo. Ahora puedes ejecutar: eas build --platform android --profile production

endlocal
pause
