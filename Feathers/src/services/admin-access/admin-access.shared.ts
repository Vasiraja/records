// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  AdminAccess,
  AdminAccessData,
  AdminAccessPatch,
  AdminAccessQuery,
  AdminAccessService
} from './admin-access.class'

export type { AdminAccess, AdminAccessData, AdminAccessPatch, AdminAccessQuery }

export type AdminAccessClientService = Pick<
  AdminAccessService<Params<AdminAccessQuery>>,
  (typeof adminAccessMethods)[number]
>

export const adminAccessPath = 'admin-access'

export const adminAccessMethods: Array<keyof AdminAccessService> = [
  'find',
  'get',
  'create',
  'patch',
  'remove'
]

export const adminAccessClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(adminAccessPath, connection.service(adminAccessPath), {
    methods: adminAccessMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [adminAccessPath]: AdminAccessClientService
  }
}
