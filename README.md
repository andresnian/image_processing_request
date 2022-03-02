
# Image Processing Request

Este proyecto tiene como finalidad el procesamiento de una imagen, de tal manera que el usuario pueda subirlay de igual manera ingresen los datos para el redimensionamiento de la misma.

El proyecto completo está diseñado para ser desplegado en entorno cloud, y para este proyecto fue utilizado la nube de Amazon AWS.


![Logo](https://github.com/andresnian/image_processing_request/blob/master/Image%20Processing%20Request.jpg)


## Tech Stack

**Microservicio:** Nodejs, npm, Typescript, NestJs, MongoDB, Docker

**Lambda:** Python3, AWS, Boto3, Docker

## API Reference

#### Crear tarea y almacenamiento de imagen

```http
  POST /api/v1/create-task
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `heigth` | `string` | **Requerida**.|
| `width` | `string` | **Requerida**.|
| `file` | `file` | **Requerida**.|

```javascript
curl --location --request POST 'http://localhost:8080/api/v1/create-task?heigth=800&width=800' \
--form 'file=@"/Users/eduardo.nino/Downloads/foto-prueba1.jpg"'
```
#### Consulta de estado del procesamiento

```http
  GET /api/v1/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Requerido**. Id para el estado del proceso |

```javascript
curl --location --request GET 'http://localhost:8080/api/v1/621f3373da247c28e422d665'
```
## Autor

- Eduardo Andres Niño Angarita

