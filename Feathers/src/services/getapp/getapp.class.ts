// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Firstserve, FirstserveData, FirstservePatch, FirstserveQuery } from './getapp.schema'

export type { Firstserve, FirstserveData, FirstservePatch, FirstserveQuery }

export interface FirstserveParams extends MongoDBAdapterParams<FirstserveQuery> {}

 export class FirstserveService<ServiceParams extends Params = FirstserveParams> extends MongoDBService<
  Firstserve,
  FirstserveData,
  FirstserveParams,
  FirstservePatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then(db => db.collection('getapp'))
     
  }
}


