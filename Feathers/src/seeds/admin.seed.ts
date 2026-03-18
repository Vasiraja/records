import { app } from '../app'

export async function seedAdmins() {

  const users = app.service('users')

  const admins = [
    {
      email: 'admin1@company.com',
      password: 'Admin@123',
      firstname: 'Vasiraja',
      age: 28,
      userType: 'admin',
      lastAction: new Date().toISOString(),
      isOnline: false
    },
    {
      email: 'admin2@company.com',
      password: 'Admin@123',
      firstname: 'Rahul',
      age: 30,
      userType: 'admin',
      lastAction: new Date().toISOString(),
      isOnline: false
    },
    {
      email: 'admin3@company.com',
      password: 'Admin@123',
      firstname: 'Priya',
      age: 27,
      userType: 'admin',
      lastAction: new Date().toISOString(),
      isOnline: false
    },
    {
      email: 'admin4@company.com',
      password: 'Admin@123',
      firstname: 'Arjun',
      age: 32,
      userType: 'admin',
      lastAction: new Date().toISOString(),
      isOnline: false
    },
    {
      email: 'admin5@company.com',
      password: 'Admin@123',
      firstname: 'Sneha',
      age: 26,
      userType: 'admin',
      lastAction: new Date().toISOString(),
      isOnline: false
    }
  ]

  for (const admin of admins) {

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