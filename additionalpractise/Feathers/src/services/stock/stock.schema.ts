// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { StocksService } from './stock.class'

// Main data model schema
export const stocksSchema = Type.Object(
  {
    // _id: ObjectIdSchema(),
    // text: Type.String()
    id:Type.Number(),
    quantity:Type.Number(),
    price:Type.Number(),
    createdAt:Type.String({format:'date-time'}),
    updatedAt:Type.String({format:'date-time'})
  },
  { $id: 'Stocks', additionalProperties: false }
)
export type Stocks = Static<typeof stocksSchema>
export const stocksValidator = getValidator(stocksSchema, dataValidator)
export const stocksResolver = resolve<StocksQuery, HookContext<StocksService>>({})

export const stocksExternalResolver = resolve<Stocks, HookContext<StocksService>>({})

// Schema for creating new entries
export const stocksDataSchema = Type.Pick(stocksSchema, ['quantity','price'], {
  $id: 'StocksData'
})
export type StocksData = Static<typeof stocksDataSchema>
export const stocksDataValidator = getValidator(stocksDataSchema, dataValidator)
export const stocksDataResolver = resolve<StocksData, HookContext<StocksService>>({})

// Schema for updating existing entries
export const stocksPatchSchema = Type.Partial(stocksSchema, {
  $id: 'StocksPatch'
})
export type StocksPatch = Static<typeof stocksPatchSchema>
export const stocksPatchValidator = getValidator(stocksPatchSchema, dataValidator)
export const stocksPatchResolver = resolve<StocksPatch, HookContext<StocksService>>({})

// Schema for allowed query properties
export const stocksQueryProperties = Type.Pick(stocksSchema, ['id','price','quantity']);
export const stocksQuerySchema = Type.Intersect(
  [
    querySyntax(stocksQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type StocksQuery = Static<typeof stocksQuerySchema>
export const stocksQueryValidator = getValidator(stocksQuerySchema, queryValidator)
export const stocksQueryResolver = resolve<StocksQuery, HookContext<StocksService>>({})
