// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { EmployeesService } from './emp.class'

// Main data model schema
export const employeesSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'Employees', additionalProperties: false }
)
export type Employees = Static<typeof employeesSchema>
export const employeesValidator = getValidator(employeesSchema, dataValidator)
export const employeesResolver = resolve<EmployeesQuery, HookContext<EmployeesService>>({})

export const employeesExternalResolver = resolve<Employees, HookContext<EmployeesService>>({})

// Schema for creating new entries
export const employeesDataSchema = Type.Pick(employeesSchema, ['text'], {
  $id: 'EmployeesData'
})
export type EmployeesData = Static<typeof employeesDataSchema>
export const employeesDataValidator = getValidator(employeesDataSchema, dataValidator)
export const employeesDataResolver = resolve<EmployeesData, HookContext<EmployeesService>>({})

// Schema for updating existing entries
export const employeesPatchSchema = Type.Partial(employeesSchema, {
  $id: 'EmployeesPatch'
})
export type EmployeesPatch = Static<typeof employeesPatchSchema>
export const employeesPatchValidator = getValidator(employeesPatchSchema, dataValidator)
export const employeesPatchResolver = resolve<EmployeesPatch, HookContext<EmployeesService>>({})

// Schema for allowed query properties
export const employeesQueryProperties = Type.Pick(employeesSchema, ['_id', 'text'])
export const employeesQuerySchema = Type.Intersect(
  [
    querySyntax(employeesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type EmployeesQuery = Static<typeof employeesQuerySchema>
export const employeesQueryValidator = getValidator(employeesQuerySchema, queryValidator)
export const employeesQueryResolver = resolve<EmployeesQuery, HookContext<EmployeesService>>({})
