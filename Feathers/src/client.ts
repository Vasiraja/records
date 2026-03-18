// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { chatservClient } from './services/chatserv/chatserv.shared'
export type {
  Chatserv,
  ChatservData,
  ChatservQuery,
  ChatservPatch
} from './services/chatserv/chatserv.shared'

import { pollMessagesClient } from './services/poll-messages/poll-messages.shared'
export type {
  PollMessages,
  PollMessagesData,
  PollMessagesQuery,
  PollMessagesPatch
} from './services/poll-messages/poll-messages.shared'

import { votesClient } from './services/votes/votes.shared'
export type { Votes, VotesData, VotesQuery, VotesPatch } from './services/votes/votes.shared'

import { pollsClient } from './services/polls/polls.shared'
export type { Polls, PollsData, PollsQuery, PollsPatch } from './services/polls/polls.shared'

import { messagesClient } from './services/messages/messages.shared'
export type {
  Messages,
  MessagesData,
  MessagesQuery,
  MessagesPatch
} from './services/messages/messages.shared'

import { onlineUsersClient } from './services/online-users/online-users.shared'
export type {
  OnlineUsers,
  OnlineUsersData,
  OnlineUsersQuery,
  OnlineUsersPatch
} from './services/online-users/online-users.shared'

import { loginLogsClient } from './services/logs/logs.shared'
export type { LoginLogs, LoginLogsData, LoginLogsQuery, LoginLogsPatch } from './services/logs/logs.shared'

export interface Configuration {
  connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the feathersaddon app.
 */
export const createClient = (
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
  const client: ClientApplication = feathers()

  client.configure(connection)

  // Authentication plugin
  client.configure(authClient(authenticationOptions))

  client.set('connection', connection)

  // Register services
  client.configure(loginLogsClient)
  client.configure(onlineUsersClient)

  client.configure(messagesClient)
  client.configure(pollsClient)
  client.configure(votesClient)
  client.configure(pollMessagesClient)
  client.configure(chatservClient)
  return client
}
