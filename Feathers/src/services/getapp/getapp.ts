// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
// import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  firstserveDataValidator,
  firstservePatchValidator,
  firstserveQueryValidator,
  firstserveResolver,
  firstserveExternalResolver,
  firstserveDataResolver,
  firstservePatchResolver,
  firstserveQueryResolver
} from './getapp.schema'

import type { Application } from '../../declarations'
import { FirstserveService, getOptions } from './getapp.class'
import { firstservePath, firstserveMethods } from './getapp.shared'

export * from './getapp.class'
export * from './getapp.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const firstserve = (app: Application) => {
  // Register our service on the Feathers application
  app.use(firstservePath, new FirstserveService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: firstserveMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(firstservePath).hooks({
    around: {
      all: [
        // authenticate('jwt'),
        schemaHooks.resolveExternal(firstserveExternalResolver),
        schemaHooks.resolveResult(firstserveResolver)
      ]
    }, 
    before: {
      all: [
        schemaHooks.validateQuery(firstserveQueryValidator),
        schemaHooks.resolveQuery(firstserveQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(firstserveDataValidator),
        schemaHooks.resolveData(firstserveDataResolver)
      ],
      patch: [
        schemaHooks.validateData(firstservePatchValidator),
        schemaHooks.resolveData(firstservePatchResolver)
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
    [firstservePath]: FirstserveService
  }
}
