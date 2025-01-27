# User Registration Endpoint Documentation

## Endpoint: `/users/register`

### Method: POST

### Description:

This endpoint is used to register a new user in the system. It requires the user's full name, email, and password. Upon successful registration, it returns a JSON object containing an authentication token and the user details.

### Request Body:

The request body must be in JSON format and include the following fields:

- `fullname`: An object containing:
  - `firstname`: A string with a minimum length of 3 characters. This field is required.
  - `lastname`: A string with a minimum length of 3 characters. This field is optional.
- `email`: A string that must be a valid email format. This field is required and must be unique.
- `password`: A string. This field is required.

Example:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

# User Login Endpoint Documentation

## Endpoint: `/users/login`

### Method: POST

### Description:

This endpoint is used to authenticate a user with their email and password. Upon successful authentication, it returns a JSON object containing an authentication token and the user details.

### Request Body:

The request body must be in JSON format and include the following fields:

- `email`: A string that must be a valid email format. This field is required.
- `password`: A string with a minimum length of 6 characters. This field is required.

Example:

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```
