# ERRORES SECRETOS

Listado interno de errores intencionales incluidos en la API.

## 1. Paginación sin conversión ni validación numérica

Ubicación: src/controllers/productController.js, función listProducts.

Los parámetros page y limit se toman directamente desde req.query. Valores inválidos, negativos o excesivamente grandes pueden producir paginación incorrecta, resultados inesperados o errores de Mongoose.

## 2. Regex controlada por el usuario

Ubicación: src/controllers/productController.js, función listProducts.

El parámetro search se utiliza directamente dentro de $regex. Un usuario puede enviar patrones complejos o expresiones regulares costosas, provocando consultas lentas o consumo excesivo de CPU.

## 3. Producto inexistente respondido con HTTP 200

Ubicación: src/controllers/productController.js, función getProduct.

Si el ID es válido pero no existe, la API responde 200 OK con data null en lugar de 404 Not Found.

## 4. Actualización sin validadores

Ubicación: src/controllers/productController.js, función updateProduct.

findByIdAndUpdate no utiliza runValidators: true. Es posible guardar valores inválidos, como stock negativo o campos que no cumplen las restricciones del esquema.

## 5. Eliminación inexistente respondida como exitosa

Ubicación: src/controllers/productController.js, función deleteProduct.

Si no existe el producto, se devuelve 200 OK con el mensaje de eliminación exitosa y data null.

## 6. Password almacenada sin hash

Ubicación: src/controllers/userController.js, función registerUser.

El password recibido se guarda directamente en MongoDB. Una filtración de la base expondría las credenciales de todos los usuarios.

## 7. Precio de la orden controlado por el cliente

Ubicación: src/controllers/orderController.js, función createOrder.

El precio utilizado para construir la orden proviene de item.price, enviado por el cliente, en lugar de utilizar product.price. Un cliente puede pagar un importe arbitrario.

## 8. Race condition al descontar stock

Ubicación: src/controllers/orderController.js, función createOrder.

El stock se consulta, modifica y guarda en operaciones separadas. Dos órdenes simultáneas pueden leer el mismo stock y vender más unidades de las disponibles.

## 9. Falta de await al crear la orden

Ubicación: src/controllers/orderController.js, función createOrder.

Order.create devuelve una promesa que no se espera. La respuesta puede serializar una promesa como un objeto vacío y la API puede responder antes de confirmar la persistencia.

## 10. Cancelación sin devolución de stock

Ubicación: src/controllers/orderController.js, función cancelOrder.

Al cancelar una orden se cambia su estado, pero no se reintegra la cantidad de productos al stock. El inventario queda permanentemente reducido.
