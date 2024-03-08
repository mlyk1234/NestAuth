
# A working authentication on backend

## Installation

```bash
  npm i
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
- Edit .env.example
- Rename .env.example to .env
```
JWT_SECRET_KEY="YOUR_SEC"
JWT_EXPIRATION_TIME="DURATION IN SECS"

```
## API Reference

### By default the app runs on port 8080

#### Register

```http
  GET /api/v1/register
```

```json
{
    "email": "yourmail@mail.com",
    "password": "yourpass",
}
```

#### Login

```http
  GET /api/v1/auth/user-login
```

```json
{
    "email": "yourmail@mail.com",
    "password": "yourpass",
}
```

#### Get Profile (via Access Token)

```http
  GET /api/v1/auth/me
```
- View screenshot below on authorizing using the JWT Token on Postman




## JWT Bearer Token Example on Postman

![App Screenshot](https://i.imgur.com/A3G0rbb.png)

