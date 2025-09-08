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

## 2 · BLOGS

### 2.1  Get **all** Blogs (+ media URL)

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

### 2.2  Get **all** Blogs authored by a given profile

```http
GET /articles?filters[author_profile][id][$eq]=2&populate[media][fields][0]=url&populate[author_profile][fields][0]=nombre&populate[author_profile][fields][1]=bio
```

<details>
<summary>Example response (JSON)</summary>

```json
{
  "data": [
    {
      "id": 2,
      "documentId": "p0zemt7wo0isc6r0hv3guuou",
      "title": "Por que las focas son focas ",
      "information": "Las focas son “focas” porque cumplen un conjunto de criterios biológicos y evolutivos que las sitúan dentro de la familia Phocidae (focas verdaderas) en el orden Carnivora. A grandes rasgos, esto se debe a tres factores esenciales:\n\nLínea evolutiva común\nTodas las focas verdaderas descienden de un antepasado terrestre parecido a una nutria que, hace unos 20-25 millones de años, regresó al mar. Esa rama evolutiva acumula adaptaciones específicas (aletas posteriores orientadas hacia atrás, ausencia de pabellones auriculares externos, patrón dental especializado) que las distingue de otros pinnípedos como lobos y leones marinos (familia Otariidae).\n\nConjunto de rasgos morfológicos únicos\n\nLocomoción: usan principalmente las aletas posteriores para impulsarse bajo el agua y se desplazan en tierra “reptando”, a diferencia de los otáridos, que rotan sus aletas delanteras para caminar.\n\nEstructura ósea: cráneo y sistema respiratorio diseñados para inmersiones profundas y prolongadas.\n\nCapa de grasa (grueso panículo adiposo): aislante térmico y reserva energética que permite habitar aguas frías.\n\nEcología y comportamiento compartidos\nComparten estrategias de caza (pesca submarina sigilosa), ciclos de muda y reproducción sobre hielo o playas aisladas, y un sistema de comunicación principalmente vocal bajo el agua. Estos patrones de vida refuerzan su identidad filogenética y mantienen la cohesión del grupo.\n\nEn suma, las focas son focas porque comparten una genealogía clara, un paquete consistente de características anatómico-fisiológicas y un nicho ecológico parecido; esa combinación las agrupa científicamente como un linaje diferenciado dentro de los mamíferos marinos.",
      "createdAt": "2025-06-26T18:37:25.779Z",
      "updatedAt": "2025-06-26T18:37:25.779Z",
      "publishedAt": "2025-06-26T18:37:27.769Z",
      "locale": "en",
      "tags": null,
      "media": [
        {
          "id": 2,
          "documentId": "v523h1ahq3mq01uawb12xbmx",
          "url": "/uploads/1200px_Seehund11cele4_edit_a95fe9d5a8.jpg"
        }
      ],
      "author_profile": {
        "id": 2,
        "documentId": "se4xav3gcmgrockwj7jxqdoa",
        "nombre": "Sebastian Huertas",
        "bio": "Sebastian huertas es un profile de ejemplo "
      }
    },
  ]
}
```

</details>

---

### 2.3  Get **recents** Blogs (6)

```http
GET /articles
      ?sort[0]=createdAt:desc
      &pagination[page]=1
      &pagination[pageSize]=6
      &populate[media][fields][0]=url
```

<details>
<summary>Example response (JSON)</summary>

