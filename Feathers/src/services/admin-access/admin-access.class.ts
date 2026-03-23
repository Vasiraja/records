// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { AdminAccess, AdminAccessData, AdminAccessPatch, AdminAccessQuery } from './admin-access.schema'

export type { AdminAccess, AdminAccessData, AdminAccessPatch, AdminAccessQuery }

export interface AdminAccessParams extends MongoDBAdapterParams<AdminAccessQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class AdminAccessService<ServiceParams extends Params = AdminAccessParams> extends MongoDBService<
  AdminAccess,
  AdminAccessData,
  AdminAccessParams,
  AdminAccessPatch
> {
 
}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then(db => db.collection('admin-access'))
  }
}
