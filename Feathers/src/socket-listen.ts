import type { Application } from './declarations'
import { Socket } from 'socket.io'

export const configureSockets = (app: Application) => {

  app.on('login', async (authResult: any, info: any) => {

    const user = authResult.user

    if (!user?._id) return

    const userId = String(user._id)

    await app.service('users').patch(userId, {
      isOnline: true,
      lastAction: new Date().toISOString()
    })

    console.log(`User ${userId} online`)
  })
}

export const configureSocketEvents = (app: Application) => {

  const io = (app as any).io

  if (!io) {
    console.error('Socket.io not ready — make sure configureSocketEvents is called after app.listen()')
    return
  }

  io.on('connection', (socket: Socket) => {

    console.log('Socket connected:', socket.id)

    const connection = (socket as any).feathers

     socket.on('joinPoll', (pollId: string) => {

      if (!connection) {
        console.log('Feathers connection not ready')
        return
      }

      const room = `poll/${pollId}`

      console.log('Joining:', room)

      app.channel(room).join(connection)
    })

     socket.on('leavePoll', (pollId: string) => {

      if (!connection) return

      const room = `poll/${pollId}`

      console.log('Leaving:', room)

      app.channel(room).leave(connection)
    })

     socket.on('userLogout', async (userId: string) => {

      console.log('userLogout received:', userId)

      await app.service('users').patch(userId, {
        isOnline: false,
        lastAction: new Date().toISOString()
      })

      console.log(`User ${userId} offline`)
    })

     socket.on('disconnect', async () => {

      if (!connection?.user?._id) return

      const userId = String(connection.user._id)

      await app.service('users').patch(userId, {
        isOnline: false,
        lastAction: new Date().toISOString()
      })

      console.log(`User ${userId} disconnected → offline`)
    })

  })
}