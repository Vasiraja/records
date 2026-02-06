// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  Firstserve,
  FirstserveData,
  FirstservePatch,
  FirstserveQuery,
  FirstserveService
} from './getapp.class'

export type { Firstserve, FirstserveData, FirstservePatch, FirstserveQuery }

export type FirstserveClientService = Pick<
  FirstserveService<Params<FirstserveQuery>>,
  (typeof firstserveMethods)[number]
>

export const firstservePath = '/getapp'

export const firstserveMethods: Array<keyof FirstserveService> = ['find', 'get', 'create', 'patch', 'remove']

export const firstserveClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(firstservePath, connection.service(firstservePath), {
    methods: firstserveMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [firstservePath]: FirstserveClientService
  }
}
