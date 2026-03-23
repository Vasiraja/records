// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  adminAccessDataValidator,
  adminAccessPatchValidator,
  adminAccessQueryValidator,
  adminAccessResolver,
  adminAccessExternalResolver,
  adminAccessDataResolver,
  adminAccessPatchResolver,
  adminAccessQueryResolver
} from './admin-access.schema'

import type { Application } from '../../declarations'
import { AdminAccessService, getOptions } from './admin-access.class'
import { adminAccessPath, adminAccessMethods } from './admin-access.shared'

export * from './admin-access.class'
export * from './admin-access.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const adminAccess = (app: Application) => {
  // Register our service on the Feathers application
  app.use(adminAccessPath, new AdminAccessService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: adminAccessMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(adminAccessPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(adminAccessExternalResolver),
        schemaHooks.resolveResult(adminAccessResolver),
        
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(adminAccessQueryValidator),
        schemaHooks.resolveQuery(adminAccessQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(adminAccessDataValidator),
        schemaHooks.resolveData(adminAccessDataResolver)
      ],
      patch: [
        schemaHooks.validateData(adminAccessPatchValidator),
        schemaHooks.resolveData(adminAccessPatchResolver)
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
    [adminAccessPath]: AdminAccessService
  }
}
