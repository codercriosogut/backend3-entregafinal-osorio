<h1 align="center" id="title">Dockerizando nuestro
Proyecto ver.9</h1>
<div align="center" id="top"> 
  <img src="./src/public/img/logo.png" alt="logo" />
</div>
<p align="center">
  <a href="#descripcion">Descripción</a> &#xa0; | &#xa0;
  <a href="#instalacion">Instalacion</a> &#xa0; | &#xa0;
  <a href="#env">env</a> &#xa0; | &#xa0;
  <a href="#directorios">Directorios</a> &#xa0; | &#xa0;
  <a href="#codigo">Código</a> &#xa0; | &#xa0;
  <a href="#rutas">Rutas</a> &#xa0; | &#xa0;
  <a href="#dependencias">Dependencias</a> &#xa0; | &#xa0;
  <a href="#npm">NPM-Start/Test</a> &#xa0; | &#xa0;
  <a href="#docker">Docker</a> &#xa0; | &#xa0; 
  <a href="#swagger">Swagger</a> &#xa0; | &#xa0; 
</p>

<br>

#
#
#
## Descripcion ##
Este proyecto es una API para gestionar usuarios, mascotas y adopciones. Permite realizar operaciones CRUD (crear, leer, actualizar y eliminar). Está construida con Node.js y Express, y usa MongoDB como base de datos. La aplicación está orientada a un sistema de adopción de mascotas, donde los usuarios pueden adoptar animales disponibles y gestionarlos.

<a href="#title">Volver al inicio</a>


#
#
#
## Instalacion ##
Para instalar y ejecutar este proyecto, sigue estos pasos:

```bash
# Clonar repositorio:
$ git clone https://github.com/codercriosogut/backend3-entregafinal-osorio.git

# Accede al directorio del proyecto:
$ cd .\backend3-entregafinal-osorio\

# Instala las dependencias:
$ npm install
$ npm list

├── @faker-js/faker@9.2.0
├── bcryptjs@2.4.3
├── chai@4.3.7
├── cookie-parser@1.4.6
├── cross-env@7.0.3
├── dotenv@16.4.5
├── express@4.18.2
├── jsonwebtoken@8.5.1
├── mocha@10.1.0
├── mongoose@6.7.5
├── multer@1.4.5-lts.1
├── supertest@6.3.3
├── swagger-jsdoc@6.2.8
└── swagger-ui-express@5.0.1

# Ejecuta el servidor
$ npm start

# Utilizar Postman o Swagger
// Con Swagger y Postman puedes realizar fácilmente pruebas de todas las operaciones CRUD
```
<a href="#title">Volver al inicio</a>

#
#
#
## .env ##
Este proyecto requiere las siguientes variables de entorno:
```env
MONGODB_URI: URL de la base de datos para producción.
MONGODB_TEST_URI: URL de la base de datos para pruebas.
MOCK_USER_PASSWORD: Contraseña por defecto para los usuarios generados.
```
- MONGODB_URI=mongodb+srv://cri2024:cri2024@cluster0.mswsapd.mongodb.net/bkd3_entregafinal?retryWrites=true&w=majority&appName=Cluster0
- MONGODB_TEST_URI=mongodb+srv://cri2024:cri2024@cluster0.mswsapd.mongodb.net/bkd3_entregafinal_test?retryWrites=true&w=majority&appName=Cluster0
- PORT=8080
- MOCK_USER_PASSWORD=coder123
#
**⚠️ Nota: información confidencial:** El archivo `.env` ha sido proporcionado únicamente para facilitar la evaluación de este proyecto por parte del profesor.

<a href="#title">Volver al inicio</a>

#
#
#
## Directorios ##

```markdown
📦src
 ┣ 📂controllers
 ┃ ┣ 📜adoptions.controller.js
 ┃ ┣ 📜pets.controller.js
 ┃ ┣ 📜sessions.controller.js
 ┃ ┗ 📜users.controller.js
 ┣ 📂dao
 ┃ ┣ 📂models
 ┃ ┃ ┣ 📜Adoption.js
 ┃ ┃ ┣ 📜Pet.js
 ┃ ┃ ┗ 📜User.js
 ┃ ┣ 📜Adoption.js
 ┃ ┣ 📜Pets.dao.js
 ┃ ┗ 📜Users.dao.js
 ┣ 📂dto
 ┃ ┣ 📜Pet.dto.js
 ┃ ┗ 📜User.dto.js
 ┣ 📂public
 ┃ ┗ 📂img
 ┣ 📂repository
 ┃ ┣ 📜AdoptionRepository.js
 ┃ ┣ 📜GenericRepository.js
 ┃ ┣ 📜PetRepository.js
 ┃ ┗ 📜UserRepository.js
 ┣ 📂routes
 ┃ ┣ 📜adoption.router.js
 ┃ ┣ 📜mocks.router.js
 ┃ ┣ 📜pets.router.js
 ┃ ┣ 📜sessions.router.js
 ┃ ┗ 📜users.router.js
 ┣ 📂services
 ┃ ┗ 📜index.js
 ┣ 📂test
 ┃ ┗ 📜supertest.test.js
 ┣ 📂utils
 ┃ ┣ 📜index.js
 ┃ ┣ 📜mockPets.js
 ┃ ┣ 📜mockUsers.js
 ┃ ┣ 📜swaggerConfig.js
 ┃ ┗ 📜uploader.js
 ┗ 📜app.js
```
<a href="#title">Volver al inicio</a>

