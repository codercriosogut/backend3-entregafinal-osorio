<h1 align="center" id="title">Plantilla de Documentación del Proyecto - Mock Faker</h1>
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
  <a href="#test">Test</a> &#xa0; | &#xa0; 
</p>

<br>


## Descripcion ##

Este proyecto es una API desarrollada con Node.js y Express.js que utiliza @faker-js/faker para generar datos simulados. El objetivo principal es proporcionar rutas para simular grandes volúmenes de datos de usuarios y mascotas, útiles para pruebas y desarrollo.

<a href="#title">Volver al inicio</a>


## Instalacion ##

```bash
# Clonar repositorio:
$ git clone https://github.com/codercriosogut/backend3-preentrega1osorio.git

# Accede al directorio del proyecto:
$ cd .\backend3-preentrega1osorio\

# Instala las dependencias:
$ npm install
$ npm list

├── @faker-js/faker@9.2.0
├── bcrypt@5.1.0
├── chai@4.3.7
├── cookie-parser@1.4.6
├── dotenv@16.4.5
├── express@4.18.2
├── jsonwebtoken@8.5.1
├── mocha@10.1.0
├── mongoose@6.7.5
├── multer@1.4.5-lts.1
└── supertest@6.3.3

# Ejecuta el servidor
$ npm start

# Utilizar Postman
```
<a href="#title">Volver al inicio</a>

## .env ##
- MONGODB_URI=mongodb+srv://cri2024:cri2024@cluster0.mswsapd.mongodb.net/bkd3_entregafinal?retryWrites=true&w=majority&appName=Cluster0
- PORT=8080
- MOCK_USER_PASSWORD=coder123
#
**⚠️ Nota: información confidencial:** El archivo `.env` ha sido proporcionado únicamente para facilitar la evaluación de este proyecto por parte del profesor.

<a href="#title">Volver al inicio</a>

## Directorios ##
```markdown
📦src
 ┣ 📂controllers
 ┣ 📂dao
 ┣ 📂repository
 ┣ 📂routes
 ┃ ┣ 📜mocks.router.js
 ┣ 📂services
 ┣ 📂utils
 ┃ ┣ 📜mockPets.js
 ┃ ┣ 📜mockUsers.js
 ┃ ┗ 📜index.js
 ┗ 📜app.js
```
<a href="#title">Volver al inicio</a>

## Codigo ##
#### Generación de Datos Simulados: El proyecto utiliza @faker-js/faker para crear datos de prueba:
- `src/utils/mockPets.js`
- Genera mascotas con propiedades como name, specie, birthDate, adopted, owner, e image.**
#
```javascript
import { faker } from '@faker-js/faker';

export const generateMockPets = (numPets) => {
    let pets = [];
    
    for (let i = 0; i < numPets; i++) {
        pets.push({
            name: faker.person.firstName(),
            specie: faker.animal.type(),
            birthDate: faker.date.past(5),
            adopted: false,
            owner: null,
            image: faker.image.url()
        });
    }
    
    return pets;
};

```

#
- `src/utils/mockUsers.js`
- Genera usuarios con propiedades como first_name, last_name, email, password, role, y pets.

```javascript
import { faker } from '@faker-js/faker';
import { createHash } from './index.js';
import dotenv from 'dotenv';

dotenv.config();

export const generateMockUsers = async (numUsers) => {
    const users = [];
    const defaultPass = process.env.MOCK_USER_PASSWORD;

    for (let i = 0; i < numUsers; i++) {
        users.push({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: await createHash(defaultPass),
            role: Math.random() < 0.5 ? 'user' : 'admin',
            pets: []
        });
    }
    return users;
};
```

<a href="#title">Volver al inicio</a>

#

## Rutas ## 
### La API proporciona varias rutas para manejar la generación de datos:

