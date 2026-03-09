import type { Application } from './declarations'

const userSocketMap = new Map<string, any>()

export const setupSocketPresence = (app: Application) => {

  app.on('connection', (connection: any) => {
    console.log('Socket connected')
  })

  app.on('login', async (authResult: any, info: any) => {

    const user = authResult.userdet
    if (!user?._id) return

    const userId = String(user._id)

    const connection = info?.connection

     if (connection) {
      connection.user = user
      userSocketMap.set(userId, connection);
      app.channel(`user/${userId}`).join(connection)

      console.log('User attached to socket:', userId)
    }

    await app.service('userdet').patch(userId, {
      isOnline: true,
      lastAction: new Date().toISOString()
    })

    console.log(`User ${userId} online`)
  })

  app.on('logout', async (authResult: any) => {

    const user = authResult.userdet
    if (!user?._id) return

    const userId = String(user._id)

    await app.service('userdet').patch(userId, {
      isOnline: false,
      lastAction: new Date().toISOString()
    })

    console.log(`User ${userId} logged out`)
  })

app.on('disconnect', async (connection: any) => {

  if (!connection?.user?._id) {
    console.log('No user attached to connection')
    return
  }
 
  const userId = String(connection.user._id)

  await app.service('userdet').patch(userId, {
    isOnline: false,
    lastAction: new Date().toISOString()
  })

  console.log(`User ${userId} is offline`)
})
}

export const getUserSocketId = (userId: string) => {
  return userSocketMap.get(userId)
}