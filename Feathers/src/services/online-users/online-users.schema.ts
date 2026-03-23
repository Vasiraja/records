// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { OnlineUsersService } from './online-users.class'

 export const onlineUsersSchema = Type.Object(
  {
    _id: ObjectIdSchema(),  
    userId: Type.String(),
    firstname: Type.String(),
    connectedAt: Type.String()
  },
  { $id: 'OnlineUsers', additionalProperties: false }
)
export type OnlineUsers = Static<typeof onlineUsersSchema>
export const onlineUsersValidator = getValidator(onlineUsersSchema, dataValidator)
export const onlineUsersResolver = resolve<OnlineUsers, HookContext<OnlineUsersService>>({})

export const onlineUsersExternalResolver = resolve<OnlineUsers, HookContext<OnlineUsersService>>({})

 export const onlineUsersDataSchema = Type.Pick(onlineUsersSchema, ['userId','firstname','connectedAt'], {
  $id: 'OnlineUsersData'
})
export type OnlineUsersData = Static<typeof onlineUsersDataSchema>
export const onlineUsersDataValidator = getValidator(onlineUsersDataSchema, dataValidator)
export const onlineUsersDataResolver = resolve<OnlineUsersData, HookContext<OnlineUsersService>>({})

// Schema for updating existing entries 
export const onlineUsersPatchSchema = Type.Partial(onlineUsersSchema, {
  $id: 'OnlineUsersPatch'
})
export type OnlineUsersPatch = Static<typeof onlineUsersPatchSchema>
export const onlineUsersPatchValidator = getValidator(onlineUsersPatchSchema, dataValidator)
export const onlineUsersPatchResolver = resolve<OnlineUsersPatch, HookContext<OnlineUsersService>>({})

// Schema for allowed query properties
export const onlineUsersQueryProperties = Type.Pick(onlineUsersSchema, ['userId'])
export const onlineUsersQuerySchema = Type.Intersect(
  [
    querySyntax(onlineUsersQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type OnlineUsersQuery = Static<typeof onlineUsersQuerySchema>
export const onlineUsersQueryValidator = getValidator(onlineUsersQuerySchema, queryValidator)
export const onlineUsersQueryResolver = resolve<OnlineUsersQuery, HookContext<OnlineUsersService>>({})
