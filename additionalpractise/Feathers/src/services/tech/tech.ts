// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  techproductsDataValidator,
  techproductsPatchValidator,
  techproductsQueryValidator,
  techproductsResolver,
  techproductsExternalResolver,
  techproductsDataResolver,
  techproductsPatchResolver,
  techproductsQueryResolver
} from './tech.schema'

import type { Application } from '../../declarations'
import { TechproductsService, getOptions } from './tech.class'
import { techproductsPath, techproductsMethods } from './tech.shared'

export * from './tech.class'
export * from './tech.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const techproducts = (app: Application) => {
  // Register our service on the Feathers application
  app.use(techproductsPath, new TechproductsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: techproductsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(techproductsPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(techproductsExternalResolver),
        schemaHooks.resolveResult(techproductsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(techproductsQueryValidator),
        schemaHooks.resolveQuery(techproductsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(techproductsDataValidator),
        schemaHooks.resolveData(techproductsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(techproductsPatchValidator),
        schemaHooks.resolveData(techproductsPatchResolver)
      ],
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
    [techproductsPath]: TechproductsService
  }
}
