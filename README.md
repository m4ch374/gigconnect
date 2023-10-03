# Capstone Project

This is the final year capstone project thing. A better intro would be added later once we've finalized on things.

## :robot: Setting up the repo

> This monorepo is set up in a way that the frontend and the backend are seperated

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

* Add a file `.env` in `./backend` and paste in the following:
```
DATABASE_URL="postgresql://[postgres_user_name]:[password]@localhost/[db_name]"
PORT=8080
```

* And lastly:
```sh
$ npm install # or yarn
$ npx prisma db push
$ npm run dev
```

## :notebook: Good to knows

### Typescript & eslint

Assuming that you are using `vscode` as your IDE, it is highly recommended that you download an install [this extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

We are using a modification of the airbnb style guide for typescript.

Few things to note are:
```ts
* Semi-colons: no semicolons
* Floating promises: forbidden except for IIFE
* Trailing commas: yes

* Function paranthesis: avoids

i.e.
// normal
arr.map((item, idx) => item * idx)

// preferred
arr.map(item => item * 2)

// error
arr.map((item) => item * 2)
```

### Useful scrips

```sh
# Common
npm run dev --------> starting the server
npm run lint -------> Running eslint
npm run lint:fix ---> Autofix eslint issues

# Backend
npm run clear ------> Clears transpiled js files
```

### Miscellaneous stuffs

* Testing infra is not implemented yet
* Adding github actions soon
* Backend is less structured since it should be determined by the backend ppl
* Knock knock
