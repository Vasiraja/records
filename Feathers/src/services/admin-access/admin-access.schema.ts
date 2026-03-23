// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { AdminAccessService } from './admin-access.class'

 export const adminAccessSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'AdminAccess', additionalProperties: false }
)
export type AdminAccess = Static<typeof adminAccessSchema>
export const adminAccessValidator = getValidator(adminAccessSchema, dataValidator)
export const adminAccessResolver = resolve<AdminAccessQuery, HookContext<AdminAccessService>>({})

export const adminAccessExternalResolver = resolve<AdminAccess, HookContext<AdminAccessService>>({})

// Schema for creating new entries
export const adminAccessDataSchema = Type.Pick(adminAccessSchema, ['text'], {
  $id: 'AdminAccessData'
})
export type AdminAccessData = Static<typeof adminAccessDataSchema>
export const adminAccessDataValidator = getValidator(adminAccessDataSchema, dataValidator)
export const adminAccessDataResolver = resolve<AdminAccessData, HookContext<AdminAccessService>>({})

// Schema for updating existing entries
export const adminAccessPatchSchema = Type.Partial(adminAccessSchema, {
  $id: 'AdminAccessPatch'
})
export type AdminAccessPatch = Static<typeof adminAccessPatchSchema>
export const adminAccessPatchValidator = getValidator(adminAccessPatchSchema, dataValidator)
export const adminAccessPatchResolver = resolve<AdminAccessPatch, HookContext<AdminAccessService>>({})

// Schema for allowed query properties
export const adminAccessQueryProperties = Type.Pick(adminAccessSchema, ['_id', 'text'])
export const adminAccessQuerySchema = Type.Intersect(
  [
    querySyntax(adminAccessQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type AdminAccessQuery = Static<typeof adminAccessQuerySchema>
export const adminAccessQueryValidator = getValidator(adminAccessQuerySchema, queryValidator)
export const adminAccessQueryResolver = resolve<AdminAccessQuery, HookContext<AdminAccessService>>({})
