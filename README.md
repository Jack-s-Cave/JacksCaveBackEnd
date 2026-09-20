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

If a route below is enabled for the **Public** role (Settings → Users & Permissions → Roles → Public, in the admin panel), the `Authorization` header can be omitted for it.

---

## 📖 Endpoints

All collection-type endpoints support Strapi's standard REST query DSL out of the box (no extra setup needed): `filters`, `populate`, `sort`, `pagination`, and `fields`. A few common examples:

```
?populate=*                                  # populate all relations/media one level deep
?populate=author_profile,serie               # populate specific relations
?filters[Titulo][$containsi]=linux           # case-insensitive partial match
?sort[0]=fecha_de_publicacion:desc
?pagination[page]=1&pagination[pageSize]=25
?fields[0]=Titulo&fields[1]=Descripcion
```

> ⚠️ **Strapi 5 note:** the `:documentId` in each `findOne` route below is the string `documentId` field returned in list responses (e.g. `"documentId": "bgh1cdztbvg2cf3ymcg61t6a"`) — **not** the numeric `id`. Requesting `/api/article-mds/2` (a numeric id) returns `404`; you must use the `documentId` from a prior list call.

### Article MD (`article-md`)

Blog articles written in rich text/markdown.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `{{baseUrl}}/api/article-mds` | List all articles |
| GET | `{{baseUrl}}/api/article-mds/:documentId` | Get one article by id |

**Fields:** `Titulo` (string, required), `Descripcion` (text, required), `fecha_de_publicacion` (date), `Article_core` (richtext), `imagenes` (media, multiple), `tags` (enum: `Linux`, `Windows`, `MacOS`, `Ciberseguridad`, `Videojuegos`, `Data Science`, `Inteligencia Artificial`, `Intercambios`, `UI/UX Design`, `Backend`, `Frontend`), `author_profile` (relation → author-profile), `serie` (relation → serie).

Example: `GET {{baseUrl}}/api/article-mds?populate=author_profile,serie,imagenes&filters[tags][$eq]=Backend`

---

### Asociación (`asociacion`)

Yearly student association board (junta directiva), with members as a repeatable component.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `{{baseUrl}}/api/asociaciones` | List all association years |
| GET | `{{baseUrl}}/api/asociaciones/:documentId` | Get one year by id |

**Fields:** `year` (integer), `Miembro` (repeatable component `asociacion.miembros`).

Example: `GET {{baseUrl}}/api/asociaciones?populate=Miembro&filters[year][$eq]=2024`

---

### Author Profile (`author-profile`)

Author/bio info shown alongside articles.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `{{baseUrl}}/api/author-profiles` | List all author profiles |
| GET | `{{baseUrl}}/api/author-profiles/:documentId` | Get one author profile by id |

**Fields:** `nombre` (string, required), `bio` (text), `foto` (media, required), `social_media` (json), `series` (relation → serie, one-to-many), `article_mds` (relation → article-md, one-to-many).

Example: `GET {{baseUrl}}/api/author-profiles/:documentId?populate=foto,article_mds`

---

### Information (`information`)

General announcement/info cards (e.g. news snippets).

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `{{baseUrl}}/api/informations` | List all information entries |
| GET | `{{baseUrl}}/api/informations/:documentId` | Get one entry by id |

**Fields:** `title` (string, required), `author` (string), `date` (date), `photo` (media), `photo_description` (text).

Example: `GET {{baseUrl}}/api/informations?sort[0]=date:desc`

---

### Podcast (`podcast`)

Individual podcast episodes.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `{{baseUrl}}/api/podcasts` | List all podcast episodes |
| GET | `{{baseUrl}}/api/podcasts/:documentId` | Get one episode by id |

**Fields:** `title` (text, required), `image` (media), `date_publication` (date, required), `link` (string, required, external link to the episode).

Example: `GET {{baseUrl}}/api/podcasts?populate=image&sort[0]=date_publication:desc`

---

### Podcast Crew (`podcast-crew`) — single type

The podcast's crew/team info page. Unlike the other endpoints, this is a **single type**: there's only ever one entry, so there's no `:id` and no list — `find` returns the one entry directly.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `{{baseUrl}}/api/podcast-crew` | Get the podcast crew info |

**Fields:** `nombre` (string, required), `conductores` (json, required), `proposito` (text, required), `photos` (media, multiple).

> ⚠️ **Known issue:** this endpoint currently returns `500 Internal Server Error` if no entry has ever been created in the admin panel yet (e.g. on a freshly seeded database), instead of an empty/null response. An entry must be created via the admin panel at least once before this endpoint works.

---

### Serie (`serie`)

A named series/collection that groups multiple articles.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `{{baseUrl}}/api/series` | List all series |
| GET | `{{baseUrl}}/api/series/:documentId` | Get one series by id |

**Fields:** `name` (string, required), `article_mds` (relation → article-md, one-to-many).

Example: `GET {{baseUrl}}/api/series/:documentId?populate=article_mds`

---

# ⚙️ Configuración adicional recomendada

Para optimizar el rendimiento y funcionalidad, considera:

1. **Índices en base de datos**: Agregar índice en el campo `year` para consultas más rápidas
2. **Validaciones**: Implementar validación para evitar años duplicados
3. **Permisos**: Configurar roles de usuario apropiados para CRUD operations
4. **Paginación**: Para asociaciones con muchos miembros, considera pagination en el frontend

---

## 🔒 Autenticación

Todos los endpoints requieren autenticación Bearer token:

```http
Authorization: Bearer {{$dotenv STRAPI_TOKEN}}
```
---


## 📚 Strapi DOC

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

