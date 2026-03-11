// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Polls, PollsData, PollsPatch, PollsQuery, PollsService } from './polls.class'

export type { Polls, PollsData, PollsPatch, PollsQuery }

export type PollsClientService = Pick<PollsService<Params<PollsQuery>>, (typeof pollsMethods)[number]>

export const pollsPath = 'polls'

export const pollsMethods: Array<keyof PollsService> = ['find', 'get', 'create', 'patch', 'remove']

export const pollsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(pollsPath, connection.service(pollsPath), {
    methods: pollsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [pollsPath]: PollsClientService
  }
}
