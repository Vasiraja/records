import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { PollsService } from './polls.class'

/* ==============================
   MAIN POLL MODEL
================================ */

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
    duration: Type.Number({ default: 2 }),   // ✅ plain type, no Type.Optional
    isActive: Type.Boolean(),
    createdAt: Type.String({ format: 'date-time' }),
    expiresAt: Type.String({ format: 'date-time' })
  },
  {
    $id: 'Polls',
    additionalProperties: false
  }
)

export type Polls = Static<typeof pollsSchema>

export const pollsValidator = getValidator(pollsSchema, dataValidator)

export const pollsResolver = resolve<Polls, HookContext<PollsService>>({})

export const pollsExternalResolver = resolve<Polls, HookContext<PollsService>>({})
 
 
export const pollsDataSchema = Type.Object(
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
    duration: Type.Number({ default: 2 })     
  },
  {
    $id: 'PollsData',
    additionalProperties: false
  }
)

export type PollsData = Static<typeof pollsDataSchema>

export const pollsDataValidator = getValidator(pollsDataSchema, dataValidator)

 
export const pollsDataResolver = resolve<Polls, HookContext<PollsService>>({

  isActive: async () => true,

  createdAt: async () => new Date().toISOString(),

  expiresAt: async (_value, data) => {
    const now = new Date()
    const durationHours = Number((data as PollsData).duration ?? 2)
    const expires = new Date(now.getTime() + durationHours * 60 * 60 * 1000)
    return expires.toISOString()
  }

})

 

export const pollsPatchSchema = Type.Partial(
  Type.Object(
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
      hidden: Type.Boolean(),         
      duration: Type.Number(),        
      isActive: Type.Boolean(),       
      createdAt: Type.String({ format: 'date-time' }),  
      expiresAt: Type.String({ format: 'date-time' })    
    }
  ),
  {
    $id: 'PollsPatch',
    additionalProperties: false        
  }
)

export type PollsPatch = Static<typeof pollsPatchSchema>

export const pollsPatchValidator = getValidator(pollsPatchSchema, dataValidator)

export const pollsPatchResolver = resolve<PollsPatch, HookContext<PollsService>>({})

 

export const pollsQueryProperties = Type.Pick(pollsSchema, [
  'id',
  'question',
  'options',
  'isActive',
  'createdBy',
  'hidden',
  'createdAt',
  'expiresAt',
  'duration'
])

export const pollsQuerySchema = Type.Intersect(
  [
    querySyntax(pollsQueryProperties),
    Type.Object(
      {
        _id: Type.Optional(Type.String())
      },
      { additionalProperties: false }
    )
  ],
  { additionalProperties: false } 
)

export type PollsQuery = Static<typeof pollsQuerySchema>

export const pollsQueryValidator = getValidator(pollsQuerySchema, queryValidator)

export const pollsQueryResolver = resolve<PollsQuery, HookContext<PollsService>>({})  