# Capstone Project

Developed by 5 UNSW students, for their final year capstone project course, this repo contains the source code of a web platform for connecting professionals with existing projects.

<u>Project Description</u>: Companies may create and choose to share projects with the public. Interested individuals (professionals) can search and request to join projects. The web application is responsive and accessible on mobile devices. The following are the core requirements that should be designed and implemented by the end of this project.


## :robot: Setting up the repo

> This monorepo is set up in a way that the frontend and the backend are seperated.

### **0. Basic installations**
* ensure `Python >=3.8.10`, `pip >=20.0.2`, `tsc >=5.2.2` and `nodejs >=20.0.0` are installed in your system.

### **1. First install `pre-commit`**
```sh
$ pip install pre-commit
$ pre-commit install
```

### **2. Setting up the frontend**
```sh
$ cd frontend
$ npm install # or yarn
$ npm run dev
```

### **3. Setting up the backend**

This part is a bit tricky

* Install `postgres` based on your OS [**here**](https://www.postgresql.org/download/).

* Add a file `.env` in `./backend` and paste in the following:\
    * _<u>NOTE</u>: use the following command to generate your own jwt secret `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`._
```
DATABASE_URL="postgresql://[postgres_user_name]:[password]@localhost/[db_name]"
PORT=8080
NODE_ENV="development"
JWT_SECRET=<yourJWTsecret>
```

* And lastly:
```sh
$ npm install # or yarn
$ npx prisma db push
$ npm run dev
```

## :notebook: Good to knows

### Typescript & eslint

Assuming that you are using `vscode` as your IDE, it is highly recommended that you download an install this extension: [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

We are using a modification of the airbnb style guide for typescript.

Few things to note are:
```ts
* Semi-colons: no semicolons
* Floating promises: forbidden except for IIFE
* Trailing commas: yes

* Function parentheses: avoids

i.e.
// normal
arr.map((item, idx) => item * idx)

// preferred
arr.map(item => item * 2)

// error
arr.map((item) => item * 2)
```

### Useful Scripts

```sh
# Common
npm run dev --------> starting the server
npm run lint -------> Running eslint
npm run lint:fix ---> Autofix eslint issues

# Backend
npm run clear ------> Clears transpiled js files
```

### Miscellaneous info

* Testing infra is not implemented yet - planning to use [Jest](https://jestjs.io/) for backend unit testing.
* Adding github actions soon
