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
  {
    name: 'Jack',
    email: 'jack@sep.se',
    password: bcrypt.hashSync('pdm123', 10),
    role: 'Production_Manager',
    department: 'Production_Department',
  },
  {
    name: 'Natalie',
    email: 'natalie@sep.se',
    password: bcrypt.hashSync('sdm123', 10),
    role: 'Services_Manager',
    department: 'Services_Department',
  },
  // Production Team Members
  // Photography Teaem
  {
    name: 'Tobias',
    email: 'tobi@sep.se',
    password: bcrypt.hashSync('tobi123', 10),
    role: 'Photographer',
    department: 'Production_Department',
    subdepartment: 'Filming_Photos',
  },
  {
    name: 'Magdalena',
    email: 'magd@sep.se',
    password: bcrypt.hashSync('magd123', 10),
    role: 'Photographer',
    department: 'Production_Department',
    subdepartment: 'Filming_Photos',
  },
  // Audio Team
  {
    name: 'Antony',
    email: 'anto@sep.se',
    password: bcrypt.hashSync('anto123', 10),
    role: 'Audio_Specialist',
    department: 'Production_Department',
    subdepartment: 'Music',
  },
  {
    name: 'Adam',
    email: 'adam@sep.se',
    password: bcrypt.hashSync('adam123', 10),
    role: 'Audio_Specialist',
    department: 'Production_Department',
    subdepartment: 'Music',
  },
  // Art Team
  {
    name: 'Julia',
    email: 'julia@sep.se',
    password: bcrypt.hashSync('julia123', 10),
    role: 'Graphic_Designer',
    department: 'Production_Department',
    subdepartment: 'Artwork',
  },
  {
    name: 'Raymond',
    email: 'raym@sep.se',
    password: bcrypt.hashSync('raym123', 10),
    role: 'Graphic_Designer',
    department: 'Production_Department',
    subdepartment: 'Artwork',
  },
  // Decorations
  {
    name: 'Magy',
    email: 'magy@sep.se',
    password: bcrypt.hashSync('magy123', 10),
    role: 'Decorating_Architect',
    department: 'Production_Department',
    subdepartment: 'Decorations',
  },
  {
    name: 'Angelina',
    email: 'ang@sep.se',
    password: bcrypt.hashSync('ang123', 10),
    role: 'Decorating_Specialist',
    department: 'Production_Department',
    subdepartment: 'Decorations',
  },
  {
    name: 'Don',
    email: 'don@sep.se',
    password: bcrypt.hashSync('don123', 10),
    role: 'Decorating_Assistant',
    department: 'Production_Department',
    subdepartment: 'Decorations',
  },
  {
    name: 'Tom',
    email: 'tom@sep.se',
    password: bcrypt.hashSync('tom123', 10),
    role: 'Decorating_Assistant',
    department: 'Production_Department',
    subdepartment: 'Decorations',
  },
  // It
  {
    name: 'Christian',
    email: 'christ@sep.se',
    password: bcrypt.hashSync('christ123', 10),
    role: 'Network_Engineer',
    department: 'Production_Department',
    subdepartment: 'It',
  },
  {
    name: 'Nicolas',
    email: 'nico@sep.se',
    password: bcrypt.hashSync('nico123', 10),
    role: 'Network_Engineer',
    department: 'Production_Department',
    subdepartment: 'It',
  },
  {
    name: 'Michael',
    email: 'mich@sep.se',
    password: bcrypt.hashSync('mich123', 10),
    role: 'Technician',
    department: 'Production_Department',
    subdepartment: 'It',
  },
  {
    name: 'Robert',
    email: 'robert@sep.se',
    password: bcrypt.hashSync('robert123', 10),
    role: 'Technician',
    department: 'Production_Department',
    subdepartment: 'It',
  },
  // serivces department
  // Food
  {
    name: 'Helen',
    email: 'helen@sep.se',
    password: bcrypt.hashSync('helen123', 10),
    role: 'Top_Chef',
    department: 'Services_Department',
    subdepartment: 'Food',
  },
  {
    name: 'Kate',
    email: 'kate@sep.se',
    password: bcrypt.hashSync('kate123', 10),
    role: 'Senior_Waitress',
    department: 'Services_Department',
    subdepartment: 'Catering',
  },
]

export default users
