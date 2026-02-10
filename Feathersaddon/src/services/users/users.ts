// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  usersvalDataValidator,
  usersvalPatchValidator,
  usersvalQueryValidator,
  usersvalResolver,
  usersvalExternalResolver,
  usersvalDataResolver,
  usersvalPatchResolver,
  usersvalQueryResolver
} from './users.schema'

import type { Application } from '../../declarations'
import { UsersvalService, getOptions } from './users.class'
import { usersvalPath, usersvalMethods } from './users.shared'

export * from './users.class'
export * from './users.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const usersval = (app: Application) => {
  // Register our service on the Feathers application
  app.use(usersvalPath, new UsersvalService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: usersvalMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(usersvalPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(usersvalExternalResolver),
        schemaHooks.resolveResult(usersvalResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(usersvalQueryValidator),
        schemaHooks.resolveQuery(usersvalQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(usersvalDataValidator),
        schemaHooks.resolveData(usersvalDataResolver)
      ],
      patch: [
        schemaHooks.validateData(usersvalPatchValidator),
        schemaHooks.resolveData(usersvalPatchResolver)
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
    [usersvalPath]: UsersvalService
  }
}
