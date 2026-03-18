// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { ChatservService } from './chatserv.class'

// Main data model schema
export const chatservSchema = Type.Object(
  {
    _id: Type.Optional(ObjectIdSchema()),
    senderId: ObjectIdSchema(),
    receiverId: ObjectIdSchema(),
    text: Type.String(),
    createdAt: Type.Optional(Type.String()),
    isSeen: Type.Optional(Type.Boolean())
  },
  { $id: 'Chatserv', additionalProperties: false }
)
export type Chatserv = Static<typeof chatservSchema>
export const chatservValidator = getValidator(chatservSchema, dataValidator)
export const chatservResolver = resolve<ChatservQuery, HookContext<ChatservService>>({})

export const chatservExternalResolver = resolve<Chatserv, HookContext<ChatservService>>({})

// Schema for creating new entries
export const chatservDataSchema = Type.Pick(chatservSchema,
  ['senderId', 'receiverId', 'text', 'createdAt', 'isSeen'],
  {
    $id: 'ChatservData'
  })
export type ChatservData = Static<typeof chatservDataSchema>
export const chatservDataValidator = getValidator(chatservDataSchema, dataValidator)
export const chatservDataResolver = resolve<ChatservData, HookContext<ChatservService>>({
  createdAt: async () => new Date().toISOString(),
  isSeen: async () => false
})

// Schema for updating existing entries
export const chatservPatchSchema = Type.Partial(chatservSchema, {
  $id: 'ChatservPatch'
})
export type ChatservPatch = Static<typeof chatservPatchSchema>
export const chatservPatchValidator = getValidator(chatservPatchSchema, dataValidator)
export const chatservPatchResolver = resolve<ChatservPatch, HookContext<ChatservService>>({})

// Schema for allowed query properties
export const chatservQueryProperties = Type.Pick(chatservSchema, ['senderId', 'receiverId', 'text', 'createdAt', 'isSeen'],
)
export const chatservQuerySchema = Type.Intersect(
  [
    querySyntax(chatservQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type ChatservQuery = Static<typeof chatservQuerySchema>
export const chatservQueryValidator = getValidator(chatservQuerySchema, queryValidator)
export const chatservQueryResolver = resolve<ChatservQuery, HookContext<ChatservService>>({})
