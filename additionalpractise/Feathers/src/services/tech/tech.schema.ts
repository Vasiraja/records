// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { TechproductsService } from './tech.class'

// Main data model schema
export const techproductsSchema = Type.Object(
  {
    _id: ObjectIdSchema(), 
    name:Type.String(),
    email:Type.String({format:"email"}),
    age:Type.Number({minimum:10}),
   },
  { $id: 'Techproducts', additionalProperties: false }
)
export type Techproducts = Static<typeof techproductsSchema>
export const techproductsValidator = getValidator(techproductsSchema, dataValidator)
export const techproductsResolver = resolve<TechproductsQuery, HookContext<TechproductsService>>({})

export const techproductsExternalResolver = resolve<Techproducts, HookContext<TechproductsService>>({})


export const techproductsDataSchema = Type.Pick(techproductsSchema, ['name','email','age'], {
  $id: 'TechproductsData'
})
export type TechproductsData = Static<typeof techproductsDataSchema>
export const techproductsDataValidator = getValidator(techproductsDataSchema, dataValidator)
export const techproductsDataResolver = resolve<TechproductsData, HookContext<TechproductsService>>({})

// Schema for updating existing entries
export const techproductsPatchSchema = Type.Partial(techproductsSchema, {
  $id: 'TechproductsPatch'
})
export type TechproductsPatch = Static<typeof techproductsPatchSchema>
export const techproductsPatchValidator = getValidator(techproductsPatchSchema, dataValidator)
export const techproductsPatchResolver = resolve<TechproductsPatch, HookContext<TechproductsService>>({})

// Schema for allowed query properties
export const techproductsQueryProperties = Type.Pick(techproductsSchema, ['_id','name','email','age'])
export const techproductsQuerySchema = Type.Intersect(
  [
    querySyntax(techproductsQueryProperties),
     Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type TechproductsQuery = Static<typeof techproductsQuerySchema>
export const techproductsQueryValidator = getValidator(techproductsQuerySchema, queryValidator)
export const techproductsQueryResolver = resolve<TechproductsQuery, HookContext<TechproductsService>>({})
