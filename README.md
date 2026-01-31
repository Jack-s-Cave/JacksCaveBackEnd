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