```json
{
  "data": [
    {
      "id": 6,
      "documentId": "gs2nxpkkemm8x20ig8z2ix0b",
      "title": "Focas embarazadas",
      "information": "Esto es de prueba",
      "createdAt": "2025-08-25T18:08:47.615Z",
      "updatedAt": "2025-08-25T18:08:47.615Z",
      "publishedAt": "2025-08-25T18:08:50.397Z",
      "locale": "en",
      "tags": null,
      "media": [
        {
          "id": 4,
          "documentId": "zbh59ufvidy20svn59gtbso1",
          "url": "/uploads/deskopt_c6531a27ea.jpg"
        }
      ]
    },
    {
      "id": 4,
      "documentId": "vdjxbvc3rm4latjwulz5opqm",
      "title": "Por que explorer solo lo usamos para descargar otro navegador",
      "information": "Internet Explorer (IE) terminó convertido en “el navegador para descargar navegadores” por la combinación de tres factores clave:\n\nEstancamiento tecnológico prolongado\nDespués de la versión 6 (2001), IE evolucionó muy lentamente. Mientras Firefox, Chrome y Opera incorporaban pestañas, motores JavaScript rápidos, extensiones y actualizaciones automáticas, IE seguía con un motor propietario (Trident) poco compatible con los nuevos estándares web. Resultado: muchas páginas modernas simplemente “no se veían bien” o funcionaban mejor en otros navegadores.\n\nSeguridad y confianza del usuario\nLas vulnerabilidades de IE se hicieron famosas: ActiveX, barras de herramientas invasivas y fallos críticos requerían parches constantes. La percepción de inseguridad empujó a la mayoría a instalar un navegador alternativo tan pronto como abrían Windows por primera vez, para navegar con menos riesgo y más privacidad.\n\nCambio de estrategia de Microsoft y el ecosistema web\nCon la llegada de Edge (Chromium) y el fin del soporte oficial de IE 11 (2022), Microsoft declaró obsoleto su propio navegador clásico. Los sitios corporativos heredados se quedaron con “modo IE” dentro de Edge, y el público general lo vio definitivamente como una herramienta de transición: se usa cinco minutos, se instala Chrome/Firefox/Brave, y nunca más se vuelve a abrir.\n\nEn conjunto, la falta de innovación, los problemas de seguridad y la propia decisión de Microsoft de jubilarlo convirtieron a Internet Explorer en un simple escalón inicial para obtener un navegador más rápido, seguro y compatible.",
      "createdAt": "2025-06-26T18:38:57.359Z",
      "updatedAt": "2025-06-26T18:38:57.359Z",
      "publishedAt": "2025-06-26T18:38:58.923Z",
      "locale": "en",
      "tags": null,
      "media": null
    },
    {
      "id": 2,
      "documentId": "p0zemt7wo0isc6r0hv3guuou",
      "title": "Por que las focas son focas ",
      "information": "Las focas son “focas” porque cumplen un conjunto de criterios biológicos y evolutivos que las sitúan dentro de la familia Phocidae (focas verdaderas) en el orden Carnivora. A grandes rasgos, esto se debe a tres factores esenciales:\n\nLínea evolutiva común\nTodas las focas verdaderas descienden de un antepasado terrestre parecido a una nutria que, hace unos 20-25 millones de años, regresó al mar. Esa rama evolutiva acumula adaptaciones específicas (aletas posteriores orientadas hacia atrás, ausencia de pabellones auriculares externos, patrón dental especializado) que las distingue de otros pinnípedos como lobos y leones marinos (familia Otariidae).\n\nConjunto de rasgos morfológicos únicos\n\nLocomoción: usan principalmente las aletas posteriores para impulsarse bajo el agua y se desplazan en tierra “reptando”, a diferencia de los otáridos, que rotan sus aletas delanteras para caminar.\n\nEstructura ósea: cráneo y sistema respiratorio diseñados para inmersiones profundas y prolongadas.\n\nCapa de grasa (grueso panículo adiposo): aislante térmico y reserva energética que permite habitar aguas frías.\n\nEcología y comportamiento compartidos\nComparten estrategias de caza (pesca submarina sigilosa), ciclos de muda y reproducción sobre hielo o playas aisladas, y un sistema de comunicación principalmente vocal bajo el agua. Estos patrones de vida refuerzan su identidad filogenética y mantienen la cohesión del grupo.\n\nEn suma, las focas son focas porque comparten una genealogía clara, un paquete consistente de características anatómico-fisiológicas y un nicho ecológico parecido; esa combinación las agrupa científicamente como un linaje diferenciado dentro de los mamíferos marinos.",
      "createdAt": "2025-06-26T18:37:25.779Z",
      "updatedAt": "2025-06-26T18:37:25.779Z",
      "publishedAt": "2025-06-26T18:37:27.769Z",
      "locale": "en",
      "tags": null,
      "media": [
        {
          "id": 2,
          "documentId": "v523h1ahq3mq01uawb12xbmx",
          "url": "/uploads/1200px_Seehund11cele4_edit_a95fe9d5a8.jpg"
        }
      ]
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 6,
      "pageCount": 1,
      "total": 3
    }
  }
}
```

</details>

---

### 2.4  Get **one** Blogs

```http
GET /articles?filters[id][$eq]=6
      &populate[media][fields][0]=url
      &populate[author_profile][fields][0]=nombre
      &populate[author_profile][fields][1]=bio
```

<details>
<summary>Example response (JSON)</summary>

