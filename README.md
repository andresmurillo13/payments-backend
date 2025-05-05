# wompi-payment-backend

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
cd wompi-payments
npm install
```

## Ejecución de la Aplicación

Para ejecutar la aplicación, utiliza el siguiente comando:

```bash
npm run start:dev
```

La aplicación escuchará en el puerto especificado (por defecto es el 3000).

## Endpoints Públicos

La aplicación expone varios endpoints para operaciones de pago. Puedes acceder a la documentación pública de los endpoints en la siguiente URL:

[Documentación de Endpoints Públicos](https://bold-station-575735.postman.co/workspace/Team-Workspace~05fd5fc0-105b-4f1e-8fc0-30dc9d605d6d/folder/24385552-6c3f94da-9543-46f7-824b-6971d2cd8dd4?action=share&creator=24385552&ctx=documentation)
