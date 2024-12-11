# API de Lista de Tareas (ToDoList API)

Este repositorio contiene el código backend para la **API de Lista de Tareas (ToDoList API)**, construida utilizando Node.js, Prisma ORM y PostgreSQL. El proyecto está desplegado con **Vercel** y utiliza GitHub Actions para la integración y despliegue continuo (CI/CD).

## Características

- **Operaciones CRUD** para la gestión de tareas.
- Base de datos **PostgreSQL** para almacenamiento persistente.
- **Prisma ORM** para la gestión del esquema y las interacciones con la base de datos.
- **Despliegue en Vercel** para hosting en producción.
- **Pipeline CI/CD** implementado con GitHub Actions.

---
- **Informe del Proyecto**: [informe del proyecto](https://udlaec-my.sharepoint.com/:b:/g/personal/andres_guaman_taco_udla_edu_ec/EXBOOplpSQtOjaAc8jbigB4BOWhwm03ikLOpgiRzLUbb1A?e=jacX6I) 
## Estructura del Proyecto

```
.
├── prisma/                # Esquema y archivos de migración de Prisma
├── src/                   # Código fuente
│   ├── controllers/       # Controladores de la API
│   ├── routes/            # Rutas de la API
│   ├── models/            # Modelos de Prisma
│   └── app.js             # Punto de entrada
├── .github/workflows/     # Workflows de GitHub Actions
├── vercel.json            # Configuración de Vercel
├── package.json           # Metadatos del proyecto y dependencias
└── README.md              # Documentación del proyecto
```

---

## Prerrequisitos

Asegúrate de tener instalados los siguientes programas en tu máquina:

- **Node.js** (v18 o superior)
- Base de datos **PostgreSQL**
- **Git**

Además, necesitarás:

1. Una cuenta de **Vercel** para el despliegue.
2. Un repositorio de **GitHub** conectado a Vercel.
3. Una cadena de conexión válida **DATABASE_URL** para PostgreSQL.

---

## Comenzando

### Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/toDoList_API.git
cd toDoList_API
```

### Instalar Dependencias

```bash
npm install
```

### Configurar Variables de Entorno

Crea un archivo `.env` en el directorio raíz y agrega tu URL de la base de datos:

```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_base_datos
```

### Ejecutar Migraciones

```bash
npx prisma migrate dev
```

### Iniciar el Servidor

```bash
npm start
```

Tu API estará disponible en `http://localhost:3000`.

---

## Despliegue

### **1. Conectar Vercel con GitHub**
Asegúrate de que tu repositorio de GitHub esté conectado a Vercel. Esto permite que Vercel active despliegues automáticamente.

### **2. Configurar el Token de Vercel**
Genera un nuevo token en el [panel de Vercel](https://vercel.com/account/tokens). Usa las siguientes configuraciones:

- **Scope**: Tu proyecto o cuenta completa.
- **Expiration**: Selecciona una duración adecuada o sin vencimiento.

Agrega este token como un secreto en tu repositorio de GitHub con el nombre `VERCEL_TOKEN`.

### **3. Pipeline CI/CD**

Este proyecto utiliza GitHub Actions para despliegues automáticos. El archivo del workflow se encuentra en `.github/workflows/deploy.yml` y realiza los siguientes pasos:

1. **Instalar dependencias**.
2. **Ejecutar comandos de Prisma** para generar el cliente y desplegar migraciones.
3. **Desplegar en Vercel**.

### Ejemplo de Workflow

```yaml
name: Despliegue en Vercel

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout del código
        uses: actions/checkout@v3

      - name: Configurar Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Instalar dependencias
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
        run: npm install

      - name: Configuración de Prisma
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
        run: |
          npx prisma generate
          npx prisma migrate deploy

      - name: Desplegar en Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        run: npx vercel deploy --prod --yes --token=$VERCEL_TOKEN
```

---

## Errores Comunes

### `Error: DATABASE_URL not found`
Asegúrate de que el secreto `DATABASE_URL` esté configurado correctamente en la configuración de tu repositorio en GitHub.

### `Error: The specified token is not valid`
Verifica tu secreto `VERCEL_TOKEN` y asegúrate de que coincida con el token generado en el panel de Vercel.

### `Error: Command vercel deploy requires confirmation`
Asegúrate de que el flag `--yes` esté incluido en el comando `vercel deploy` en tu archivo de workflow.

---

## Contribuir

1. Haz un fork del repositorio.
2. Crea una rama de funcionalidad (`git checkout -b nombre-funcionalidad`).
3. Realiza tus cambios (`git commit -m 'Agregar nueva funcionalidad'`).
4. Haz push a la rama (`git push origin nombre-funcionalidad`).
5. Abre un pull request.

---


## Tecnologías usadas

- [Node.js](https://nodejs.org/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Vercel](https://vercel.com/)
- [GitHub Actions](https://github.com/features/actions)

