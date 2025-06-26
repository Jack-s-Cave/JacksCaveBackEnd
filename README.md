# 🚀 Getting started with Strapi

First of all, you have to do npm install
```
npm install
# or
yarn install
```

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). Browse the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment) to find the best solution for your use case.

```
yarn strapi deploy
```

# Strapi API Reference

**Base URL:** `http://localhost:1337/api`

All examples assume you have stored your Admin‑API token (or a Users‑Permissions JWT) in an environment variable called `STRAPI_TOKEN` and pass it in the `Authorization` header:

```http
Authorization: Bearer {{$dotenv STRAPI_TOKEN}}
```

---

## 1 · Author Profiles

### 1.1  Get **all** profiles (+ photo URL)

```http
GET /author-profiles?populate[foto][fields][0]=url
```

<details>
<summary>Example response (JSON)</summary>

```json
{
  "data": [
    {
      "id": 2,
      "attributes": {
        "nombre": "Sebastian Huertas",
        "bio": "Example profile",
        "social_media": {
          "instagram": "https://www.instagram.com/xtsebas/"
        },
        "foto": {
          "data": {
            "id": 1,
            "attributes": {
              "url": "/uploads/sonic_567a1e1ae3.jpg"
            }
          }
        }
      }
    }
  ],
  "meta": {
    "pagination": { "total": 1, "page": 1, "pageSize": 25, "pageCount": 1 }
  }
}
```

</details>

---

### 1.2  Get **one** profile by `id` (+ photo URL)

```http
GET /author-profiles?filters[id][$eq]=2&populate[foto][fields][0]=url
```

<details>
<summary>Example response (JSON)</summary>

```json
{
  "data": [
    {
      "id": 2,
      "attributes": {
        "nombre": "Sebastian Huertas",
        "bio": "Example profile",
        "foto": {
          "data": {
            "attributes": {
              "url": "/uploads/sonic_567a1e1ae3.jpg"
            }
          }
        }
      }
    }
  ],
  "meta": { "pagination": { "total": 1 } }
}
```

</details>

---

## 2 · Articles

### 2.1  Get **all** articles (+ media URL)

```http
GET /articles?populate[media][fields][0]=url
```

<details>
<summary>Example response (JSON)</summary>

```json
{
  "data": [
    {
      "id": 2,
      "attributes": {
        "title": "Por que las focas son focas",
        "media": [
          {
            "id": 2,
            "attributes": {
              "url": "/uploads/1200px_Seehund11cele4_edit_a95fe9d5a8.jpg"
            }
          }
        ]
      }
    },
    {
      "id": 4,
      "attributes": {
        "title": "Por que explorer solo lo usamos para descargar otro navegador",
        "media": null
      }
    }
  ],
  "meta": { "pagination": { "total": 2 } }
}
```

</details>

---

### 2.2  Get **all** articles authored by a given profile

```http
GET /articles?filters[author_profile][id][$eq]=2&populate[media][fields][0]=url
```

<details>
<summary>Example response (JSON)</summary>

```json
{
  "data": [
    {
      "id": 2,
      "attributes": {
        "title": "Por que las focas son focas",
        "media": [
          {
            "attributes": {
              "url": "/uploads/1200px_Seehund11cele4_edit_a95fe9d5a8.jpg"
            }
          }
        ]
      }
    }
  ],
  "meta": { "pagination": { "total": 1 } }
}
```

</details>

---


## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
