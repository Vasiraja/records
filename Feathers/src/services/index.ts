import { chatserv } from './chatserv/chatserv'
import { pollMessages } from './poll-messages/poll-messages'
import { votes } from './votes/votes'
import { polls } from './polls/polls'
import { messages } from './messages/messages'
import { onlineUsers } from './online-users/online-users'
import { loginLogs } from './logs/logs'

// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'
import { user } from './users/users'

export const services = (app: Application) => {
  app.configure(chatserv)
  app.configure(pollMessages)
  app.configure(votes)
  app.configure(polls)
  app.configure(messages)
  app.configure(onlineUsers)
  app.configure(loginLogs)
  app.configure(user)
  // All services will be registered here
}
