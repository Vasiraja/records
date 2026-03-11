// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Votes, VotesData, VotesPatch, VotesQuery, VotesService } from './votes.class'

export type { Votes, VotesData, VotesPatch, VotesQuery }

export type VotesClientService = Pick<VotesService<Params<VotesQuery>>, (typeof votesMethods)[number]>

export const votesPath = 'votes'

export const votesMethods: Array<keyof VotesService> = ['find', 'get', 'create', 'patch', 'remove']

export const votesClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(votesPath, connection.service(votesPath), {
    methods: votesMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [votesPath]: VotesClientService
  }
}
