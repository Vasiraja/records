// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { UsersvalService } from './users.class'

// Main data model schema
export const usersvalSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'Usersval', additionalProperties: false }
)
export type Usersval = Static<typeof usersvalSchema>
export const usersvalValidator = getValidator(usersvalSchema, dataValidator)
export const usersvalResolver = resolve<UsersvalQuery, HookContext<UsersvalService>>({})

export const usersvalExternalResolver = resolve<Usersval, HookContext<UsersvalService>>({})

// Schema for creating new entries
export const usersvalDataSchema = Type.Pick(usersvalSchema, ['text'], {
  $id: 'UsersvalData'
})
export type UsersvalData = Static<typeof usersvalDataSchema>
export const usersvalDataValidator = getValidator(usersvalDataSchema, dataValidator)
export const usersvalDataResolver = resolve<UsersvalData, HookContext<UsersvalService>>({})

// Schema for updating existing entries
export const usersvalPatchSchema = Type.Partial(usersvalSchema, {
  $id: 'UsersvalPatch'
})
export type UsersvalPatch = Static<typeof usersvalPatchSchema>
export const usersvalPatchValidator = getValidator(usersvalPatchSchema, dataValidator)
export const usersvalPatchResolver = resolve<UsersvalPatch, HookContext<UsersvalService>>({})

// Schema for allowed query properties
export const usersvalQueryProperties = Type.Pick(usersvalSchema, ['_id', 'text'])
export const usersvalQuerySchema = Type.Intersect(
  [
    querySyntax(usersvalQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type UsersvalQuery = Static<typeof usersvalQuerySchema>
export const usersvalQueryValidator = getValidator(usersvalQuerySchema, queryValidator)
export const usersvalQueryResolver = resolve<UsersvalQuery, HookContext<UsersvalService>>({})
