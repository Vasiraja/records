import { app } from '../app'

export const ADMINS = [
  {
    email: 'vasiraja@gmail.com',
    password: 'Vasiraja#7',
    firstname: 'Vasiraja',
    age: 28,
    userType: 'admin',
    lastAction: new Date().toISOString(),
    isOnline: false,
    isSuperAdmin: true,
  },
  {
    email: 'admin2@company.com',
    password: 'Admin@123',
    firstname: 'Rahul',
    age: 30,
    userType: 'admin',
    lastAction: new Date().toISOString(),
    isOnline: false,
    isSuperAdmin: true,
  },
  {
    email: 'admin3@company.com',
    password: 'Admin@123',
    firstname: 'Priya',
    age: 27,
    userType: 'admin',
    lastAction: new Date().toISOString(),
    isOnline: false,
    isSuperAdmin: true,
  },
  {
    email: 'admin4@company.com',
    password: 'Admin@123',
    firstname: 'Arjun',
    age: 32,
    userType: 'admin',
    lastAction: new Date().toISOString(),
    isOnline: false,
    isSuperAdmin: true,
  },
  {
    email: 'admin5@company.com',
    password: 'Admin@123',
    firstname: 'Sneha',
    age: 26,
    userType: 'admin',
    lastAction: new Date().toISOString(),
    isOnline: false,
    isSuperAdmin: true,
  }
];

export async function seedAdmins() {
  const users = app.service('users')

  for (const admin of ADMINS) {
    const existing = await users.find({
      query: { email: admin.email }
    })

    if ((existing as any).total > 0) {
      console.log(`${admin.email} already exists`)
      continue
    }

    await users.create(admin)
    console.log(`${admin.email} created`)
  }
}

seedAdmins().then(() => process.exit())