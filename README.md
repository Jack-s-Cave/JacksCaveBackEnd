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

## 3 · Podcast episodes

### 3.1  Get **all** podcast episodes (+ media URL)

```http
GET /podcasts?populate[image][fields][0]=url
```

<details>
<summary>Example response (JSON)</summary>

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "hqbw0e8fpwdeiu4a5jcbur6x",
      "title": "Desarrollar videojuegos en Guatemala | EP 1 Dennis Aldana",
      "date_publication": "2024-09-19",
      "link": "https://www.youtube.com/watch?v=zlSbBsJYFGA",
      "createdAt": "2025-07-12T22:29:05.874Z",
      "updatedAt": "2025-07-12T22:29:05.874Z",
      "publishedAt": "2025-07-12T22:29:05.679Z",
      "locale": "en",
      "image": {
        "id": 3,
        "documentId": "m8ru6j4tdtd7qd2qmjtdjmsu",
        "url": "/uploads/Screenshot_2025_07_12_162816_0a9f9bf1c9.png"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

</details>

---

### 3.2  Get **one** podcast episode 

```http
GET /podcasts?filters[id][$eq]=1&populate[image][fields][0]=url
```

<details>
<summary>Example response (JSON)</summary>

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "hqbw0e8fpwdeiu4a5jcbur6x",
      "title": "Desarrollar videojuegos en Guatemala | EP 1 Dennis Aldana",
      "date_publication": "2024-09-19",
      "link": "https://www.youtube.com/watch?v=zlSbBsJYFGA",
      "createdAt": "2025-07-12T22:29:05.874Z",
      "updatedAt": "2025-07-12T22:29:05.874Z",
      "publishedAt": "2025-07-12T22:29:05.679Z",
      "locale": "en",
      "image": {
        "id": 3,
        "documentId": "m8ru6j4tdtd7qd2qmjtdjmsu",
        "url": "/uploads/Screenshot_2025_07_12_162816_0a9f9bf1c9.png"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

</details>

---
## 4 · Podcast crew

### 4.1  Get **all** podcast crew (+ media URL)

```http
GET /podcast-crew?populate[photos][fields][0]=url
```

<details>
<summary>Example response (JSON)</summary>

```json
{
  "data": {
    "id": 1,
    "documentId": "z9ts5zpjpsnskxax1fe17a48",
    "nombre": "enTERAte",
    "conductores": {
      "conductor_1": {
        "año": "4to",
        "nombre": "Sebastian Huertas"
      },
      "conductor_2": {
        "año": "4to",
        "nombre": "Sofia Garcia"
      }
    },
    "proposito": "Ser un podcast educativo y que ayude a los de nuevo ingreso o a mas gente a interesarse por Ciencias de la computacion",
    "createdAt": "2025-07-13T23:46:30.484Z",
    "updatedAt": "2025-07-13T23:56:38.622Z",
    "publishedAt": "2025-07-13T23:56:37.920Z",
    "locale": "en",
    "photos": [
      {
        "id": 2,
        "documentId": "v523h1ahq3mq01uawb12xbmx",
        "url": "/uploads/1200px_Seehund11cele4_edit_a95fe9d5a8.jpg"
      },
      {
        "id": 1,
        "documentId": "s6ryiy7s19b6ypojrf4hxcw5",
        "url": "/uploads/sonic_567a1e1ae3.jpg"
      }
    ]
  },
  "meta": {}
}
```

</details>

# 5 · Asociaciones

La colección **Asociaciones** representa las juntas directivas por año académico, donde cada asociación contiene múltiples miembros con sus respectivos cargos.

## Estructura de datos

### Asociación
- `year`: Año de la asociación (integer)
- `Miembro`: Componente repetible con los datos de cada miembro

### Componente Miembro
- `nombre`: Nombre del miembro (string)
- `Cargo`: Puesto en la asociación (enum)
  - Presidente
  - Vicepresidente  
  - Secretario
  - Tesorero
  - Vocal
  - Representante
- `year_estudiante`: Año académico del miembro (enum)
  - Primer año
  - Segundo año
  - Tercer año
  - Cuarto año
  - Quinto año
- `foto`: Imagen del miembro (media)
- `curriculum`: Biografía/experiencia del miembro (text)

---

## 5.1 · Get **todas** las asociaciones (básico)

```http
GET /asociaciones
```

<details>
<summary>Ejemplo de respuesta (JSON)</summary>

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "year": 2024,
        "createdAt": "2025-01-15T10:00:00.000Z",
        "updatedAt": "2025-01-15T10:00:00.000Z",
        "publishedAt": "2025-01-15T10:00:00.000Z"
      }
    },
    {
      "id": 2,
      "attributes": {
        "year": 2023,
        "createdAt": "2024-01-15T10:00:00.000Z",
        "updatedAt": "2024-01-15T10:00:00.000Z",
        "publishedAt": "2024-01-15T10:00:00.000Z"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 2
    }
  }
}
```

</details>

---

## 5.2 · Get **todas** las asociaciones con miembros y fotos

```http
GET /asociaciones?populate[Miembro][populate][foto][fields][0]=url
```

<details>
<summary>Ejemplo de respuesta (JSON)</summary>

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "year": 2024,
        "createdAt": "2025-01-15T10:00:00.000Z",
        "updatedAt": "2025-01-15T10:00:00.000Z",
        "publishedAt": "2025-01-15T10:00:00.000Z",
        "Miembro": [
          {
            "id": 1,
            "nombre": "Ana García",
            "Cargo": "Presidente",
            "year_estudiante": "Cuarto año",
            "curriculum": "Estudiante destacada con experiencia en liderazgo estudiantil...",
            "foto": {
              "data": {
                "id": 5,
                "attributes": {
                  "url": "/uploads/ana_garcia_president_2024.jpg"
                }
              }
            }
          },
          {
            "id": 2,
            "nombre": "Carlos López",
            "Cargo": "Vicepresidente", 
            "year_estudiante": "Tercer año",
            "curriculum": "Especializado en desarrollo web y coordinación de eventos...",
            "foto": {
              "data": {
                "id": 6,
                "attributes": {
                  "url": "/uploads/carlos_lopez_vice_2024.jpg"
                }
              }
            }
          }
        ]
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

</details>

---

## 5.3 · Get asociación por **año específico** con miembros y fotos

```http
GET /asociaciones?filters[year][$eq]=2024&populate[Miembro][populate][foto][fields][0]=url
```

<details>
<summary>Ejemplo de respuesta (JSON)</summary>

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "year": 2024,
        "createdAt": "2025-01-15T10:00:00.000Z",
        "updatedAt": "2025-01-15T10:00:00.000Z", 
        "publishedAt": "2025-01-15T10:00:00.000Z",
        "Miembro": [
          {
            "id": 1,
            "nombre": "Ana García",
            "Cargo": "Presidente",
            "year_estudiante": "Cuarto año",
            "curriculum": "Estudiante destacada con experiencia en liderazgo estudiantil y coordinación de proyectos académicos.",
            "foto": {
              "data": {
                "id": 5,
                "attributes": {
                  "url": "/uploads/ana_garcia_president_2024.jpg"
                }
              }
            }
          },
          {
            "id": 2,
            "nombre": "Carlos López",
            "Cargo": "Vicepresidente",
            "year_estudiante": "Tercer año", 
            "curriculum": "Especializado en desarrollo web y coordinación de eventos estudiantiles.",
            "foto": {
              "data": {
                "id": 6,
                "attributes": {
                  "url": "/uploads/carlos_lopez_vice_2024.jpg"
                }
              }
            }
          },
          {
            "id": 3,
            "nombre": "María Rodríguez",
            "Cargo": "Secretario",
            "year_estudiante": "Segundo año",
            "curriculum": "Encargada de documentación y comunicación interna de la asociación.",
            "foto": {
              "data": {
                "id": 7,
                "attributes": {
                  "url": "/uploads/maria_rodriguez_secretary_2024.jpg"
                }
              }
            }
          }
        ]
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

</details>

---

## 5.4 · Get asociaciones **ordenadas por año** (descendente) con miembros y fotos

```http
GET /asociaciones?sort[0]=year:desc&populate[Miembro][populate][foto][fields][0]=url
```

<details>
<summary>Ejemplo de respuesta (JSON)</summary>

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "year": 2024,
        "createdAt": "2025-01-15T10:00:00.000Z",
        "updatedAt": "2025-01-15T10:00:00.000Z",
        "publishedAt": "2025-01-15T10:00:00.000Z",
        "Miembro": [
          {
            "id": 1,
            "nombre": "Ana García",
            "Cargo": "Presidente",
            "year_estudiante": "Cuarto año",
            "curriculum": "Estudiante destacada con experiencia en liderazgo estudiantil...",
            "foto": {
              "data": {
                "id": 5,
                "attributes": {
                  "url": "/uploads/ana_garcia_president_2024.jpg"
                }
              }
            }
          }
        ]
      }
    },
    {
      "id": 2,
      "attributes": {
        "year": 2023,
        "createdAt": "2024-01-15T10:00:00.000Z",
        "updatedAt": "2024-01-15T10:00:00.000Z",
        "publishedAt": "2024-01-15T10:00:00.000Z",
        "Miembro": [
          {
            "id": 4,
            "nombre": "Pedro Martínez",
            "Cargo": "Presidente",
            "year_estudiante": "Quinto año",
            "curriculum": "Ex-presidente con amplia experiencia en gestión estudiantil...",
            "foto": {
              "data": {
                "id": 8,
                "attributes": {
                  "url": "/uploads/pedro_martinez_president_2023.jpg"
                }
              }
            }
          }
        ]
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 2
    }
  }
}
```

</details>


---

## ⚙️ Configuración adicional recomendada

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

