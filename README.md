# payment-backend

Este proyecto es una aplicación backend para procesar pagos, construida con Nest.js y siguiendo una arquitectura hexagonal. Está diseñada para manejar operaciones de pago de manera eficiente y mantener una clara separación de responsabilidades.

## Estructura del Proyecto

El proyecto está organizado en varios directorios clave:

- **src**
  - **application**: Contiene la lógica de negocio y los casos de uso para procesar pagos.
    - **services**: Implementa servicios que manejan las operaciones de pago.
    - **use-cases**: Define casos de uso que orquestan el flujo de procesamiento de pagos.
  - **domain**: Representa el núcleo del dominio de la aplicación.
    - **entities**: Contiene las entidades del dominio, como la entidad Payment.
    - **exceptions**: Define excepciones personalizadas relacionadas con el procesamiento de pagos.
    - **repositories**: Interfaces para el acceso a datos relacionados con pagos.
  - **infrastructure**: Implementa los detalles técnicos de la aplicación.
    - **controllers**: Maneja las solicitudes y respuestas HTTP para operaciones relacionadas con pagos.
    - **database**: Contiene entidades ORM e implementaciones para el acceso a datos.
    - **providers**: Integra servicios o APIs de pago externos.

## Instalación

Para comenzar con el proyecto, clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/andresmurillo13/payments-backend.git
cd payments-backend
npm install
```

## Configuración de la Base de Datos

Antes de levantar el proyecto, asegúrate de tener Docker instalado y ejecuta el siguiente comando para levantar la base de datos PostgreSQL:

```bash
docker run --name wompi-payment-db -e POSTGRES_USER=your_username -e POSTGRES_PASSWORD=your_password -e POSTGRES_DB=wompi_payment -p 5432:5432 -d postgres
```

Luego, para poblar la base de datos con datos de prueba, ejecuta el siguiente script SQL:

```sql
-- Insertar 10 productos de prueba sin especificar el UUID (generado automáticamente)
INSERT INTO products (name, description, price, stock) VALUES
('iPhone 14 Pro Max', 'Apple iPhone 14 Pro Max con 256GB de almacenamiento', 5000.99, 50),
('iPhone 14', 'Apple iPhone 14 con 128GB de almacenamiento', 5000.99, 100),
('iPhone 13 Pro', 'Apple iPhone 13 Pro con 512GB de almacenamiento', 5000.99, 30),
('iPhone 13', 'Apple iPhone 13 con 256GB de almacenamiento', 5000.99, 80),
('iPhone 12 Mini', 'Apple iPhone 12 Mini con 128GB de almacenamiento', 5000.99, 120),
('iPhone 12', 'Apple iPhone 12 con 64GB de almacenamiento', 6492.99, 90),
('iPhone SE (2022)', 'Apple iPhone SE (3ra generación) con 128GB de almacenamiento', 429.99, 150),
('iPhone 11', 'Apple iPhone 11 con 64GB de almacenamiento', 4929.99, 200),
('iPhone XR', 'Apple iPhone XR con 128GB de almacenamiento', 3929.99, 180),
('iPhone X', 'Apple iPhone X con 256GB de almacenamiento', 5929.99, 70);
```

## Ejecución de la Aplicación

Para ejecutar la aplicación, utiliza el siguiente comando:

```bash
npm run start:dev
```

La aplicación escuchará en el puerto especificado (por defecto es el 3000).

## Pruebas Unitarias

Para ejecutar las pruebas unitarias y verificar la cobertura, utiliza el siguiente comando:

```bash
npm run test
```

Los resultados de cobertura se encuentran en la carpeta `coverage` generada automáticamente tras ejecutar las pruebas.

## Endpoints Públicos

La aplicación expone varios endpoints para operaciones de pago. Puedes acceder a la documentación pública de los endpoints en la siguiente URL:

[Documentación de Endpoints Públicos](https://bold-station-575735.postman.co/workspace/Team-Workspace~05fd5fc0-105b-4f1e-8fc0-30dc9d605d6d/folder/24385552-6c3f94da-9543-46f7-824b-6971d2cd8dd4?action=share&creator=24385552&ctx=documentation)

### Webhook para completar pagos

El webhook para completar pagos se encuentra en la siguiente URL:

```
http://localhost:3000/api/payments/webhook
```

Para probarlo, puedes usar Postman y enviar los siguientes headers:

- **X-Webhook-Signature**: El valor de la firma que aparece en los logs de la terminal del proyecto.

## Justificación sobre el despliegue

Debido a limitaciones de tiempo y otras responsabilidades laborales, no pude completar el despliegue de la aplicación en AWS. Además, no cuento con una cuenta activa en AWS para realizar el despliegue. Sin embargo, tengo experiencia sólida en AWS y, de avanzar en el proceso, puedo detallar cómo realizaría el despliegue utilizando servicios como ECS, S3, CloudFront y RDS.

El proceso de despliegue incluiría:

1. Configuración de un bucket S3 para el frontend y su distribución mediante CloudFront.
2. Implementación del backend en AWS Lambda o ECS, conectado a una base de datos RDS.
3. Configuración de variables de entorno seguras para las claves de Wompi.
4. Integración del webhook para pagos en el entorno de producción.

## Consideraciones Finales

Aunque no pude integrar el webhook en un entorno desplegado, puedes probarlo localmente utilizando Postman. Estoy disponible para explicar en detalle cualquier parte del proyecto o realizar ajustes necesarios.