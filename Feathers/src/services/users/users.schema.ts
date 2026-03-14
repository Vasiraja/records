// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html

import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'
import { passwordHash } from '@feathersjs/authentication-local'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { UserService } from './users.class'
 
export const userSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    email: Type.String(),
    password: Type.Optional(Type.String()),
    firstname: Type.String(),
    age: Type.Number(),
    userType: Type.String(),
    lastAction: Type.Optional(Type.String({ format: 'date-time' })),
    isOnline: Type.Optional(Type.Boolean())
  },
  { $id: 'User', additionalProperties: false }
)

export type User = Static<typeof userSchema>

export const userValidator = getValidator(userSchema, dataValidator)

export const userResolver = resolve<User, HookContext<UserService>>({})
 
export const userExternalResolver = resolve<User, HookContext<UserService>>({
  password: async () => undefined
}) 
export const userDataSchema = Type.Pick(
  userSchema,
  ['email', 'password', 'firstname', 'age', 'userType', 'lastAction', 'isOnline'],
  { $id: 'UserData' }
)

export type UserData = Static<typeof userDataSchema>

export const userDataValidator = getValidator(userDataSchema, dataValidator)

export const userDataResolver = resolve<UserData, HookContext<UserService>>({
  password: passwordHash({ strategy: 'local' })
})
 
export const userPatchSchema = Type.Partial(userSchema, {
  $id: 'UserPatch'
})

export type UserPatch = Static<typeof userPatchSchema>

export const userPatchValidator = getValidator(userPatchSchema, dataValidator)

export const userPatchResolver = resolve<UserPatch, HookContext<UserService>>({
  password: passwordHash({ strategy: 'local' })
})
 
export const userQueryProperties = Type.Pick(userSchema, [
  '_id',
  'email',
  'firstname',
  'userType'
])

export const userQuerySchema = Type.Intersect(
  [
    querySyntax(userQueryProperties),
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)

export type UserQuery = Static<typeof userQuerySchema>

export const userQueryValidator = getValidator(userQuerySchema, queryValidator)

export const userQueryResolver = resolve<UserQuery, HookContext<UserService>>({
  _id: async (value, user, context) => {
    if (context.params.user) {
      return context.params.user._id
    }
    return value
  }
})