// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  PollMessages,
  PollMessagesData,
  PollMessagesPatch,
  PollMessagesQuery,
  PollMessagesService
} from './poll-messages.class'

export type { PollMessages, PollMessagesData, PollMessagesPatch, PollMessagesQuery }

export type PollMessagesClientService = Pick<
  PollMessagesService<Params<PollMessagesQuery>>,
  (typeof pollMessagesMethods)[number]
>

export const pollMessagesPath = 'poll-messages'

export const pollMessagesMethods: Array<keyof PollMessagesService> = [
  'find',
  'get',
  'create',
  'patch',
  'remove'
]

export const pollMessagesClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(pollMessagesPath, connection.service(pollMessagesPath), {
    methods: pollMessagesMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [pollMessagesPath]: PollMessagesClientService
  }
}
