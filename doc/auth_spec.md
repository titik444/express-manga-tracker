# Auth API Specification

## Base URL

http://localhost:3000

## Login User

Endpoint :

- POST {{BASE_URL}}/api/auth/login

Request

- Header :

  Content-Type: application/json

- Request Body

```json
{
  "email": "john@example.com",
  "password": "StrongPassword@123"
}
```

Response

- Success (200)

```json
{
  "message": "User logged in successfully",
  "data": {
    "id": "cmbj1uiaw0000tvlo7c6ak28k",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "ADMIN",
    "createdAt": "2025-06-05T07:22:56.168Z",
    "updatedAt": "2025-06-14T04:52:25.730Z",
    "token": "xxxxxxxxxxxxxxxxxxxxx",
    "refreshToken": "xxxxxxxxxxxxxxxxxxxxx"
  }
}
```

- Error (404)

```json
{
  "message": "User not found",
  "data": null
}
```

## Current User

Endpoint :

- GET {{BASE_URL}}/api/auth/me

Request

- Header :

  Content-Type: application/json

  Authorization: Bearer {accessToken}

Response

- Success (200)

```json
{
  "message": "Get Current User success",
  "data": {
    "id": "cmbj1uiaw0000tvlo7c6ak28k",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "ADMIN",
    "createdAt": "2025-06-05T07:22:56.168Z",
    "updatedAt": "2025-06-14T04:52:25.730Z"
  }
}
```

- Error (401)

```json
{
  "message": "Unauthorized",
  "data": null
}
```

## Refresh Token

Endpoint :

- GET {{BASE_URL}}/api/auth/refresh

Request

- Header :

  Content-Type: application/json

  Authorization: Bearer {refreshToken}

Response

- Success (200)

```json
{
  "message": "Token refreshed successfully",
  "data": {
    "id": "cmbj1uiaw0000tvlo7c6ak28k",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "ADMIN",
    "createdAt": "2025-06-05T07:22:56.168Z",
    "updatedAt": "2025-06-14T04:52:25.730Z",
    "token": "xxxxxxxxxxxxxxxxxxxxx"
  }
}
```

- Error (401)

```json
{
  "message": "Unauthorized",
  "data": null
}
```
