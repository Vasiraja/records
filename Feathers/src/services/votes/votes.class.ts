// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Votes, VotesData, VotesPatch, VotesQuery } from './votes.schema'

export type { Votes, VotesData, VotesPatch, VotesQuery }

export interface VotesParams extends MongoDBAdapterParams<VotesQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class VotesService<ServiceParams extends Params = VotesParams> extends MongoDBService<
  Votes,
  VotesData,
  VotesParams,
  VotesPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then(db => db.collection('votes'))
  }
}
