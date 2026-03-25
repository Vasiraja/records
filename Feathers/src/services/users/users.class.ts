// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services

import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'
import type { Application } from '../../declarations'
import type { User, UserData, UserPatch, UserQuery } from './users.schema'

export type { User, UserData, UserPatch, UserQuery }

export interface UserParams extends MongoDBAdapterParams<UserQuery> { }

export class UserService<ServiceParams extends Params = UserParams> extends MongoDBService<
  User,
  UserData,
  UserParams,
  UserPatch
> 

{


  async setup(app: Application, path: string) {
    app.service('users').publish('patched', () => {
      return app.channel('everybody')
    })
    app.service('users').publish('removed', () => {
      return app.channel('everybody')
    })
  }
  
} 

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    multi: true,
    Model: app.get('mongodbClient').then(db => db.collection('userdet'))
  }
}