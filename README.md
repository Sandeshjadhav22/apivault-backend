<h1 align="center" style="font-weight: bold;">API valut 💻</h1>

<p align="center">
 <a href="#tech">Technologies</a> • 
 <a href="#started">Getting Started</a> • 
  <a href="#routes">API Endpoints</a> •
 <a href="#colab">Collaborators</a> •
 <a href="#contribute">Contribute</a>
</p>

<p align="center">
    <b>Secure API Key Management for Developers. Store and access your API keys securely from any machine. Simple, fast, and developer-friendly.</b>
</p>

<h2 id="technologies">💻 Technologies</h2>

- Nodejs
- javascript
- MongoDB
- JWT
- ExpressJs

<h2 id="started">🚀 Getting started</h2>

<h3>Prerequisites</h3>

- [NodeJS](https://github.com/)
- [Git 2](https://github.com)

<h3>Cloning</h3>

How to clone project

```bash
git clone https://github.com/Sandeshjadhav22/apivalut-backend.git
```

<h3>Config .env variables</h2>

Use the `.env.example` as reference to create your configuration file `.env` with your Credentials

```yaml
MONGODB_URL={YOUR_AWS_KEY_ID}
JWT_SECRET={YOUR_AWS_SECRET}
PORT=8080
```

<h3>Starting</h3>

How to start project

```bash
cd apivalut-backend
npm run dev
```

<h2 id="routes">📍 API Endpoints</h2>

| Route | Description                |
| :-------- |------------------------- |
| `POST /api/users/signup`|  sign up user |
| `POST /api/users/login`|  login user |
| `POST /api/projects/create`|Create the project |
| `DELETE /api/projects/:id`|  Specific project |
| `GET /api/projects/getAllProjects`|  Get all projects |

<h3 id="get-auth-detail">POST /api/users/signup</h3>

**RESPONSE**
```json
{
    "username":"xyz",
    "email":"xyz@gmail.com",
    "password":"xyz"
}
```

<h3 id="post-auth-detail">POST /api/users/login</h3>

**REQUEST**
```json
{
    "email": "xyz@gmail.com",
    "password": "xyz"
}
```

**RESPONSE**
```json
{
  "token": "OwoMRHsaQwyAgVoc3OXmL1JhMVUYXGGBbCTK0GBgiYitwQwjf0gVoBmkbuyy0pSi"
}
```


<h3 id="post-auth-detail">POST /api/projects/create</h3>

**REQUEST**
```json
{
  "projectName": "My test Project",
  "userId": "674635cf6ea074499casc3f125",
  "apiKeys": [
    { "name": "MONGODB_URI", "key": "test" },
    { "name": "PORT", "key": "8080" },
    { "name": "JWT", "key": "test" }
  ]
} 

```

**RESPONSE**
```json
{
  "message": "Project created successfully!"
}
```


<h3 id="post-auth-detail">DELETE /api/projects/:id</h3>

**RESPONSE**
```json
{
  "message": "Project deleted successfully!"
}
```


<h3 id="post-auth-detail">GET /api/projects/getAllProjects</h3>

**RESPONSE**
```json
{
    "message": "Projects retrieved successfully!",
    "projects": [
        {
            "_id": "6748d4be4dc1c261211fd16b4d",
            "projectName": "My test Project",
            "user": "674635cf6ea07cd4499cc3f125",
            "apikeys": [
                {
                    "name": "MONGODB_URI",
                    "encryptedKey": "test",
                    "_id": "6748d4be4dc1csc26121116b4e",
                    "createdAt": "2024-11-28T20:38:22.110Z"
                },
                {
                    "name": "PORT",
                    "encryptedKey": "8080",
                    "_id": "6748d4be4dc1c26s121116b4f",
                    "createdAt": "2024-11-28T20:38:22.110Z"
                },
                {
                    "name": "JWT",
                    "encryptedKey": "test",
                    "_id": "6748d4be4dc1csac26121116b50",
                    "createdAt": "2024-11-28T20:38:22.110Z"
                }
            ],
            "createdAt": "2024-11-28T20:38:22.113Z",
            "updatedAt": "2024-11-28T20:38:22.113Z",
            "__v": 0
        },
    ]
}
```
