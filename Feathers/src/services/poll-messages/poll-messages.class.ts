// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type {
  PollMessages,
  PollMessagesData,
  PollMessagesPatch,
  PollMessagesQuery
} from './poll-messages.schema'

export type { PollMessages, PollMessagesData, PollMessagesPatch, PollMessagesQuery }

export interface PollMessagesParams extends MongoDBAdapterParams<PollMessagesQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class PollMessagesService<ServiceParams extends Params = PollMessagesParams> extends MongoDBService<
  PollMessages,
  PollMessagesData,
  PollMessagesParams,
  PollMessagesPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then(db => db.collection('poll-messages'))
  }
}
