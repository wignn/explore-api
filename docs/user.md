# AUTH API SPEC

## Update User

Edpoint: PUT /api/user

Request Body :

```json
{
  "id": "cm75vua5s0000d9gs3z7h85x8",
  "bio": "exemple", //opsional
  "name": "wign1", //opsional
  "profilePic": "https:asa.com"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": "cm75vua5s0000d9gs3z7h85x8",
    "bio": "exemple", //opsional
    "name": "wign1", //opsional
    "profilePic": "https:asa.com" //opsional
  }
}
```

Response Body (Failed) :

```json
"erors":"validation eror"
```

## Get User By Id

Endpoint: GET /api/user/cm75vua5s0000d9gs3z7h85x8

Response Body (Success) :

```json
{
  "id": "cm75vua5s0000d9gs3z7h85x8",
  "username": "wign",
  "name": "wign",
  "profilePic":"https:exemple....",
  "email":"wign@exemple.com",
  "token": "aw1ww-qw13e-qw12e-212e",
  "createdAt":"1201902",
  "token":"exemple",
  "lastLogin":"1232133"
}
```

Response Body (Failed) :

```json
"erors":"User not found...."
```
