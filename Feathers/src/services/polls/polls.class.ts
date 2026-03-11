// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Polls, PollsData, PollsPatch, PollsQuery } from './polls.schema'

export type { Polls, PollsData, PollsPatch, PollsQuery }

export interface PollsParams extends MongoDBAdapterParams<PollsQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class PollsService<ServiceParams extends Params = PollsParams> extends MongoDBService<
  Polls,
  PollsData,
  PollsParams,
  PollsPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then(db => db.collection('polls'))
  }
}
