# Frontend - Sistema Bancario

Frontend del sistema bancario desarrollado con **React, TypeScript y Vite**. Su función principal es proporcionar una interfaz gráfica para interactuar con los servicios del backend desarrollado en Spring Boot.

## Funcionalidades

* Consultar clientes.
* Registrar nuevos clientes.
* Realizar transferencias entre cuentas.
* Consultar el historial de transacciones.

## Tecnologías utilizadas

* React
* TypeScript
* Vite
* Tailwind CSS
* TanStack Router
* Fetch API

## Estructura del proyecto

```text
src/
├── components/    # Componentes de la interfaz
├── hooks/         # Hooks utilizados en la aplicación
├── routes/        # Páginas y rutas
├── services/      # Comunicación con el backend
├── types/         # Tipos de datos
└── styles.css     # Estilos
```

## Comunicación con el backend

El frontend consume la API REST del backend mediante las siguientes rutas:

| Método | Endpoint                            | Función                    |
| ------ | ----------------------------------- | -------------------------- |
| GET    | `/api/customers`                    | Consultar clientes         |
| GET    | `/api/customers/{id}`               | Consultar un cliente       |
| POST   | `/api/customers`                    | Registrar un cliente       |
| POST   | `/api/transactions`                 | Realizar una transferencia |
| GET    | `/api/transactions/{accountNumber}` | Consultar transacciones    |

El backend se ejecuta en:

```text
http://localhost:8080
```

Durante el desarrollo, Vite utiliza un proxy para enviar las solicitudes `/api` al backend.

## Instalación

Primero, instalar las dependencias:

```bash
npm install
```

Luego ejecutar el proyecto:

```bash
npm run dev
```

La aplicación estará disponible en la dirección que indique Vite

Para que todas las funcionalidades funcionen correctamente, el **backend debe estar ejecutándose previamente**.

## Proyecto académico

Este frontend fue desarrollado como complemento del backend del sistema bancario para aplicar los conceptos de **arquitectura de software, desarrollo frontend y consumo de servicios REST**.
