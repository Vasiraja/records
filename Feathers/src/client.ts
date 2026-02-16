// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { userdetClient } from './services/userdet/userdet.shared'
export type { Userdet, UserdetData, UserdetQuery, UserdetPatch } from './services/userdet/userdet.shared'

import { userClient } from './services/users/users.shared'
export type { User, UserData, UserQuery, UserPatch } from './services/users/users.shared'

import { userClient } from './services/users/users.shared'
export type { User, UserData, UserQuery, UserPatch } from './services/users/users.shared'

import { authenticationClient } from './services/authentication/authentication.shared'
export type {
  Authentication,
  AuthenticationData,
  AuthenticationQuery,
  AuthenticationPatch
} from './services/authentication/authentication.shared'

import { userdetClient } from './services/userdet/userdet.shared'
export type { Userdet, UserdetData, UserdetQuery, UserdetPatch } from './services/userdet/userdet.shared'

import { userdetailsClient } from './services/userdet/userdet.shared'
export type {
  Userdetails,
  UserdetailsData,
  UserdetailsQuery,
  UserdetailsPatch
} from './services/userdet/userdet.shared'

export interface Configuration {
  connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the feathersaddon app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any,>(
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
  const client: ClientApplication = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(userdetailsClient)
  client.configure(userdetClient)
  client.configure(authenticationClient)
  client.configure(userClient)
  client.configure(userClient)
  client.configure(userdetClient)
  return client
}
