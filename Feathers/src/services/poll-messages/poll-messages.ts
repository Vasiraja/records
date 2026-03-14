// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  pollMessagesDataValidator,
  pollMessagesPatchValidator,
  pollMessagesQueryValidator,
  pollMessagesResolver,
  pollMessagesExternalResolver,
  pollMessagesDataResolver,
  pollMessagesPatchResolver,
  pollMessagesQueryResolver
} from './poll-messages.schema'

import type { Application } from '../../declarations'
import { PollMessagesService, getOptions } from './poll-messages.class'
import { pollMessagesPath, pollMessagesMethods } from './poll-messages.shared'

export * from './poll-messages.class'
export * from './poll-messages.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const pollMessages = (app: Application) => {
  // Register our service on the Feathers application
  app.use(pollMessagesPath, new PollMessagesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: pollMessagesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(pollMessagesPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(pollMessagesExternalResolver),
        schemaHooks.resolveResult(pollMessagesResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(pollMessagesQueryValidator),
        schemaHooks.resolveQuery(pollMessagesQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(pollMessagesDataValidator),
        schemaHooks.resolveData(pollMessagesDataResolver)
      ],
      patch: [
        schemaHooks.validateData(pollMessagesPatchValidator),
        schemaHooks.resolveData(pollMessagesPatchResolver)
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


  
 app.service(pollMessagesPath).publish('created', (data: any) => {
  console.log("PUBLISH TRIGGERED", data)

    const pollRoom = `poll/${data.pollId}`
 
    return app.channel(pollRoom)

  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [pollMessagesPath]: PollMessagesService
  }
}
