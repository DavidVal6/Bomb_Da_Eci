# Como Usar los docker:

## Iniciando imagenes 
Para empezar se debe hacer docker build tanto a back como a front, posiblemente estas imagenes ya esten en dockerhub para cuando este finalizdo:

corriendo back:\
1. Vaya al directorio donde tiene el dockerfile de backend o el backend funcionando y escriba el siguiente comando:
```bash
docker build -t  backendbombdaeci:latest .
```

Corriendo Front: 
1. Vayase al directorio donde esta el dockerfile de frontend o donde esta el proyecto frontend y ejecute el siguiente comando

```bash
docker build -t  frontbombdaeci:latest .
```

## Ejecutando el compose

En donde se encuentra el docker-compse.yml ejecute el siguiente comando
```bash
docker-compose up -d
```