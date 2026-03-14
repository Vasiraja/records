 
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { User, UserData, UserPatch, UserQuery, UserService } from './users.class'

export type { User, UserData, UserPatch, UserQuery }

// Client service type
export type UserClientService = Pick<
  UserService<Params<UserQuery>>,
  (typeof userMethods)[number]
>

// Service path
export const userPath = 'users'

// Allowed service methods
export const userMethods: Array<keyof UserService> = [
  'find',
  'get',
  'create',
  'patch',
  'remove'
]

// Register service on client
export const userClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(userPath, connection.service(userPath), {
    methods: userMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [userPath]: UserClientService
  }
}