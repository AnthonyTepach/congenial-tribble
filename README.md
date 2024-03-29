# BioTime Pro ZKTeco - API

This repository contains a Node.js and Express API service designed to interact with the BIOTIMEPRO database from ZKTeco. The database is built on PostgreSQL and stores records of entry and exit check-ins. Our API streamlines the querying and access to these records, enabling users to efficiently access their check-in data.

## API Reference

#### Get all items

```http
  GET /api/consulta
```

| Parameter      | Type     | Description   |
| :------------- | :------- | :------------ |
| `departamento` | `string` | **Required**. |
| `fecha_inicio` | `string` | **Required**. |
| `fecha_fin`    | `string` | **Required**. |


## Features
- Provides an Application Programming Interface (API) for querying check-in records from BIOTIMEPRO. 
- Developed with Node.js and Express for a quick and efficient implementation. Compatible with PostgreSQL databases. 

- Facilitates access and retrieval of entry and exit check-in data. 

This repository is regularly maintained and updated to ensure optimal functionality and compatibility with the BIOTIMEPRO database from ZKTeco.

## Deployment

To deploy this project, you can use Docker

```bash
  docker push epazotetch/api_biotimepro:latest
```


## Environment Variables

You will need to add the following environment variables to your .env file

`DB_USER`

`DB_HOST`

`DB_DATABASE`

`DB_PASSWORD`

`DB_PORT`

## docker-compose.yml

```bash
version: '3'

services:
  api_biotime:
    container_name: api-biotime-container  # Agrega el nombre del contenedor aquí
    build:
      context: .
      dockerfile: Dockerfile
    environment:
      NODE_ENV: 'development'
      DB_USER: 'testuser'
      DB_HOST: '0.0.0.0'
      DB_DATABASE: 'db_test'
      DB_PASSWORD: '*******'
      DB_PORT: 1234
    ports:
      - "8000:3000"
    volumes:
      - .:/app
    restart: unless-stopped

```

## Authors

- [@anthonytepach](https://www.github.com/anthonytepach)

## License

[MIT](https://choosealicense.com/licenses/mit/)
