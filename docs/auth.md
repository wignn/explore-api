# AUTH API SPEC

## Register User

Edpoint: POST /api/auth/register

Request Body :

```json
{
  "name": "wign", //opsional
  "username": "wign",
  "email": "wign@exemple.com",
  "password": "exemple"
}
```

Response Body (Success) :

```json
"data":{
    "id":"cm75vua5s0000d9gs3z7h85x8",
    "username":"wign",
    "name":"wign"
}
```

Response Body (Failed) :

```json
"erors":"username already exist...."
```

## Login

Endpoint: PACTH /api/auth/login

Request Body :

```json
{
  "username": "wign",
  "password": "exmple"
}
```

Response Body (Success) :

```json
{
  "id": "cm75vua5s0000d9gs3z7h85x8",
  "username": "wign",
  "name": "wign",
  "token": "aw1ww-qw13e-qw12e-212e",
  "backendTokens": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IndpZ24iLCJpc0FkbWluIjp0cnVlLCJzdWIiOnsibmFtZSI6IndpZ25Bc3RyZWEyMiJ9LCJpYXQiOjE3Mzk2NzEzNjQsImV4cCI6MTczOTY3NDk2NH0._ask1nkniadjjipk2jknansdm12na",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IndpZ24iLCJpc0FkbWluIjp0cnVlLCJzdWIiOnsibmFtZSI6IndpZ25Bc3RyZWEyMiJ9LCJpYXQiOjE3Mzk2NzEzNjQsImV4cCI6MTczOTY3NDk2NH0._ask1nkniadjjipk2jknansdm12na"
  }
}
```

Response Body (Failed) :

```json
"erors":"username or password wrong...."
```

## Send Mail Verification

Endpoint: POST /api/auth/password/verify

Request Body :

```json
{
  "email": "wign@exemple.com"
}
```

Response Body (Success) :

```json
{
  "message": "Email verified"
}
```

Response Body (Failed) :

```json
"erors":"validation error"
```

## Reset Password

Endpoint: PACTH /api/auth/password/reset

Request Body :

```json
{
  "email": "wign@exemple.com",
  "valToken": "asaas-2qwqqw-qwqas2-12awqq"
}
```

Response Body (Success) :

```json
{
  "message": "Email verified"
}
```

Response Body (Failed) :

```json
"erors":"validation eror"
```
