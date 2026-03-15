// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { PollMessagesService } from './poll-messages.class'

// Main data model schema
export const pollMessagesSchema = Type.Object(
  {
    _id: Type.Optional(Type.String()),
    pollId:Type.String(),
    userId: Type.String() ,
    message:Type.String(),
    createdAt:Type.Optional(Type.String())
  },
  { $id: 'PollMessages', additionalProperties: false }
)
export type PollMessages = Static<typeof pollMessagesSchema>
export const pollMessagesValidator = getValidator(pollMessagesSchema, dataValidator)
export const pollMessagesResolver = resolve<PollMessagesQuery, HookContext<PollMessagesService>>({
    properties:{
    createdAt:async()=>new Date().toISOString(),
   }
})

export const pollMessagesExternalResolver = resolve<PollMessages, HookContext<PollMessagesService>>({})

// Schema for creating new entries
export const pollMessagesDataSchema = Type.Pick(pollMessagesSchema, ['_id','pollId','userId','message','createdAt'], {
  $id: 'PollMessagesData'
})
export type PollMessagesData = Static<typeof pollMessagesDataSchema>
export const pollMessagesDataValidator = getValidator(pollMessagesDataSchema, dataValidator)
export const pollMessagesDataResolver = resolve<PollMessagesData, HookContext<PollMessagesService>>({
  createdAt: async () => new Date().toISOString()
})

// Schema for updating existing entries
export const pollMessagesPatchSchema = Type.Partial(pollMessagesSchema, {
  $id: 'PollMessagesPatch'
})
export type PollMessagesPatch = Static<typeof pollMessagesPatchSchema>
export const pollMessagesPatchValidator = getValidator(pollMessagesPatchSchema, dataValidator)
export const pollMessagesPatchResolver = resolve<PollMessagesPatch, HookContext<PollMessagesService>>({})

// Schema for allowed query properties
export const pollMessagesQueryProperties = Type.Pick(pollMessagesSchema, ['_id','pollId','userId','message','createdAt'])
export const pollMessagesQuerySchema = Type.Intersect(
  [
    querySyntax(pollMessagesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type PollMessagesQuery = Static<typeof pollMessagesQuerySchema>
export const pollMessagesQueryValidator = getValidator(pollMessagesQuerySchema, queryValidator)
export const pollMessagesQueryResolver = resolve<PollMessagesQuery, HookContext<PollMessagesService>>({})
