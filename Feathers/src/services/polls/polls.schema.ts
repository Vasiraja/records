// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { PollsService } from './polls.class'

// Main data model schema
export const pollsSchema = Type.Object(
  {
    id: Type.String(),
    question: Type.String(),
    options: Type.Array(
      Type.Object({
        id: Type.String(),
        text: Type.String()
      })
    ),
    createdBy: Type.String(),
    hidden: Type.Boolean({ default: false }),
    isActive: Type.Boolean()
  },

  { $id: 'Polls', additionalProperties: false }
)
export type Polls = Static<typeof pollsSchema>
export const pollsValidator = getValidator(pollsSchema, dataValidator)
export const pollsResolver = resolve<PollsQuery, HookContext<PollsService>>({})

export const pollsExternalResolver = resolve<Polls, HookContext<PollsService>>({})

// Schema for creating new entries
export const pollsDataSchema = Type.Pick(pollsSchema, ['id', 'question', 'options', 'isActive',

  'createdBy', 'hidden'
], {
  $id: 'PollsData'
})
export type PollsData = Static<typeof pollsDataSchema>
export const pollsDataValidator = getValidator(pollsDataSchema, dataValidator)
export const pollsDataResolver = resolve<PollsData, HookContext<PollsService>>({
     isActive: async () => true
  
})

// Schema for updating existing entries
export const pollsPatchSchema = Type.Partial(pollsSchema, {
  $id: 'PollsPatch'
})
export const pollsDataSchemaWithCreatedBy = Type.Intersect([
  pollsDataSchema,
  Type.Object({
    createdBy: Type.Optional(Type.String())
  })
])
export type PollsPatch = Static<typeof pollsPatchSchema>
export const pollsPatchValidator = getValidator(pollsPatchSchema, dataValidator)
export const pollsPatchResolver = resolve<PollsPatch, HookContext<PollsService>>({})

export const pollsQueryProperties = Type.Pick(pollsSchema, ['id', 'question', 'options', 'isActive',

  'createdBy', 'hidden'])
export const pollsQuerySchema = Type.Intersect(
  [
    querySyntax(pollsQueryProperties),
    Type.Object({
      _id: Type.Optional(Type.String())
    }, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type PollsQuery = Static<typeof pollsQuerySchema>
export const pollsQueryValidator = getValidator(pollsQuerySchema, queryValidator)
export const pollsQueryResolver = resolve<PollsQuery, HookContext<PollsService>>({})
