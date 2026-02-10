// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Usersval, UsersvalData, UsersvalPatch, UsersvalQuery } from './users.schema'

export type { Usersval, UsersvalData, UsersvalPatch, UsersvalQuery }

export interface UsersvalParams extends MongoDBAdapterParams<UsersvalQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class UsersvalService<ServiceParams extends Params = UsersvalParams> extends MongoDBService<
  Usersval,
  UsersvalData,
  UsersvalParams, 
  UsersvalPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then(db => db.collection('users'))
  }
}
