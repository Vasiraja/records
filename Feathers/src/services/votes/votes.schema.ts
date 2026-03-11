// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { VotesService } from './votes.class'

// Main data model schema
export const votesSchema = Type.Object(
  {
    id: Type.Number(),
    pollId: Type.String(),
    userId: Type.String(),
    optionId: Type.String(),
    createdAt: Type.Number()
  },
  { $id: 'Votes', additionalProperties: false }
)
export type Votes = Static<typeof votesSchema>
export const votesValidator = getValidator(votesSchema, dataValidator)
export const votesResolver = resolve<VotesQuery, HookContext<VotesService>>({})

export const votesExternalResolver = resolve<Votes, HookContext<VotesService>>({})

// Schema for creating new entries
export const votesDataSchema = Type.Pick(votesSchema, ['id', 'pollId', 'optionId', 'createdAt'], {
  $id: 'VotesData'
})
export type VotesData = Static<typeof votesDataSchema>
export const votesDataValidator = getValidator(votesDataSchema, dataValidator)
export const votesDataResolver = resolve<VotesData, HookContext<VotesService>>({
  properties: {
    createdAt: async () => Date.now()
  }
})

// Schema for updating existing entries
export const votesPatchSchema = Type.Partial(votesSchema, {
  $id: 'VotesPatch'
})
export type VotesPatch = Static<typeof votesPatchSchema>
export const votesPatchValidator = getValidator(votesPatchSchema, dataValidator)
export const votesPatchResolver = resolve<VotesPatch, HookContext<VotesService>>({})

// Schema for allowed query properties
export const votesQueryProperties = Type.Pick(votesSchema, ['id', 'pollId','userId'])
export const votesQuerySchema = Type.Intersect(
  [
    querySyntax(votesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type VotesQuery = Static<typeof votesQuerySchema>
export const votesQueryValidator = getValidator(votesQuerySchema, queryValidator)
export const votesQueryResolver = resolve<VotesQuery, HookContext<VotesService>>({})
