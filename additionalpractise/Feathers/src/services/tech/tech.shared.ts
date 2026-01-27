// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  Techproducts,
  TechproductsData,
  TechproductsPatch,
  TechproductsQuery,
  TechproductsService
} from './tech.class'

export type { Techproducts, TechproductsData, TechproductsPatch, TechproductsQuery }

export type TechproductsClientService = Pick<
  TechproductsService<Params<TechproductsQuery>>,
  (typeof techproductsMethods)[number]
>

export const techproductsPath = '/tech'

export const techproductsMethods: Array<keyof TechproductsService> = [
  'find',
  'get',
  'create',
  'patch',
  'remove'
]

export const techproductsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(techproductsPath, connection.service(techproductsPath), {
    methods: techproductsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [techproductsPath]: TechproductsClientService
  }
}
