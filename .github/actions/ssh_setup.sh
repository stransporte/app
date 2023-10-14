#!/bin/bash
. $GITHUB_WORKSPACE/.env

mkdir -p ~/.ssh
echo "creo la carpeta"

cp ./public/id_rsa ~/.ssh/id_rsa
echo "copio la llave"

chmod 600 ~/.ssh/id_rsa
echo "Dio permisos"

#!/bin/bash

# Archivo de configuración SSH
config_file="~/.ssh/config"

# Comprobar si el archivo de configuración ya existe
if [ ! -f "$config_file" ]; then
    echo " " > ~/.ssh/config
fi

# Verificar si ya existe una entrada para el host
if grep -qFx "Host $SSH_URL" "$config_file"; then
    echo "La entrada para el host ya existe en el archivo de configuración."
else
    # Agregar la entrada del host al archivo de configuración
    echo "Host 2.2" >>"$config_file"
    echo "  HostName $SSH_URL" >>"$config_file"
    echo "  User $SSH_USER" >>"$config_file"
    echo "  Port $SSH_PORT" >>"$config_file"
    echo "La entrada para el host se ha agregado al archivo de configuración."
fi

ssh-keyscan -t rsa 2.2 >>~/.ssh/known_hosts
echo "Termino el scan"

# scp ./README.md 2.2:~/
