// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Chatserv, ChatservData, ChatservPatch, ChatservQuery, ChatservService } from './chatserv.class'

export type { Chatserv, ChatservData, ChatservPatch, ChatservQuery }

export type ChatservClientService = Pick<
  ChatservService<Params<ChatservQuery>>,
  (typeof chatservMethods)[number]
>

export const chatservPath = 'chatserv'

export const chatservMethods: Array<keyof ChatservService> = ['find', 'get', 'create', 'patch', 'remove']

export const chatservClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(chatservPath, connection.service(chatservPath), {
    methods: chatservMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [chatservPath]: ChatservClientService
  }
}
