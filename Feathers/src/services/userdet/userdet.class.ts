// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Userdet, UserdetData, UserdetPatch, UserdetQuery } from './userdet.schema'
export type { Userdet, UserdetData, UserdetPatch, UserdetQuery }

export interface UserdetParams extends MongoDBAdapterParams<UserdetQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class UserdetService<ServiceParams extends Params = UserdetParams> extends MongoDBService<
  Userdet,
  UserdetData,
  UserdetParams,
  UserdetPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then(db => db.collection('userdet'))
  }
}
