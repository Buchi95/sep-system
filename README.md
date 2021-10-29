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

Create another .env file in folder frontend/ and add the following

```
SKIP_PREFLIGHT_CHECK=true
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

### Tests

```
# To run all backend tests

npm start test or yarn test
```

### Sample Users - SEP
```
  {
    name: 'Mike',
    email: 'mike@sep.se',
    password: 'admin123',
    role: 'Administration_Manager',
    department: 'Administration_Department',
  },
  {
    name: 'Janet',
    email: 'janet@sep.se',
    password: 'scs123',
    role: 'Senior_Customer_Service_Officer',
    department: 'Administration_Department',
  },
  {
    name: 'Alice',
    email: 'alice@sep.se',
    password: 'fm123',
    role: 'Financial_Manager',
    department: 'Financial_Department',
  },
  {
    name: 'Sarah',
    email: 'sarah@sep.se',
    password: bcrypt.hashSync('cs123', 10),
    role: 'Customer_Service',
    department: 'Administration_Department',
  },
  {
    name: 'Jack',
    email: 'jack@sep.se',
    password: 'pdm123',
    role: 'Production_Manager',
    department: 'Production_Department',
  },
  {
    name: 'Natalie',
    email: 'natalie@sep.se',
    password: 'sdm123',
    role: 'Services_Manager',
    department: 'Services_Department',
  },
  // Production Team Members
  // Photography Teaem
  {
    name: 'Tobias',
    email: 'tobi@sep.se',
    password: 'tobi123',
    role: 'Photographer',
    department: 'Production_Department',
    subdepartment: 'Filming_Photos',
  },
  {
    name: 'Magdalena',
    email: 'magd@sep.se',
    password: 'magd123',
    role: 'Photographer',
    department: 'Production_Department',
    subdepartment: 'Filming_Photos',
  },
  // Audio Team
  {
    name: 'Antony',
    email: 'anto@sep.se',
    password: 'anto123',
    role: 'Audio_Specialist',
    department: 'Production_Department',
    subdepartment: 'Music',
  },
  {
    name: 'Adam',
    email: 'adam@sep.se',
    password: 'adam123',
    role: 'Audio_Specialist',
    department: 'Production_Department',
    subdepartment: 'Music',
  },
  // Art Team
  {
    name: 'Julia',
    email: 'julia@sep.se',
    password: 'julia123',
    role: 'Graphic_Designer',
    department: 'Production_Department',
    subdepartment: 'Artwork',
  },
  {
    name: 'Raymond',
    email: 'raym@sep.se',
    password: 'raym123',
    role: 'Graphic_Designer',
    department: 'Production_Department',
    subdepartment: 'Artwork',
  },
  // Decorations
  {
    name: 'Magy',
    email: 'magy@sep.se',
    password: 'magy123',
    role: 'Decorating_Architect',
    department: 'Production_Department',
    subdepartment: 'Decorations',
  },
  {
    name: 'Angelina',
    email: 'ang@sep.se',
    password: 'ang123',
    role: 'Decorating_Specialist',
    department: 'Production_Department',
    subdepartment: 'Decorations',
  },
  {
    name: 'Don',
    email: 'don@sep.se',
    password: 'don123',
    role: 'Decorating_Assistant',
    department: 'Production_Department',
    subdepartment: 'Decorations',
  },
  {
    name: 'Tom',
    email: 'tom@sep.se',
    password: 'tom123',
    role: 'Decorating_Assistant',
    department: 'Production_Department',
    subdepartment: 'Decorations',
  },
  // It
  {
    name: 'Christian',
    email: 'christ@sep.se',
    password: 'christ123',
    role: 'Network_Engineer',
    department: 'Production_Department',
    subdepartment: 'It',
  },
  {
    name: 'Nicolas',
    email: 'nico@sep.se',
    password: 'nico123',
    role: 'Network_Engineer',
    department: 'Production_Department',
    subdepartment: 'It',
  },
  {
    name: 'Michael',
    email: 'mich@sep.se',
    password: 'mich123',
    role: 'Technician',
    department: 'Production_Department',
    subdepartment: 'It',
  },
  {
    name: 'Robert',
    email: 'robert@sep.se',
    password: 'robert123',
    role: 'Technician',
    department: 'Production_Department',
    subdepartment: 'It',
  },
  // serivces department
  // Food
  {
    name: 'Helen',
    email: 'helen@sep.se',
    password: 'helen123',
    role: 'Top_Chef',
    department: 'Services_Department',
    subdepartment: 'Food',
  },
  {
    name: 'Kate',
    email: 'kate@sep.se',
    password: 'kate123',
    role: 'Senior_Waitress',
    department: 'Services_Department',
    subdepartment: 'Catering',
  },
  // HR
  {
    name: 'Simon',
    email: 'simon@sep.se',
    password: 'shrm123',
    role: 'Senior_HR_Manager',
    department: 'Administration_Department',
  },
  {
    name: 'Maria',
    email: 'maria@sep.se',
    password: 'maria123',
    role: 'HR_Assitant',
    department: 'Administration_Department',
  },
  // marketing
  {
    name: 'David',
    email: 'david@sep.se',
    password: 'mo123',
    role: 'Marketing_Officer',
    department: 'Administration_Department',
  },

```

# AUTHOR

- LinkedIn: [@abdullah1428](https://www.linkedin.com/in/abdullahcse/)
- LinkedIn: [@marc-buchberger](https://www.linkedin.com/in/marc-buchberger-6a265bba/)
- LinkedIn: [@aksel-uhr](https://www.linkedin.com/in/aksel-uhr/)

## License

The MIT License