#
#
#
## Codigo ##
#### El código de la API está implementado principalmente con Node.js, Express.js y MongoDB. Algunas de las características clave incluyen:

- Uso de Mongoose para interactuar con la base de datos MongoDB.
- Controladores para gestionar la lógica.
- Repositorios para acceder a los datos a través de patrones DAO.
- Uso de bcryptjs para el manejo seguro de contraseñas.
- Configuración de Swagger para la documentación automática de la API.

<a href="#title">Volver al inicio</a>

#
#
#
## Rutas ## 
### Las rutas de la API son las siguientes:
Usuarios (/api/users):
- GET /api/users: Obtiene todos los usuarios.
- POST /api/users: Crea un nuevo usuario.
- GET /api/users/{uid}: Obtiene un usuario por su ID.
- PUT /api/users/{uid}: Actualiza un usuario por su ID.
- DELETE /api/users/{uid}: Elimina un usuario por su ID.

Mascotas (/api/pets):
- GET /api/pets: Obtiene todas las mascotas.
- POST /api/pets: Crea una nueva mascota.
- GET /api/pets/{pid}: Obtiene una mascota por su ID.

Adopciones (/api/adoptions):
- GET /api/adoptions: Obtiene todas las adopciones.
- POST /api/adoptions/{uid}/{pid}: Crea una adopción de una mascota por un usuario.

<a href="#title">Volver al inicio</a>

#
#
#
## Dependencias ##
El proyecto utiliza las siguientes dependencias clave:

- **express**: Framework web para Node.js.
- **mongoose**: ODM para MongoDB.
- **bcryptjs**: Librería para encriptar contraseñas.
- **dotenv**: Gestión de variables de entorno.
- **swagger-jsdoc**,**swagger-ui-express**: Para documentar la API con Swagger.
- **multer**: Middleware para manejar archivos subidos.
- **faker**: Generador de datos falsos (para pruebas).
- **supertest**,**chai**: Librerías para realizar pruebas funcionales.

<a href="#title">Volver al inicio</a>

#
#
#
## NPM ##
#
1. **`npm start`**:
   - Este comando inicia la aplicación en el entorno de producción.
   - Se establece la conexión con la base de datos **MongoDB** en modo producción.
   - El servidor comienza a ejecutarse en el puerto **8080**.

   Salida esperada:

```bash
npm start

> dockerizandocristianosorio@1.0.0 start
> node src/app.js

Conexión a MongoDB establecida en producción
Servidor corriendo en el puerto 8080
```

#
2. **`npm test`**:
- Este comando ejecuta los **tests funcionales** definidos en el archivo `src/test/supertest.test.js`.
- La aplicación se ejecuta en el entorno de **test**, estableciendo la conexión con MongoDB en modo test.
- Se prueban las rutas de la API para las entidades **usuarios**, **mascotas** y **adopciones**, asegurando que las operaciones básicas (crear y obtener) funcionen correctamente.

Salida esperada:

```bash
npm test

> dockerizandocristianosorio@1.0.0 test
> cross-env NODE_ENV=test mocha src/test/supertest.test.js

  Tests funcionales para la API
Conexión a MongoDB establecida en modo test

    Rutas de usuarios
Servidor corriendo en el puerto 8080
      ✔ POST /api/users debería crear un usuario (366ms)
      ✔ GET /api/users debería obtener todos los usuarios (81ms)
    Rutas de mascotas
      ✔ POST /api/pets debería crear una mascota (84ms)
      ✔ GET /api/pets debería obtener todas las mascotas (79ms)
    Rutas de adopciones
      ✔ POST /api/adoptions/:uid/:pid debería crear una adopción (381ms)
      ✔ GET /api/adoptions debería obtener todas las adopciones (76ms)


  6 passing (2s)
```
#
3. **`npm run test-app`**:
- Este comando también ejecuta la aplicación en el entorno de **test**, similar a `npm start`, pero en modo test.
- La conexión a **MongoDB** se realiza en el entorno de prueba, y el servidor se ejecuta en el puerto **8080**.

Salida esperada:

