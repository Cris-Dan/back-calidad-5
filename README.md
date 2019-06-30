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

ESTADISTICAS

localhost:3000/api/estadistica/cantidad
devuelve la cantidad de alumnos, profesores, cursos. Tambien devuelve el promedio de
las edades de alumnos y profesores, ademas del numero de profesores y profesoras
y los 3 cursos mas solicitados. ejm;
{
    "numAlumnos": 3,
    "numProfesores": 3,
    "numCursos": 10,
    "promEdadAlumnos": 21.333333333333332,
    "promEdadProfesores": 25,
    "numProfeVarones": 1,
    "numProfeMujeres": 2,
    "cursosMasSolicitados": [
        {
            "_id": "5cecd2965f69d92b12316181",
            "nombre": "Trigonometria",
            "marco": "Matematica",
            "__v": 0,
            "veces_solicitado": 5
        },
        {
            "_id": "5cecd28c5f69d92b12316180",
            "nombre": "Geometria",
            "marco": "Matematica",
            "__v": 0,
            "veces_solicitado": 4
        },
        {
            "_id": "5cecd2855f69d92b1231617f",
            "nombre": "Aritmetica",
            "marco": "Matematica",
            "__v": 0,
            "descripcion": "descriopcion1",
            "url_imagen": "url",
            "veces_solicitado": 2
        }
    ]
}


SOLICITUDES

las solicitudes estan puestas como un campo en el documento profesor de la siguienta manera:

solicitudes: [{
      alumno: {
        type: Schema.Types.ObjectId,
        ref: 'Alumno'
      },
      aceptado: { type: Boolean, required: false }
            }],

y las rutas para interactuar con ellas son las siguientes:

localhost:3000/api/profesor/verEstadoSolicitud
si funciona correctamente deberia retornar { message: 'solicitud aceptada.' } o { message: 'solicitud denegada.' }

localhost:3000/api/profesor/aceptarSolicitud
si funciona correctamente deberia retornar { message: 'solicitud aceptada.' }

localhost:3000/api/profesor/denegarSolicitud
si funciona correctamente deberia retornar { message: 'solicitud denegada.' }

localhost:3000/api/profesor/solicitar
si funciona correctamente deberia retornar { message: 'solicitud completada.' }

en todos los casos si no existe el profesor devolvera { message: 'no existe el profesor.' }
para todo lo de mas existe error 400 


todas las rutas son metodo get 
por lo cual recibe a travez del body 
el idAlumno que quiere solicitar y el idProfesor al cual quiere solicitar
de la forma: 

const { idAlumno, idProfesor } = req.body;

los metodos indexOf y splice son para tratar con Arrays en javascript
no es otra libreria pe mascota, si no sabes que es buscalo en google

COORDENADAS SOCKET

socket.js contiene la funcion por la cual se recibien las coordenas y se las agrega a un alumno
desde el front se tiene que enviar en un json email del alumno y las coordenas
para que se puedan usar sockets todo la app en index.js esta envuelta por esta uwu
si el server no responde quizas sea que puse mal eso ultimo jsjs

ya que socket siempre esta recibiendo data no se si la coordenada esta en todo momento recibiendoce :c
o solo cuando se manda desde el front solo una vez

CURSOS POR PROFESOR

todos son metodo get

{
	"idCurso":"5cecd2c95f69d92b12316184",
	"idProfesor":"5cf307adc4756f570351f4a9"
}

localhost:3000/api/profesor/adjuntarCurso
localhost:3000/api/profesor/quitarCurso
localhost:3000/api/profesor/buscarTodosCursosProfesor

{
	"idCurso":"5cecd2c95f69d92b12316184",
}
localhost:3000/api/profesor/buscarProfesoresPorCurso

{
	"idProfesor":"5cf307adc4756f570351f4a9"
}
localhost:3000/api/profesor/buscarCursosPorProfesor






