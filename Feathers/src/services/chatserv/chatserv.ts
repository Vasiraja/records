// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  chatservDataValidator,
  chatservPatchValidator,
  chatservQueryValidator,
  chatservResolver,
  chatservExternalResolver,
  chatservDataResolver,
  chatservPatchResolver,
  chatservQueryResolver
} from './chatserv.schema'

import type { Application } from '../../declarations'
import { ChatservService, getOptions } from './chatserv.class'
import { chatservPath, chatservMethods } from './chatserv.shared'

export * from './chatserv.class'
export * from './chatserv.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const chatserv = (app: Application) => {
  // Register our service on the Feathers application
  app.use(chatservPath, new ChatservService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: chatservMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(chatservPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(chatservExternalResolver),
        schemaHooks.resolveResult(chatservResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(chatservQueryValidator),
        schemaHooks.resolveQuery(chatservQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(chatservDataValidator),
        schemaHooks.resolveData(chatservDataResolver),
        async (context) => {
          console.log(" create reached")

          console.log("----90");
          console.log("here trigger")
          console.log("provider:", context.params.provider)

          console.log(context)

          console.log(context)
          if (!context.data) return context

          // context.data.createdAt = new Date().toISOString()
          // context.data.isSeen = false

          return context
        },
      ],
      patch: [
        schemaHooks.validateData(chatservPatchValidator),
        schemaHooks.resolveData(chatservPatchResolver)
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

  app.service(chatservPath).publish((data: any, context: any) => {
    console.log(' PUBLISH FIRED', context.method, context.event)

    const senderId = data.senderId?.toString()
    const receiverId = data.receiverId?.toString()

    const senderCh = app.channel(`msg/${senderId}`)
    const receiverCh = app.channel(`msg/${receiverId}`)

    console.log('sender connections:', senderCh.connections.length)   // if 0, joinMsgRoom never ran
    console.log('receiver connections:', receiverCh.connections.length)

    return [senderCh, receiverCh]
  })

}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [chatservPath]: ChatservService
  }
}
