// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import { authenticate } from '@feathersjs/authentication'

import {
  votesDataValidator,
  votesPatchValidator,
  votesQueryValidator,
  votesResolver,
  votesExternalResolver,
  votesDataResolver,
  votesPatchResolver,
  votesQueryResolver
} from './votes.schema'

import type { Application } from '../../declarations'
import { VotesService, getOptions } from './votes.class'
import { votesPath, votesMethods } from './votes.shared'

export * from './votes.class'
export * from './votes.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const votes = (app: Application) => {
  // Register our service on the Feathers application
  app.use(votesPath, new VotesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: votesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(votesPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(votesExternalResolver), schemaHooks.resolveResult(votesResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(votesQueryValidator), schemaHooks.resolveQuery(votesQueryResolver), ],


      find: [],
      get: [],
      create: [
        schemaHooks.resolveData(votesDataResolver),

        async (context) => {
          const data = context.data as any
 
          const pollId = data.pollId
          const optionId = data.optionId
          const userId = data.userId;

 
          if (!userId) {
            throw new Error("User not authenticated")
          }


          console.log("Authenticated user:", userId)

           const poll = await context.app.service('polls').get(pollId)

          if (!poll) {
            throw new Error('Poll not found')
          }

          if (!poll.isActive) {
            throw new Error('Poll is closed')
          }

           const optionExists = poll.options.some(
            (opt: any) => opt.id === optionId
          )

          if (!optionExists) {
            throw new Error('Invalid option selected')
          }

           const existingVote: any = await context.app
            .service('votes')
            .find({
              query: {
                pollId: pollId,
                userId: userId
              },
              paginate: false
            })

          if (existingVote.length > 0) {
            throw new Error("User already voted")
          }

           data.userId = userId

          context.data = data

          return context
        }
      ],
      patch: [schemaHooks.validateData(votesPatchValidator), schemaHooks.resolveData(votesPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: { 
      all: []
    }
  })      
   app.service(votesPath).publish('created', (data: any) => {
  console.log("Published vote for", data.pollId)
  return app.channel(`poll/${data.pollId}`)
})
}
   
declare module '../../declarations' {
  interface ServiceTypes {
    [votesPath]: VotesService
  }
}
