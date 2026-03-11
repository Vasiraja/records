// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  pollsDataValidator,
  pollsPatchValidator,
  pollsQueryValidator,
  pollsResolver,
  pollsExternalResolver,
  pollsDataResolver,
  pollsPatchResolver,
  pollsQueryResolver,
  
  
} from './polls.schema'

import type { Application } from '../../declarations'
import { PollsService, getOptions } from './polls.class'
import { pollsPath, pollsMethods } from './polls.shared'

export * from './polls.class'
export * from './polls.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const polls = (app: Application) => {
  // Register our service on the Feathers application
  app.use(pollsPath, new PollsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: pollsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(pollsPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(pollsExternalResolver), schemaHooks.resolveResult(pollsResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(pollsQueryValidator), schemaHooks.resolveQuery(pollsQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.resolveData(pollsDataResolver),schemaHooks.validateData(pollsDataValidator), schemaHooks.resolveData(pollsDataResolver)
         
      ],
      patch: [schemaHooks.validateData(pollsPatchValidator), schemaHooks.resolveData(pollsPatchResolver)],
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
    [pollsPath]: PollsService
  }
}
