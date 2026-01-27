// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { NullableId, Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Techproducts, TechproductsData, TechproductsPatch, TechproductsQuery } from './tech.schema'

export type { Techproducts, TechproductsData, TechproductsPatch, TechproductsQuery }

export interface TechproductsParams extends MongoDBAdapterParams<TechproductsQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export  class  TechproductsService<ServiceParams extends Params = TechproductsParams> extends MongoDBService<
  Techproducts,
  TechproductsData,
  TechproductsParams,
  TechproductsPatch
> {

  //   async create(data: TechproductsData, params: ServiceParams) {
  //    if (!data.name) throw new Error('Techproducts name is required');
  //   return super.create(data, params);
  // }
   async create(data: Techproducts, params?: ServiceParams): Promise<Techproducts>;
  // Overload for array
  async create(data: Techproducts[], params?: ServiceParams): Promise<Techproducts[]>;
  // Implementation
  async create(
    data: Techproducts | Techproducts[],
    params?: ServiceParams
  ): Promise<Techproducts | Techproducts[]> {
    if (Array.isArray(data)) {
      // Add createdAt to each item
      const processed = data.map(item => ({ ...item, createdAt: new Date() }));
      return super.create(processed as Techproducts[], params);
    } 
    else {
      // data.createdAt = new Date();
      if (!data.name) throw new Error('Name required');  
      return super.create(data, params);
    }
  }

 
}


export const getOptions = (app: Application): MongoDBAdapterOptions => {
  
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then(db => db.collection('tech'))

  }
  
}
 