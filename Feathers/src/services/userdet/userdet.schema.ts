// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'
import { passwordHash } from '@feathersjs/authentication-local'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { UserdetService } from './userdet.class'

// Main data model schema
export const userdetSchema = Type.Object(
  { 
    _id: ObjectIdSchema(),
    email: Type.String(),
    password: Type.Optional(Type.String()),
    firstname:Type.String(),
    age:Type.Number(),
    userType:Type.String(), 

  }, 
  { $id: 'Userdet', additionalProperties: false }
)
export type Userdet = Static<typeof userdetSchema>
export const userdetValidator = getValidator(userdetSchema, dataValidator)
export const userdetResolver = resolve<UserdetQuery, HookContext<UserdetService>>({})

export const userdetExternalResolver = resolve<Userdet, HookContext<UserdetService>>({
  // The password should never be visible externally
  password: async () => undefined
})

// Schema for creating new entries 
export const userdetDataSchema = Type.Pick(userdetSchema, ['email', 'password','firstname','age','userType'], {
  $id: 'UserdetData'    
})
export type UserdetData = Static<typeof userdetDataSchema>
export const userdetDataValidator = getValidator(userdetDataSchema, dataValidator)
export const userdetDataResolver = resolve<UserdetData, HookContext<UserdetService>>({
  password: passwordHash({ strategy: 'local' })
})

// Schema for updating existing entries
export const userdetPatchSchema = Type.Partial(userdetSchema, {
  $id: 'UserdetPatch'
})
export type UserdetPatch = Static<typeof userdetPatchSchema>
export const userdetPatchValidator = getValidator(userdetPatchSchema, dataValidator)
export const userdetPatchResolver = resolve<UserdetPatch, HookContext<UserdetService>>({
  password: passwordHash({ strategy: 'local' })
})

// Schema for allowed query properties
export const userdetQueryProperties = Type.Pick(userdetSchema, ['_id', 'email'])
export const userdetQuerySchema = Type.Intersect(
  [
    querySyntax(userdetQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type UserdetQuery = Static<typeof userdetQuerySchema>
export const userdetQueryValidator = getValidator(userdetQuerySchema, queryValidator)
export const userdetQueryResolver = resolve<UserdetQuery, HookContext<UserdetService>>({
  // If there is a user (e.g. with authentication), they are only allowed to see their own data
  _id: async (value, user, context) => {
    if (context.params.user) {
      return context.params.user._id
    }

    return value
  }
})
