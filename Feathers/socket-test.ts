// import { feathers } from '@feathersjs/feathers'
// import socketioClient from '@feathersjs/socketio-client'
// import io from 'socket.io-client'

// const client = feathers()
// const socket = io('http://localhost:3030')

// client.configure(socketioClient(socket))

// socket.on('connect', async () => {
//   console.log("✅ Client connected:", socket.id)

//   const service = client.service('userdet')

//   const users = await service.find()
//   console.log("Find:", users)
//   const created = await service.create({
//     email: "test@gmail.com",
//     password: "123456",
//     firstname: "John",
//     age: 25,
//     userType: "admin"
//   })

//   console.log("Created:", created)

//   const user = await service.get(created._id)
//   console.log("Get:", user)

//   const patched = await service.patch(created._id, {
//     firstname: "Updated John"
//   })
//   console.log("Patched:", patched)

//   const removed = await service.remove(created._id)
//   console.log("Removed:", removed)
// })

// client.service('userdet').on('created', (data: any) => {
//   console.log("📡 Real-time created event:", data)
// })

// socket.on('disconnect', () => {
//   console.log("❌ Client disconnected") 
// })

// console.log("Socket test running...")