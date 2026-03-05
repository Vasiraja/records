// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  OnlineUsers,
  OnlineUsersData,
  OnlineUsersPatch,
  OnlineUsersQuery,
  OnlineUsersService
} from './online-users.class'

export type { OnlineUsers, OnlineUsersData, OnlineUsersPatch, OnlineUsersQuery }

export type OnlineUsersClientService = Pick<
  OnlineUsersService<Params<OnlineUsersQuery>>,
  (typeof onlineUsersMethods)[number]
>  

export const onlineUsersPath = 'online-users'

export const onlineUsersMethods: Array<keyof OnlineUsersService> = [
  'find',
  'get',
  'create',
  'patch',
  'remove'
]

export const onlineUsersClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(onlineUsersPath, connection.service(onlineUsersPath), {
    methods: onlineUsersMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [onlineUsersPath]: OnlineUsersClientService
  }
}
