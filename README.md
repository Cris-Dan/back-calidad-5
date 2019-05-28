BACKEND

Rutas de alumno:

localhost:3000/api/login/facebook
localhost:3000/api/return
localhost:3000/api/profile
localhost:3000/api/secret-alumno
localhost:3000/api/register-alumno
localhost:3000/api/confirmation/:token
localhost:3000/api/login-alumno
localhost:3000/api/logout-alumno
localhost:3000/api/alumno/obtenerAlumnos
localhost:3000/api/alumno/:username
localhost:3000/api/alumno/actualizar/:id
localhost:3000/api/alumno/eliminar/:id

Descripcion:

GET localhost:3000/api/login/facebook
autentifica con facebook

GET localhost:3000/api/return
esto deberia enviar a un dashboard o yo que se cuando ya esta logeado
devulve un mensaje { mensaje: 'el usuario fue autentificado con exito por fb puede ver sus datos en la ruta profile' }

GET localhost:3000/api/profile
Esto se utiliza para verificar los datos del logeado


POST localhost:3000/api/register-alumno
registra un alumno con los datos enviados en formato JSON.
Luego envia un email al correo ingresado, el cual contiene un link, luego genera una respuesta 
{ respuesta: 'Email enviado' }.

datos del alumno que se envia:
{ 
  "username": "user",
  "password": "contrasena",
  "firstname": "nombre",
  "lastname": "apellido",
  "email": "email"
}

GET localhost:3000/api/confirmation/:token
devuelve un estado dependiendo del token enviado: { estado: "Aceptado" } o { estado: "Rechazado" }.

POST localhost:3000/api/login-alumno
ruta para iniciar un login y devuelve un mensaje { message: 'Alumno ha iniciado sesion' }.
Si falla al iniciar sesion retorna un mensaje { message: 'Fallo en autenticacion' }


GET localhost:3000/api/logout-alumno
sale de la sesion actual del alumno devuelve un mensaje { respuesta: 'Alumno ha cerrado sesion' }.


GET localhost:3000/api/alumno/obtenerAlumnos
retorna un array de alumnos si existen. Si no existen retorna un mensaje {message: 'no se encontraron alumnos'}
ejm:
[{
     "ingresado": "2019-05-27T22:31:31.659Z",
     "isVerified": false,
     "_id": "5cec6592851e422488072626",
     "username": "sora3",
     "firstname": "arturo",
     "lastname": "fabre",
     "email": "d@d.com",
     "__v": 0
 },{
       "ingresado": "2019-05-27T22:31:31.659Z",
       "isVerified": false,
       "_id": "5cec6592851e422488072626",
       "username": "sora2",
       "firstname": "arturo2",
       "lastname": "fabre",
       "email": "c@c.com",
       "__v": 0
 }]

GET localhost:3000/api/alumno/:username
:username es un parametro usado para buscar en la bd. 
retorna un objeto alumno si lo encuentra. Si no existe retorna un mensaje {message: 'no se encontro al alumno'}
ejm:
{
    "ingresado": "2019-05-27T22:31:31.659Z",
    "isVerified": false,
    "_id": "5cec6592851e422488072626",
    "username": "sora3",
    "firstname": "arturo",
    "lastname": "fabre",
    "email": "d@d.com",
    "__v": 0
}

PUT localhost:3000/api/alumno/actualizar/:id
:id es el identificador del alumno 
retorna un objeto alumno y un mensaje si la actualizacion se realizo con exito. Si no existe el alumno retorna un
mensaje {message: 'no se encontro al alumno'}.
ejm:
{
    "message": "se actualizo con exito.",
    "alumno": {
        "ingresado": "2019-05-27T22:31:31.659Z",
        "isVerified": false,
        "_id": "5cec6592851e422488072626",
        "username": "sora3",
        "firstname": "arturo",
        "lastname": "fabre",
        "email": "d@d.com",
        "__v": 0
    }
}


DELETE localhost:3000/api/alumno/eliminar/:id
:id es el identificador del alumno 
retorna un objeto alumno y un mensaje si la eliminacion se realizo con exito. Si no existe el alumno retorna un
mensaje {message: 'no se encontro al alumno'}.
ejm:
{
    "message": "se elimino al alumno con exito.",
    "alumno": {
        "ingresado": "2019-05-27T22:31:31.659Z",
        "isVerified": false,
        "_id": "5cec657c851e422488072625",
        "username": "sora3",
        "firstname": "arturo",
        "lastname": "fabre",
        "email": "d@d.com",
        "__v": 0
    }
}






