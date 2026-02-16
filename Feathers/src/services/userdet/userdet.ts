// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
 import { hooks as schemaHooks } from '@feathersjs/schema'
 
import {
  userdetDataValidator,
  userdetPatchValidator,
  userdetQueryValidator,
  userdetResolver,
  userdetExternalResolver,
  userdetDataResolver,
  userdetPatchResolver,
  userdetQueryResolver
} from './userdet.schema'
// import userdetHook from './userdet.hook'

import type { Application } from '../../declarations'
import { UserdetService, getOptions } from './userdet.class'
import { userdetPath, userdetMethods } from './userdet.shared'
 
export * from './userdet.class'
export * from './userdet.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const userdet = (app: Application) => {
 
  // Register our service on the Feathers application
  app.use(userdetPath, new UserdetService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: userdetMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(userdetPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(userdetExternalResolver), schemaHooks.resolveResult(userdetResolver)],
      find: [ ],
      get: [authenticate('jwt')],
      create: [],
      update: [authenticate('jwt')],
      patch: [authenticate('jwt')],
      remove: [authenticate('jwt')]
    },
    before: {
      all: [schemaHooks.validateQuery(userdetQueryValidator), schemaHooks.resolveQuery(userdetQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(userdetDataValidator), schemaHooks.resolveData(userdetDataResolver)],
      patch: [schemaHooks.validateData(userdetPatchValidator), schemaHooks.resolveData(userdetPatchResolver)],
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
    [userdetPath]: UserdetService
  }
}
