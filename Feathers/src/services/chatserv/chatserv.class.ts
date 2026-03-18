// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Chatserv, ChatservData, ChatservPatch, ChatservQuery } from './chatserv.schema'

export type { Chatserv, ChatservData, ChatservPatch, ChatservQuery }

export interface ChatservParams extends MongoDBAdapterParams<ChatservQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class ChatservService<ServiceParams extends Params = ChatservParams> extends MongoDBService<
  Chatserv,
  ChatservData,
  ChatservParams,
  ChatservPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then(db => db.collection('messages'))
  }
}
