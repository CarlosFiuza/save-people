# NestJS REST API

This project is a RESTful API built with NestJS and TypeScript for managing person records. It allows for the following operations:

- **Cadastro**: Insert new person records.
- **Alteração**: Update existing person records.
- **Remoção**: Delete person records.
- **Consulta**: Retrieve person records.

## Features

- **Person Entity**: The API manages person records with the following fields:
  - **Nome**: Required
  - **Sexo**: Optional
  - **E-mail**: Optional, validated if provided
  - **Data de Nascimento**: Required, validated
  - **Naturalidade**: Optional
  - **Nacionalidade**: Optional
  - **CPF**: Required, validated for correct format and uniqueness
  - **Data de Cadastro**: Automatically stored
  - **Data de Atualização**: Automatically stored

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd nestjs-rest-api
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Running the Application

To start the application, run the following command:
```
npm run start
```

The API will be available at `http://localhost:3000`.

## API Endpoints

- **POST /persons**: Create a new person record.
- **GET /persons**: Retrieve all person records.
- **GET /persons/:id**: Retrieve a specific person record by ID.
- **PUT /persons/:id**: Update an existing person record by ID.
- **DELETE /persons/:id**: Delete a person record by ID.

## Validation

The API includes validation for required fields and formats, ensuring data integrity.

## License

This project is licensed under the MIT License.