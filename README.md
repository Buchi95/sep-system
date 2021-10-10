# sep-system

Software Repository for MMSE project assignment on the SEP business case

## Usage

### ES Modules in Node

We us ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error

You can also install and setup Babel if you would like

### Env Variables

Create a .env file in root folder and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
```

### Install Dependencies (frontend & backend)

```
npm install or yarn install
cd frontend
npm install or yarn install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev or yarn dev

# Run backend only
npm run server or yarn server
```

# AUTHOR

- LinkedIn: [@abdullah1428](https://www.linkedin.com/in/abdullahcse/)
- LinkedIn: [@marc-buchberger](https://www.linkedin.com/in/marc-buchberger-6a265bba/)
- LinkedIn: [@aksel-uhr](https://www.linkedin.com/in/aksel-uhr/)

## License

The MIT License
