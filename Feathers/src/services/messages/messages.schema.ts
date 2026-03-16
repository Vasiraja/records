import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { MessagesService } from './messages.class'

export const messagesSchema = Type.Object(
  {
    _id: Type.Optional(ObjectIdSchema()),
    senderId: ObjectIdSchema(),
    receiverId: ObjectIdSchema(),
    text: Type.String(),
    createdAt: Type.Optional(Type.String()),
    isSeen: Type.Optional(Type.Boolean())
  },
  { $id: 'Messages', additionalProperties: false }
)
export type Messages = Static<typeof messagesSchema>
export const messagesValidator = getValidator(messagesSchema, dataValidator)

export const messagesResolver = resolve<Messages, HookContext<MessagesService>>({})

export const messagesExternalResolver = resolve<Messages, HookContext<MessagesService>>({})

export const messagesDataSchema = Type.Pick(
  messagesSchema,
  ['senderId', 'receiverId', 'text', 'createdAt', 'isSeen'],
  { $id: 'MessagesData' }
)
export type MessagesData = Static<typeof messagesDataSchema>
export const messagesDataValidator = getValidator(messagesDataSchema, dataValidator)
export const messagesDataResolver = resolve<MessagesData, HookContext<MessagesService>>({})

export const messageDataResolv = resolve<MessagesData, HookContext<MessagesService>>({
  createdAt: async () => new Date().toISOString(),
  isSeen: async () => false
})

export const messagesPatchSchema = Type.Partial(messagesSchema, {
  $id: 'MessagesPatch'
})
export type MessagesPatch = Static<typeof messagesPatchSchema>
export const messagesPatchValidator = getValidator(messagesPatchSchema, dataValidator)
export const messagesPatchResolver = resolve<MessagesPatch, HookContext<MessagesService>>({})

export const messagesQueryProperties = Type.Pick(messagesSchema, [
  '_id', 'senderId', 'receiverId', 'text', 'createdAt', 'isSeen'
])
export const messagesQuerySchema = Type.Intersect([
  querySyntax(messagesQueryProperties),
  Type.Object({}, { additionalProperties: true })
])
export type MessagesQuery = Static<typeof messagesQuerySchema>
export const messagesQueryValidator = getValidator(messagesQuerySchema, queryValidator)
export const messagesQueryResolver = resolve<MessagesQuery, HookContext<MessagesService>>({})