# Podcast List App

Este proyecto es una prueba técnica que consiste en una aplicación para listar podcasts, desarrollada con Vite, pnpm, TypeScript, Tailwind CSS, shadcn/ui, SWR y Axios. La aplicación incluye un sistema de routing básico y se conecta a una API externa para obtener los datos de los podcasts. El deploy está realizado en Vercel.

## Estructura del Proyecto

La estructura de carpetas sigue una organización modular, con componentes, hooks, modelos, servicios y rutas claramente definidos.

```
├── .qodo/
├── dist/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── components/       # Componentes reutilizables de la UI
│   ├── hooks/            # Hooks personalizados
│   ├── lib/              # Utilidades y configuraciones (ej. Axios, SWR)
│   ├── podcast/          # Módulo principal para la funcionalidad de podcasts
│   │   ├── components/   # Componentes específicos del módulo de podcasts
│   │   ├── models/       # Definiciones de tipos y interfaces
│   │   ├── pages/        # Páginas de la aplicación (vistas)
│   │   ├── routes/       # Definición de rutas y navegación
│   │   ├── services/     # Lógica para la interacción con la API
│   │   └── stores/       # Manejo de estado (si aplica)
│   ├── App.tsx           # Componente principal de la aplicación
│   ├── index.css         # Estilos globales
│   ├── main.tsx          # Punto de entrada de la aplicación
│   └── vite-env.d.ts     # Tipos de entorno de Vite
└── tests/
```

## Tecnologías Utilizadas

* **Vite**: Un bundler de próxima generación para aplicaciones web.
* **pnpm**: Un administrador de paquetes rápido y eficiente.
* **TypeScript**: Lenguaje que añade tipado estático a JavaScript.
* **Tailwind CSS**: Un framework CSS de primera clase que ofrece utilidad de clases.
* **shadcn/ui**: Componentes de UI construidos con Tailwind CSS y Radix UI.
* **SWR**: Una librería para la obtención de datos, caching y revalidación.
* **Axios**: Un cliente HTTP basado en promesas para el navegador y Node.js.
* **React Router (o similar)**: Para el enrutamiento de la aplicación (implícito por la estructura `routes/`).
* **Vercel**: Plataforma para el despliegue continuo de aplicaciones web.

## Configuración del Entorno

Asegúrate de tener `pnpm` instalado globalmente en tu sistema. Si no lo tienes, puedes instalarlo con npm:

```bash
npm install -g pnpm
```

## Instalación

1.  Clona el repositorio:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_DEL_REPOSITORIO>
    ```
2.  Instala las dependencias:
    ```bash
    pnpm install
    ```

## Ejecución en Desarrollo

Para iniciar el servidor de desarrollo:

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que te indique Vite).

## Construcción para Producción

Para construir la aplicación para producción:

```bash
pnpm build
```

Esto generará los archivos optimizados en la carpeta `dist/`.

## Despliegue

La aplicación está desplegada en Vercel. Cualquier push a la rama `main` (o la rama configurada para despliegue automático) activará un nuevo despliegue.

## API

La aplicación se conecta a una API externa para obtener la lista de podcasts. Asegúrate de que la URL de la API esté correctamente configurada en las variables de entorno o en el código (dentro de `src/podcast/services/`).

## Características

* Listado de podcasts.
* Conexión con una API externa.
* Routing básico entre vistas.
* Estilos modernos con Tailwind CSS y componentes de shadcn/ui.
* Manejo eficiente de datos con SWR y Axios.
* Desarrollo con TypeScript para mayor robustez.

---

¡Gracias por revisar este proyecto!
