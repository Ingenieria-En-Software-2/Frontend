# Frontend

Este repositorio contiene el código del frontend de "Caribbean Wallet". Es una aplicación de una plataforma de Billetera Móvil
basada en el dominio de e-Banking.

## Instalación

Asegúrate de tener instalado ```Node.js``` y ```npm``` en tu sistema.

1. Clona el repositorio:

    ```shell
    git clone git@github.com:Ingenieria-En-Software-2/Frontend.git
    ```

2. Navega hasta el directorio del proyecto:

    ```shell
    cd Frontend
    ```

3. Instala las dependencias:

    ```shell
    make install
    ```

## Tecnologías utilizadas

### Dependencies

- [@emotion/react](https://www.npmjs.com/package/@emotion/react) v11.11.0
- [@emotion/styled](https://www.npmjs.com/package/@emotion/styled) v11.11.0
- [@fortawesome/fontawesome-svg-core](https://www.npmjs.com/package/@fortawesome/fontawesome-svg-core) v6.4.0
- [@fortawesome/free-solid-svg-icons](https://www.npmjs.com/package/@fortawesome/free-solid-svg-icons) v6.4.0
- [@fortawesome/react-fontawesome](https://www.npmjs.com/package/@fortawesome/react-fontawesome) v0.2.0
- [@mui/material](https://mui.com/) v5.13.1
- [path](https://www.npmjs.com/package/path) v0.12.7
- [React](https://reactjs.org/) v18.2.0
- [React Dom](https://reactjs.org/docs/react-dom.html) v18.2.0
- [React Router Dom](https://reactrouter.com/en/main) v6.11.2
- [vite-tsconfig-paths](https://www.npmjs.com/package/vite-tsconfig-paths) v4.2.0

### DevDependencies

- [@types/node](https://www.npmjs.com/package/@types/node) v20.2.1
- [@types/react](https://www.npmjs.com/package/@types/react) v18.0.28
- [@types/react-dom](https://www.npmjs.com/package/@types/react-dom) v18.0.11
- [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) v5.57.1
- [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) v5.57.1
- [@vitejs/plugin-react](https://www.npmjs.com/package/@vitejs/plugin-react) v4.0.0
- [autoprefixer](https://www.npmjs.com/package/autoprefixer) v10.4.14
- [eslint](https://eslint.org/) v8.41.0
- [eslint-config-react-app](https://www.npmjs.com/package/eslint-config-react-app) v7.0.1
- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) v4.6.0
- [eslint-plugin-react-refresh](https://www.npmjs.com/package/eslint-plugin-react-refresh) v0.3.4
- [postcss](https://www.npmjs.com/package/postcss) v8.4.23
- [tailwindcss](https://tailwindcss.com/) v3.3.2
- [typescript](https://www.typescriptlang.org/) v5.0.2
- [vite](https://vitejs.dev/) v4.3.2

## Ejecución

1. Ejecuta el proyecto en modo de desarrollo:

    ```shell
    make run
    ```

    Esto iniciará el servidor de desarrollo y la aplicación estará disponible en [http://localhost:5173/](http://localhost:5173/)

2. Otros comandos disponibles:

    - Compila el proyecto para producción.
  
        ```shell
        make build
        ```

    - Ejecuta el linter para verificar el código.

        ```shell
        make lint
        ```

    - Inicia un servidor para previsualizar la compilación de producción.

        ```shell
        make preview
        ```
## Setup

Add .env in the root folder and add the following variables:

```bash
VITE_API_URL="http://<ip of backend>:<port of backend>/api"
```
If you run the backend locally, it will the ip of the backend will be the ip of your machine
you can use localhost, the port will be the one you set when you run the backend, the default is 5000


## Run frontend in local

```bash
npm install
npm run dev
```

### Run the frontend and the server for the Google ReCaptcha locally

```bash
npm install
npm run captcha
```

## Run Frontend with docker compose

```bash
docker-compose up --build -d
```

In localhost, frontend service will be started at 5173 port
