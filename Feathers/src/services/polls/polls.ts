
import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  pollsDataValidator,
  pollsPatchValidator,
  pollsQueryValidator,
  pollsResolver,
  pollsExternalResolver,
  pollsDataResolver,
  pollsPatchResolver,
  pollsQueryResolver
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
    methods: pollsMethods,
    events: []
  })

  // Poll expiry checker
  setInterval(async () => {
    try {
      const now = new Date().toISOString()

      const result = await app.service(pollsPath).find({
        paginate: false,
        query: {
          isActive: true,
          expiresAt: {
            $lt: now
          }
        }
      })

      const expiredPolls = Array.isArray(result) ? result : []

      for (const poll of expiredPolls) {
        await app.service(pollsPath).patch((poll as any)._id, {
          isActive: false
        })
      }
    } catch (error) {
      console.error('Poll expiry checker error:', error)
    }
  }, 1000)

  // Initialize hooks
  app.service(pollsPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(pollsExternalResolver),
        schemaHooks.resolveResult(pollsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(pollsQueryValidator),
        schemaHooks.resolveQuery(pollsQueryResolver)
      ],

      find: [
        async (context: any) => {
          const usertype = context.params.headers?.usertype

          if (usertype !== 'admin') {
            context.params.query.hidden = false
          }

          return context
        }
      ],

      get: [],

      create: [
        schemaHooks.validateData(pollsDataValidator),

        schemaHooks.resolveData(pollsDataResolver),

        async (context: any) => {
          console.log('Creating poll:')
          console.log(context.data)
          console.log('createdBy:', context.data.createdBy)
          return context
        }
      ],

      patch: [
        schemaHooks.validateData(pollsPatchValidator),
        schemaHooks.resolveData(pollsPatchResolver),

        async (context: any) => {
          if (!context.params.provider) return context;

          const userId = context.params.headers?.userid
          const poll = await context.service._get(context.id)

          if (String(poll.createdBy) !== String(userId)) {
            throw new Error('Not authorized')
          }

          return context
        }
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
    [pollsPath]: PollsService
  }
}