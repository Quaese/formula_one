# formula_one

The directories used in the document/manual are relative to a base directory (i.e. **formula_one**).

## Project setup

**Prerequisite:** Current directory is the base directory.

### Frontend (Vue.js)

```bash
npm install
```

### Backend (nodejs)

```bash
cd backend
npm install
```

## Run server/application in *production* mode

**Prerequisite:** Current directory is the base directory.

1. Start first the backend script to get the current ip address and start the node server
    ```bash
    # change from base directory to backend folder
    cd backend/
    # run start script for production mode
    npm run production
    ```
1. Change back to base directory
    ```bash
    # change back to base directory
    cd ..
    ```
1. Execute **build** script
    ```bash
    # builds the application in a ./dist folder
    npm run build
    ```
1. Copy content of `./dist` folder to a webserver


## Run server/services commands for *development* mode

### 1. Backend (Nodejs-Server)

#### Run server

```bash
# change to backend directory
cd backend
# run server
npm run start
```

### 2. Frontend (Vue.js)

#### Run app

The app can run with defaults. That means it runs on **localhost** and **current ip address** for the `host` argument. The value for the `port` argument is **8080**.

The app also works with custom values:

- --host=[ip.address] - replace this with the wanted ip address, e.g. `--host=192.168.1.10`
- --port=[port] - replace this with the wanted port number, e.g. `--port=4216`

```bash
# most cases (own port, default ip address and localhost)
npx vue-cli-service serve --port=[port]

# minimal
npx vue-cli-service serve

# run with special ip address and port
npx vue-cli-service serve --host=[ip.address] --port=[port]
```

#### Kill app

Kill a process of the app running on a special **port**. It can run on a default or a custom port (see [Run App](#user-content-run-app)).

```bash
# kill running application on a port (e.g. 4216)
fuser -k [port]/tcp
```

## Visual Studio Code setup

Add the following to `~/Library/Application Support/Code/User/settings.json` (mac os)

```json
{
  "vetur.format.defaultFormatter.js": "vscode-typescript",
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    {
      "language": "vue",
      "autoFix": true
    },
    {
      "language": "html",
      "autoFix": true
    },
    {
      "language": "javascript",
      "autoFix": true
    }
  ]
}
```

See: [How to integrate ESLint with Vue.js and Vetur in Visual Studio Code (alligator.io)](https://alligator.io/vuejs/eslint-vue-vetur/)

## More

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Run your unit tests

```
npm run test:unit
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
