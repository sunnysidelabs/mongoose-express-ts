# Mongoose Node.js Express TypeScript application boilerplate with best practices for API development.

![image](https://user-images.githubusercontent.com/10678997/57565876-01281b00-73f8-11e9-8d86-911faa4a6c0f.png)

The main purpose of this repository is to show a good end-to-end project setup and workflow for writing a Mongoose Node.js Express code in TypeScript complete with middleware, models, routes, and types.

This example comes with a complete REST API to handle Authentication and CRUD features on Users and their corresponding Profile. You may view the API documentation on the [Wiki](https://github.com/polcham/mongoose-express-ts/wiki).

# Why TypeScript?

While it's true that developing applications on an Untyped language such as **JavaScript**, is easier to learn and is faster to develop, it will undeniably get harder and harder to grasp as the application grows in scale. This in turn, leads to more run-time errors consuming more development hours, as the team gets accustomed to the growing codebase. And this is what this boilerplate hopes to achieve. By using the **TypeScript** standard, you'll have better team and code stability with **Interface Oriented Development**, leading to better standardized codes. TypeScript allows developers to focus more on exposed Interfaces or API, rather than having to know all the code by heart. This makes the codebase easier to maintain with big teams, especially if those teams are composed of developers of different skill levels.

# Prerequisites

To build and run this app locally you will need a few things:

- Install [Node.js](https://nodejs.org/en/)
- Install [VS Code](https://code.visualstudio.com/)

# Getting started

- Clone the repository

```
git clone --depth=1 https://github.com/polcham/mongoose-express-ts.git <project_name>
```

- Install dependencies

```
cd <project_name>
npm install
npm run tsc
```

- Build and run the project with auto reload (nodemon)

```
npm run server
```

- Build and run the project

```
npm run start
```

Finally, navigate to `http://localhost:5000/` and you should see the API running!

## Project Structure

The most obvious difference in a TypeScript + Node project is the folder structure. In a TypeScript project, it's best to have separate _source_ and _distributable_ files. TypeScript (`.ts`) files live in your `src` folder and after compilation are output as JavaScript (`.js`) in the `dist` folder.

The full folder structure of this app is explained below:

> **Note!** Make sure you have already built the app using `npm run start`

| Name               | Description                                                                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **config**         | Contains config environment to be used by the config package, such as MongoDB URI, jwtSecret, and etc.                                                        |
| **dist**           | Contains the distributable (or output) from your TypeScript build                                                                                             |
| **node_modules**   | Contains all your npm dependencies                                                                                                                            |
| **REST**           | Contains all API requests to test the routes, used with [REST Client VSCode extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) |
| **src**            | Contains your source code that will be compiled to the dist dir                                                                                               |
| **src/middleware** | Contains the middlewares to intercept requests                                                                                                                |
| **src/models**     | Models define Mongoose schemas that will be used in storing and retrieving data from MongoDB                                                                  |
| **src/routes**     | Routes define the endpoints of your API                                                                                                                       |
| **src/types**      | Contains all your custom types to better handle type checking with TypeScript                                                                                 |
| **src/server.ts**  | Entry point to your express app                                                                                                                               |
| package.json       | File that contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)                                                    |
| tsconfig.json      | Config settings for compiling server code written in TypeScript                                                                                               |
| tslint.json        | Config settings for TSLint code style checking                                                                                                                |

### Configuring TypeScript compilation

TypeScript uses the file `tsconfig.json` to adjust project compile options.
Let's dissect this project's `tsconfig.json`, starting with the `compilerOptions` which details how your project is compiled.

```json
    "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es6",
    "noImplicitAny": true,
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist",
    "baseUrl": ".",
    "paths": {
      "*": ["node_modules/*", "src/types/*"]
    }
  }
```

| `compilerOptions`            | Description                                                                                                                                                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"module": "commonjs"`       | The **output** module type (in your `.js` files). Node uses commonjs, so that is what we use                                                               |
| `"esModuleInterop": true,`   | Allows usage of an alternate module import syntax: `import foo from 'foo';`                                                                                |
| `"target": "es6"`            | The output language level. Node supports ES6, so we can target that here                                                                                   |
| `"noImplicitAny": true`      | Enables a stricter setting which throws errors when something has a default `any` value                                                                    |
| `"moduleResolution": "node"` | TypeScript attempts to mimic Node's module resolution strategy. Read more [here](https://www.typescriptlang.org/docs/handbook/module-resolution.html#node) |
| `"sourceMap": true`          | We want source maps to be output along side our JavaScript. See the [debugging](#debugging) section                                                        |
| `"outDir": "dist"`           | Location to output `.js` files after compilation                                                                                                           |
| `"baseUrl": "."`             | Part of configuring module resolution. See [path mapping section](#installing-dts-files-from-definitelytyped)                                              |
| `paths: {...}`               | Part of configuring module resolution. See [path mapping section](#installing-dts-files-from-definitelytyped)                                              |

The rest of the file define the TypeScript project context.
The project context is basically a set of options that determine which files are compiled when the compiler is invoked with a specific `tsconfig.json`.
In this case, we use the following to define our project context:

```json
    "include": [
        "src/**/*"
    ]
```

`include` takes an array of glob patterns of files to include in the compilation. This project is fairly simple and all of our .ts files are under the `src` folder.

### Running the build

All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.
This is nice because most JavaScript tools have easy to use command line utilities allowing us to not need grunt or gulp to manage our builds.
If you open `package.json`, you will see a `scripts` section with all the different scripts you can call.
To call a script, simply run `npm run <script-name>` from the command line.
You'll notice that npm scripts can call each other which makes it easy to compose complex builds out of simple individual build scripts.
Below is a list of all the scripts this template has available:

| Npm Script     | Description                                                                                   |
| -------------- | --------------------------------------------------------------------------------------------- |
| `tsc`          | Transpiles TypeScript codes to JavaScript.                                                    |
| `watch-tsc`    | Transpiles TypeScript codes to JavaScript, with auto reload.                                  |
| `deploy`       | Runs node on `dist/server.js` which is the app's entry point.                                 |
| `watch-deploy` | Runs node on `dist/server.js` which is the app's entry point, with auto reload.               |
| `server`       | Transpiles TypeScript codes to JavaScript then run node on `dist/server.js` with auto reload. |
| `start`        | Transpiles TypeScript codes to JavaScript then run node on `dist/server.js`.                  |

Since we're developing with TypeScript, it is important for the codes to be transpiled first to JavaScript before running the node server. It is best to deploy the app using: `npm run server` or `npm run start` command.

### VSCode Extensions

To enhance your development experience while working in VSCode, I provided you with a list of suggested extensions while working on this project:

- [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
- [Version Lens](https://marketplace.visualstudio.com/items?itemName=pflannery.vscode-versionlens)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer)
- [index-rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow)
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)

# Dependencies

Dependencies are managed through `package.json`.
In that file you'll find two sections:

## `dependencies`

| Package           | Description                                     |
| ----------------- | ----------------------------------------------- |
| bcryptjs          | Library for hashing and salting user passwords. |
| config            | Universal configurations for your app.          |
| express           | Node.js web framework.                          |
| express-validator | Easy form validation for Express.               |
| gravatar          | Generate Gravatar URLs based on gravatar specs. |
| http-status-codes | HTTP status codes constants.                    |
| jsonwebtoken      | JsonWebToken implementation for Node.js.        |
| mongoose          | MongoDB modeling tool in an async environment.  |
| request           | Simplified HTTP client for Node.js.             |
| typescript        | Typed superset of JavaScript.                   |

## `devDependencies`

Since TypeScript is used, dependencies should be accompanied with their corresponding DefinitelyTyped @types package.

| Package             | Description                             |
| ------------------- | --------------------------------------- |
| @types/bcryptjs     | DefinitelyTyped for bcryptjs            |
| @types/config       | DefinitelyTyped for config              |
| @types/express      | DefinitelyTyped for express             |
| @types/gravatar     | DefinitelyTyped for gravatar            |
| @types/jsonwebtoken | DefinitelyTyped for jsonwebtoken        |
| @types/mongoose     | DefinitelyTyped for mongoose            |
| concurrently        | Run multiple commands concurrently      |
| nodemon             | Reload node application on code changes |

To install or update these dependencies you can use `npm install` or `npm update`.
