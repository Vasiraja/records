// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { OnlineUsers, OnlineUsersData, OnlineUsersPatch, OnlineUsersQuery } from './online-users.schema'

export type { OnlineUsers, OnlineUsersData, OnlineUsersPatch, OnlineUsersQuery }

export interface OnlineUsersParams extends MongoDBAdapterParams<OnlineUsersQuery> {}
export interface OnlineSchema{
    userId:string
    firstname:string
    connecteAt:string
  }

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class OnlineUsersService<ServiceParams extends Params = OnlineUsersParams> extends MongoDBService<
  OnlineUsers,
  OnlineUsersData,
  OnlineUsersParams,
  OnlineUsersPatch
> {
  
   


}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then(db => db.collection('online-users'))
  }
}
