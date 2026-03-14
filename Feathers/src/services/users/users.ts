// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  userDataValidator,
  userPatchValidator,
  userQueryValidator,
  userResolver,
  userExternalResolver,
  userDataResolver,
  userPatchResolver,
  userQueryResolver
} from './users.schema'

import type { Application } from '../../declarations'
import { UserService, getOptions } from './users.class'
import { userPath, userMethods } from './users.shared'

export * from './users.class'
export * from './users.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const user = (app: Application) => {

  // Register service
  app.use(userPath, new UserService(getOptions(app)), {
    methods: userMethods,
    events: []
  })

  // Hooks
  app.service(userPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(userExternalResolver),
        schemaHooks.resolveResult(userResolver)
      ],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    },

    before: {
      all: [
        schemaHooks.validateQuery(userQueryValidator),
        schemaHooks.resolveQuery(userQueryResolver),

        async (context) => {
          console.log("Service:", context.service)
          console.log("Method:", context.method)
          console.log("App:", context.app)
          console.log("Type:", context.type)
          console.log("Status Code:", context.statusCode)
          console.log("ID:", context.id)
          console.log("Error:", context.error)
          console.log("Result:", context.result)
          console.log("Query:", context.params.query)

          return context
        }
      ],

      find: [],
      get: [],

      create: [
        schemaHooks.validateData(userDataValidator),
        schemaHooks.resolveData(userDataResolver),

        async (context) => {
          console.log("Incoming Data:", context.data)
          console.log("Status before:", context.statusCode)

          context.statusCode = 201

          console.log("Status after:", context.statusCode)

          return context
        }
      ],

      patch: [
        schemaHooks.validateData(userPatchValidator),
        schemaHooks.resolveData(userPatchResolver)
      ],

      remove: []
    },

    after: {
      all: [
        async (context) => {
          console.log("Service:", context.service)
          console.log("Method:", context.method)
          console.log("App:", context.app)
          console.log("Type:", context.type)
          console.log("Status Code:", context.statusCode)
          console.log("ID:", context.id)
          console.log("Error:", context.error)
          console.log("Result:", context.result)
          console.log("Data:", context.data)
          console.log("Params:", context.params)

          return context
        }
      ]
    },

    error: {
      all: []
    }
  })

  // Real-time event
  app.service(userPath).publish('patched', (data: any) => {
    return app.channel('anonymous')
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [userPath]: UserService
  }
}