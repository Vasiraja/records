// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  stocksDataValidator,
  stocksPatchValidator,
  stocksQueryValidator,
  stocksResolver,
  stocksExternalResolver,
  stocksDataResolver,
  stocksPatchResolver,
  stocksQueryResolver
} from './stock.schema'

import type { Application } from '../../declarations'
import { StocksService, getOptions } from './stock.class'
import { stocksPath, stocksMethods } from './stock.shared'

export * from './stock.class'
export * from './stock.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const stocks = (app: Application) => {
  // Register our service on the Feathers application
  app.use(stocksPath, new StocksService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: stocksMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(stocksPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(stocksExternalResolver), schemaHooks.resolveResult(stocksResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(stocksQueryValidator), schemaHooks.resolveQuery(stocksQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(stocksDataValidator), schemaHooks.resolveData(stocksDataResolver)],
      patch: [schemaHooks.validateData(stocksPatchValidator), schemaHooks.resolveData(stocksPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [stocksPath]: StocksService
  }
}
