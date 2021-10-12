import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Mike',
    email: 'mike@sep.se',
    password: bcrypt.hashSync('admin123', 10),
    role: 'Administration_Manager',
    department: 'Administration_Department',
  },
  {
    name: 'Janet',
    email: 'janet@sep.se',
    password: bcrypt.hashSync('scs123', 10),
    role: 'Senior_Customer_Service_Officer',
    department: 'Administration_Department',
  },
  {
    name: 'Alice',
    email: 'alice@sep.se',
    password: bcrypt.hashSync('fm123', 10),
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
]

export default users
