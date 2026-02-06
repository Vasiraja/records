// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { FirstserveService } from './getapp.class'

export const firstserveSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'Firstserve', additionalProperties: false }
)
export type Firstserve = Static<typeof firstserveSchema>
export const firstserveValidator = getValidator(firstserveSchema, dataValidator)
export const firstserveResolver = resolve<FirstserveQuery, HookContext<FirstserveService>>({})

export const firstserveExternalResolver = resolve<Firstserve, HookContext<FirstserveService>>({})

// Schema for creating new entries
export const firstserveDataSchema = Type.Pick(firstserveSchema, ['text'], {
  $id: 'FirstserveData'
})
export type FirstserveData = Static<typeof firstserveDataSchema>
export const firstserveDataValidator = getValidator(firstserveDataSchema, dataValidator)
export const firstserveDataResolver = resolve<FirstserveData, HookContext<FirstserveService>>({})

// Schema for updating existing entries
export const firstservePatchSchema = Type.Partial(firstserveSchema, {
  $id: 'FirstservePatch'
})
export type FirstservePatch = Static<typeof firstservePatchSchema>
export const firstservePatchValidator = getValidator(firstservePatchSchema, dataValidator)
export const firstservePatchResolver = resolve<FirstservePatch, HookContext<FirstserveService>>({})

// Schema for allowed query properties
export const firstserveQueryProperties = Type.Pick(firstserveSchema, ['_id', 'text'])
export const firstserveQuerySchema = Type.Intersect(
  [
    querySyntax(firstserveQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type FirstserveQuery = Static<typeof firstserveQuerySchema>
export const firstserveQueryValidator = getValidator(firstserveQuerySchema, queryValidator)
export const firstserveQueryResolver = resolve<FirstserveQuery, HookContext<FirstserveService>>({})