```bash
npm run test-app

> dockerizandocristianosorio@1.0.0 test-app
> cross-env NODE_ENV=test node src/app.js

Conexión a MongoDB establecida en modo test
Servidor corriendo en el puerto 8080
```


#### Bases de datos - Start:
<div align="center" id="top">
    <img src="./src/public/img/db-start.png" alt="businesses" />
</div>

#
#### Bases de datos - Test:
<div align="center" id="top">
    <img src="./src/public/img/db-test.png" alt="businesses" />
</div>

#
#
#
### Generar Mascotas Simuladas
- **Método**: GET
- **URL**: `http://localhost:8080/api/mocks/mockingpets?num=2`
- **Query Params**: num 2

#### Respuesta:
```json
{
    "status": "success",
    "payload": [
        {
            "name": "Betsy",
            "specie": "gecko",
            "birthDate": "2024-04-22T21:10:00.964Z",
            "adopted": false,
            "owner": null,
            "image": "https://picsum.photos/seed/sa0ttcvTi/343/2524"
        },
        {
            "name": "Einar",
            "specie": "koala",
            "birthDate": "2024-06-05T11:14:56.549Z",
            "adopted": false,
            "owner": null,
            "image": "https://loremflickr.com/2733/3155?lock=7542828475762989"
        }
    ]
}
```

#### Postman:
<div align="center" id="top">
    <img src="./src/public/img/mocks-mockingpets.png" alt="businesses" />
</div>

#
#
#
### Insertar Datos Simulados en la Base de Datos Mongodb
##
- **Método**: POST
- **URL**: `http://localhost:8080/api/mocks/generateData`
- **Body**: raw/JSON
#### Enviar:
```json
{
    "users": 2,
    "pets": 2 
}
```
#### Postman:
<div align="center" id="top">
    <img src="./src/public/img/mocks-generatedata.png" alt="businesses" />
</div>

#
#### MongodbAtlas: bkd3_mocks.users
<div align="center" id="top">
    <img src="./src/public/img/mocks-generatedata-mongodb-user.png" alt="users" />
</div>

#
#### MongodbAtlas: bkd3_mocks.pets
<div align="center" id="top">
    <img src="./src/public/img/mocks-generatedata-mongodb-pets.png" alt="pets" />
</div>



#
#### Decrypt Checker Bcrypt generator:
- <a href="https://bcrypt-generator.com/" target="_blank">Generador de hashes bcrypt</a>
- Este generador es útil para crear contraseñas encriptadas rápidamente y probar funcionalidades relacionadas con la autenticación.



<div align="center" id="top">
    <img src="./src/public/img/decrypt1.png" alt="businesses" />
</div>

#

<div align="center" id="top">
    <img src="./src/public/img/decrypt2.png" alt="businesses" />
</div>



##
<a href="#title">Volver al inicio</a>

##
#
## Docker ##
Este proyecto ha sido dockerizado para facilitar su despliegue y garantizar la consistencia del entorno entre desarrollo, prueba y producción. A continuación, se describen los pasos para construir, ejecutar y subir la imagen Docker del proyecto.

1. **Construcción de la Imagen Docker**:
```bash
docker build -t docker_cristian .
```
#
2. **Ejecución del Contenedor Docker**:
```bash
docker run -p 8080:8080 docker_cristian
```
#
3. **Subida de la Imagen a DockerHub**:
```bash
docker login
docker tag docker_cristian criosogutdocker/docker_cristian:ver1
docker push criosogutdocker/docker_cristian:ver1
```
#
### DockerHub - Public
- https://hub.docker.com/r/criosogutdocker/docker_cristian

##
<a href="#title">Volver al inicio</a>

#
#
#
## Swagger ##
La API está documentada automáticamente utilizando Swagger. Para ver la documentación interactiva
```bash
npm install swagger-jsdoc swagger-ui-express
```

### Swagger - Acceso Web
Esto te permitirá explorar las rutas disponibles, así como hacer peticiones directamente desde la interfaz de Swagger.

- http://localhost:8080/apidocs

#
Acceso Swagger Web
<div align="center" id="top">
    <img src="./src/public/img/swagger-web.png" alt="businesses" />
</div>

#
Swagger - GET
<div align="center" id="top">
    <img src="./src/public/img/swagger-get.png" alt="businesses" />
</div>

#
Swagger - POST
<div align="center" id="top">
    <img src="./src/public/img/swagger-post.png" alt="businesses" />
</div>

#
Swagger - GET
<div align="center" id="top">
    <img src="./src/public/img/swagger-get2.png" alt="businesses" />
</div>

#
Swagger - PUT
<div align="center" id="top">
    <img src="./src/public/img/swagger-put.png" alt="businesses" />
</div>

#
Swagger - DELETE
<div align="center" id="top">
    <img src="./src/public/img/swagger-delete.png" alt="businesses" />
</div>

##
<a href="#title">Volver al inicio</a>
