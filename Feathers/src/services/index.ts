import { messages } from './messages/messages'
import { onlineUsers } from './online-users/online-users'
import { loginLogs } from './logs/logs'
import { userdet } from './userdet/userdet'

// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(messages)
  app.configure(onlineUsers)
  app.configure(loginLogs)
  app.configure(userdet)
  // All services will be registered here
}
