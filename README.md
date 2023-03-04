# proyecto-la-salle

# Comandos de git

## Inicialització d'un repositori en un directori existent

git init

## Ignorar fitxers

cat .gitignore


## Guardar los cambios de un archivo html en el repositorio
### Afegir fitxers

git add *.html
git add README

### commit
git commit -m 'initial project version'

## Inspeccionar un repositorio
git status
git log


## Hacer stash  de los cambios del espacio de trabajo.

git stash

## Crear rama

git branch "nombre rama"

## Moverse a una rama

git checkout "nombre de la rama"

## Borrar rama

git checkout -D "nombre de rama"

## git en el servidor

git clone
git fork

# Sincronizarse

git remote
git fetch
git pull
git push

# Ver listado de repositorios remotos

git remote -v
