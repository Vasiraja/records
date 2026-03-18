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
} from './messages.schema'

import type { Application } from '../../declarations'
import { MessagesService, getOptions } from './messages.class'
import { messagesPath, messagesMethods } from './messages.shared'

export * from './messages.class'
export * from './messages.schema'

export const messages = (app: Application) => {
  app.use(messagesPath, new MessagesService(getOptions(app)), {
    methods: messagesMethods,

    events: ['created']
  })
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
        schemaHooks.resolveQuery(messagesQueryResolver),


      ],
      find: [],
      get: [
        async () => {
          console.log("")
        }
      ],
      create: [
        schemaHooks.validateData(messagesDataValidator),
        schemaHooks.resolveData(messagesDataResolver),
        async (context) => {
          console.log("✅ create reached")

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


  app.service(messagesPath).publish((data: any, context: any) => {

    if (context.event !== 'created') return [];

    console.log(" publish triggered");

    const senderId = data.senderId.toString();
    const receiverId = data.receiverId.toString();

    console.log("Channels exist?",
      app.channel(`msg/${senderId}`).connections.length,
      app.channel(`msg/${receiverId}`).connections.length
    );

    return [
      app.channel(`msg/${senderId}`),
      app.channel(`msg/${receiverId}`)
    ];
  });


}

declare module '../../declarations' {
  interface ServiceTypes {
    [messagesPath]: MessagesService
  }
}