#### La API proporciona varias rutas para manejar la generación de datos: 
- `GET /api/mocks/mockingpets`: Devuelve una lista de mascotas simuladas.
- ***Query Params:***: num (opcional), el número de mascotas a generar.
#
- `GET /api/mocks/mockingusers`: Devuelve una lista de usuarios simulados.
- ***Query Params:***: num (opcional), el número de usuarios a generar.
#
- `POST /api/mocks/generateData`: Inserta datos simulados de usuarios y mascotas en la base de datos.
- ***Body Params:***: {"users": 5,"pets": 5}
#
<a href="#title">Volver al inicio</a>

#
## Dependencias ##
El proyecto utiliza las siguientes dependencias clave:

- **@faker-js/faker**: Generación de datos falsos.
- **bcrypt**: Hasheo de contraseñas.
- **dotenv**: Manejo de variables de entorno.
- **express**: Framework web.
- **mongoose**: Modelado de objetos MongoDB.
#
<a href="#title">Volver al inicio</a>

##
#
#
## Test ##
### Generar Mascotas Simuladas
- **Método**: GET
- **URL**: `http://localhost:8080/api/mocks/mockingpets?num=5`
- **Query Params**: num 5

#### Respuesta:
```json
{
    "status": "success",
    "payload": [
        {
            "name": "Brennon",
            "specie": "turtle",
            "birthDate": "2024-06-27T20:09:37.512Z",
            "adopted": false,
            "owner": null,
            "image": "https://loremflickr.com/2634/3189?lock=4490057815710945"
        },
        {
            "name": "Lucy",
            "specie": "monkey",
            "birthDate": "2024-05-27T06:07:14.828Z",
            "adopted": false,
            "owner": null,
            "image": "https://loremflickr.com/2847/3244?lock=7579876253003146"
        },
        {
            "name": "Anderson",
            "specie": "whale",
            "birthDate": "2024-09-03T12:25:30.334Z",
            "adopted": false,
            "owner": null,
            "image": "https://loremflickr.com/860/3230?lock=5273584123218774"
        },
        {
            "name": "Kara",
            "specie": "penguin",
            "birthDate": "2024-07-26T17:08:13.061Z",
            "adopted": false,
            "owner": null,
            "image": "https://loremflickr.com/937/2819?lock=6472656405993971"
        },
        {
            "name": "Elias",
            "specie": "rabbit",
            "birthDate": "2024-01-21T03:16:41.770Z",
            "adopted": false,
            "owner": null,
            "image": "https://picsum.photos/seed/QWF6oG/2863/1790"
        }
    ]
}
```

#### Postman:
<div align="center" id="top">
    <img src="./src/public/img/Screenshot_4.png" alt="businesses" />
</div>

#
### Insertar Datos Simulados en la Base de Datos Mongodb
##
- **Método**: POST
- **URL**: `http://localhost:8080/api/mocks/generateData`
- **Body**: raw/JSON
#### Enviar:
```json
{
    "users": 5,
    "pets": 5 
}
```
#### Respuesta POSTMAN:
```json
{
    "status": "success",
    "message": "5 users and 5 pets inserted into the database"
}
```
#
#### MongodbAtlas: bkd3_mocks.pets
<div align="center" id="top">
    <img src="./src/public/img/Screenshot_5.png" alt="pets" />
</div>

#
#### MongodbAtlas: bkd3_mocks.users
<div align="center" id="top">
    <img src="./src/public/img/Screenshot_1.png" alt="users" />
</div>

#
#### Decrypt Checker Bcrypt generator:
- <a href="https://bcrypt-generator.com/" target="_blank">Generador de hashes bcrypt</a>
- Este generador es útil para crear contraseñas encriptadas rápidamente y probar funcionalidades relacionadas con la autenticación.



<div align="center" id="top">
    <img src="./src/public/img/Screenshot_2.png" alt="businesses" />
</div>

#

<div align="center" id="top">
    <img src="./src/public/img/Screenshot_3.png" alt="businesses" />
</div>



##
<a href="#title">Volver al inicio</a>
##