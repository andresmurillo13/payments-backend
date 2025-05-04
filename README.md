# wompi-payment-backend

This project is a backend application for processing payments, built using Nest.js and following a hexagonal architecture. It is designed to handle payment operations efficiently and maintain a clear separation of concerns.

## Project Structure

The project is organized into several key directories:

- **src**
  - **application**: Contains the business logic and use cases for processing payments.
    - **services**: Implements services that handle payment operations.
    - **use-cases**: Defines use cases that orchestrate the payment processing flow.
  - **domain**: Represents the core domain of the application.
    - **entities**: Contains domain entities, such as the Payment entity.
    - **exceptions**: Defines custom exceptions related to payment processing.
    - **repositories**: Interfaces for data access related to payments.
    - **value-objects**: Contains value objects that encapsulate domain concepts, like payment IDs.
  - **infrastructure**: Implements the technical details of the application.
    - **controllers**: Handles HTTP requests and responses for payment-related operations.
    - **database**: Contains ORM entities and implementations for data access.
    - **mappers**: Maps domain entities to Data Transfer Objects (DTOs) for API responses.
    - **providers**: Integrates with external payment services or APIs.

## Installation

To get started with the project, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd wompi-payment-backend
npm install
```

## Running the Application

To run the application, use the following command:

```bash
npm run start
```

The application will listen on the specified port (default is 3000).

## API Endpoints

The application exposes several API endpoints for payment operations. Refer to the controller files for detailed information on available endpoints and their usage.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.