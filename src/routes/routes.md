# Routes Endpoints

Users = Usuarios

Business = Negocios

--- 
### Get User Info: `/users`

requires header `Authorization`

---
### Create user: `/users/auth/signup`
body:
```ts
{
    document: number,
    name: {
        firstname: string,
        secondname: string | undefined,
        lastname: string,
        secondlastname: string
    },
    phone: number,
    email: string (requires '@' and '.');
}
```
returns:
```ts
{
    response: {
        id: number,
        code: string
    },
    token: string
}
```
---
### Login user: `/users/auth/login`
body:
```ts
{
    email: string,
    document: number
}
```
returns: 
```ts
{
    response: {
        id: number,
        code: string
    },
    token: string
}
```
---
### (GET) Get business: `/business/:id`

requires header `Authorization`

returns:
```ts
{
    response: {
        id: number,
        code: string
    },
    business: {
        id: 3,
        nombre: string,
        direccion: string,
        celular: number,
        correo: string,
        propietario: number (ID_Propietario),
        createdAt: Date,
        updatedAt: Date
    }
}
```
---
### (POST) Create business: `/business`

requires header `Authorization`

body:
```ts
{
    name: string,
    address: string,
    phone: number,
    email: string
}
```
returns:
```ts
{
    response: {
        id: number,
        code: string
    },
    business: {
        id: 3,
        nombre: string,
        direccion: string,
        celular: number,
        correo: string,
        propietario: number (ID_Propietario),
        createdAt: Date,
        updatedAt: Date
    }
}
```
---
### (DELETE) Delete business: `/business/:id`

requires header `Authorization`

returns:
```ts
{
    response: {
        id: number,
        code: string
    },
    message: string
}
```