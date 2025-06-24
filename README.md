# Blog API
##### Desarrollado por [@asebasg, @Juanes-crypto, @diegoPonce2].

---

## Herramientas para el desarrollo
Al momento de clonar el repositorio, se deben de instalar las dependencias del proyecto, para esto se debe de ejecutar el siguiente comando:

```bash
npm install
```

Esto hara que todas las dependencias se instalen en la carpeta `node_modules`.

## Actualizacion y migracion de la base de datos
Para actualizar la base de datos y migrar los cambios, se debe de ejecutar el siguiente comando:

```bash
npx prisma migrate dev --name init
```
