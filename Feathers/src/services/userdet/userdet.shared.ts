// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Userdet, UserdetData, UserdetPatch, UserdetQuery, UserdetService } from './userdet.class'

export type { Userdet, UserdetData, UserdetPatch, UserdetQuery }

export type UserdetClientService = Pick<UserdetService<Params<UserdetQuery>>, (typeof userdetMethods)[number]>

export const userdetPath = 'userdet'

export const userdetMethods: Array<keyof UserdetService> = ['find', 'get', 'create', 'patch', 'remove']

export const userdetClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(userdetPath, connection.service(userdetPath), {
    methods: userdetMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [userdetPath]: UserdetClientService
  }
}
