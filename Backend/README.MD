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

# User Logout Endpoint Documentation

## Endpoint: `/users/logout`

### Method: GET

### Description:

This endpoint is used to log out a user by clearing the authentication token stored in the cookies and adding the token to a blacklist to prevent further use. This ensures that the token cannot be used again for authentication.

### How It Works:

- The endpoint retrieves the token from the cookies.
- If a token is found, it is cleared from the cookies.
- The token is then added to the blacklist using the `blacklist-controller.js` to ensure it cannot be reused.

### Blacklist Controller:

The `blacklist-controller.js` is responsible for managing the tokens that have been invalidated. It uses a Mongoose model to store tokens in a MongoDB collection with an expiration time of 24 hours (86400 seconds). This ensures that tokens are automatically removed from the blacklist after they expire.

### Example Request:

```http
GET /users/logout
```

# User Profile Endpoint Documentation

## Endpoint: `/users/profile`

### Method: GET

### Description:

This endpoint is used to retrieve the profile information of the authenticated user. It requires the user to be authenticated, and it returns a JSON object containing the user's details.

### How It Works:

- The endpoint uses an authentication middleware to verify the user's identity.
- Once authenticated, the user's profile information is retrieved and returned in the response.

### Example Request:

```http
GET /users/profile
```

# Captain Registration Endpoint Documentation

## Endpoint: `/captains/register`

### Method: POST

### Description:

This endpoint is used to register a new captain in the system. It requires the captain's full name, email, and password and certain vehicle details like the color, number plate, capacity and type of vehicle the captain is registering to drive. Upon successful registration, it returns a JSON object containing an authentication token and the captain's details.

### Request Body:

The request body must be in JSON format and include the following fields:

- `fullname`: An object containing:
  - `firstname`: A string with a minimum length of 3 characters. This field is required.
  - `lastname`: A string with a minimum length of 3 characters. This field is optional.
- `email`: A string that must be a valid email format. This field is required and must be unique.
- `password`: A string with a minimum length of 6 characters. This field is required.
- `vehicleType`: An o bject containing: -`color`: A string with a minimum length of 3 characters. This field is required. -`plate`: A string with a minimum length of 4 characters. This field is required. -`capacity`: A numeric value with a minimum length of 1. This field is required. -`vehicleType`: Can have 3 values from the following. This field is also required. -`car` , -`auto`, -`motorcycle`

Example:

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "securePassword123",

  "vehicle": {
    "color": "red",
    "plate": "UP 8H BZ 9942",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

# Captains API Documentation

## **Base URL**

All endpoints are prefixed with `/captains`

---

## **Endpoints**

### **1. POST /login**

#### **Description:**

Authenticate a captain and return a JSON Web Token (JWT) for subsequent requests.

#### **Request:**

- **Headers:**

  - `Content-Type: application/json`

- **Body:** (JSON)

```json
{
  "email": "example@domain.com",
  "password": "password123"
}
```

#### **Response:**

- **Success (200):**

```json
{
  "token": "<JWT_TOKEN>",
  "captain": {
    "_id": "63e4b8dce1a7d3ab71",
    "email": "example@domain.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

- **Error (400):**

```json
{
  "message": "Invalid Email or Password"
}
```

#### **Example CURL Command:**

```bash
curl -X POST http://<BASE_URL>/captains/login \
-H "Content-Type: application/json" \
-d '{"email": "example@domain.com", "password": "password123"}'
```

---

### **2. GET /profile**

#### **Description:**

Retrieve the authenticated captain's profile.

#### **Request:**

- **Headers:**
  - `Cookie: token=<JWT_TOKEN>`

#### **Response:**

- **Success (200):**

```json
{
  "_id": "63e4b8dce1a7d3ab71",
  "email": "example@domain.com",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

- **Error (401):**

```json
{
  "message": "Unauthorized"
}
```

#### **Example CURL Command:**

```bash
curl -X GET http://<BASE_URL>/captains/profile \
-H "Cookie: token=<JWT_TOKEN>"
```

---

### **3. POST /logout**

#### **Description:**

Log out the authenticated captain and blacklist their token.

#### **Request:**

- **Headers:**
  - `Cookie: token=<JWT_TOKEN>`

#### **Response:**

- **Success (200):**

```json
{
  "message": "Logged out !"
}
```

- **Error (400):**

```json
{
  "message": "couldn't access token"
}
```

- **Error (401):**

```json
{
  "message": "Unauthorized"
}
```

#### **Example CURL Command:**

```bash
curl -X POST http://<BASE_URL>/captains/logout \
-H "Cookie: token=<JWT_TOKEN>"
```

---
