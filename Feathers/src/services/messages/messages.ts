// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { resolveData, hooks as schemaHooks } from '@feathersjs/schema'

import {
  messagesDataValidator,
  messagesPatchValidator,
  messagesQueryValidator,
  messagesResolver,
  messagesExternalResolver,
  messagesDataResolver,
  messagesPatchResolver,
  messagesQueryResolver,
  messageDataResolv
} from './messages.schema'

import type { Application } from '../../declarations'
import { MessagesService, getOptions } from './messages.class'
import { messagesPath, messagesMethods } from './messages.shared'

export * from './messages.class'
export * from './messages.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const messages = (app: Application) => {
  // Register our service on the Feathers application
  app.use(messagesPath, new MessagesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: messagesMethods,

    events: ['created']
  })
  // Initialize hooks
  app.service(messagesPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(messagesExternalResolver),
        schemaHooks.resolveResult(messagesResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(messagesQueryValidator),
        schemaHooks.resolveQuery(messagesQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(messagesDataValidator),
        schemaHooks.resolveData(messagesDataResolver),
        resolveData(messageDataResolv as any),
        //         async (context) => {
        //           console.log("----90")
        // console.log(context)
        //           if (!context.data) return context

        //           // context.data.createdAt = new Date().toISOString()
        //           // context.data.isSeen = false

        //           return context
        //         },
      ],
      patch: [
        schemaHooks.validateData(messagesPatchValidator),
        schemaHooks.resolveData(messagesPatchResolver)
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
 app.use(messagesPath, new MessagesService(getOptions(app)), {
  methods: messagesMethods,
  events: ['created']
})
}
  
// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [messagesPath]: MessagesService
  }
}
