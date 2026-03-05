// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { onlineUsersClient } from './services/online-users/online-users.shared'
export type {
  OnlineUsers,
  OnlineUsersData,
  OnlineUsersQuery,
  OnlineUsersPatch
} from './services/online-users/online-users.shared'

import { loginLogsClient } from './services/logs/logs.shared'
export type {
  LoginLogs,
  LoginLogsData,
  LoginLogsQuery,
  LoginLogsPatch
} from './services/logs/logs.shared'

import { userdetClient } from './services/userdet/userdet.shared'
export type {
  Userdet,
  UserdetData,
  UserdetQuery,
  UserdetPatch
} from './services/userdet/userdet.shared'

  
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
   client.configure(userdetClient)
  client.configure(loginLogsClient)
  client.configure(onlineUsersClient)

  return client
}