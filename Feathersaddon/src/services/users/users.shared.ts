// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Usersval, UsersvalData, UsersvalPatch, UsersvalQuery, UsersvalService } from './users.class'

export type { Usersval, UsersvalData, UsersvalPatch, UsersvalQuery }

export type UsersvalClientService = Pick<
  UsersvalService<Params<UsersvalQuery>>,
  (typeof usersvalMethods)[number]
>

export const usersvalPath = 'users'

export const usersvalMethods: Array<keyof UsersvalService> = ['find', 'get', 'create', 'patch', 'remove']

export const usersvalClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(usersvalPath, connection.service(usersvalPath), {
    methods: usersvalMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [usersvalPath]: UsersvalClientService
  }
}
