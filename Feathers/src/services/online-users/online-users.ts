// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  onlineUsersDataValidator,
  onlineUsersPatchValidator,
  onlineUsersQueryValidator,
  onlineUsersResolver,
  onlineUsersExternalResolver,
  onlineUsersDataResolver,
  onlineUsersPatchResolver,
  onlineUsersQueryResolver
} from './online-users.schema'

import type { Application } from '../../declarations'
import { OnlineUsersService, getOptions } from './online-users.class'
import { onlineUsersPath, onlineUsersMethods } from './online-users.shared'

export * from './online-users.class'
export * from './online-users.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const onlineUsers = (app: Application) => {
  // Register our service on the Feathers application
  app.use(onlineUsersPath, new OnlineUsersService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: onlineUsersMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(onlineUsersPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(onlineUsersExternalResolver),
        schemaHooks.resolveResult(onlineUsersResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(onlineUsersQueryValidator),
        schemaHooks.resolveQuery(onlineUsersQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(onlineUsersDataValidator),
        schemaHooks.resolveData(onlineUsersDataResolver)
      ],
      patch: [
        schemaHooks.validateData(onlineUsersPatchValidator),
        schemaHooks.resolveData(onlineUsersPatchResolver)
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
    [onlineUsersPath]: OnlineUsersService
  }
}
