# Arquitectura

## Capas

La aplicación sigue una separación simple por responsabilidades:

- `src/server.js`: carga variables de entorno, conecta MongoDB e inicia el servidor HTTP.
- `src/app.js`: configura Express, parsers, logging, rutas y middleware de errores.
- `src/config`: concentra la conexión con MongoDB.
- `src/models`: define los esquemas y relaciones de Mongoose.
- `src/controllers`: implementa los casos de uso y transforma requests en respuestas JSON.
- `src/routes`: declara el contrato HTTP y delega en controladores.
- `src/middlewares`: contiene comportamiento transversal.
- `seed.js`: reinicia las colecciones del entorno local y carga datos reproducibles.

## Flujo de una request

```text
Cliente HTTP
    |
    v
Express app
    |
    +--> parser JSON / CORS / logger
    |
    +--> router por recurso
              |
              v
         controlador
              |
              v
          Mongoose
              |
              v
           MongoDB
              |
              v
       respuesta JSON
```

Las rutas no acceden directamente a MongoDB. Cada controlador captura sus errores y los delega al middleware global mediante `next(error)`. El middleware de ruta no encontrada procesa URLs no registradas.

## Persistencia

Los productos representan el catálogo y contienen precio y stock. Los usuarios representan compradores. Las órdenes guardan una referencia al usuario y una copia de los datos relevantes de cada ítem para conservar el detalle histórico.

Las referencias `user` y `items.product` se pueden expandir con `populate` en las consultas de órdenes.

## Decisiones de ejecución

La conexión a MongoDB ocurre antes de abrir el puerto HTTP. Esto evita aceptar tráfico cuando la aplicación no tiene persistencia disponible. El script de seed desconecta la base al finalizar tanto en éxito como en error.

La configuración se obtiene de variables de entorno para separar el código de las credenciales y de las diferencias entre entornos.