```json
{
  "data": [
    {
      "id": 6,
      "documentId": "gs2nxpkkemm8x20ig8z2ix0b",
      "title": "Focas embarazadas",
      "information": "Esto es de prueba",
      "createdAt": "2025-08-25T18:08:47.615Z",
      "updatedAt": "2025-08-25T18:08:47.615Z",
      "publishedAt": "2025-08-25T18:08:50.397Z",
      "locale": "en",
      "tags": null,
      "media": [
        {
          "id": 4,
          "documentId": "zbh59ufvidy20svn59gtbso1",
          "url": "/uploads/deskopt_c6531a27ea.jpg"
        }
      ],
      "author_profile": {
        "id": 2,
        "documentId": "se4xav3gcmgrockwj7jxqdoa",
        "nombre": "Sebastian Huertas",
        "bio": "Sebastian huertas es un profile de ejemplo "
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

### 2.5  Get blogs with filter

#### title
```http
GET /articles
      ?filters[title][$eq]=Focas%20embarazadas
      &populate[media][fields][0]=url
      &populate[author_profile][fields][0]=nombre
      &populate[author_profile][fields][1]=bio
```

<details>
<summary>Example response (JSON)</summary>

```json
{
  "data": [
    {
      "id": 6,
      "documentId": "gs2nxpkkemm8x20ig8z2ix0b",
      "title": "Focas embarazadas",
      "information": "Esto es de prueba",
      "createdAt": "2025-08-25T18:08:47.615Z",
      "updatedAt": "2025-08-25T18:08:47.615Z",
      "publishedAt": "2025-08-25T18:08:50.397Z",
      "locale": "en",
      "tags": null,
      "media": [
        {
          "id": 4,
          "documentId": "zbh59ufvidy20svn59gtbso1",
          "url": "/uploads/deskopt_c6531a27ea.jpg"
        }
      ],
      "author_profile": {
        "id": 2,
        "documentId": "se4xav3gcmgrockwj7jxqdoa",
        "nombre": "Sebastian Huertas",
        "bio": "Sebastian huertas es un profile de ejemplo "
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

### 2.5  Get blogs by serie

#### title
```http
GET /articles
      ?filters[serie][name][$eq]=focas
      &populate[media][fields][0]=url
      &populate[author_profile][fields][0]=nombre
      &populate[author_profile][fields][1]=bio
```

<details>
<summary>Example response (JSON)</summary>

```json
{
  "data": [
    {
      "id": 4,
      "documentId": "vdjxbvc3rm4latjwulz5opqm",
      "title": "Por que explorer solo lo usamos para descargar otro navegador",
      "information": "Internet Explorer (IE) terminó convertido en “el navegador para descargar navegadores” por la combinación de tres factores clave:\n\nEstancamiento tecnológico prolongado\nDespués de la versión 6 (2001), IE evolucionó muy lentamente. Mientras Firefox, Chrome y Opera incorporaban pestañas, motores JavaScript rápidos, extensiones y actualizaciones automáticas, IE seguía con un motor propietario (Trident) poco compatible con los nuevos estándares web. Resultado: muchas páginas modernas simplemente “no se veían bien” o funcionaban mejor en otros navegadores.\n\nSeguridad y confianza del usuario\nLas vulnerabilidades de IE se hicieron famosas: ActiveX, barras de herramientas invasivas y fallos críticos requerían parches constantes. La percepción de inseguridad empujó a la mayoría a instalar un navegador alternativo tan pronto como abrían Windows por primera vez, para navegar con menos riesgo y más privacidad.\n\nCambio de estrategia de Microsoft y el ecosistema web\nCon la llegada de Edge (Chromium) y el fin del soporte oficial de IE 11 (2022), Microsoft declaró obsoleto su propio navegador clásico. Los sitios corporativos heredados se quedaron con “modo IE” dentro de Edge, y el público general lo vio definitivamente como una herramienta de transición: se usa cinco minutos, se instala Chrome/Firefox/Brave, y nunca más se vuelve a abrir.\n\nEn conjunto, la falta de innovación, los problemas de seguridad y la propia decisión de Microsoft de jubilarlo convirtieron a Internet Explorer en un simple escalón inicial para obtener un navegador más rápido, seguro y compatible.",
      "createdAt": "2025-06-26T18:38:57.359Z",
      "updatedAt": "2025-06-26T18:38:57.359Z",
      "publishedAt": "2025-06-26T18:38:58.923Z",
      "locale": "en",
      "tags": null,
      "media": null,
      "author_profile": {
        "id": 2,
        "documentId": "se4xav3gcmgrockwj7jxqdoa",
        "nombre": "Sebastian Huertas",
        "bio": "Sebastian huertas es un profile de ejemplo "
      }
    },
    {
      "id": 6,
      "documentId": "gs2nxpkkemm8x20ig8z2ix0b",
      "title": "Focas embarazadas",
      "information": "Esto es de prueba",
      "createdAt": "2025-08-25T18:08:47.615Z",
      "updatedAt": "2025-08-25T18:08:47.615Z",
      "publishedAt": "2025-08-25T18:08:50.397Z",
      "locale": "en",
      "tags": null,
      "media": [
        {
          "id": 4,
          "documentId": "zbh59ufvidy20svn59gtbso1",
          "url": "/uploads/deskopt_c6531a27ea.jpg"
        }
      ],
      "author_profile": {
        "id": 2,
        "documentId": "se4xav3gcmgrockwj7jxqdoa",
        "nombre": "Sebastian Huertas",
        "bio": "Sebastian huertas es un profile de ejemplo "
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

---

</details>

### 3.3  Get **recents** podcast episode (6)

```http
GET /podcasts
      ?sort[0]=date_publication:desc
      &pagination[page]=1
      &pagination[pageSize]=6
      &populate[image][fields][0]=url
```

<details>
<summary>Example response (JSON)</summary>

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "k528tp36miz745jt3jyy93xj",
      "title": "\nDesarrollar videojuegos en Guatemala | EP 1 Dennis Aldana",
      "date_publication": "2024-09-19",
      "link": "https://www.youtube.com/watch?v=zlSbBsJYFGA",
      "createdAt": "2025-08-28T00:36:45.157Z",
      "updatedAt": "2025-08-28T00:36:45.157Z",
      "publishedAt": "2025-08-28T00:36:44.967Z",
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
      "pageSize": 6,
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

---


## 5. Associations
### 5.1 Get One association per year
```http
GET /associations?filters[year][$eq]=2025
```

<details>
<summary>Example response (JSON)</summary>

```json
{
  "data": [
    {
      "id": 2,
      "documentId": "y0wo14ws3weh4zpcx89l9yv7",
      "createdAt": "2025-08-28T00:07:16.324Z",
      "updatedAt": "2025-08-28T00:07:16.324Z",
      "publishedAt": "2025-08-28T00:07:16.223Z",
      "locale": "en",
      "description": "somos la asociacion de 2025",
      "members": {
        "Vocal": "Angela",
        "Presidente": "Gerardo Pineda"
      },
      "year": "2025"
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

## 6 Series
### 6.1 Get ***all*** series
```http
GET /series
```

<details>
<summary>Example response (JSON)</summary>

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "u0t51ceg5dxw1yv7su4t2a3m",
      "createdAt": "2025-08-28T03:44:15.207Z",
      "updatedAt": "2025-08-28T03:44:15.207Z",
      "publishedAt": "2025-08-28T03:44:14.853Z",
      "locale": "en",
      "name": "focas"
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
---

### 6.2 Get ***all*** series
```http
GET /series?filter[id][$eq]=1
```

<details>
<summary>Example response (JSON)</summary>

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "u0t51ceg5dxw1yv7su4t2a3m",
      "createdAt": "2025-08-28T03:44:15.207Z",
      "updatedAt": "2025-08-28T03:44:15.207Z",
      "publishedAt": "2025-08-28T03:44:14.853Z",
      "locale": "en",
      "name": "focas"
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
---

## 7 News
### 7.1 Get ***recent*** news
```http
GET /informations
  ?sort[0]=date:desc
  &pagination[page]=1
  &pagination[pageSize]=3
  &populate[photo][fields][0]=url
```

<details>
<summary>Example response (JSON)</summary>

```json
{
  "data": [
    {
      "id": 2,
      "documentId": "mukp3s1esck2h68sqhcyablw",
      "createdAt": "2025-09-08T03:24:57.269Z",
      "updatedAt": "2025-09-08T03:24:57.269Z",
      "publishedAt": "2025-09-08T03:24:58.331Z",
      "title": "Intercambio a alemania",
      "author": "la aso",
      "date": "2025-08-12",
      "photo_description": "focas",
      "photo": {
        "id": 2,
        "documentId": "v523h1ahq3mq01uawb12xbmx",
        "url": "/uploads/1200px_Seehund11cele4_edit_a95fe9d5a8.jpg"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 3,
      "pageCount": 1,
      "total": 1
    }
  }
}
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

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
